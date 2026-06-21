from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware

import json
import io
import base64
from typing import Dict, Tuple, Optional

import numpy as np
from PIL import Image

import torch
import torch.nn.functional as F

import torchxrayvision as xrv


# ----------------------------
# Device + Model
# ----------------------------
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

print("Loading chest X-ray model... (~10s first time)")
model = xrv.models.DenseNet(weights="densenet121-res224-all").to(DEVICE)
model.eval()
print(f"Model ready on {DEVICE}.")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ----------------------------
# Grad-CAM
# ----------------------------
class GradCAM:
    def __init__(self, model):
        self.model = model
        self.feature_maps = None
        self.gradients = None
        self.target_layer = self._get_target_layer()
        self._register_hooks()

    def _get_target_layer(self):
        """
        Prefer the last child layer in model.features.
        For torchxrayvision DenseNet this is a reasonable Grad-CAM target
        and is usually more useful than hooking the whole features block.
        """
        if hasattr(self.model, "features"):
            children = list(self.model.features.children())
            if children:
                return children[-1]
            return self.model.features
        return self.model

    def _register_hooks(self):
        def forward_hook(module, input, output):
            self.feature_maps = output.detach()

        def backward_hook(module, grad_input, grad_output):
            self.gradients = grad_output[0].detach()

        self.target_layer.register_forward_hook(forward_hook)
        self.target_layer.register_full_backward_hook(backward_hook)

    def generate(self, img_tensor: torch.Tensor, target_pathology_idx: int) -> np.ndarray:
        self.model.zero_grad(set_to_none=True)

        img_tensor = img_tensor.to(DEVICE).requires_grad_(True)

        # IMPORTANT: use raw logits for Grad-CAM gradients
        output = self.model(img_tensor)
        score = output[0, target_pathology_idx]

        score.backward()

        if self.feature_maps is None or self.gradients is None:
            raise RuntimeError("Grad-CAM hooks did not capture feature maps/gradients.")

        fmaps = self.feature_maps[0]   # [C, H, W]
        grads = self.gradients[0]      # [C, H, W]

        weights = grads.mean(dim=(1, 2))  # [C]

        cam = torch.zeros(fmaps.shape[1:], dtype=torch.float32, device=fmaps.device)
        for i, w in enumerate(weights):
            cam += w * fmaps[i]

        cam = F.relu(cam)
        cam = cam.detach().cpu().numpy()

        if cam.max() > 0:
            cam = cam / cam.max()

        # Resize to 224x224 safely
        cam_img = Image.fromarray((cam * 255).astype(np.uint8))
        cam_img = cam_img.resize((224, 224), resample=Image.BILINEAR)
        cam_resized = np.array(cam_img).astype(np.float32) / 255.0

        return cam_resized


gradcam = GradCAM(model)


# ----------------------------
# Utilities
# ----------------------------
def render_heatmap_overlay(original_img_pil: Image.Image, cam: np.ndarray, alpha: float = 0.45) -> str:
    img_rgb = original_img_pil.convert("RGB").resize((224, 224))
    img_np = np.array(img_rgb).astype(np.float32)

    heatmap = np.zeros((224, 224, 3), dtype=np.float32)
    heatmap[:, :, 0] = cam * 220
    heatmap[:, :, 1] = cam * 255
    heatmap[:, :, 2] = cam * 60

    blended = img_np * (1 - alpha) + heatmap * alpha
    blended = np.clip(blended, 0, 255).astype(np.uint8)

    out_img = Image.fromarray(blended)
    buffer = io.BytesIO()
    out_img.save(buffer, format="PNG")
    b64 = base64.b64encode(buffer.getvalue()).decode("utf-8")
    return f"data:image/png;base64,{b64}"


SILICOSIS_PATHOLOGY_WEIGHTS = {
    "Nodules": 0.50,
    "Infiltration": 0.30,
    "Consolidation": 0.12,
    "Atelectasis": 0.08,
}


