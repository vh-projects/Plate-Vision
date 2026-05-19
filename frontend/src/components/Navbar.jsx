import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../App";
import "./Navbar.css";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="1" y="5" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="4" y="8" width="12" height="4" rx="1" fill="currentColor" opacity="0.15"/>
              <text x="10" y="11.5" textAnchor="middle" fontSize="4" fontFamily="DM Mono, monospace" fill="currentColor" fontWeight="500">ABC·123</text>
              <circle cx="4.5" cy="5" r="1.2" fill="currentColor" opacity="0.4"/>
              <circle cx="15.5" cy="5" r="1.2" fill="currentColor" opacity="0.4"/>
            </svg>
          </span>
          <span className="navbar__logo-text">PlateVision</span>
        </Link>

        <div className="navbar__links">
          <Link to="/" className={`navbar__link ${location.pathname === "/" ? "navbar__link--active" : ""}`}>
            Home
          </Link>
          <Link to="/detect" className={`navbar__link ${location.pathname === "/detect" ? "navbar__link--active" : ""}`}>
            Detector
          </Link>
          <Link to="/how-it-works" className={`navbar__link ${location.pathname === "/how-it-works" ? "navbar__link--active" : ""}`}>
            How It Works
          </Link>
        </div>

        <div className="navbar__actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === "light" ? "Switch to dark" : "Switch to light"}
          >
            {theme === "light" ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4"/>
                <line x1="8" y1="1" x2="8" y2="2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="8" y1="13.5" x2="8" y2="15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="1" y1="8" x2="2.5" y2="8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="13.5" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="3.05" y1="3.05" x2="4.1" y2="4.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="11.9" y1="11.9" x2="12.95" y2="12.95" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="12.95" y1="3.05" x2="11.9" y2="4.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="4.1" y1="11.9" x2="3.05" y2="12.95" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 9.5A6 6 0 0 1 6.5 2.5a6 6 0 1 0 7 7z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>

          <Link to="/detect" className="navbar__cta">
            Try Detector
          </Link>
        </div>
      </div>
    </nav>
  );
}
