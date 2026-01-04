import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Removed: import "../../css/Admin/Managefeedback.css";


function Managefeedback() {
    const [feedbackList, setFeedbackList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://dailyvotionbackend-91wt.onrender.com/api/admin/feedback')
            .then(res => res.json())
            .then(data => {
                setFeedbackList(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="managefeedback-container">
            <style>{`
.managefeedback-back-btn {
  position: fixed;
  top: 90px;
  right: 20px;
  z-index: 100;
  background: #2c5aa0;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

.managefeedback-back-btn:active {
  transform: scale(0.95);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.managefeedback-container {
  min-height: 100vh;
  background: #f0f4f8;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  color: #1a1a1a;
}

.managefeedback-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 0.75rem;
  padding-top: 100px;
  padding-bottom: 80px;
  box-sizing: border-box;
}

.managefeedback-title {
  color: #1a3a52;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin: 0.75rem 0 1rem 0;
  letter-spacing: 0.3px;
  padding-top: 0.5rem;
  display: block;
  visibility: visible;
  opacity: 1;
  z-index: 10;
  position: relative;
}

.managefeedback-list {
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  box-sizing: border-box;
}

.managefeedback-item {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #d0d7de;
  border-left: 4px solid #2c5aa0;
  padding: 1rem;
  font-size: 0.95rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  word-break: break-word;
  box-sizing: border-box;
  width: 100%;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}

.managefeedback-item:active {
  transform: scale(0.98);
  box-shadow: 0 4px 12px rgba(44, 90, 160, 0.15);
}

.managefeedback-user {
  font-weight: 700;
  color: #1a1a1a;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.managefeedback-text {
  color: #2d2d2d;
  line-height: 1.5;
  font-size: 0.9rem;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 6px;
}

.managefeedback-date {
  font-size: 0.8rem;
  color: #4d4d4d;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.managefeedback-empty-state {
  text-align: center;
  padding: 3rem 1.5rem;
  color: #4d4d4d;
}

.managefeedback-empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.managefeedback-loading {
  text-align: center;
  padding: 2rem;
  color: #4d4d4d;
}

.managefeedback-loading-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}
            `}</style>

            <button
              className="editprofile-back-btn"
              style={{
                position: "fixed",
                top: 16,
                right: 16,
                background: "linear-gradient(135deg, #0b62d6 0%, #044a9f 100%)",
                color: "#ffffff",
                border: "none",
                padding: "0.7rem 1.2rem",
                borderRadius: 12,
                fontSize: "1rem",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(11, 98, 214, 0.25)",
                transition: "all 0.2s ease",
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                minHeight: 44,
                touchAction: "manipulation"
              }}
              onClick={() => navigate("/admindashboard")}
              aria-label="Go back"
            >
              <svg className="editprofile-back-arrow" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="#fff"/>
              </svg>
              Back
            </button>

            <div className="managefeedback-main">
                <h1 className="managefeedback-title" style={{ marginTop: 60 }}>💬 User Feedback & Reports</h1>
                <div className="managefeedback-list">
                    {loading ? (
                        <div className="managefeedback-loading">
                            <div className="managefeedback-loading-icon">⏳</div>
                            <p>Loading feedback...</p>
                        </div>
                    ) : feedbackList.length === 0 ? (
                        <div className="managefeedback-empty-state">
                            <div className="managefeedback-empty-icon">📭</div>
                            <p style={{ fontSize: "0.95rem", lineHeight: "1.5" }}>No feedback submitted yet.</p>
                        </div>
                    ) : (
                        feedbackList.map((fb, idx) => (
                            <div className="managefeedback-item" key={idx}>
                                <div className="managefeedback-text">
                                    <strong style={{ color: "#1a3a52", display: "block", marginBottom: "0.35rem" }}>📝 Feedback:</strong>
                                    {fb.text}
                                </div>
                                <div className="managefeedback-date">
                                    <span>🕒</span>
                                    <span>{new Date(fb.date).toLocaleString()}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Managefeedback;
