import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


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
  const [mobileView, setMobileView] = useState("");
  const [showAccounts, setShowAccounts] = useState(false);
  const [expandedUser, setExpandedUser] = useState(null);
  const [expandedAdmin, setExpandedAdmin] = useState(null);
  const navigate = useNavigate();
  const loggedInAdminId = Number(localStorage.getItem("adminId"));

  useEffect(() => {
    setLoading(true);
    console.log('Fetching accounts data...');
    Promise.all([
      fetch('https://dailyvotionbackend-91wt.onrender.com/api/admin/users').then(res => res.json()),
      fetch('https://dailyvotionbackend-91wt.onrender.com/api/admin/admins').then(res => res.json())
    ]).then(([usersData, adminsData]) => {
      console.log('Users data:', usersData);
      console.log('Admins data:', adminsData);
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
    }).catch((error) => {
      console.error('Error fetching accounts:', error);
      setLoading(false);
    });
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
        background: "linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)"
      }}
    >
      <style>{`
body, #root {
  margin: 0;
  padding: 0;
}

.manageuser-container-fresh {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  background-attachment: fixed;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  padding: 0;
  overflow-y: auto;
}

.manageuser-topbar {
  background: linear-gradient(135deg, #2c5aa0 0%, #3d7bb8 100%);
  padding: 16px 20px;
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
  padding: 2rem 1rem;
  min-height: calc(100vh - 60px);
  overflow: hidden;
  display: flex;            
  flex-direction: column;   
  align-items: center;      
  box-sizing: border-box;
  margin-top: 60px;
}

.manageuser-title {
  color: #1a3a52 !important;
  font-size: 2.2rem;
  font-weight: 800;
  text-align: center;
  background: linear-gradient(135deg, #2c5aa0 0%, #6b8cce 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 2rem 0;
  letter-spacing: 0.5px;
}

.manageuser-sections {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
}

.manageuser-users-fresh,
.manageuser-admins-fresh {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafb 100%);
  border: 2px solid rgba(44, 90, 160, 0.15);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(44, 90, 160, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 2rem 1.5rem;
  min-width: 370px;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.manageuser-admins-fresh.hidden,
.manageuser-users-fresh.hidden {
  display: none !important;
}

.manageuser-admins-fresh,
.manageuser-users-fresh {
  flex: 0 1 48%;           
  max-width: 520px;
  min-width: 300px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafb 100%);
  border: 2px solid rgba(44, 90, 160, 0.15);         
  box-shadow: 0 10px 40px rgba(44, 90, 160, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 1.5rem 1.5rem;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
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
  scrollbar-width: thin;
  scrollbar-color: #2c5aa0 rgba(227, 242, 253, 0.5);
}

.manageuser-admins-fresh::-webkit-scrollbar,
.manageuser-users-fresh::-webkit-scrollbar {
  width: 10px;
  background: rgba(227, 242, 253, 0.3);
  border-radius: 8px;
}

.manageuser-admins-fresh::-webkit-scrollbar-thumb,
.manageuser-users-fresh::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #2c5aa0 0%, #3d7bb8 100%);
  border-radius: 8px;
}

.manageuser-admins-fresh:hover,
.manageuser-users-fresh:hover {
  box-shadow: 0 20px 60px rgba(44, 90, 160, 0.2), 0 8px 24px rgba(0, 0, 0, 0.08);
  border-color: rgba(44, 90, 160, 0.25);
}

.manageuser-admins-fresh h2,
.manageuser-users-fresh h2 {
  color: #2c5aa0;
  margin-bottom: 1rem;
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.manageuser-admins-fresh ul,
.manageuser-users-fresh ul {
  list-style: none;
  padding: 0;
}

.manageuser-user-item-fresh {
  background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,251,0.95) 100%);
  border: 2px solid rgba(44, 90, 160, 0.2);
  border-left: 5px solid #2c5aa0;
  padding: 1rem 1rem;
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(44, 90, 160, 0.12), 0 1px 4px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1rem;
  position: relative;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.manageuser-user-item-fresh:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(44, 90, 160, 0.2), 0 4px 12px rgba(0, 0, 0, 0.08);
  border-left-color: #3d7bb8;
  background: linear-gradient(135deg, #ffffff 0%, #f5f8fb 100%);
  border-color: rgba(44, 90, 160, 0.3);
}

.manageuser-user-label-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  margin-bottom: 0.2rem;
}

.manageuser-user-name {
  font-weight: 700;
  color: #1a3a52;
  margin: 0;
  line-height: 1.2;
  font-size: 1.05rem;
}

.manageuser-user-email {
  font-size: 0.93rem;
  color: #556b82;
  margin: 0;
  word-break: break-word;
  opacity: 0.92;
  line-height: 1.2;
}

.manageuser-actions-fresh {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
}

.manageuser-actions-fresh button {
  background: linear-gradient(135deg, #2c5aa0 0%, #3d7bb8 100%);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1rem;  
  font-size: 0.93rem;     
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  margin-right: 0.4rem;
  margin-bottom: 0.4rem;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(44, 90, 160, 0.3);
  letter-spacing: 0.3px;
}

.manageuser-actions-fresh button:hover {
  background: linear-gradient(135deg, #3d7bb8 0%, #4a8dd9 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(44, 90, 160, 0.4);
}

.manageuser-actions-fresh .manageuser-delete-btn {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%) !important;
}
.manageuser-actions-fresh .manageuser-delete-btn:hover {
  background: linear-gradient(135deg, #c0392b 0%, #a93226 100%) !important;
  box-shadow: 0 6px 18px rgba(231, 76, 60, 0.4) !important;
}

.manageuser-user-item-fresh .manageuser-user-email + div {
  display: none;
}

.manageuser-back-btn {
  position: fixed;
  top: 90px;
  right: 20px;
  background: linear-gradient(135deg, #2c5aa0 0%, #3d7bb8 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 0.8rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(44, 90, 160, 0.4);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 100;
  letter-spacing: 0.5px;
}
.manageuser-back-btn:hover {
  background: linear-gradient(135deg, #3d7bb8 0%, #4a8dd9 100%);
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(44, 90, 160, 0.5);
}
@media (max-width: 700px) {
  .manageuser-back-btn {
    top: 75px;
    right: 15px;
    font-size: 1rem;
    padding: 0.7rem 1.2rem;
  }
}

.manageuser-mobile-toggle {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
}

@media (max-width: 900px) {
  .manageuser-mobile-toggle {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    justify-content: center;
    width: 100%;
  }
  
  .manageuser-toggle-btn {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 251, 0.95) 100%);
    border: 2px solid rgba(44, 90, 160, 0.2);
    border-radius: 12px;
    padding: 1rem 2rem;
    font-size: 1.05rem;
    font-weight: 700;
    color: #2c5aa0;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 4px 16px rgba(44, 90, 160, 0.15);
    flex: 0 1 auto;
    min-width: 200px;
    letter-spacing: 0.3px;
  }
  
  .manageuser-toggle-btn.active {
    background: linear-gradient(135deg, #2c5aa0 0%, #3d7bb8 100%);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 8px 24px rgba(44, 90, 160, 0.35);
    transform: translateY(-2px);
  }
  
  .manageuser-toggle-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(44, 90, 160, 0.25);
    border-color: rgba(44, 90, 160, 0.3);
  }
  
  .manageuser-admins-fresh.hidden,
  .manageuser-users-fresh.hidden {
    display: none;
  }
}

/* Popup Animations and Styles */
.manageuser-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(26, 58, 82, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: popupFadeIn 0.3s ease;
  backdrop-filter: blur(2px);
}

@keyframes popupFadeIn {
  from {
    background: rgba(26, 58, 82, 0);
    backdrop-filter: blur(0px);
  }
  to {
    background: rgba(26, 58, 82, 0.6);
    backdrop-filter: blur(2px);
  }
}

.manageuser-popup-box {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafb 100%);
  padding: 2.2rem;
  border-radius: 18px;
  box-shadow: 0 25px 60px rgba(26, 58, 82, 0.35), 0 10px 25px rgba(0, 0, 0, 0.12);
  border: 2px solid rgba(44, 90, 160, 0.15);
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  animation: popupSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes popupSlideUp {
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Responsive improvements */
@media (max-width: 600px) {
  .manageuser-title {
    font-size: 1.8rem;
  }
  
  .manageuser-main-fresh {
    padding: 1.5rem 1rem;
  }
  
  .manageuser-popup-box {
    padding: 1.8rem;
    border-radius: 16px;
  }
  
  .manageuser-user-item-fresh {
    padding: 0.9rem 0.9rem;
    gap: 0.5rem;
  }
  
  .manageuser-back-btn {
    width: 95vw;
    font-size: 1.1rem;
    padding: 1rem 1.5rem;
  }
}
      `}</style>
      <div className="manageuser-main-fresh">
        {/* Floating Back Button (top-right, styled like other pages) */}
        {/* Floating Back Button (top-right, styled like AdminFPW) */}
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
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <svg className="editprofile-back-arrow" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="#fff"/>
          </svg>
          Back
        </button>
        <h1 className="manageuser-title" style={{ marginTop: 60 }}>Manage Users</h1>
        
        {/* Mobile Toggle Buttons */}
        <div className="manageuser-mobile-toggle">
          <button 
            className={`manageuser-toggle-btn${mobileView === "admin" ? " active" : ""}`}
            style={{ background: mobileView === "admin" ? "linear-gradient(135deg, #2c5aa0 0%, #3d7bb8 100%)" : "#fff", color: mobileView === "admin" ? "#fff" : "#2c5aa0", borderColor: mobileView === "admin" ? "rgba(255,255,255,0.8)" : "rgba(44, 90, 160, 0.2)" }}
            onClick={() => { setMobileView("admin"); setShowAccounts(true); }}
          >
            👥 Admin Accounts
          </button>
          <button 
            className={`manageuser-toggle-btn${mobileView === "user" ? " active" : ""}`}
            style={{ background: mobileView === "user" ? "linear-gradient(135deg, #2c5aa0 0%, #3d7bb8 100%)" : "#fff", color: mobileView === "user" ? "#fff" : "#2c5aa0", borderColor: mobileView === "user" ? "rgba(255,255,255,0.8)" : "rgba(44, 90, 160, 0.2)" }}
            onClick={() => { setMobileView("user"); setShowAccounts(true); }}
          >
            👤 User Accounts
          </button>
        </div>
        
        {showAccounts && (
        loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#556b82" }}>
            <div className="loading-spinner" style={{ margin: "0 auto 1rem" }}></div>
            <p>Loading accounts...</p>
          </div>
        ) : (
        <div className="manageuser-sections">
          <div className={`manageuser-admins-fresh ${mobileView !== "admin" ? "hidden" : ""}`}>
            <h2>Admin Accounts</h2>
            <ul>
              {admins.length === 0 ? (
                <li style={{ textAlign: "center", padding: "2rem", color: "#556b82" }}>
                  No admin accounts found
                </li>
              ) : (
              admins.map((admin) => (
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
              ))
              )}
            </ul>
          </div>

          <div className={`manageuser-users-fresh ${mobileView !== "user" ? "hidden" : ""}`}>
            <h2>User Accounts</h2>
            <ul>
              {users.length === 0 ? (
                <li style={{ textAlign: "center", padding: "2rem", color: "#556b82" }}>
                  No user accounts found
                </li>
              ) : (
              users.map((user) => (
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
              ))
              )}
            </ul>
          </div>
        </div>
        )
        )}
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
