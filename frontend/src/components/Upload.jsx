//  Upload.jsx

import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://127.0.0.1:8000/detect", formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚗 License Plate Detector</h1>

      <div style={styles.card}>
        <input type="file" onChange={handleFileChange} />

        {preview && (
          <img src={preview} alt="preview" style={styles.preview} />
        )}

        <button onClick={handleUpload} style={styles.button}>
          {loading ? "Processing..." : "Upload & Detect"}
        </button>
      </div>

      {result && (
        <div style={styles.results}>
          <h2>Detections</h2>

          <div style={styles.grid}>
            {result.detections.map((det, i) => (
              <div key={i} style={styles.box}>
                <p><strong>Confidence:</strong> {det.confidence}</p>
                <p>
                  ({det.bbox.x1}, {det.bbox.y1}) → ({det.bbox.x2}, {det.bbox.y2})
                </p>
              </div>
            ))}
          </div>

          <h2>Output</h2>
          <img
            src={`http://127.0.0.1:8000/temp/${result.output_image}`}
            alt="result"
            style={styles.output}
          />
        </div>
      )}
    </div>
  );
};

export default Upload;

const styles = {
  container: {
    maxWidth: "900px",
    margin: "auto",
    padding: "20px",
    textAlign: "center",
    fontFamily: "Arial"
  },
  title: {
    marginBottom: "20px"
  },
  card: {
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    marginBottom: "20px"
  },
  preview: {
    width: "300px",
    marginTop: "10px",
    borderRadius: "8px"
  },
  button: {
    marginTop: "15px",
    padding: "10px 20px",
    border: "none",
    background: "#007bff",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer"
  },
  results: {
    marginTop: "30px"
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center"
  },
  box: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    minWidth: "150px"
  },
  output: {
    marginTop: "20px",
    width: "400px",
    borderRadius: "10px"
  }
};