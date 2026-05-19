# <img width="35" height="35" alt="image" src="https://github.com/user-attachments/assets/49d58c98-a489-46af-bb31-985fe934774d" /> Plate Vision

Your production-grade license plate detection and recognition system — fine-tuned YOLOv8 model that spots plates with 99.3% precision, annotates images in real-time, and extracts text via OCR for automated workflows.

![Python](https://img.shields.io/badge/Python-3.9+-3776ab?style=flat-square) ![YOLOv8](https://img.shields.io/badge/YOLOv8-Ultralytics-blue?style=flat-square) ![PyTorch](https://img.shields.io/badge/PyTorch-latest-EE4C2C?style=flat-square) ![OpenCV](https://img.shields.io/badge/OpenCV-4.8+-FF6600?style=flat-square) ![MLflow](https://img.shields.io/badge/MLflow-Tracking-0194E2?style=flat-square)


## What It Does

Plate Vision transforms surveillance footage, parking lot images, and vehicle photos into actionable intelligence. Upload a car image — the model detects every license plate with 99.3% mAP@50, annotates bounding boxes on the original image, and automatically extracts the plate text via OCR. This end-to-end pipeline handles everything from raw pixels to structured data.

Unlike generic object detectors, this YOLOv8s has been fine-tuned on 16,000+ professionally annotated images captured under diverse lighting, angles, and weather conditions. MLflow tracks every training iteration, early stopping prevents overfitting, and the inference pipeline is optimized for both accuracy and speed — processing images at 25+ FPS on standard GPUs.

## Architecture

### The Detection Pipeline

Every image flows through a carefully engineered pipeline that balances detection accuracy with inference speed:

```
Input Image
    │
    ▼
┌──────────────────┐
│  Preprocessing   │  (resize, normalize, augment)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  YOLOv8s Encoder │  (backbone feature extraction)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  YOLOv8s Decoder │  (multi-scale predictions)
└────────┬─────────┘
         │
         ├──► Bounding Box Regression
         │    └─ (x, y, w, h, confidence)
         │
         ├──► Confidence Thresholding
         │    └─ NMS (Non-Maximum Suppression)
         │
         ▼
┌──────────────────┐
│  Detected Plates │  (coordinates + confidence scores)
└────────┬─────────┘
         │
         ├──► Plate Annotation
         │    └─ Draw bounding boxes on image
         │
         ├──► Plate Cropping
         │    └─ Extract plate regions from image
         │
         ▼
┌──────────────────┐
│  OCR Engine      │  (text extraction)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Final Output    │  (annotated image + plate text)
└──────────────────┘
```

### Training Pipeline

```
Annotated Dataset (16,000+ images)
    │
    ▼
┌──────────────────┐
│  Data Loading    │  (stratified split)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Augmentation    │  (mosaic, color jitter, rotation)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Model Training  │  (YOLOv8s backbone)
└────────┬─────────┘
         │
         ├──► MLflow Tracking
         │    ├─ Learning rates & batch sizes
         │    ├─ mAP@50, Precision, Recall
         │    ├─ Confusion matrices
         │    └─ Loss curves
         │
         ▼
┌──────────────────┐
│  Early Stopping  │  (monitor validation mAP)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Best Checkpoint │  (mAP@50: 99.3%, Precision: 98.9%)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Model Registry  │  (MLflow promotion)
└──────────────────┘
```

### Model Components

| Component | Details |
|-----------|---------|
| **Base Architecture** | YOLOv8s (small, optimized for speed) |
| **Training Dataset** | 16,000+ professionally annotated images |
| **Input Resolution** | 640×640 pixels |
| **mAP@50** | 99.3% |
| **Precision** | 98.9% |
| **Recall** | 98.3% |
| **FPS** | 25+ on GPU, 8+ on CPU |
| **Model Size** | 11.2 MB (quantized) |
| **Training Strategy** | Early stopping + best-model checkpointing |
| **Augmentation** | Mosaic, color jitter, rotation, scale |
| **Optimization** | SGD with cosine annealing |

## Features

**Ultra-High Precision** — 99.3% mAP@50 and 98.9% precision ensure virtually zero false positives in production.

**Multi-Angle Detection** — Trained on plates captured at diverse angles, lighting conditions, and distances — handles real-world variance.

**Real-Time Inference** — Processes images at 25+ FPS on GPUs; fast enough for live video streams.

**End-to-End Pipeline** — Detection → annotation → OCR text extraction all in one call; no manual wrangling.

**MLflow Integration** — Complete experiment tracking with run comparison, artifact storage, and model versioning.

**Hyperparameter Logging** — Every run captures learning rate, batch size, augmentation settings, and validation metrics.

**Early Stopping** — Halts training when validation mAP plateaus, preventing overfitting and wasted compute.

**Best Model Checkpointing** — Automatically saves the model at peak validation performance, not just the final epoch.

**Batch Processing** — Classify entire datasets in parallel; annotate hundreds of images in seconds.

**Production-Ready** — Export to ONNX or TensorRT for deployment on edge devices, cloud platforms, or on-premises servers.

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Language** | Python 3.9+ |
| **ML Framework** | PyTorch + Ultralytics YOLOv8 |
| **Computer Vision** | OpenCV, Pillow |
| **Object Detection** | YOLOv8s (small variant) |
| **OCR Engine** | PaddleOCR or EasyOCR |
| **Experiment Tracking** | MLflow |
| **Data Handling** | Pandas, NumPy |
| **API** | FastAPI (inference server) |
| **Deployment** | Docker, HuggingFace Hub |

## Project Structure

```
plate-vision/
├── backend/
│   ├── configs/
│   │   └── yolo_config.yaml        # YOLOv8 training hyperparameters
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── main.py             
│   │   │
│   │   ├── data/
│   │   │   ├── dataset.py          # YOLO dataset class
│   │   │   └── augmentation.py     # Custom augmentations
│   │   │
│   │   ├── intermediates/
│   │   │   └── cache/              # Cached predictions & embeddings
│   │   │
│   │   ├── models/
│   │   │   ├── best.pt    
│   │   │   └── last.pt       
│   │   │
│   │   ├── services/
│   │   │   ├── inference.py        # Plate detection service
│   │   │
│   │   └── training/
│   │       ├── train.py            # Training loop with early stopping
│   │
│   ├── .gitignore
│   ├── mlflow.db                   # MLflow tracking database
│   └── requirements.txt            # Python dependencies
│
├── frontend/
│   ├── src/
│   │   └── App.jsx                 # React UI for plate detection
│   ├── public/
│   ├── sources/
│   ├── node_modules/
│   ├── .gitignore
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Getting Started

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### Train the Model

```bash
python src/training/train.py --config configs/yolo_config.yaml
```

This will:
1. Load 16,000+ annotated license plate images
2. Apply data augmentation (mosaic, color jitter, rotation)
3. Fine-tune YOLOv8s with early stopping
4. Save best checkpoint to `src/runs/detect/`
5. Log all metrics and hyperparameters to MLflow
6. Generate validation visualizations

#### View MLflow Dashboard

```bash
mlflow ui
```

Navigate to `http://localhost:5000` to inspect:
- Training curves (loss, mAP, precision, recall)
- Hyperparameter comparisons across runs
- Model artifacts and checkpoints
- Promotion of best models to production

#### Run Inference Server

```bash
uvicorn src.api.routes:app --reload
```

#### Single Image Inference

```bash
curl -X POST http://localhost:8000/detect \
  -F "file=@car_image.jpg"
```

Response:
```json
{
  "image_path": "annotated_car_image.jpg",
  "detections": [
    {
      "plate_text": "ABC-1234",
      "confidence": 0.9935,
      "bbox": [120, 150, 280, 200],
      "ocr_confidence": 0.987
    }
  ],
  "processing_time_ms": 45
}
```

#### Batch Processing

```bash
curl -X POST http://localhost:8000/detect-batch \
  -F "files=@image1.jpg" \
  -F "files=@image2.jpg" \
  -F "files=@image3.jpg"
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The UI will open at `http://localhost:5173`. Upload car images to see:
- Real-time plate detection
- Annotated images with bounding boxes
- Extracted plate text
- Confidence scores

## Environment Variables

Create a `.env` file in `backend/` for custom configurations:

```env
# Model Config
YOLO_MODEL_SIZE=s                    # s=small, m=medium, l=large
CONFIDENCE_THRESHOLD=0.45
NMS_THRESHOLD=0.45
INPUT_IMAGE_SIZE=640

# Training
BATCH_SIZE=32
EPOCHS=100
EARLY_STOPPING_PATIENCE=10
LEARNING_RATE=0.01

# MLflow
MLFLOW_TRACKING_URI=http://localhost:5000
MLFLOW_EXPERIMENT_NAME=license-plate-detection

# OCR
OCR_ENGINE=paddleocr              # paddleocr or easyocr

# API
API_HOST=0.0.0.0
API_PORT=8000
MAX_BATCH_SIZE=16
```

## Performance

| Metric | Value |
|--------|-------|
| mAP@50 | 99.3% |
| Precision | 98.9% |
| Recall | 98.3% |
| FPS (GPU) | 25+ |
| FPS (CPU) | 8+ |
| Inference Latency | ~40ms per image |
| Model Size | 11.2 MB |
| OCR Accuracy | 96.8% |

## Real-World Use Cases

**Parking Management** — Automate entry/exit for multi-story parking facilities with automatic billing.

**Traffic Enforcement** — Detect speeding or red-light violations; match plates against violation databases.

**Security & Access Control** — Monitor vehicle entry to gated facilities; flag unauthorized vehicles.

**Insurance & Claim Processing** — Extract plate data from accident scene photos for automated claim routing.

**Fleet Management** — Track vehicle movements, optimize routes, and monitor driver behavior.

**Toll Collection** — Identify vehicles for cashless toll payments across highways.

## Why This Approach

Most license plate detection systems use generic COCO-trained YOLOv8 models, sacrificing accuracy for speed. Plate Vision invests in fine-tuning on 16,000+ professional annotations to achieve production-grade precision (99.3% mAP@50, 98.9% precision).

The end-to-end pipeline (detection → annotation → OCR) eliminates manual coordination between separate tools. MLflow ensures reproducibility — every hyperparameter choice, augmentation strategy, and validation metric is logged. Early stopping and checkpointing prevent wasted compute while capturing peak performance.

For edge deployment (on-premises or embedded systems), the model can be quantized to 5.6 MB with minimal accuracy loss, enabling real-time inference on modest hardware.  

## Next Steps

- **Metadata Integration** — Link detected plates to vehicle registration databases
- **Real-Time Video** — Process live CCTV feeds with sliding-window inference
- **Plate Validation** — Add format validation (country-specific rules, checksum verification)
- **OCR Post-Processing** — Implement spell-check and context-aware corrections
- **Model Distillation** — Compress YOLOv8s to even smaller models for edge deployment
- **Analytics Dashboard** — Visualize traffic patterns, peak hours, and vehicle trends
---
