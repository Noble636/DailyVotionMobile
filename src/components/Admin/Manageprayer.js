import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminTopBar from "./AdminTopBar";

function PrayerHistoryPopup({ onClose, history }) {
    return (
        <div className="manageprayer-popup-overlay">
            <div className="manageprayer-popup-box">
                <button
                    style={{
                        position: "absolute",
                        top: 12,
                        right: 18,
                        background: "none",
                        border: "none",
                        fontSize: "1.4rem",
                        color: "#d32f2f",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>
                <h2 style={{ color: "#008b8b", marginBottom: "1rem" }}>Prayer Request History</h2>
                <ul style={{ maxHeight: "60vh", overflowY: "auto", padding: 0, margin: 0 }}>
                    {history.map((item) => (
                        <li
                            key={item.id}
                            style={{
                                marginBottom: "1rem",
                                padding: "0.9rem",
                                borderRadius: "8px",
                                background: "#e0f7fa",
                                boxShadow: "0 2px 8px rgba(0,139,139,0.06)",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.45rem",
                            }}
                        >
                            <div style={{ fontWeight: 600, color: "#006d6d" }}>
                                <span>{item.user}</span>
                            </div>
                            <div style={{ color: "#07484a", fontSize: "0.96rem" }}>
                                <strong>Request:</strong> {item.request}
                            </div>
                            <div style={{ color: "#008b8b", fontSize: "0.96rem" }}>
                                <strong>Response:</strong> {item.response}
                            </div>
                        </li>
                    ))}
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
        <div
            className="manageprayer-container"
            style={{
                backgroundImage: "url('/JTVCF/for%20background%20picture/AdminDashboard.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh"
            }}
        >
            <style>{`
.admintopbar-container,
.admin-topbar,
.manageprayer-container>.admintopbar-container,
.manageprayer-container>.admin-topbar {
    background-color: transparent !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    padding: 12px 32px !important;
    box-sizing: border-box !important;
    position: relative !important;
    border-radius: 0 !important;
}

.admintopbar-container,
.admin-topbar {
    width: 100vw !important;
    max-width: 100vw !important;
    left: 0 !important;
    right: 0 !important;
    margin: 0 !important;
    position: relative !important;
    box-sizing: border-box !important;
    background: #008b8b !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    padding: 12px 32px !important;
    border-radius: 0 !important;
}

.manageprayer-topbar {
    background-color: transparent;
    padding: 24px 32px 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
}

.manageprayer-title {
    color: #fff !important;
    font-size: 2.3rem;
    font-weight: bold;
    text-align: center;
    text-shadow: 0 2px 8px #008b8b, 0 0 12px #2d3e50, 0 0 2px #fff;
    margin: 2rem 0 1rem 0;
    letter-spacing: 1px;
    -webkit-text-stroke: 1px #fff;
}

.manageprayer-container {
    min-height: 100vh;
    font-family: 'Segoe UI', Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    background: #f7f9fc;
}

.manageprayer-main {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 2.5rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    padding-top: 20px;
    width: 100%;
}

.manageprayer-requests,
.manageprayer-response {
    background: rgba(255, 255, 255, 0.55);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 139, 139, 0.13), 0 2px 8px rgba(44, 62, 80, 0.10);
    padding: 2rem 1.5rem;
    min-width: 340px;
    max-width: 440px;
    border: 2px solid #fff;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
}

.manageprayer-requests h2 {
    color: #2d3e50;
    margin-top: 0;
    margin-bottom: 1rem;
}

.manageprayer-requests ul {
    overflow-y: auto;
    max-height: 350px;
    padding-right: 8px;
    list-style: none;
    min-height: 300px;
}

.manageprayer-request-item {
    background: #e0f7fa;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 139, 139, 0.07);
    font-size: 1rem;
    border: 2px solid #008b8b;
    margin-bottom: 1.2rem;
    padding: 0.7rem 1rem;
    transition: box-shadow 0.2s, border-color 0.2s;
    cursor: pointer;
}

.manageprayer-request-item.selected,
.manageprayer-request-item:active {
    border: 2px solid #008b8b !important;
    box-shadow: 0 4px 16px rgba(0, 139, 139, 0.13);
    background: #b2ebf2;
}

.manageprayer-requests ul::-webkit-scrollbar {
    width: 8px;
}

.manageprayer-requests ul::-webkit-scrollbar-thumb {
    background: #008b8b;
    border-radius: 6px;
}

.manageprayer-response-textarea {
    background: rgba(255, 255, 255, 0.95);
    border: 1.5px solid #008b8b;
    border-radius: 6px;
    padding: 0.5rem;
    font-size: 1rem;
    min-height: 160px;
    resize: vertical;
    margin-top: 0.3rem;
    margin-bottom: 0.7rem;
    box-shadow: 0 1px 4px rgba(0, 139, 139, 0.06);
    width: 100%;
    box-sizing: border-box;
}

.manageprayer-btn {
    background: #008b8b;
    color: #fff;
    border: none;
    padding: 0.5rem 1.2rem;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 0.5rem;
    transition: background 0.2s;
}

.manageprayer-btn:hover {
    background: #006d6d;
}

.manageprayer-btn:disabled {
    background: #aaaaaa;
    cursor: not-allowed;
}

.manageprayer-status {
    margin-top: 1rem;
    color: #008b8b;
    font-weight: bold;
    text-align: center;
}

.manageprayer-btn-row {
    display: flex;
    justify-content: center;
    gap: 1.2rem;
    width: 100%;
    margin-top: 1rem;
}

.manageprayer-container>.topbar-container {
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

.admindash-topbar {
    padding: 18px 36px !important;
}

.manageprayer-logo {
    color: white;
    font-weight: bold;
    font-size: 20px;
}

.manageprayer-popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(44, 62, 80, 0.25);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.manageprayer-popup-box {
    position: relative;
    background: rgba(255, 255, 255, 0.98);
    border-radius: 14px;
    box-shadow: 0 8px 32px rgba(44, 62, 80, 0.22);
    padding: 2.5rem 3.5rem 2.5rem 3rem;
    min-width: 400px;
    max-width: 700px;
    color: #2d3e50;
    font-size: 1.13rem;
    border: 2px solid #008b8b;
    max-height: 90vh;
    overflow-y: auto;
}

.manageprayer-sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
}
.manageprayer-hint {
  color: #888;
  font-size: 1rem;
  margin-bottom: 1.2rem;
  margin-top: 0.2rem;
  text-align: left;
}
            `}</style>
            <AdminTopBar
                menuItems={[
                    { label: "Dashboard", link: "/admindashboard" },
                    { label: "Logout", link: "/" },
                    { label: "About", link: "/about" },
                ]}
            />
            <h1 className="manageprayer-title">Manage Prayer Requests</h1>
            <div className="manageprayer-sections">
                <div className="manageprayer-section manageprayer-requests box">
                    <h2>Prayer Requests</h2>
                    <div className="manageprayer-hint">
                        Prayer requests will be displayed here. If there are no requests, this area will be empty. You can view and respond to requests below.
                    </div>
                    <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                        {prayerRequests.length === 0 ? (
                            <li style={{ color: '#888', padding: '1rem', textAlign: 'center' }}>No Prayer Requests Yet</li>
                        ) : (
                            prayerRequests.filter(req => req.status !== 'responded').map((req) => (
                                <li
                                    key={req.id}
                                    className={
                                        "manageprayer-request-item" +
                                        (selectedRequest === req.id ? " selected" : "")
                                    }
                                    onClick={() => handleSelectRequest(req.id)}
                                >
                                    <strong>{(req.userName && req.userName.trim() !== "") ? req.userName : `User ID: ${req.userId}`}</strong><br />
                                    <span>{req.text}</span>
                                    {req.status === 'responded' && (
                                        <span style={{ color: '#008b8b', marginLeft: 8 }}>[Responded]</span>
                                    )}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
                <div className="manageprayer-section manageprayer-response box">
                    <h2>Respond to Request</h2>
                    <form className="manageprayer-response-form" onSubmit={handleRespond}>
                        <textarea
                            className="manageprayer-response-textarea"
                            value={responseText}
                            onChange={e => setResponseText(e.target.value)}
                            placeholder={selectedRequest ? "Type your prayer response here..." : "Select a request first"}
                            disabled={!selectedRequest}
                        />
                        <div className="manageprayer-btn-row">
                            <button type="submit" className="manageprayer-btn" disabled={!selectedRequest}>Send Response</button>
                            <button
                                type="button"
                                className="manageprayer-btn"
                                onClick={() => setShowHistory(true)}
                            >
                                View History
                            </button>
                        </div>
                    </form>
                    {status && <div className="manageprayer-status">{status}</div>}
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