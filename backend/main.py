# main.py — SilicoSafe Backend with REAL Grad-CAM heatmaps
# Run: uvicorn main:app --reload
# Requirements: pip install fastapi uvicorn torchxrayvision torch pillow numpy scipy python-multipart

from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import json, io, base64
import numpy as np
from PIL import Image
import torch
import torch.nn.functional as F
from scipy.ndimage import zoom

import torchxrayvision as xrv

# ── Load model ONCE at startup ────────────────────────────────────────────────
print("Loading chest X-ray model... (~10s first time)")
model = xrv.models.DenseNet(weights="densenet121-res224-all")
model.eval()
print("Model ready.")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Grad-CAM implementation ───────────────────────────────────────────────────
# Grad-CAM works by:
# 1. Hooking into the LAST convolutional layer to capture its feature maps
# 2. Running a forward pass to get the target class score
# 3. Running a backward pass to get gradients w.r.t. those feature maps
# 4. Weighting each feature map channel by its mean gradient (global avg pooling)
# 5. Taking ReLU of the weighted sum → heatmap

class GradCAM:
    def __init__(self, model):
        self.model = model
        self.feature_maps = None   # captured in forward hook
        self.gradients = None      # captured in backward hook
        self._register_hooks()

    def _register_hooks(self):
        # DenseNet's last conv layer is inside features.denseblock4
        # We hook the very last ReLU/BN output before the classifier
        # torchxrayvision DenseNet: model.features is a Sequential ending in norm5
        target_layer = self.model.features  # captures after final BN+ReLU

        def forward_hook(module, input, output):
            self.feature_maps = output.detach()

        def backward_hook(module, grad_input, grad_output):
            self.gradients = grad_output[0].detach()

        target_layer.register_forward_hook(forward_hook)
        target_layer.register_full_backward_hook(backward_hook)

    def generate(self, img_tensor, target_pathology_idx):
        """
        img_tensor: (1, 1, 224, 224) float tensor
        target_pathology_idx: int — which pathology to generate CAM for
        Returns: numpy array (224, 224) with values 0..1
        """
        self.model.zero_grad()
        img_tensor.requires_grad_(True)

        # Forward pass
        output = self.model(img_tensor)   # (1, num_pathologies)
        score = output[0, target_pathology_idx]

        # Backward pass — compute gradients for this specific class score
        score.backward()

        # feature_maps: (1, C, H, W)  — channel feature activations
        # gradients:    (1, C, H, W)  — how much each channel matters
        fmaps = self.feature_maps[0]      # (C, H, W)
        grads = self.gradients[0]         # (C, H, W)

        # Global average pool the gradients → weight per channel
        weights = grads.mean(dim=(1, 2))  # (C,)

        # Weighted sum of feature maps
        cam = torch.zeros(fmaps.shape[1:], dtype=torch.float32)
        for i, w in enumerate(weights):
            cam += w * fmaps[i]

        # ReLU: only keep positive activations (regions that increase the score)
        cam = F.relu(cam)

        # Convert to numpy and upsample to 224x224
        cam_np = cam.numpy()
        if cam_np.max() > 0:
            cam_np = cam_np / cam_np.max()   # normalise to [0, 1]

        # Resize from feature map resolution (7x7) to image resolution (224x224)
        scale = 224 / cam_np.shape[0]
        cam_resized = zoom(cam_np, scale, order=1)  # bilinear upsampling

        return cam_resized   # (224, 224), values 0..1


# Instantiate Grad-CAM once
gradcam = GradCAM(model)


# ── Heatmap overlay renderer ──────────────────────────────────────────────────
def render_heatmap_overlay(original_img_pil, cam: np.ndarray, alpha=0.45) -> str:
    """
    Blends the Grad-CAM heatmap onto the original grayscale X-ray.
    Returns a base64-encoded PNG string ready for <img src="data:image/png;base64,...">
    """
    # Resize original to 224x224 for consistency
    img_rgb = original_img_pil.convert("RGB").resize((224, 224))
    img_np = np.array(img_rgb).astype(np.float32)

    # Build the heatmap colormap (black → green, matching SilicoSafe palette)
    # cam values: 0 = no activation (black/dark), 1 = max activation (bright green/red)
    heatmap = np.zeros((224, 224, 3), dtype=np.float32)
    heatmap[:, :, 0] = cam * 220   # Red channel  → warm for high activation
    heatmap[:, :, 1] = cam * 255   # Green channel → bright green
    heatmap[:, :, 2] = cam * 60    # Blue channel  → slight teal tint

    # Blend: output = original * (1 - alpha) + heatmap * alpha
    blended = img_np * (1 - alpha) + heatmap * alpha
    blended = np.clip(blended, 0, 255).astype(np.uint8)

    # Encode to base64 PNG
    out_img = Image.fromarray(blended)
    buffer = io.BytesIO()
    out_img.save(buffer, format="PNG")
    b64 = base64.b64encode(buffer.getvalue()).decode("utf-8")
    return f"data:image/png;base64,{b64}"


