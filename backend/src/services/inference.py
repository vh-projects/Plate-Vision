# inference.py

from ultralytics import YOLO
import os
import cv2
import numpy as np
import easyocr
from fast_plate_ocr import LicensePlateRecognizer

# ── Init ──────────────────────────────────────────────────────────────────────
MODEL_PATH = os.path.join("src", "models", "best.pt")
model = YOLO(MODEL_PATH)

ocr= LicensePlateRecognizer("cct-s-v2-global-model")

CONF_THRESHOLD = 0.255
PLATE_ALLOWLIST = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 '


# ── Main ──────────────────────────────────────────────────────────────────────
def detect_license_plate(image_path: str):
    results = model(image_path)
    image = cv2.imread(image_path)
    h_img, w_img = image.shape[:2]

    detections = []

    for result in results:
        for box in result.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
            conf = float(box.conf[0])

            if conf < CONF_THRESHOLD:
                continue

            # Small margin to avoid clipping plate edges
            margin = 4
            cx1 = max(0, x1 - margin)
            cy1 = max(0, y1 - margin)
            cx2 = min(w_img, x2 + margin)
            cy2 = min(h_img, y2 + margin)

            plate_crop = image[cy1:cy2, cx1:cx2]
            # versions = preprocess_plate(plate_crop)
            # plate_text, ocr_conf = run_ocr_on_versions(versions)



            # fast-plate-ocr expects BGR numpy array — no preprocessing needed
            result_ocr = ocr.run(plate_crop)

            # run() returns a list of predictions, one per image — take first
            plate_text = result_ocr[0].plate if result_ocr else ""
            
            
            # Draw bounding box
            cv2.rectangle(image, (x1, y1), (x2, y2), (255, 218, 105), 2)

            label = f"{plate_text} ({round(conf, 2)})" if plate_text else f"({round(conf, 2)})"
            (lw, lh), baseline = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.55, 2)


            detections.append({
                "bbox": {"x1": x1, "y1": y1, "x2": x2, "y2": y2},
                "confidence": round(conf, 3),
                "text": plate_text,
                # "ocr_confidence": round(ocr_conf, 3) if ocr_conf else None,
            })

    name, ext = os.path.splitext(image_path)
    output_path = f"{name}_output{ext}"
    cv2.imwrite(output_path, image)

    return detections, output_path

