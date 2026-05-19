# main.py

from fastapi import FastAPI, UploadFile, File
import shutil
import os
from src.services.inference import detect_license_plate
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
UPLOAD_DIR = os.path.join(BASE_DIR, "temp")

os.makedirs(UPLOAD_DIR, exist_ok=True)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.mount("/temp", StaticFiles(directory=UPLOAD_DIR), name="temp")

@app.post("/detect")
async def detect(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    # Save uploaded file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Run inference
    detections, output_path = detect_license_plate(file_path)

    # return ONLY filename
    output_filename = os.path.basename(output_path)

    return {
        "filename": file.filename,
        "detections": detections,
        "output_image": output_filename
    }