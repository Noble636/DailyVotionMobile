import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Removed: import "../../css/Admin/Managefeedback.css";
import AdminTopBar from "./AdminTopBar";

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
        <div
            className="managefeedback-container"
            style={{
                backgroundImage: "url('/JTVCF/for%20background%20picture/AdminDashboard.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
            }}
        >
            <style>{`
.managefeedback-container {
  min-height: 100vh;
  background: #f7f9fc;
  font-family: 'Segoe UI', Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
}

.managefeedback-topbar {
  background-color: #008b8b;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  width: 100vw;
  left: 0;
  right: 0;
  box-sizing: border-box;
  margin: 0;
  position: relative;
}

.managefeedback-logo {
  color: white;
  font-weight: bold;
  font-size: 20px;
}

.managefeedback-menu-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  margin-left: auto;
  display: flex;
  align-items: center;
}

.managefeedback-menu-icon {
  display: block;
  width: 28px;
  height: 4px;
  background: #fff;
  border-radius: 2px;
  position: relative;
}

.managefeedback-menu-icon span {
  position: absolute;
  left: 0;
  width: 28px;
  height: 4px;
  background: #fff;
  border-radius: 2px;
}

.managefeedback-menu-icon span:first-child {
  top: -8px;
}

.managefeedback-menu-icon span:last-child {
  top: 8px;
}

.managefeedback-dropdown-menu {
  position: absolute;
  top: 54px;
  right: 32px;
  background: #008b8b;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 139, 139, 0.18);
  z-index: 100;
  min-width: 180px;
}

.managefeedback-dropdown-menu ul {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.managefeedback-link-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  text-align: left;
  padding: 10px 16px;
  border-radius: 6px;
  margin: 2px 0;
  transition: background 0.2s, text-shadow 0.2s, text-decoration 0.2s;
}

.managefeedback-link-btn:hover {
  background: #006d6d;
  text-decoration: underline;
  text-shadow: 0 0 8px #fff, 0 0 16px #008b8b;
}

.managefeedback-list {
  background: rgba(255, 255, 255, 0.55);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 139, 139, 0.13), 0 2px 8px rgba(44, 62, 80, 0.10);
  padding: 2rem 1.5rem;
  min-width: 340px;
  max-width: 440px;
  border: 2px solid #fff;
  margin: 0 auto 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.managefeedback-item {
  background: #e0f7fa;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 139, 139, 0.07);
  border: 2px solid #008b8b;
  padding: 0.7rem 1rem;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.managefeedback-user {
  font-weight: 600;
  color: #003c3c;
}

.managefeedback-text {
  color: #07484a;
}

.managefeedback-date {
  font-size: 0.92rem;
  color: #667777;
  opacity: 0.95;
}

.managefeedback-container > .topbar-container {
  align-self: stretch !important;
  width: 100vw !important;
  max-width: 100vw !important;
  margin: 0 !important;
  left: 0 !important;
  right: 0 !important;
  position: relative !important;
  box-sizing: border-box !important;
  border-radius: 0 !important;
}

.managefeedback-title {
  color: #fff !important;
  font-size: 2.3rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 2px 8px #008b8b, 0 0 12px #2d3e50, 0 0 2px #fff;
  margin: 2rem 0 1rem 0;
  letter-spacing: 1px;
  -webkit-text-stroke: 1px #fff;
}
            `}</style>
            <AdminTopBar
                menuItems={[
                    { label: "Dashboard", link: "/admindashboard" },
                    { label: "Logout", link: "/" },
                    { label: "About", link: "/about" },
                ]}
            />
            <div className="managefeedback-main">
                <h1 className="managefeedback-title">User Feedback & Reports</h1>
                <div className="managefeedback-list">
                    {loading ? (
                        <div style={{ color: '#888', padding: '1rem' }}>Loading feedback...</div>
                    ) : feedbackList.length === 0 ? (
                        <div style={{ color: '#888', padding: '1rem' }}>No feedback submitted yet.</div>
                    ) : (
                        feedbackList.map((fb, idx) => (
                            <div className="managefeedback-item" key={idx}>
                                <div className="managefeedback-text">{fb.text}</div>
                                <div className="managefeedback-date">{fb.date}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Managefeedback;
