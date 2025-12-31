import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminTopBar from "./AdminTopBar";

function Popup({ message, onOk, onCancel, okText = "OK", cancelText = "Cancel" }) {
  return (
    <div className="manageuser-popup-overlay">
      <div className="manageuser-popup-box" style={{ minWidth: 280, maxWidth: 340 }}>
        <div style={{ marginBottom: "1rem", fontSize: "1.08rem", color: "#222" }}>{message}</div>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
          {cancelText && (
            <button
              onClick={onCancel}
              style={{
                background: "#e0e0e0",
                color: "#008b8b",
                border: "none",
                borderRadius: 6,
                padding: "0.5rem 1.2rem",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onOk}
            style={{
              background: "#08a3ad",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "0.5rem 1.2rem",
              fontWeight: 500,
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            {okText}
          </button>
        </div>
      </div>
    </div>
  );
}

function ManageUser() {
  const handleSaveAdminCode = (adminId) => {
    alert('Admin code saved!');
    setCodeId(null);
    setAdminCodeInput("");
  };
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteType, setDeleteType] = useState("");
  const [editId, setEditId] = useState(null);
  const [editType, setEditType] = useState("");
  const [codeId, setCodeId] = useState(null);
  const [adminCodeInput, setAdminCodeInput] = useState("");
  const [showFirstWarning, setShowFirstWarning] = useState(false);
  const [showSecondWarning, setShowSecondWarning] = useState(false);
  const navigate = useNavigate();
  const loggedInAdminId = Number(localStorage.getItem("adminId"));

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('https://dailyvotionbackend-91wt.onrender.com/api/admin/users').then(res => res.json()),
      fetch('https://dailyvotionbackend-91wt.onrender.com/api/admin/admins').then(res => res.json())
    ]).then(([usersData, adminsData]) => {
      setUsers(usersData.map(u => ({
        ...u,
        name: u.fullName || u.name,
        role: "User"
      })));
      setAdmins(adminsData.map(a => ({
        ...a,
        name: a.fullName,
        email: a.email,
        role: "Admin"
      })));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const [showUserDetails, setShowUserDetails] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [showAdminDetails, setShowAdminDetails] = useState(false);
  const [adminDetails, setAdminDetails] = useState(null);

  const handleDeleteConfirmed = async () => {
    if (!deleteId || !deleteType) return;
    let url = "";
    if (deleteType === "admin") {
      url = `https://dailyvotionbackend-91wt.onrender.com/api/admin/admin/${deleteId}`;
    } else if (deleteType === "user") {
      url = `https://dailyvotionbackend-91wt.onrender.com/api/admin/user/${deleteId}`;
    }
    try {
      const res = await fetch(url, { method: "DELETE" });
      if (res.ok) {
        if (deleteType === "admin") {
          setAdmins(prev => prev.filter(a => a.id !== deleteId));
        } else {
          setUsers(prev => prev.filter(u => u.id !== deleteId));
        }
        setShowSecondWarning(false);
        setDeleteId(null);
        setDeleteType("");
      } else {
        alert("Failed to delete account.");
      }
    } catch (err) {
      alert("Server error. Please try again.");
    }
  };

  return (
    <div
      className="manageuser-container-fresh"
      style={{
        backgroundImage: "url('/JTVCF/for%20background%20picture/AdminDashboard.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <style>{`
body, #root {
  margin: 0;
  padding: 0;
}

.manageuser-container-fresh {
  min-height: 100vh;
  background: #f5f7fa;
  font-family: 'Segoe UI', Arial, sans-serif;
  padding: 0;
  overflow-y: auto;
}

.manageuser-topbar {
  background-color: #008b8b;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.manageuser-logo-fresh {
  color: white;
  font-weight: bold;
  font-size: 20px;
}

.manageuser-menu-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  margin-left: auto;
  display: flex;
  align-items: center;
}

.manageuser-menu-icon {
  display: block;
  width: 28px;
  height: 4px;
  background: #fff;
  border-radius: 2px;
  position: relative;
}
.manageuser-menu-icon span {
  position: absolute;
  left: 0;
  width: 28px;
  height: 4px;
  background: #fff;
  border-radius: 2px;
}
.manageuser-menu-icon span:first-child {
  top: -8px;
}
.manageuser-menu-icon span:last-child {
  top: 8px;
}

.manageuser-dropdown-menu {
  position: absolute;
  top: 54px;
  right: 32px;
  background: #008b8b;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,139,139,0.18);
  z-index: 100;
  min-width: 180px;
}

.manageuser-link-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  text-align: left;
  padding: 0;
}

.manageuser-main-fresh {
  padding: 1.5rem 2vw;
  min-height: calc(100vh - 60px);
  overflow: hidden;
  display: flex;            
  flex-direction: column;   
  align-items: center;      
  box-sizing: border-box;
  margin-top: 60px;
}

.manageuser-sections {
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
}

.manageuser-users-fresh,
.manageuser-admins-fresh {
  background: rgba(255,255,255,0.98);
  border: 2px solid #008b8b;
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(44,62,80,0.18), 0 2px 8px rgba(44,62,80,0.12);
  padding: 2rem 1.5rem;
  min-width: 370px;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-sizing: border-box;
}

.manageuser-admins-fresh,
.manageuser-users-fresh {
  flex: 0 1 48%;           
  max-width: 520px;
  min-width: 300px;
  background: rgba(255,255,255,0.85);
  border: 2px solid #008b8b;         
  box-shadow: 0 8px 32px rgba(44, 62, 80, 0.18), 0 2px 8px rgba(44, 62, 80, 0.12);
  padding: 1.5rem 1.5rem;
  transition: box-shadow 0.2s;

  overflow-y: auto;       
  max-height: calc(100vh - 160px);
  -webkit-overflow-scrolling: touch;
}

@media (max-width: 900px) {
  .manageuser-sections {
    flex-direction: column;
    align-items: stretch;
  }
  .manageuser-admins-fresh,
  .manageuser-users-fresh {
    flex: 1 1 auto;
    max-width: none;
    min-width: auto;
    max-height: calc(100vh - 200px);
  }
}

.manageuser-admins-fresh,
.manageuser-users-fresh {
  background: rgba(255,255,255,0.85);
  border: 2px solid #008b8b;         
  box-shadow: 0 8px 32px rgba(44, 62, 80, 0.18), 0 2px 8px rgba(44, 62, 80, 0.12);
  padding: 1.5rem 1.5rem;
  flex: 0 1 370px;
  min-width: 280px;
  max-width: 420px;
  transition: box-shadow 0.2s;

  overflow-y: auto;
  max-height: calc(100vh - 220px);
  -webkit-overflow-scrolling: touch;
}

.manageuser-admins-fresh,
.manageuser-users-fresh {
  scrollbar-width: thin;
  scrollbar-color: #008b8b #e0f7fa;
}

.manageuser-admins-fresh::-webkit-scrollbar,
.manageuser-users-fresh::-webkit-scrollbar {
  width: 10px;
  background: #e0f7fa;
  border-radius: 8px;
}

.manageuser-admins-fresh::-webkit-scrollbar-thumb,
.manageuser-users-fresh::-webkit-scrollbar-thumb {
  background: #008b8b;
  border-radius: 8px;
}

.manageuser-admins-fresh:hover,
.manageuser-users-fresh:hover {
  box-shadow: 0 8px 32px rgba(44, 62, 80, 0.18), 0 2px 8px rgba(44, 62, 80, 0.12);
}

.manageuser-admins-fresh h2,
.manageuser-users-fresh h2 {
  color: #2d3e50;
  margin-bottom: 0.7rem;
  font-size: 1.2rem;
}

.manageuser-admins-fresh ul,
.manageuser-users-fresh ul {
  list-style: none;
  padding: 0;
}

.manageuser-user-item-fresh {
  background: rgba(255,255,255,0.85);
  border: 2px solid #008b8b;
  border-left: 4px solid #008b8b;
  padding: 0.75rem 0.9rem;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(44,62,80,0.10);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
  position: relative;
  transition: transform 0.12s, box-shadow 0.12s, border-color 0.12s;
}

.manageuser-user-item-fresh:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,139,139,0.18);
  border-color: #006d6d;
}

.manageuser-user-label-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  margin-bottom: 0.2rem;
}

.manageuser-user-name {
  font-weight: 600;
  color: #003c3c;
  margin: 0;
  line-height: 1.1;
}

.manageuser-user-email {
  font-size: 0.92rem;
  color: #667777;
  margin: 0;
  word-break: break-word;
  opacity: 0.95;
  line-height: 1.1;
}

.manageuser-actions-fresh {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
}

.manageuser-actions-fresh button {
  background: #008b8b;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.38rem 0.8rem;  
  font-size: 0.92rem;     
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  margin-right: 0.4rem;
  margin-bottom: 0.4rem;
  white-space: nowrap;
}

.manageuser-actions-fresh button:hover {
  background: #006d6d;
}

.manageuser-actions-fresh .manageuser-delete-btn {
  background: #d32f2f !important;
}
.manageuser-actions-fresh .manageuser-delete-btn:hover {
  background: #b71c1c !important;
}

.manageuser-user-item-fresh .manageuser-user-email + div {
  display: none;
}

.manageuser-title {
  color: #fff !important;
  font-size: 2.3rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 2px 8px #008b8b, 0 0 12px #2d3e50;
  margin: 0rem 0 1rem 0;
}

.manageuser-popup-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(44,62,80,0.25);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.manageuser-popup-box {
  background: rgba(255,255,255,0.97);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(44,62,80,0.22);
  padding: 2rem 2.5rem;
  min-width: 320px;
  max-width: 90vw;
  color: #2d3e50;
  font-size: 1.08rem;
  border: 2px solid #008b8b;
}
.manageuser-popup-box button {
  background: #008b8b;
  color: #fff;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.manageuser-popup-box button:hover {
  background: #2d3e50;
}
.manageuser-popup-box .manageuser-warning {
  color: #d32f2f;
  font-weight: bold;
  font-size: 1.15rem;
  margin-bottom: 0.7rem;
  letter-spacing: 0.5px;
}

.manageuser-back-btn {
  display: block;
  margin: 2rem auto 0 auto;
  background: #008b8b;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 2.2rem;
  font-size: 1.08rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,139,139,0.10);
  transition: background 0.2s;
}
.manageuser-back-btn:hover {
  background: #006d6d;
}
@media (max-width: 700px) {
  .manageuser-back-btn {
    width: 90vw;
    font-size: 1rem;
    padding: 0.7rem 0;
  }
}
      `}</style>
      <AdminTopBar />
      <div className="manageuser-main-fresh">
        <h1 className="manageuser-title">Manage Users</h1>
        <div className="manageuser-sections">
          <div className="manageuser-admins-fresh">
            <h2>Admin Accounts</h2>
            <ul>
              {admins.map((admin) => (
                <li key={admin.id} className="manageuser-user-item-fresh manageuser-user-box-clickable" style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    // Only open popup if not clicking a button or input
                    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL') return;
                    setAdminDetails(admin); setShowAdminDetails(true);
                  }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    <span className="manageuser-user-label-details">
                      <span className="manageuser-user-name">{admin.name}</span>
                      <span className="manageuser-user-email">{admin.email}</span>
                    </span>
                  </div>
                  <div>Role: {admin.role}</div>
                  <div className="manageuser-actions-fresh" style={{ flexDirection: "column", alignItems: "flex-start", gap: "0.4rem" }}>
                    <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.4rem" }}>
                      {codeId === admin.id ? (
                        <>
                          <button onClick={(e) => { e.stopPropagation(); setCodeId(null); setAdminCodeInput(""); }}>Cancel</button>
                        </>
                      ) : (
                        <button onClick={(e) => { e.stopPropagation(); setCodeId(admin.id); setAdminCodeInput(""); }}>Choose Admin Code</button>
                      )}
                    </div>
                    {codeId === admin.id && (
                      <div style={{ width: "100%" }}>
                        <label style={{ fontSize: "0.97rem", fontWeight: "500", marginBottom: "0.2rem", display: "block" }}>
                          Enable User Login
                        </label>
                        <input
                          type="text"
                          value={adminCodeInput}
                          onChange={e => setAdminCodeInput(e.target.value)}
                          placeholder="Enter Admin Code"
                          style={{ marginRight: "0.3rem", marginBottom: "0.4rem" }}
                        />
                        <button onClick={(e) => { e.stopPropagation(); handleSaveAdminCode(admin.id); }}>Save</button>
                      </div>
                    )}
                    {admin.id !== loggedInAdminId && (
                      <button
                        className="manageuser-delete-btn"
                        style={{ background: "#d32f2f", marginTop: "0.4rem" }}
                        onClick={(e) => { e.stopPropagation(); setDeleteId(admin.id); setDeleteType("admin"); setShowFirstWarning(true); }}
                      >
                        Delete Admin Account
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="manageuser-users-fresh">
            <h2>User Accounts</h2>
            <ul>
              {users.map((user) => (
                <li key={user.id} className="manageuser-user-item-fresh manageuser-user-box-clickable" style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL') return;
                    setUserDetails(user); setShowUserDetails(true);
                  }}>
                  <div className="manageuser-user-label-details">
                    <span className="manageuser-user-name">{user.name}</span>
                    <span className="manageuser-user-email">{user.email}</span>
                  </div>
                  <div>Role: {user.role}</div>
                  <div className="manageuser-actions-fresh" style={{ flexDirection: "row", gap: "0.4rem" }}>
                    <button className="manageuser-delete-btn" style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }} onClick={(e) => { e.stopPropagation(); setDeleteId(user.id); setDeleteType("user"); setShowFirstWarning(true); }}>Delete Account</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          className="manageuser-back-btn"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>

      {showAdminDetails && adminDetails && (
        <Popup
          message={
            <div>
              <div><strong>Username:</strong> {adminDetails.username || adminDetails.name}</div>
              <div><strong>Email:</strong> {adminDetails.email}</div>
              <div><strong>Contact No.:</strong> {adminDetails.mobile || "N/A"}</div>
            </div>
          }
          onOk={() => setShowAdminDetails(false)}
          onCancel={() => setShowAdminDetails(false)}
          okText="Close"
          cancelText=""
        />
      )}
      {showUserDetails && userDetails && (
        <Popup
          message={
            <div>
              <div><strong>Username:</strong> {userDetails.username || userDetails.name}</div>
              <div><strong>Email:</strong> {userDetails.email}</div>
              <div><strong>Contact No.:</strong> {userDetails.mobile || "N/A"}</div>
            </div>
          }
          onOk={() => setShowUserDetails(false)}
          onCancel={() => setShowUserDetails(false)}
          okText="Close"
          cancelText=""
        />
      )}
      {showFirstWarning && (
        <Popup
          message={
            deleteType === "admin"
              ? "Deleting this admin account will remove all associated data from the database. Are you sure you want to proceed?"
              : "Deleting this user account will remove all associated data from the database. Are you sure you want to proceed?"
          }
          onOk={() => { setShowFirstWarning(false); setShowSecondWarning(true); }}
          onCancel={() => { setShowFirstWarning(false); setDeleteId(null); setDeleteType(""); }}
          okText="OK"
          cancelText="Cancel"
        />
      )}
      {showSecondWarning && (
        <Popup
          message={<span className="manageuser-warning">Warning: This deletion is permanent and cannot be undone. Proceed?</span>}
          onOk={handleDeleteConfirmed}
          onCancel={() => { setShowSecondWarning(false); setDeleteId(null); setDeleteType(""); }}
          okText="Confirm"
          cancelText="Cancel"
        />
      )}
    </div>
  );
}

export default ManageUser;
