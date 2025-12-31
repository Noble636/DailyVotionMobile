import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminTopBar from "./AdminTopBar";

function Popup({ children, onClose }) {
  return (
    <div className="managecontent-popup-overlay">
      <style>{`
.managecontent-popup-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(44,62,80,0.25);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.managecontent-popup-box {
  position: relative;
  background: rgba(255,255,255,0.98);
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(44,62,80,0.22);
  padding: 2.5rem 3.5rem 2.5rem 3rem;
  min-width: 700px;
  max-width: 1100px;
  color: #2d3e50;
  font-size: 1.13rem;
  border: 2px solid #008b8b;
  max-height: 90vh;
  overflow-y: auto;
}
      `}</style>
      <div className="managecontent-popup-box">
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
      style={{
        backgroundImage: "url('/JTVCF/for%20background%20picture/AdminDashboard.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <style>{`
.managecontent-fresh-container {
  min-height: 100vh;
  font-family: 'Segoe UI', Arial, sans-serif;
  padding: 0;
  box-sizing: border-box;
  color: #123;
  background-color: rgba(247,249,252,0.85);
}
.managecontent-fresh-main {
  padding: 0.5rem 2vw 1.25rem !important;
  min-height: calc(100vh - 64px) !important;
  box-sizing: border-box !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
}
.managecontent-fresh-title {
  color: #fff !important;
  font-size: 2.3rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 2px 8px #008b8b, 0 0 12px #2d3e50;
  margin: 2rem 0 1rem 0;
  letter-spacing: 1px;
}
.managecontent-fresh-sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
  margin-top: 0.5rem;
}
.managecontent-fresh-delivery {
  margin-top: 0.5rem !important;
}
.managecontent-fresh-sections .box {
  display: flex !important;
  flex-direction: column !important;
  background: rgba(255,255,255,0.82) !important;
  border: 1px solid rgba(0,0,0,0.06) !important;
  border-radius: 12px !important;
  padding: 1.25rem !important;
  box-shadow: 0 6px 28px rgba(44,62,80,0.12) !important;
  min-height: 160px !important;
  max-height: calc(100vh - 200px) !important;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch !important;
  box-sizing: border-box !important;
  z-index: 2 !important;
  outline: 1px solid rgba(255,255,255,0.06) !important;
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
  flex: 0 0 28%;
  min-width: 220px;
  max-width: 360px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  padding-right: 0.5rem;
}
.managecontent-fresh-delivery {
  flex: 0 1 34%;
  min-width: 300px;
  max-width: 520px;
  max-height: calc(100vh - 200px);
  box-sizing: border-box;
}
.managecontent-fresh-users {
  flex: 0 0 34%;
  min-width: 260px;
  max-width: 520px;
  max-height: calc(100vh - 120px);
  overflow-y: auto !important;
  padding-left: 0.5rem;
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
  margin: 0 0 0.75rem 0;
  color: #006d6d;
  font-size: 1.05rem;
}
.managecontent-fresh-users ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
}
.managecontent-fresh-user-item {
  background: rgba(255,255,255,0.85);
  border: 2px solid #008b8b;
  border-left: 4px solid #008b8b;
  padding: 0.75rem 0.9rem;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(44,62,80,0.10);
  display: flex;
  align-items: center;
  gap: 12px;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
  margin-bottom: 0.85rem;
}
.managecontent-fresh-user-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,139,139,0.18);
  border-color: #006d6d;
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
  color: #003c3c;
  margin: 0;
  line-height: 1.1;
}
.managecontent-fresh-user-email {
  font-size: 0.92rem;
  color: #667777;
  margin: 0;
  word-break: break-word;
  opacity: 0.95;
  line-height: 1.1;
}
.managecontent-fresh-user-item input[type="checkbox"] {
  flex: 0 0 auto;
  margin-right: 8px;
  transform: scale(1.04);
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
  background: #e0f7fa;
  box-shadow: 0 2px 8px rgba(0,139,139,0.06);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}
