import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminTopBar from "./AdminTopBar";
function AdminDashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="admindash-container"
      style={{ backgroundImage: "url('/JTVCF/for%20background%20picture/AdminDashboard.png')" }}
    >
      <style>{`
.admindash-container {
  position: relative;
  min-height: 100vh;
  background-color: #e0f7fa;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  padding-top: 64px;
}
.admindash-container::before {
  content: "";
  position: absolute;
  inset: 0;
  background: transparent;
  pointer-events: none;
  z-index: 0;
}
.admindash-container > * {
  position: relative;
  z-index: 1;
}
.admindash-topbar {
  background-color: #008b8b;
  padding: 14px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.admindash-logo {
  color: #fff;
  font-weight: bold;
  font-size: 1.3rem;
}
.admindash-menu {
  list-style: none;
  display: flex;
  gap: 24px;
  margin: 0;
  padding: 0;
}
.admindash-menu li a,
.admindash-back-btn {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;
}
.admindash-menu li a:hover,
.admindash-back-btn:hover {
  color: #e0f7fa;
  text-decoration: underline;
}
.admindash-main {
  flex: 1;
  padding: 0.8rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  scrollbar-width: thin;
  box-sizing: border-box;
}
.admindash-main::-webkit-scrollbar {
  display: none;
}
.admindash-title {
  color: #fff !important;
  font-size: 2.3rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 2px 8px #008b8b, 0 0 12px #2d3e50;
  margin: 2rem 0 1rem 0;
  letter-spacing: 1px;
}
.admindash-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 1fr;
  gap: 1.25rem;
  width: 92%;
  max-width: 1000px;
  margin: 0 auto;
}
.admindash-card {
  background: rgba(255,255,255,0.82);
  border-radius: 18px;
  box-shadow: 12px 18px 40px 0 rgba(0,0,0,0.18), 4px 8px 16px 0 rgba(0,139,139,0.10);
  border: 2.5px solid #fff;
  padding: 1.5rem 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  min-height: 160px;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  backdrop-filter: blur(8px) saturate(120%);
}
.admindash-card h2 {
  color: #008b8b;
  font-size: 1.25rem;
  margin-bottom: 0.7rem;
  text-shadow: 0 0 2px #fff, 0 2px 8px #fff, 0 0 8px #008b8b;
}
.admindash-card p {
  color: #444;
  font-size: 1rem;
  margin-bottom: 1.2rem;
}
.admindash-btn {
  background: #008b8b;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  align-self: center;
  margin-top: auto;
  min-width: 160px;
}
.admindash-btn:hover {
  background: #006d6d;
}
.admindash-menu-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  margin-left: auto;
  display: flex;
  align-items: center;
}
.admindash-menu-icon {
  display: block;
  width: 28px;
  height: 4px;
  background: #fff;
  border-radius: 2px;
  position: relative;
}
.admindash-menu-icon::before,
.admindash-menu-icon::after {
  content: '';
  display: block;
  width: 28px;
  height: 4px;
  background: #fff;
  border-radius: 2px;
  position: absolute;
  left: 0;
  transition: 0.2s;
}
.admindash-menu-icon::before {
  top: -10px;
}
.admindash-menu-icon::after {
  top: 10px;
}
.admindash-dropdown-menu {
  position: absolute;
  top: 54px;
  right: 32px;
  background: #008b8b;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,139,139,0.18);
  z-index: 100;
  min-width: 180px;
}
.admindash-dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.admindash-dropdown-menu li {
  padding: 12px 20px;
  color: #fff;
  cursor: pointer;
  border-bottom: 1px solid #006d6d;
  transition: background 0.2s;
  width: 100%;
  box-sizing: border-box;
}
.admindash-dropdown-menu li:last-child {
  border-bottom: none;
}
.admindash-dropdown-menu li:hover {
  background: #006d6d;
}
.admindash-link-btn,
.admindash-back-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  text-align: left;
  padding: 0;
}
.admindash-card .admindash-btn {
  align-self: center;
  margin-top: auto;
}
.admindash-container input::placeholder,
.admindash-container textarea::placeholder,
.admindash-container .admindash-input::placeholder {
  color: #6b9fa0;
  opacity: 1;
}
.admindash-container input::-webkit-input-placeholder,
.admindash-container textarea::-webkit-input-placeholder,
.admindash-container .admindash-input::-webkit-input-placeholder {
  color: #6b9fa0;
}
.admindash-container input:-ms-input-placeholder,
.admindash-container textarea:-ms-input-placeholder,
.admindash-container .admindash-input:-ms-input-placeholder {
  color: #6b9fa0;
}
.admindash-container input::-ms-input-placeholder,
.admindash-container textarea::-ms-input-placeholder,
.admindash-container .admindash-input::-ms-input-placeholder {
  color: #6b9fa0;
}
@media (max-width: 700px) {
  .admindash-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    width: 94%;
  }
  .admindash-title {
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
  }
  .admindash-card {
    min-height: 140px;
    padding: 0.9rem;
  }
}
.admindash-container,
.admindash-main {
  position: relative;
  z-index: 1;
}
.admindash-gallery-row {
  display: flex;
  justify-content: center;
  width: 100%;
}
      `}</style>
      <AdminTopBar
        menuItems={[
          { label: "Home", link: "/" },
          { label: "User Login", link: "/login" },
          { label: "About", link: "/about" }
        ]}
      />
      <div className="admindash-main">
        <h1 className="admindash-title">Admin Dashboard</h1>

        <div className="admindash-grid">
          <div className="admindash-card">
            <h2>User Account Management</h2>
            <p>
              Manage user accounts, including registration, roles, and access control.
            </p>
            <button
              className="admindash-btn"
              onClick={() => navigate("/Manageuser")}
            >
              Manage Users
            </button>
          </div>

          <div className="admindash-card">
            <h2>Devotional Content Delivery</h2>
            <p>
              Schedule and deliver daily devotionals, scriptures, and reflections to users.
            </p>
            <button
              className="admindash-btn"
              onClick={() => navigate("/Managecontent")}
            >
              Manage Content
            </button>
          </div>

          <div className="admindash-card">
            <h2>Interactive Prayer</h2>
            <p>
              Oversee prayer requests, inspirational quotes, responses, and interactive features.
            </p>
            <button className="admindash-btn" onClick={() => navigate("/manageprayer")}>Manage Prayers</button>
          </div>

          <div className="admindash-card">
            <h2>Application Feedback</h2>
            <p>
              Users can rate and provide feedback about their experience using the app.
            </p>
            <button className="admindash-btn" onClick={() => navigate("/managefeedback")}>Manage Feedback</button>
          </div>

          <div className="admindash-card" style={{ gridColumn: "1 / span 2", justifySelf: "center" }}>
            <h2>Gallery & Bible Guide</h2>
            <p>
              Upload pictures for gallery albums and Bible Reading Guide.
            </p>
            <button className="admindash-btn" onClick={() => navigate("/adminaddpictures")}>Upload Pictures</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