# ── Silicosis scoring from model pathologies ──────────────────────────────────
# These pathology indices correspond to torchxrayvision's DenseNet output order.
# We target the findings most clinically associated with silicosis.
SILICOSIS_PATHOLOGY_WEIGHTS = {
    "Nodules":        0.50,   # Silicotic nodules — hallmark finding
    "Infiltration":   0.30,   # Upper lobe infiltrates
    "Consolidation":  0.12,   # Less specific but contributes
    "Atelectasis":    0.08,   # Plate-like atelectasis
}

def compute_silicosis_score(preds: dict) -> tuple[float, str]:
    """Returns (score_0_to_100, dominant_finding_label)"""
    raw = sum(
        float(preds.get(k, 0)) * w
        for k, w in SILICOSIS_PATHOLOGY_WEIGHTS.items()
    )
    score = round(min(98, max(5, raw * 100)), 1)

    dominant = max(
        SILICOSIS_PATHOLOGY_WEIGHTS.keys(),
        key=lambda k: float(preds.get(k, 0))
    )
    dominant_conf = round(float(preds.get(dominant, 0)) * 100)
    label = f"{dominant.replace('_', ' ')} — {dominant_conf}% confidence"
    return score, label


# ── Main endpoint ─────────────────────────────────────────────────────────────
@app.post("/analyse")
async def analyse(
    data: str = Form(...),
    xray: UploadFile = File(None)
):
    patient = json.loads(data)

    xray_score = None
    xray_label = None
    heatmap_b64 = None          # NEW: base64 heatmap overlay image
    all_findings = {}           # NEW: all pathology scores for display

    if xray and xray.filename:
        image_bytes = await xray.read()
        original_pil = Image.open(io.BytesIO(image_bytes))

        # ── Preprocessing ────────────────────────────────────────────────────
        img_gray = original_pil.convert("L").resize((224, 224))
        img_np = np.array(img_gray).astype(np.float32)
        img_np = xrv.datasets.normalize(img_np, 255)          # → [-1024, 1024]
        img_tensor = torch.from_numpy(img_np).unsqueeze(0).unsqueeze(0)  # (1,1,224,224)

        # ── Standard forward pass for scores ────────────────────────────────
        with torch.no_grad():
            output = model(img_tensor)

        preds = dict(zip(model.pathologies, output[0].detach().numpy()))
        xray_score, xray_label = compute_silicosis_score(preds)

        # All pathology scores for the frontend detail panel
        all_findings = {k: round(float(v) * 100, 1) for k, v in preds.items() if v == v}  # filter NaN

        # ── Grad-CAM for the dominant silicosis-related pathology ────────────
        # Find which pathology has the highest weighted score
        best_pathology = max(
            SILICOSIS_PATHOLOGY_WEIGHTS.keys(),
            key=lambda k: float(preds.get(k, 0)) * SILICOSIS_PATHOLOGY_WEIGHTS[k]
        )
        best_idx = list(model.pathologies).index(best_pathology)

        # Grad-CAM requires gradients — re-run with grad enabled
        img_tensor_grad = img_tensor.clone()
        cam = gradcam.generate(img_tensor_grad, best_idx)

        # Render overlay
        heatmap_b64 = render_heatmap_overlay(original_pil, cam, alpha=0.45)

    return {
        "xray_score":    xray_score,     # float 0-100 or None
        "xray_label":    xray_label,     # string or None
        "heatmap":       heatmap_b64,    # base64 PNG data URI or None  ← NEW
        "all_findings":  all_findings,   # dict of all pathology % scores ← NEW
        "status":        "ok"
    }


@app.get("/")
def root():
    return {"status": "SilicoSafe backend running — Grad-CAM enabled"}