.managecontent-fresh-reflection-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
  font-weight: 600;
  color: #006d6d;
  font-size: 0.98rem;
}
.managecontent-fresh-reflection-content {
  color: #07484a;
  font-size: 0.96rem;
  line-height: 1.35;
  white-space: pre-wrap;
  word-break: break-word;
}
.managecontent-fresh-reflection-date {
  color: #666;
  font-size: 0.85rem;
  font-weight: 500;
}
.managecontent-fresh-form {
  display: flex;
  flex-direction: column;
}
.managecontent-fresh-textarea {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin-top: 0.3rem;
  margin-bottom: 0.7rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #cce4e4;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
}
.managecontent-fresh-btn {
  background: #008b8b;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.2s;
}
.managecontent-fresh-btn:hover {
  background: #006d6d;
}
.managecontent-fresh-status {
  margin-top: 1rem;
  color: #008b8b;
  font-weight: bold;
}
.managecontent-fresh-selectall {
  margin-bottom: 0.75rem;
  color: #008b8b;
  font-weight: 500;
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
  justify-content: center;
  gap: 1.2rem;
  width: 100%;
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
  color: #008b8b;
  text-shadow: 0 0 2px #fff, 0 2px 8px #fff, 0 0 8px #008b8b;
}
      `}</style>
      <AdminTopBar
        menuItems={[
          { label: "Dashboard", link: "/admindashboard" },
          { label: "Logout", link: "/" },
          { label: "About", link: "/about" },
        ]}
      />

      <div className="managecontent-fresh-main" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1 className="managecontent-fresh-title">Manage Content</h1>
        <div className="managecontent-fresh-sections" style={{ justifyContent: "center" }}>
          <div className="managecontent-fresh-delivery box" style={{ position: "relative" }}>
            <h2>Reflection Activity Content</h2>
            <div style={{ color: "#006d6d", marginBottom: "1rem", fontSize: "1.01rem" }}>
              Write a reflection activity and send it to selected users. You can also view users’ past reflections.
            </div>
            <form onSubmit={handleDeliver} className="managecontent-fresh-form">
              <div className="managecontent-fresh-recipients">
                Selected recipients: {selectedUsers.length}
              </div>
              <label className="managecontent-fresh-label">
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
                  Deliver
                </button>
                <button
                  className="managecontent-fresh-btn"
                  type="button"
                  style={{ background: "#d32f2f" }}
                  onClick={() => {
                    navigate("/admindashboard");
                  }}
                >
                  Cancel
                </button>
              </div>
              <div className="managecontent-btn-row" style={{ marginTop: "0.7rem" }}>
                <button
                  className="managecontent-fresh-btn"
                  type="button"
                  style={{ background: "#008b8b" }}
                  onClick={() => {
                    setShowReflections(true);
                    fetchReflectionHistory();
                  }}
                >
                  User Reflection History
                </button>
              </div>
            </form>
            {deliveryStatus && (
              <div className="managecontent-fresh-status">{deliveryStatus}</div>
            )}
          </div>

          <div className="managecontent-fresh-users box">
            <h2>User Accounts</h2>
            <div className="managecontent-fresh-selectall">
              <label>
                <input type="checkbox" checked={selectAll} onChange={handleToggleAll} /> Select All
              </label>
            </div>
            {loadingUsers ? (
              <div>Loading users...</div>
            ) : (
              <ul>
                {users.map((user) => (
                  <li key={user.id} className="managecontent-fresh-user-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleToggleUser(user.id)}
                      />
                      <span className="managecontent-fresh-user-label-details">
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

      {showReflections && (
        <Popup onClose={() => setShowReflections(false)}>
          <h2 style={{ color: "#008b8b", marginBottom: "1rem" }}>User Reflection History</h2>
          <button className="managecontent-fresh-btn" style={{ marginBottom: '1rem' }} onClick={fetchReflectionHistory}>
            Refresh History
          </button>
          {loadingHistory ? (
            <div>Loading history...</div>
          ) : (
            <ul style={{ maxHeight: "60vh", overflowY: "auto", padding: 0, margin: 0 }}>
              {reflectionHistory.length === 0 ? (
                <li style={{ color: '#888', padding: '1rem' }}>No reflection responses yet.</li>
              ) : (
                reflectionHistory
                  .filter(ref => ref.response)
                  .map((ref, idx) => (
                    <li
                      key={ref.reflectionId + '-' + (ref.userId || idx)}
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
                      <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600, color: "#006d6d" }}>
                        <span>{ref.userName || "Unknown User"}</span>
                        <span style={{ color: "#666", fontSize: "0.85rem" }}>{ref.responded_at ? new Date(ref.responded_at).toLocaleString() : ""}</span>
                      </div>
                      <div style={{ color: "#07484a", fontSize: "0.96rem" }}><strong>Admin:</strong> {ref.message}</div>
                      <div style={{ color: "#07484a", fontSize: "0.96rem" }}><strong>Response:</strong> {ref.response}</div>
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