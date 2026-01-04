import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function PrayerHistoryPopup({ onClose, history }) {
    return (
        <div className="manageprayer-popup-overlay">
            <div className="manageprayer-popup-box">
                <button
                    style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        background: "none",
                        border: "none",
                        fontSize: "1.5rem",
                        color: "#d32f2f",
                        cursor: "pointer",
                        fontWeight: "bold",
                        minWidth: "44px",
                        minHeight: "44px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0.25rem 0.5rem",
                    }}
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>
                <h2 style={{ color: "#1a1a1a", marginBottom: "1rem", fontSize: "1.35rem", paddingRight: "2.5rem" }}>Prayer Request History</h2>
                <ul style={{ maxHeight: "55vh", overflowY: "auto", padding: 0, margin: 0, listStyle: "none" }}>
                    {history.length === 0 ? (
                        <li style={{ color: '#888', padding: '1.5rem', textAlign: 'center' }}>No responses yet</li>
                    ) : (
                        history.map((item) => (
                            <li
                                key={item.id}
                                style={{
                                    marginBottom: "0.85rem",
                                    padding: "0.85rem",
                                    borderRadius: "10px",
                                    background: "#f8f9fa",
                                    border: "1px solid #d0d7de",
                                    borderLeft: "4px solid #2c5aa0",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.65rem",
                                }}
                            >
                                <div style={{ fontWeight: 700, color: "#1a1a1a", fontSize: "1rem" }}>
                                    {item.user}
                                </div>
                                <div style={{ color: "#2d2d2d", fontSize: "0.9rem", lineHeight: "1.5", padding: "0.5rem", background: "#ffffff", borderRadius: "6px" }}>
                                    <strong style={{ color: "#1a3a52", display: "block", marginBottom: "0.35rem" }}>🙏 Prayer Request:</strong>
                                    {item.request}
                                </div>
                                <div style={{ color: "#2d2d2d", fontSize: "0.9rem", lineHeight: "1.5", padding: "0.5rem", background: "#e8f4fd", borderRadius: "6px" }}>
                                    <strong style={{ color: "#2c5aa0", display: "block", marginBottom: "0.35rem" }}>💬 Admin Response:</strong>
                                    {item.response}
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}

function ManagePrayer() {
    const [prayerRequests, setPrayerRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [responseText, setResponseText] = useState("");
    const [status, setStatus] = useState("");
    const [showHistory, setShowHistory] = useState(false);
    const [activeTab, setActiveTab] = useState("requests");
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://dailyvotionbackend-91wt.onrender.com/api/admin/prayer')
            .then(res => res.json())
            .then(data => setPrayerRequests(data));
    }, []);

    const handleSelectRequest = (id) => {
        setSelectedRequest(id);
        setResponseText("");
        setStatus("");
    };

    const handleRespond = async (e) => {
        e.preventDefault();
        if (selectedRequest && responseText.trim()) {
            try {
                const res = await fetch(`https://dailyvotionbackend-91wt.onrender.com/api/admin/prayer/${selectedRequest}/respond`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ response: responseText })
                });
                const data = await res.json();
                if (res.ok) {
                    setPrayerRequests(prayerRequests.map(p => p.id === selectedRequest ? data.prayer : p));
                    setStatus('Response sent!');
                    setResponseText("");
                } else {
                    setStatus(data.error || 'Failed to send response.');
                }
            } catch (err) {
                setStatus('Server error. Please try again later.');
            }
        } else {
            setStatus("Please select a request and enter a response.");
        }
    };

    return (
        <div className="manageprayer-container">
            <style>{`
.manageprayer-back-btn {
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

.manageprayer-back-btn:active {
  transform: scale(0.95);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.manageprayer-container {
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
  background: #f0f4f8;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  color: #1a1a1a;
}

.manageprayer-main {
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

.manageprayer-title {
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

.manageprayer-mobile-tabs {
  display: flex;
  gap: 0.5rem;
  margin: 0.75rem 0;
  padding: 0;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
}

.manageprayer-tab-btn {
  flex: 1;
  padding: 1rem;
  border: none;
  background: #ffffff;
  color: #4d4d4d;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 3px solid transparent;
}

.manageprayer-tab-btn.active {
  color: #2c5aa0;
  background: #f0f7ff;
  border-bottom-color: #2c5aa0;
}

.manageprayer-tab-btn:active {
  transform: scale(0.98);
}

.manageprayer-sections {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
}

.manageprayer-tab-content {
  display: none;
}

.manageprayer-tab-content.active {
  display: block;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.manageprayer-requests,
.manageprayer-response {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 1rem;
  width: 100%;
  border: 1px solid #d0d7de;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.manageprayer-requests h2,
.manageprayer-response h2 {
  color: #1a1a1a;
  margin: 0 0 0.85rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.manageprayer-requests ul {
  overflow-y: auto;
  max-height: 400px;
  padding: 0;
  list-style: none;
  margin: 0;
}

.manageprayer-hint {
  color: #4d4d4d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 3px solid #2c5aa0;
}

.manageprayer-request-item {
  background: #f8f9fa;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  border-left: 4px solid #2c5aa0;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  padding: 0.85rem;
  transition: all 0.2s ease;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.manageprayer-request-item:active {
  transform: scale(0.98);
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(44, 90, 160, 0.15);
}

.manageprayer-request-item.selected {
  border-left: 4px solid #3d7bb8;
  background: #e8f4fd;
  box-shadow: 0 2px 8px rgba(44, 90, 160, 0.12);
}

.manageprayer-response-textarea {
  width: 100%;
  box-sizing: border-box;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.85rem;
  border-radius: 10px;
  border: 2px solid #d0d7de;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  background: #ffffff;
  color: #1a1a1a;
  transition: border-color 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.5;
}

.manageprayer-response-textarea:focus {
  outline: none;
  border-color: #2c5aa0;
  box-shadow: 0 0 0 3px rgba(44, 90, 160, 0.1);
}

.manageprayer-response-textarea:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.manageprayer-btn {
  background: #2c5aa0;
  color: #ffffff;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(44, 90, 160, 0.25);
  -webkit-tap-highlight-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 50px;
}

.manageprayer-btn:active {
  transform: scale(0.98);
  background: #1a3a52;
}

.manageprayer-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  opacity: 0.6;
}

.manageprayer-btn-secondary {
  background: #ffffff;
  color: #2c5aa0;
  border: 2px solid #2c5aa0;
}

.manageprayer-btn-secondary:active {
  background: #f0f7ff;
}

.manageprayer-status {
  margin-top: 1rem;
  padding: 0.75rem;
  color: #2c5aa0;
  font-weight: 600;
  text-align: center;
  background: #e8f4fd;
  border-radius: 8px;
  font-size: 0.95rem;
}

.manageprayer-btn-row {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  margin-top: 0.5rem;
}

.manageprayer-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
}

.manageprayer-popup-box {
  position: relative;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 1.25rem;
  width: 95%;
  max-width: 480px;
  color: #1a1a1a;
  font-size: 1rem;
  border: 1px solid #d0d7de;
  max-height: 85vh;
  overflow-y: auto;
  box-sizing: border-box;
}

.manageprayer-section-icon {
  font-size: 1.3rem;
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

            <div className="manageprayer-main">
                <h1 className="manageprayer-title" style={{ marginTop: 60 }}>Manage Prayer Requests</h1>
                
                {/* Mobile Tabs */}
                <div className="manageprayer-mobile-tabs">
                    <button 
                        className={`manageprayer-tab-btn ${activeTab === "requests" ? "active" : ""}`}
                        onClick={() => setActiveTab("requests")}
                    >
                        🙏 Prayer Requests
                    </button>
                    <button 
                        className={`manageprayer-tab-btn ${activeTab === "respond" ? "active" : ""}`}
                        onClick={() => setActiveTab("respond")}
                    >
                        💬 Respond
                    </button>
                </div>
                
                <div className="manageprayer-sections">
                    {/* Requests Tab */}
                    <div className={`manageprayer-tab-content ${activeTab === "requests" ? "active" : ""}`}>
                        <div className="manageprayer-section manageprayer-requests box">
                            <h2><span className="manageprayer-section-icon">🙏</span>Prayer Requests</h2>
                            <div className="manageprayer-hint">
                                Prayer requests will be displayed here. Tap on a request to select it for responding.
                            </div>
                            <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                                {prayerRequests.length === 0 ? (
                                    <li style={{ color: '#888', padding: '2rem 1rem', textAlign: 'center', fontSize: '0.95rem' }}>No Prayer Requests Yet</li>
                                ) : (
                                    prayerRequests.filter(req => req.status !== 'responded').map((req) => (
                                        <li
                                            key={req.id}
                                            className={
                                                "manageprayer-request-item" +
                                                (selectedRequest === req.id ? " selected" : "")
                                            }
                                            onClick={() => {
                                                handleSelectRequest(req.id);
                                                setActiveTab("respond");
                                            }}
                                        >
                                            <strong style={{ fontSize: "0.95rem", display: "block", marginBottom: "0.35rem" }}>{(req.userName && req.userName.trim() !== "") ? req.userName : `User ID: ${req.userId}`}</strong>
                                            <span style={{ fontSize: "0.9rem", lineHeight: "1.5" }}>{req.text}</span>
                                            {req.status === 'responded' && (
                                                <span style={{ color: '#2c5aa0', marginLeft: 8, fontSize: "0.85rem" }}>✓ [Responded]</span>
                                            )}
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>
                    
                    {/* Respond Tab */}
                    <div className={`manageprayer-tab-content ${activeTab === "respond" ? "active" : ""}`}>
                        <div className="manageprayer-section manageprayer-response box">
                            <h2><span className="manageprayer-section-icon">💬</span>Respond to Request</h2>
                            <form className="manageprayer-response-form" onSubmit={handleRespond}>
                                <textarea
                                    className="manageprayer-response-textarea"
                                    value={responseText}
                                    onChange={e => setResponseText(e.target.value)}
                                    placeholder={selectedRequest ? "Type your prayer response here..." : "Select a request first from the Requests tab"}
                                    disabled={!selectedRequest}
                                />
                                <div className="manageprayer-btn-row">
                                    <button type="submit" className="manageprayer-btn" disabled={!selectedRequest}>
                                        📤 Send Response
                                    </button>
                                    <button
                                        type="button"
                                        className="manageprayer-btn manageprayer-btn-secondary"
                                        onClick={() => setShowHistory(true)}
                                    >
                                        📊 View History
                                    </button>
                                </div>
                            </form>
                            {status && <div className="manageprayer-status">{status}</div>}
                        </div>
                    </div>
                </div>
            </div>
            {showHistory && (
                <PrayerHistoryPopup
                    history={prayerRequests.filter(p => p.status === 'responded').map(p => ({
                        id: p.id,
                        user: (p.userName && p.userName.trim() !== "") ? p.userName : `User ID: ${p.userId}`,
                        request: p.text,
                        response: p.response
                    }))}
                    onClose={() => setShowHistory(false)}
                />
            )}
        </div>
    );
}

export default ManagePrayer;