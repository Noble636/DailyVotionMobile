import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Popup({ children, onClose }) {
  return (
    <div className="managecontent-popup-overlay">
      <style>{`
.managecontent-popup-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
}
.managecontent-popup-box {
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
      `}</style>
      <div className="managecontent-popup-box">
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
            padding: "0.25rem 0.5rem",
            lineHeight: 1,
            zIndex: 10,
            minWidth: "44px",
            minHeight: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

function ManageContent() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [contentText, setContentText] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [showReflections, setShowReflections] = useState(false);
  const [reflectionHistory, setReflectionHistory] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [activeTab, setActiveTab] = useState("deliver");
  const navigate = useNavigate();

  useEffect(() => {
    setLoadingUsers(true);
    fetch("https://dailyvotionbackend-91wt.onrender.com/api/admin/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoadingUsers(false);
      })
      .catch(() => setLoadingUsers(false));
  }, []);

  const fetchReflectionHistory = () => {
    setLoadingHistory(true);
    fetch("https://dailyvotionbackend-91wt.onrender.com/api/admin/reflections/responses")
      .then(res => res.json())
      .then(data => {
        setReflectionHistory(data);
        setLoadingHistory(false);
      })
      .catch(() => setLoadingHistory(false));
  };

  const handleToggleUser = (id) => {
    setSelectedUsers((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((uid) => uid !== id) : [...prev, id];
      setSelectAll(next.length === users.length);
      return next;
    });
  };

  const handleToggleAll = () => {
    setSelectAll((prev) => {
      const next = !prev;
      setSelectedUsers(next ? users.map((u) => u.id) : []);
      return next;
    });
  };

  const handleDeliver = (e) => {
    e.preventDefault();
    if (selectedUsers.length && contentText) {
      const adminId = Number(localStorage.getItem("adminId"));
      if (!adminId) {
        setDeliveryStatus("Admin ID missing. Please log in again.");
        return;
      }
      fetch("https://dailyvotionbackend-91wt.onrender.com/api/admin/reflection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId, message: contentText, userIds: selectedUsers })
      })
        .then(res => res.json())
        .then(data => {
          setDeliveryStatus(`Delivered to ${selectedUsers.length} user${selectedUsers.length > 1 ? "s" : ""}`);
          setContentText("");
          setSelectedUsers([]);
          setSelectAll(false);
        })
        .catch(() => setDeliveryStatus("Failed to deliver. Please try again."));
    } else {
      setDeliveryStatus("Please select at least one user and fill out the content.");
    }
  };

  return (
    <div
      className="managecontent-fresh-container"
    >
      <style>{`
.managecontent-back-btn {
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

.managecontent-back-btn:active {
  transform: scale(0.95);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.managecontent-fresh-container {
  min-height: 100vh;
  background: #f0f4f8;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  padding: 0;
  box-sizing: border-box;
  color: #1a1a1a;
  padding-bottom: 80px;
}
.managecontent-fresh-main {
  padding: 1rem !important;
  min-height: calc(100vh - 64px) !important;
  box-sizing: border-box !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  max-width: 480px !important;
  margin: 0 auto !important;
  width: 100% !important;
}
.managecontent-fresh-title {
  color: #1a3a52 !important;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin: 3.75rem 0 1rem 0;
  letter-spacing: 0.3px;
  padding-top: 0.5rem;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  z-index: 10;
  position: relative;
}

.managecontent-mobile-tabs {
  display: flex;
  gap: 0.5rem;
  margin: 0.75rem 0;
  padding: 0;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  width: 100%;
  max-width: 480px;
}

.managecontent-tab-btn {
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

.managecontent-tab-btn.active {
  color: #2c5aa0;
  background: #f0f7ff;
  border-bottom-color: #2c5aa0;
}

.managecontent-tab-btn:active {
  transform: scale(0.98);
}
@media (max-width: 700px) {
  .managecontent-fresh-title {
    margin-top: 3.2rem;
    font-size: 1.5rem;
  }
}
.managecontent-fresh-sections {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 480px;
  box-sizing: border-box;
}

.managecontent-tab-content {
  display: none;
}

.managecontent-tab-content.active {
  display: block;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.managecontent-fresh-delivery {
  margin-top: 0.5rem !important;
}
.managecontent-fresh-sections .box {
  display: flex !important;
  flex-direction: column !important;
  background: #ffffff !important;
  border: 1px solid #d0d7de !important;
  border-radius: 12px !important;
  padding: 1rem !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
  box-sizing: border-box !important;
  width: 100% !important;
}
.managecontent-fresh-sections .box h2,
.managecontent-fresh-sections .box ul {
  display: block !important;
  color: inherit !important;
}
.managecontent-fresh-main,
.managecontent-fresh-sections {
  height: auto;
  box-sizing: border-box;
}
.managecontent-fresh-reflections {
  width: 100%;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  box-sizing: border-box;
}
.managecontent-fresh-delivery {
  width: 100%;
  box-sizing: border-box;
}
.managecontent-fresh-users {
  width: 100%;
  max-height: calc(100vh - 200px);
  overflow-y: auto !important;
  box-sizing: border-box;
}
.managecontent-fresh-reflections ul,
.managecontent-fresh-delivery ul,
.managecontent-fresh-users ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: block;
}
.managecontent-fresh-reflections h2,
.managecontent-fresh-delivery h2,
.managecontent-fresh-users h2 {
  margin: 0 0 0.85rem 0;
  color: #1a1a1a;
  font-size: 1.15rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.managecontent-section-icon {
  font-size: 1.3rem;
}
.managecontent-fresh-users ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
}
.managecontent-fresh-user-item {
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-left: 4px solid #2c5aa0;
  padding: 0.85rem;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.2s ease;
  margin-bottom: 0.75rem;
  min-height: 60px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.managecontent-fresh-user-item:active {
  transform: scale(0.98);
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(44, 90, 160, 0.15);
}
.managecontent-fresh-user-item label {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 12px !important;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
}
.managecontent-fresh-user-name,
.managecontent-fresh-user-email {
  margin-left: 0 !important;
  display: block;
}
.managecontent-fresh-user-item label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
}
.managecontent-fresh-user-item label {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
}
.managecontent-fresh-user-label-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
}
.managecontent-fresh-user-name {
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.4;
  transition: color 0.2s ease;
}
.managecontent-fresh-user-item:hover .managecontent-fresh-user-name {
  color: #1a1a1a;
}
.managecontent-fresh-user-email {
  font-size: 0.92rem;
  color: #4d4d4d;
  margin: 0;
  word-break: break-word;
  line-height: 1.4;
  transition: color 0.2s ease;
}
.managecontent-fresh-user-item:hover .managecontent-fresh-user-email {
  color: #2d2d2d;
}
.managecontent-fresh-user-item input[type="checkbox"] {
  flex: 0 0 auto;
  margin-right: 8px;
  width: 22px;
  height: 22px;
  cursor: pointer;
  accent-color: #2c5aa0;
}
.managecontent-fresh-users ul li:last-child {
  margin-bottom: 0;
}
@media (max-width: 980px) {
  .managecontent-fresh-main {
    padding-bottom: 1rem;
  }
  .managecontent-fresh-sections {
    align-items: stretch;
  }
  .managecontent-fresh-reflections,
  .managecontent-fresh-delivery,
  .managecontent-fresh-users {
    max-height: none;
    overflow: visible;
  }
}
.managecontent-fresh-reflection-item {
  margin-bottom: 1rem;
  padding: 0.9rem;
  border-radius: 8px;
  background: #f8f9fa;
  border: 1px solid #d0d7de;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  transition: box-shadow 0.2s ease;
}
.managecontent-fresh-reflection-item:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}
.managecontent-fresh-reflection-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
  font-weight: 600;
  color: #1a1a1a;
  font-size: 0.98rem;
}
.managecontent-fresh-reflection-content {
  color: #6B3E3E;
  font-size: 0.96rem;
  line-height: 1.35;
  white-space: pre-wrap;
  word-break: break-word;
  transition: color 0.3s ease;
}
.managecontent-fresh-reflection-date {
  color: #8B6F6F;
  font-size: 0.85rem;
  font-weight: 500;
  transition: color 0.3s ease;
}
.managecontent-fresh-reflection-item:hover .managecontent-fresh-reflection-date {
  color: #6B3E3E;
}
.managecontent-fresh-textarea {
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

.managecontent-fresh-textarea:focus {
  outline: none;
  border-color: #2c5aa0;
  box-shadow: 0 0 0 3px rgba(44, 90, 160, 0.1);
}
.managecontent-fresh-textarea::placeholder {
  color: #8B6F6F;
}
.managecontent-fresh-btn {
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

.managecontent-fresh-btn:active {
  transform: scale(0.98);
  background: #1a3a52;
}

.managecontent-btn-secondary {
  background: #ffffff;
  color: #2c5aa0;
  border: 2px solid #2c5aa0;
}

.managecontent-btn-secondary:active {
  background: #f0f7ff;
}

.managecontent-btn-danger {
  background: #dc3545;
}

.managecontent-btn-danger:active {
  background: #bb2d3b;
}
.managecontent-fresh-status {
  margin-top: 1rem;
  color: #1a1a1a;
  font-weight: 600;
  padding: 0.75rem;
  background: #e8f5e9;
  border-radius: 8px;
  text-align: center;
}

.managecontent-recipient-counter {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #e8f4ff;
  border: 1px solid #2c5aa0;
  border-radius: 20px;
  color: #1a3a52;
  font-weight: 600;
  margin-bottom: 1rem;
}

.managecontent-counter-badge {
  background: #2c5aa0;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.9rem;
}
.managecontent-fresh-selectall {
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
}

.managecontent-fresh-selectall label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  color: #1a1a1a;
  cursor: pointer;
  font-size: 1rem;
  -webkit-tap-highlight-color: transparent;
}

.managecontent-fresh-selectall input[type="checkbox"] {
  width: 22px;
  height: 22px;
  cursor: pointer;
  accent-color: #2c5aa0;
}
.managecontent-fresh-user-item {
  margin-bottom: 0.85rem;
  padding: 0.6rem;
  border-radius: 6px;
  background: #f0f6fa;
  box-shadow: 0 1px 4px rgba(0,139,139,0.06);
  font-size: 0.98rem;
  display: flex;
  align-items: center;
}
.managecontent-fresh-user-item label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
}
.managecontent-fresh-user-name {
  margin-left: 0;
  font-weight: 600;
}
.managecontent-fresh-user-email {
  margin-left: 0;
  color: #666;
  font-size: 0.95rem;
  word-break: break-word;
  opacity: 0.95;
}
.managecontent-btn-row {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  margin-top: 1rem;
}
.box,
.managecontent-fresh-delivery,
.managecontent-fresh-users {
  background: rgba(255,255,255,0.82) !important;
  border-radius: 18px !important;
  box-shadow: 12px 18px 40px 0 rgba(0,0,0,0.18), 4px 8px 16px 0 rgba(0,139,139,0.10) !important;
  border: 2.5px solid #fff !important;
  backdrop-filter: blur(8px) saturate(120%) !important;
}
.box h2,
.managecontent-fresh-delivery h2,
.managecontent-fresh-users h2 {
  color: #000000;
  text-shadow: none;
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

      <div className="managecontent-fresh-main" style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
        <h1 className="managecontent-fresh-title" style={{ marginTop: 60 }}>Manage Content</h1>
        
        {/* Mobile Tabs */}
        <div className="managecontent-mobile-tabs">
          <button 
            className={`managecontent-tab-btn ${activeTab === "deliver" ? "active" : ""}`}
            onClick={() => setActiveTab("deliver")}
          >
            📝 Deliver Content
          </button>
          <button 
            className={`managecontent-tab-btn ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            👥 Select Users
          </button>
        </div>
        
        <div className="managecontent-fresh-sections">
          {/* Deliver Content Tab */}
          <div className={`managecontent-tab-content ${activeTab === "deliver" ? "active" : ""}`}>
            <div className="managecontent-fresh-delivery box">
              <h2><span className="managecontent-section-icon">📖</span>Reflection Activity Content</h2>
              <div style={{ color: "#2d2d2d", marginBottom: "1rem", fontSize: "1rem", lineHeight: "1.5" }}>
                Write a reflection activity and send it to selected users. You can also view users' past reflections.
              </div>
              
              <div className="managecontent-recipient-counter">
                <span>Selected:</span>
                <span className="managecontent-counter-badge">{selectedUsers.length}</span>
                <span>user{selectedUsers.length !== 1 ? "s" : ""}</span>
              </div>
              
              <form onSubmit={handleDeliver} className="managecontent-fresh-form">
                <label className="managecontent-fresh-label" style={{ fontWeight: "600", marginBottom: "0.5rem", display: "block" }}>
                Content:
                <textarea
                  value={contentText}
                  onChange={(e) => setContentText(e.target.value)}
                  placeholder="Enter reflection content here..."
                  className="managecontent-fresh-textarea"
                />
              </label>
                <div className="managecontent-btn-row">
                  <button type="submit" className="managecontent-fresh-btn">
                    📤 Deliver to Selected Users
                  </button>
                  <button
                    className="managecontent-fresh-btn managecontent-btn-secondary"
                    type="button"
                    onClick={() => {
                      setShowReflections(true);
                      fetchReflectionHistory();
                    }}
                  >
                    📊 View Reflection History
                  </button>
                </div>
              </form>
              {deliveryStatus && (
                <div className="managecontent-fresh-status">{deliveryStatus}</div>
              )}
            </div>
          </div>


          {/* Users Tab */}
          <div className={`managecontent-tab-content ${activeTab === "users" ? "active" : ""}`}>
            <div className="managecontent-fresh-users box">
              <h2><span className="managecontent-section-icon">👥</span>User Accounts</h2>
              <div className="managecontent-fresh-selectall">
                <label>
                  <input type="checkbox" checked={selectAll} onChange={handleToggleAll} /> 
                  Select All Users
                </label>
              </div>
              {loadingUsers ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "#4d4d4d" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⏳</div>
                  <p>Loading users...</p>
                </div>
              ) : (
                <ul>
                  {users.map((user) => (
                    <li key={user.id} className="managecontent-fresh-user-item">
                      <label style={{ display: "flex", alignItems: "center", width: "100%", cursor: "pointer" }}>
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleToggleUser(user.id)}
                        />
                        <span className="managecontent-fresh-user-label-details" style={{ flex: 1 }}>
                          <span className="managecontent-fresh-user-name">{user.fullName || user.name}</span>
                          <span className="managecontent-fresh-user-email">{user.email}</span>
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {showReflections && (
        <Popup onClose={() => setShowReflections(false)}>
          <h2 style={{ color: "#1a1a1a", marginBottom: "1rem", fontSize: "1.35rem", paddingRight: "2rem" }}>User Reflection History</h2>
          <button className="managecontent-fresh-btn" style={{ marginBottom: '1rem', width: '100%' }} onClick={fetchReflectionHistory}>
            🔄 Refresh History
          </button>
          {loadingHistory ? (
            <div style={{ textAlign: "center", padding: "2rem", color: "#4d4d4d" }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⏳</div>
              <p>Loading history...</p>
            </div>
          ) : (
            <ul style={{ maxHeight: "55vh", overflowY: "auto", padding: 0, margin: 0, listStyle: "none" }}>
              {reflectionHistory.length === 0 ? (
                <li style={{ color: '#888', padding: '1.5rem', textAlign: 'center', fontSize: '0.95rem' }}>No reflection responses yet.</li>
              ) : (
                reflectionHistory
                  .filter(ref => ref.response)
                  .map((ref, idx) => (
                    <li
                      key={ref.reflectionId + '-' + (ref.userId || idx)}
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
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        <span style={{ fontWeight: 700, color: "#1a1a1a", fontSize: "1rem" }}>{ref.userName || "Unknown User"}</span>
                        <span style={{ color: "#4d4d4d", fontSize: "0.8rem" }}>{ref.responded_at ? new Date(ref.responded_at).toLocaleString() : ""}</span>
                      </div>
                      <div style={{ color: "#2d2d2d", fontSize: "0.9rem", lineHeight: "1.5", padding: "0.5rem", background: "#ffffff", borderRadius: "6px" }}>
                        <strong style={{ color: "#1a3a52", display: "block", marginBottom: "0.35rem" }}>Admin Message:</strong>
                        {ref.message}
                      </div>
                      <div style={{ color: "#2d2d2d", fontSize: "0.9rem", lineHeight: "1.5", padding: "0.5rem", background: "#e8f4fd", borderRadius: "6px" }}>
                        <strong style={{ color: "#2c5aa0", display: "block", marginBottom: "0.35rem" }}>User Response:</strong>
                        {ref.response}
                      </div>
                      
                    </li>
                  ))
              )}
            </ul>
          )}
        </Popup>
      )}
    </div>
  );
}

export default ManageContent;