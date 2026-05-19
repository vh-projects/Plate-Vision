import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const STATS = [
  { value: "99.2%", label: "Detection accuracy" },
  { value: "<200ms", label: "Processing time" },
  { value: "Multi-plate", label: "Per image" },
];

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="1" y="6" width="20" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="4.5" cy="6" r="1.5" fill="currentColor" opacity="0.35"/>
        <circle cx="17.5" cy="6" r="1.5" fill="currentColor" opacity="0.35"/>
        <rect x="5" y="9" width="12" height="4" rx="1" fill="currentColor" opacity="0.12"/>
        <line x1="7" y1="11" x2="15" y2="11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Precision Detection",
    desc: "Detects every license plate in an image — even in crowded parking lots with multiple vehicles.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <polyline points="11,6 11,11 14,14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Real-time Speed",
    desc: "Results in under 200ms. Upload an image and get annotated detections almost instantly.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 8l7-5 7 5v9a1 1 0 01-1 1H5a1 1 0 01-1-1V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <polyline points="9,17 9,12 13,12 13,17" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Confidence Scoring",
    desc: "Each detection comes with a bounding box and confidence score so you know exactly how sure the model is.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="12" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="12" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="12" y="12" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: "OCR Extraction",
    desc: "Coming soon — automatically extract and return the alphanumeric text from each detected plate.",
  },
];

export default function Home() {
  return (
    <main className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg-grid" aria-hidden="true" />
        <div className="hero__inner">
          <div className="hero__badge animate-fade-up">
            <span className="hero__badge-dot" />
            AI-Powered · YOLOv8
          </div>

          <h1 className="hero__title animate-fade-up delay-1">
            Detect license plates
            <br />
            <em className="hero__title-em">with precision.</em>
          </h1>

          <p className="hero__subtitle animate-fade-up delay-2">
            Upload any traffic or parking image. PlateVision identifies every
            visible license plate — even across multiple vehicles — and returns
            annotated results in milliseconds.
          </p>

          <div className="hero__actions animate-fade-up delay-3">
            <Link to="/detect" className="btn btn--primary">
              Open Detector
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/how-it-works" className="btn btn--ghost">
              How it works
            </Link>
          </div>

          {/* Stats */}
          <div className="hero__stats animate-fade-up delay-4">
            {STATS.map((s, i) => (
              <div key={i} className="hero__stat">
                <span className="hero__stat-value">{s.value}</span>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual demo card */}
        <div className="hero__visual animate-fade-up delay-3">
          <DemoCard />
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="features__inner">
          <div className="section-label animate-fade-up">Capabilities</div>
          <h2 className="section-title animate-fade-up delay-1">
            Everything you need
          </h2>
          <div className="features__grid">
            {FEATURES.map((f, i) => (
              <div key={i} className={`feature-card animate-fade-up delay-${i + 1}`}>
                <div className="feature-card__icon">{f.icon}</div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-section__inner animate-fade-up">
          <h2 className="cta-section__title">Ready to try it?</h2>
          <p className="cta-section__sub">
            No sign-up. Just upload an image and see it in action.
          </p>
          <Link to="/detect" className="btn btn--primary btn--lg">
            Launch Detector
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}

function DemoCard() {
  return (
    <div className="demo-card">
      <div className="demo-card__header">
        <div className="demo-card__dots">
          <span /><span /><span />
        </div>
        <span className="demo-card__title-bar">PlateVision — Detector</span>
      </div>
      <div className="demo-card__body">
        <div className="demo-car">
          <svg viewBox="0 0 280 160" width="280" height="160" fill="none" style={{animation:"float 3s ease-in-out infinite"}}>
            {/* Car silhouette */}
            <path d="M30 110 Q32 100 45 95 L80 85 Q100 60 140 58 Q180 60 200 85 L235 95 Q248 100 250 110 L250 125 Q250 130 245 130 L35 130 Q30 130 30 125 Z" fill="var(--bg-muted)" stroke="var(--border-md)" strokeWidth="1.2"/>
            {/* Cabin */}
            <path d="M85 95 Q102 68 140 66 Q178 68 195 95 Z" fill="var(--bg-surface)" stroke="var(--border-md)" strokeWidth="1"/>
            {/* Windows */}
            <path d="M95 93 Q108 74 132 72 L132 93 Z" fill="var(--accent-light)" opacity="0.7"/>
            <path d="M148 72 Q172 74 185 93 L148 93 Z" fill="var(--accent-light)" opacity="0.7"/>
            {/* Wheels */}
            <circle cx="78" cy="130" r="18" fill="var(--text-primary)" opacity="0.85"/>
            <circle cx="78" cy="130" r="10" fill="var(--bg-muted)"/>
            <circle cx="202" cy="130" r="18" fill="var(--text-primary)" opacity="0.85"/>
            <circle cx="202" cy="130" r="10" fill="var(--bg-muted)"/>
            {/* Plate */}
            <rect x="110" y="116" width="60" height="18" rx="3" fill="var(--bg-surface)" stroke="var(--border-md)" strokeWidth="1"/>
            <text x="140" y="128.5" textAnchor="middle" fontSize="8" fontFamily="DM Mono, monospace" fill="var(--text-primary)" fontWeight="500">GJ 01 AB 1234</text>
            {/* Detection box corners */}
            <g stroke="var(--accent)" strokeWidth="2" strokeLinecap="round">
              <line x1="104" y1="112" x2="104" y2="118" className="corner-draw"/>
              <line x1="104" y1="112" x2="110" y2="112" className="corner-draw"/>
              <line x1="176" y1="112" x2="170" y2="112" className="corner-draw"/>
              <line x1="176" y1="112" x2="176" y2="118" className="corner-draw"/>
              <line x1="104" y1="138" x2="104" y2="132" className="corner-draw"/>
              <line x1="104" y1="138" x2="110" y2="138" className="corner-draw"/>
              <line x1="176" y1="138" x2="170" y2="138" className="corner-draw"/>
              <line x1="176" y1="138" x2="176" y2="132" className="corner-draw"/>
            </g>
          </svg>
        </div>

        <div className="demo-card__result">
          <div className="demo-result-row">
            <div className="demo-result-pill">
              <span className="demo-result-pill__dot" />
              Plate detected
            </div>
            <span className="demo-result-conf">98.4%</span>
          </div>
          <div className="demo-result-plate">
            <span className="demo-plate-text">GJ 01 AB 1234</span>
          </div>
        </div>
      </div>
    </div>
  );
}
