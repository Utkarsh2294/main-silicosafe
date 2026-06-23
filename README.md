<<<<<<< HEAD
# SilicoSafe — AI Diagnostic Triage for Silicosis

> A  clinical triage tool that helps frontline health workers detect silicosis in dust-exposed workers using occupational history, symptom assessment, and AI-powered chest X-ray analysis.

<br>

[![Node.js](https://img.shields.io/badge/Backend-Node.js_Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/Frontend-React_19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![SQLite](https://img.shields.io/badge/Database-SQLite-003B57?style=flat-square&logo=sqlite)](https://sqlite.org/)
[![PyTorch](https://img.shields.io/badge/Model-DenseNet121-EE4C2C?style=flat-square&logo=pytorch)](https://github.com/mlmed/torchxrayvision)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)]()


---

## The Problem: Silicosis in India

### What is Silicosis?

Silicosis is an **incurable, progressive, and entirely preventable** occupational lung disease caused by inhaling fine crystalline silica dust. When silica particles enter the lungs, they trigger a chronic inflammatory response that gradually replaces healthy lung tissue with scar tissue — a process called fibrosis. There is no cure. Once fibrosis begins, it continues even after exposure stops.

Silica dust is released during:
- **Stone crushing** and quarrying
- **Mining** (coal, mica, sandstone, granite)
- **Sandblasting** of surfaces
- **Construction** — drilling, cutting, grinding concrete
- **Pottery and ceramics** manufacturing
- **Glass and foundry** industries

### The Scale of the Crisis

India is home to one of the world's largest populations of workers at risk for silicosis:

- An estimated **10–12 million workers** are exposed to silica dust across India's mining, quarrying, and construction sectors
- Rajasthan alone has over **1 million stone crusher workers**, with studies showing silicosis prevalence above **50%** in some districts
- Workers typically develop symptoms after **5–15 years** of exposure — often during their most productive working years (ages 30–50)
- Many are **migrant labourers** from tribal communities with little access to specialist healthcare
- India's Supreme Court has recognised silicosis as a **national health emergency** among occupational diseases

### Why It Gets Missed: The TB Misdiagnosis Problem

Silicosis is chronically misdiagnosed as **tuberculosis (TB)** — and this mistake is devastating:

| | Silicosis | Tuberculosis |
|---|---|---|
| Cough | Dry, persistent | Often productive |
| Chest X-ray appearance | Upper lobe nodules / fibrosis | Cavitations, infiltrates |
| Treatment | No cure — supportive care only | 6-month antibiotic course |
| **Misdiagnosis consequence** | **Patient given TB drugs that do nothing; real disease progresses unchecked** | — |

Workers spend months or years on anti-TB medication that does nothing for their actual condition. Their silicosis worsens, lung function deteriorates, and by the time the correct diagnosis is made, irreversible damage has been done.

This happens because:
1. **Symptom overlap** — both conditions cause cough, breathlessness, and chest pain
2. **X-ray similarity** — early silicosis can look like TB on a plain X-ray to an untrained eye
3. **No radiologist access** — most rural primary health centres have no trained reader
4. **Awareness gap** — frontline workers have no occupational disease training

### Silicosis + TB Together

Silicosis dramatically **increases TB susceptibility** — workers with silicosis are 3× more likely to develop active TB. This creates a dangerous overlap where both conditions coexist, making diagnosis even harder.

### What Happens After Diagnosis

Even when correctly diagnosed, patients face:
- No treatment to reverse fibrosis — only symptom management and oxygen support
- Rapid disease progression if exposure continues
- Loss of livelihood — they cannot return to their job
- Compensation entitlements that most never claim because they don't know they exist

Under India's **Silicosis Rehabilitation Scheme**, affected workers are entitled to ₹3 lakh in compensation — but most never receive it due to lack of documentation and awareness at the field level.

---

## Our Solution: SilicoSafe

SilicoSafe is a **fast, offline-capable triage tool** designed for community health workers (CHWs) and field clinicians operating in rural and peri-urban settings. It runs on any smartphone browser, requires no specialist training, and works even with basic connectivity.

In under 3 minutes, a health worker can:
1. Capture a patient's occupational and symptom history through a simple guided form
2. Upload a phone photo of the patient's chest X-ray (held up against a window)
3. Receive an AI-generated risk score with clinical signals, alerts, and recommended next steps
4. Generate a bilingual (English + Hindi) referral letter ready to copy or send by SMS

**The goal is not to replace doctors — it is to ensure patients reach doctors faster, with the right suspicion already flagged.**

---

## Features

- **4-step guided clinical intake** — patient info, occupational history, symptoms, X-ray upload
- **Rule-based silicosis risk scoring** — aligned with WHO occupational exposure criteria
- **DenseNet121 (CheXNet) chest X-ray AI** — analyses uploaded X-ray images for nodular opacities, infiltrates, and consolidation patterns associated with silicosis
- **Dual scoring system** — clinical history score + AI X-ray score shown separately for transparency
- **Grad-CAM heatmap overlay** — highlights the lung region the model flagged as abnormal
- **TB misdiagnosis alert** — prominent warning when clinical picture suggests silicosis, not TB
- **Bilingual referral report** — auto-generated in English and Hindi, ready to copy or SMS
- **Compensation eligibility flag** — notifies health worker of ₹3 lakh Silicosis Rehabilitation Scheme entitlement
- **Client-side fallback scoring** — clinical risk score works without any internet connection

---

## Project Structure

```
SILICO1/
├── backend/
│   ├── main.py              # FastAPI server — entire backend (~100 lines)
│   └── requirements.txt     # Python dependencies
└── frontend/
    ├── src/
    │   ├── App.jsx           # Main React app — all screens, scoring logic, UI
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── public/
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## Getting Started

### Prerequisites

- Python 3.9+
- Node.js 18+
- ~2 GB disk space (model weights downloaded from HuggingFace on first run)

---

### 1. Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

The server starts at `http://localhost:8000`. On first launch, it downloads the `densenet121-res224-all` weights from HuggingFace (~10 seconds). Subsequent starts are instant.

Confirm it's running:
```
GET http://localhost:8000/
→ { "status": "SilicoSafe backend running" }
```

---

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app starts at `http://localhost:5173` and connects to the backend at `http://localhost:8000`.

---

## API Reference

### `POST /analyse`

The only endpoint. Accepts patient form data and an optional X-ray image.

```
Content-Type: multipart/form-data

Fields:
  data  (required)  — JSON string of patient clinical form data
  xray  (optional)  — chest X-ray image file (JPG or PNG, up to 20 MB)
```

**Response:**
```json
{
  "xray_score": 72.4,
  "xray_label": "Nodular opacities (confidence 73%)",
  "status": "ok"
}
```

`xray_score` and `xray_label` are `null` if no image was uploaded.

---

## How the Scoring Works

### Clinical Risk Score (client-side, rule-based)

Computed instantly from the intake form. No network required.

| Factor | Max Points |
|---|---|
| High-risk occupation (stone crushing / mining / quarrying / sandblasting) | 35 |
| Years of exposure (up to 20+) | 40 |
| No respiratory protection (mask never worn) | 18 |
| Heavy dust environment (4–5 / 5) | 14 |
| Manual X-ray findings (nodular / upper opacity) | 14 |
| Previous dusty job history | 8 |
| Classic symptoms (dry cough + exertional breathlessness) | 9 |
| Active TB treatment without improvement *(negative signal)* | −10 |
| Close TB household contact *(negative signal)* | −6 |

**Risk bands:** Low (< 35) · Moderate (35–59) · High (≥ 60)

---

### X-ray AI Score (backend, DenseNet121)

The backend uses `torchxrayvision` with a pre-trained DenseNet121 model. The uploaded image is:

1. Converted to grayscale and resized to 224×224
2. Normalised to the [−1024, 1024] range expected by TorchXRayVision
3. Passed through the model → probabilities for 18 chest pathologies

A silicosis-specific composite score is computed by weighting clinically relevant findings:

```
score = Nodules       × 0.50   ← hallmark finding of silicosis
      + Infiltration  × 0.30   ← upper lobe infiltrates common in silicosis
      + Consolidation × 0.12   ← less specific, but contributes
      + Atelectasis   × 0.08
```

The dominant finding is surfaced as the `xray_label` in the API response.

---

## App Walkthrough

| Screen | What it captures |
|---|---|
| **Patient Info** | Name, age, sex, district / village |
| **Occupational History** | Job type, years of exposure, mask use, dust level, prior dusty jobs |
| **Symptoms** | Multi-select checklist (10 symptoms), duration, TB treatment status, TB household contact |
| **X-ray Upload** | Image upload with live preview; manual finding selection as fallback |
| **Results** | Dual score cards, key signals, TB alert, next steps, Grad-CAM overlay, bilingual referral report |

---

## Clinical Safety Features

| Feature | Purpose |
|---|---|
| **TB misdiagnosis warning** | Red alert when patient is on TB drugs without improvement |
| **Do not treat as TB** | Shown prominently when silicosis risk is high |
| **Compensation notice** | Flags ₹3 lakh Silicosis Rehabilitation Scheme eligibility |
| **Urgent referral guidance** | HRCT chest scan + pulmonologist referral recommended |
| **Exposure removal reminder** | Prompts clinician to remove patient from dust environment immediately |

---

## Bilingual Reports

Results generate a ready-to-copy referral note in **English and Hindi**, pre-filled with patient name, age, location, occupational history summary, risk level and confidence, and recommended next steps including compensation entitlement. A one-tap **SMS referral** option is included for field use where internet is limited.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, vanilla CSS-in-JS |
| Backend | FastAPI, Uvicorn |
| ML Model | TorchXRayVision — DenseNet121 (`densenet121-res224-all`) |
| Image processing | Pillow, NumPy, PyTorch (CPU inference — no GPU required) |

---

## Development Notes

- The frontend includes a **full client-side fallback** scoring engine. If the backend is unreachable, the app still produces a clinical risk score from form data alone.
- The **Grad-CAM heatmap** on the X-ray tab is currently a simulated visual. A production build would replace this with a real Grad-CAM saliency map returned from the backend.
- **CORS** is configured for `http://localhost:5173` only. Update `allow_origins` in `main.py` for deployment.
- The model runs on **CPU** — no GPU required. Inference takes ~1–2 seconds on a modern laptop.

---

## Roadmap

- [ ] Real Grad-CAM saliency maps from backend
- [ ] Offline PWA mode with on-device ONNX model
- [ ] Integration with Ayushman Bharat health records
- [ ] Audio-guided form for low-literacy health workers
- [ ] District-level silicosis case aggregation dashboard for health officers
- [ ] ILO / NIOSH radiological classification (0/1/2/3 profusion scoring)

---

## References

- World Health Organization — [Silicosis Fact Sheet](https://www.who.int/news-room/fact-sheets/detail/silicosis)
- Rajasthan State Silicosis Policy, 2019
- Cohen et al. (2022) — [TorchXRayVision](https://github.com/mlmed/torchxrayvision)
- Irvin et al. (2019) — CheXpert: A Large Chest Radiograph Dataset
- Supreme Court of India — *Occupational Health and Safety Association v. Union of India*, 2014
- National Human Rights Commission India — Reports on Silicosis as a Human Rights Issue

---

## Disclaimer

SilicoSafe is a **triage support tool** intended to assist trained health workers in identifying patients who need urgent specialist referral. It is not a substitute for clinical diagnosis. All AI outputs must be reviewed by a qualified medical professional. Treatment decisions must not be made solely on the basis of this tool.

---

*Built to fight a preventable disease that has been invisible for too long.*
=======
# main-silicosafe
>>>>>>> 50173b9320f6dbb81c3ff0ea221992174965adbb