def compute_silicosis_score(preds: Dict[str, float]) -> Tuple[float, str]:
    raw = sum(float(preds.get(k, 0.0)) * w for k, w in SILICOSIS_PATHOLOGY_WEIGHTS.items())
    score = round(min(98, max(5, raw * 100)), 1)

    dominant = max(
        SILICOSIS_PATHOLOGY_WEIGHTS.keys(),
        key=lambda k: float(preds.get(k, 0.0)),
    )
    dominant_conf = round(float(preds.get(dominant, 0.0)) * 100)
    label = f"{dominant.replace('_', ' ')} — {dominant_conf}% confidence"
    return score, label


def looks_like_xray(pil_img: Image.Image) -> Tuple[bool, str]:
    """
    Lightweight sanity check to reject obvious non-X-ray uploads.
    Kept permissive so valid scans are less likely to get rejected.
    """
    rgb = pil_img.convert("RGB")
    arr = np.array(rgb).astype(np.float32)

    # Allow mild tinting, reject strongly colored images
    channel_std = arr.std(axis=(0, 1))
    if channel_std.max() - channel_std.min() > 40:
        return False, "Image appears to be a color photo, not a radiograph"

    w, h = pil_img.size
    aspect = w / h if h else 0
    if aspect < 0.6 or aspect > 1.7:
        return False, "Unusual image proportions for a chest X-ray"

    gray = np.array(pil_img.convert("L"))
    hist, _ = np.histogram(gray, bins=32, range=(0, 255))
    if (hist == 0).sum() > 28:
        return False, "Pixel pattern inconsistent with a radiograph"

    return True, ""


# ----------------------------
# API
# ----------------------------
@app.post("/analyse")
async def analyse(
    data: str = Form(...),
    xray: UploadFile = File(None),
):
    patient = json.loads(data)

    xray_score = None
    xray_label = None
    heatmap_b64 = None
    all_findings = {}

    if xray and xray.filename:
        try:
            image_bytes = await xray.read()
            original_pil = Image.open(io.BytesIO(image_bytes))
            original_pil = original_pil.convert("RGB")
        except Exception as e:
            return {
                "xray_score": None,
                "xray_label": None,
                "heatmap": None,
                "all_findings": {},
                "status": "rejected",
                "error": f"Could not read uploaded image: {str(e)}",
            }

        is_valid, reject_reason = looks_like_xray(original_pil)
        if not is_valid:
            return {
                "xray_score": None,
                "xray_label": None,
                "heatmap": None,
                "all_findings": {},
                "status": "rejected",
                "error": f"Upload doesn't appear to be a chest X-ray: {reject_reason}",
            }

        img_gray = original_pil.convert("L").resize((224, 224))
        img_np = np.array(img_gray).astype(np.float32)
        img_np = xrv.datasets.normalize(img_np, 255)
        img_tensor = torch.from_numpy(img_np).unsqueeze(0).unsqueeze(0).float().to(DEVICE)

        # Use sigmoid for readable output probabilities
        with torch.no_grad():
            output = torch.sigmoid(model(img_tensor))

        probs = output[0].detach().cpu().numpy()
        preds = dict(zip(model.pathologies, probs))

        xray_score, xray_label = compute_silicosis_score(preds)

        all_findings = {
            k: round(float(v) * 100, 1)
            for k, v in preds.items()
            if np.isfinite(v)
        }

        available_pathologies = {
            k: w for k, w in SILICOSIS_PATHOLOGY_WEIGHTS.items() if k in model.pathologies
        }

        if available_pathologies:
            best_pathology = max(
                available_pathologies.keys(),
                key=lambda k: float(preds.get(k, 0.0)) * available_pathologies[k],
            )
        else:
            best_pathology = model.pathologies[0]

        best_idx = list(model.pathologies).index(best_pathology) if best_pathology in model.pathologies else 0

        img_tensor_grad = img_tensor.clone().detach()
        cam = gradcam.generate(img_tensor_grad, best_idx)

        heatmap_b64 = render_heatmap_overlay(original_pil, cam, alpha=0.45)

    return {
        "xray_score": xray_score,
        "xray_label": xray_label,
        "heatmap": heatmap_b64,
        "all_findings": all_findings,
        "status": "ok",
    }


@app.get("/")
def root():
    return {"status": "SilicoSafe backend running — Grad-CAM enabled"}
