// Detector.jsx

import React, { useState, useRef, useCallback } from "react";
import axios from "axios";
import "./Detector.css";

const API = "http://127.0.0.1:8000";

export default function Detector() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [zoomSrc, setZoomSrc] = useState(null);

  const fileInputRef = useRef();

  const selectFile = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setError(null);
  };

  const handleChange = (e) => selectFile(e.target.files[0]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    selectFile(e.dataTransfer.files[0]);
  }, []);

  const handleDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);

  const handleDetect = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await axios.post(`${API}/detect`, fd);
      setResult(res.data);
    } catch (e) {
      setError("Detection failed. Make sure the backend is running.");
    }
    setLoading(false);
  };

  const reset = () => {
    setFile(null); setPreview(null); setResult(null); setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <main className="detector">
      <div className="detector__inner">

        {/* Header */}
        <div className="detector__header animate-fade-up">
          <div className="section-label-sm">Detector</div>
          <h1 className="detector__title">License Plate Detection</h1>
          <p className="detector__subtitle">
            Upload an image with one or more vehicles. Every visible plate will be detected.
          </p>
        </div>

        {/* ── Row 1: Upload + Output side by side ── */}
        <div className="images-row">

          {/* Upload panel */}
          <div className="panel animate-fade-up delay-1">
            <div className="panel__head">
              <span className="panel__step">01</span>
              <span className="panel__step-label">Upload Image</span>
            </div>

            <div
              className={`dropzone ${dragOver ? "dropzone--over" : ""} ${preview ? "dropzone--has-image" : ""}`}
              onClick={() => !preview && fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {preview ? (
                <div className="dropzone__preview">
                  <img src={preview} alt="Selected" className="dropzone__img"
                    style={{ cursor: "zoom-in" }}
                    onClick={(e) => { e.stopPropagation(); setZoomSrc(preview); }} />

                  <button className="dropzone__clear" onClick={(e) => { e.stopPropagation(); reset(); }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="dropzone__empty">
                  <div className="dropzone__icon">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <rect x="2" y="2" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
                      <polyline points="14,9 14,18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <polyline points="10,13 14,9 18,13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="dropzone__text">Drop image here</p>
                  <p className="dropzone__sub">or click to browse · JPG, PNG, WEBP</p>
                </div>
              )}
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleChange} style={{ display: "none" }} />

            {file && (
              <div className="file-info animate-fade-up">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="2" y="1" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                  <line x1="5" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="5" y1="7.5" x2="9" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span className="file-info__name">{file.name}</span>
                <span className="file-info__size">{(file.size / 1024).toFixed(1)} KB</span>
              </div>
            )}

            {error && (
              <div className="error-banner animate-fade-up">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3" />
                  <line x1="7" y1="4.5" x2="7" y2="7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  <circle cx="7" cy="9.5" r="0.7" fill="currentColor" />
                </svg>
                {error}
              </div>
            )}

            <button
              className={`detect-btn ${loading ? "detect-btn--loading" : ""}`}
              onClick={handleDetect}
              disabled={!file || loading}
            >
              {loading ? (
                <>
                  <span className="detect-btn__dots"><span /><span /><span /></span>
                  Analyzing
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
                    <circle cx="8" cy="8" r="2.5" fill="currentColor" />
                    <line x1="8" y1="1" x2="8" y2="3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    <line x1="8" y1="13" x2="8" y2="15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    <line x1="1" y1="8" x2="3" y2="8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    <line x1="13" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  Run Detection
                </>
              )}
            </button>
          </div>

          {/* Output panel */}
          <div className="panel animate-fade-up delay-2">
            <div className="panel__head">
              <span className="panel__step">02</span>
              <span className="panel__step-label">Annotated Output</span>
              {result && (
                <a href={`${API}/temp/${result.output_image}`} download className="panel__download">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M6.5 2v7M4 7l2.5 2.5L9 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 11h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  Save
                </a>
              )}
            </div>

            {!result && !loading && (
              <div className="output-empty">
                <div className="scanner-frame">
                  <svg width="100" height="70" viewBox="0 0 100 70" fill="none">
                    <rect x="8" y="8" width="84" height="54" rx="3" stroke="var(--border-md)" strokeWidth="1.2" strokeDasharray="4 3" />
                    <rect x="25" y="26" width="50" height="18" rx="2" stroke="var(--border)" strokeWidth="1" />
                  </svg>
                  <div className="scanner-line" />
                </div>
                <p className="output-empty__text">Output will appear here</p>
                <p className="output-empty__sub">Run detection to see annotated result</p>
              </div>
            )}

            {loading && (
              <div className="output-loading">
                <div className="loading-skel-img" />
                <p className="loading-text">Processing image…</p>
              </div>
            )}

            {result && (
              <div className="output-image-wrap animate-fade-up">
                <img
                  src={`${API}/temp/${result.output_image}`}
                  alt="Detection result"
                  className="output-image"
                  style={{ cursor: "zoom-in" }}
                  onClick={() => setZoomSrc(`${API}/temp/${result.output_image}`)}
                />
              </div>
            )}
          </div>
        </div>

        {/* ── Row 2: Detected Plates ── */}
        {(result || loading) && (
          <div className="plates-section animate-fade-up">
            <div className="plates-section__head">
              <div className="plates-section__title">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <rect x="1" y="4" width="13" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                  <rect x="3.5" y="6" width="8" height="3" rx="0.8" fill="currentColor" opacity="0.15" />
                  <line x1="5" y1="7.5" x2="10" y2="7.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                </svg>
                Detected Plates
              </div>
              {result && (
                <span className="plates-section__count">
                  {result.detections.length} plate{result.detections.length !== 1 ? "s" : ""} found
                </span>
              )}
            </div>

            {loading && (
              <div className="plates-loading">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="plate-card-skel" style={{ animationDelay: `${i * 0.12}s` }} />
                ))}
              </div>
            )}

            {result && (
              <div className="plates-grid">
                {result.detections.map((det, i) => (
                  <PlateCard key={i} det={det} index={i} />
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {zoomSrc && (
        <div className="zoom-overlay" onClick={() => setZoomSrc(null)}>
          <button className="zoom-close" onClick={() => setZoomSrc(null)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <img
            src={zoomSrc}
            alt="Zoomed"
            className="zoom-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </main>
  );
}

function PlateCard({ det, index }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(det.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const pct = Math.round(det.confidence * 100);
  const confCls = pct >= 85 ? "high" : pct >= 65 ? "mid" : "low";

  return (
    <div className="plate-card">
      {/* Index + confidence */}
      <div className="plate-card__top">
        <span className="plate-card__index">{String(index + 1).padStart(2, "0")}</span>
        <span className={`conf-pill conf-pill--${confCls}`}>{pct}%</span>
      </div>

      {/* Plate display */}
      <div className="plate-card__plate">
        {det.text ? (
          <span className="plate-card__text">{det.text}</span>
        ) : (
          <span className="plate-card__unreadable">Unreadable</span>
        )}
      </div>

      {/* Coords + copy */}
      <div className="plate-card__footer">
        <span className="plate-card__coords">
          {det.bbox.x1}, {det.bbox.y1} → {det.bbox.x2}, {det.bbox.y2}
        </span>
        {det.text && (
          <button className={`plate-card__copy ${copied ? "plate-card__copy--done" : ""}`} onClick={handleCopy}>
            {copied ? (
              <>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <polyline points="2,6 5,9 10,3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="4" y="1" width="7" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="1" y="3" width="7" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.2" fill="var(--bg-muted)" />
                </svg>
                Copy
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function ConfidencePill({ value }) {
  const pct = Math.round(value * 100);
  const cls = pct >= 85 ? "high" : pct >= 65 ? "mid" : "low";
  return <span className={`conf-pill conf-pill--${cls}`}>{pct}%</span>;
}