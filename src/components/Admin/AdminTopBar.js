import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TopBar({ menuItems }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("adminId");
    sessionStorage.removeItem("adminUser");
    navigate("/");
  };

  // Remove any Logout from menuItems, will add manually below About
  const items = menuItems
    ? menuItems.filter(item => item.label !== "User Login" && item.label !== "Logout")
    : [
        { label: "Home", link: "/" },
        { label: "About", link: "/about" }
      ];

  return (
    <header className="topbar-container">
      <style>{`
.topbar-container {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 9999 !important;
  background: #008b8b;
  box-sizing: border-box;
}
.topbar-logo {
  color: white;
  font-weight: bold;
  font-size: 18px;
}
.topbar-logo-float {
  position: absolute;
  top: -20px;
  left: 10px;
  z-index: 200;
  display: flex;
  align-items: center;
  text-decoration: none;
}
.topbar-logo-float-img {
  height: 90px;
  width: auto;
  filter: drop-shadow(0 8px 32px rgba(0,139,139,0.22));
}
.topbar-menu-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  margin-left: auto;
  display: flex;
  align-items: center;
}
.topbar-menu-icon {
  display: block;
  width: 28px;
  height: 4px;
  background: #fff;
  border-radius: 2px;
  position: relative;
}
.topbar-menu-icon::before,
.topbar-menu-icon::after {
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
.topbar-menu-icon::before {
  top: -10px;
}
.topbar-menu-icon::after {
  top: 10px;
}
.topbar-dropdown-menu {
  position: absolute;
  top: 50px;
  right: 20px;
  background: #008b8b;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,139,139,0.18);
  z-index: 100;
  min-width: 160px;
}
.topbar-dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.topbar-dropdown-menu li {
  padding: 12px 20px;
  color: #fff;
  cursor: pointer;
  border-bottom: 1px solid #006d6d;
  transition: background 0.2s;
  width: 100%;
  box-sizing: border-box;
}
.topbar-dropdown-menu li:last-child {
  border-bottom: none;
}
.topbar-dropdown-menu li:hover {
  background: #006d6d;
}
.topbar-dropdown-menu a {
  color: #fff;
  text-decoration: none;
  display: block;
}
.topbar-admin-label {
  color: #ffffff;
  margin-left: 70px;
  position: relative;       
  top: 6px;
  pointer-events: none;
  font-weight: 700;
  font-size: 1rem;
  display: inline-block;
}
      `}</style>
      <a href="/" className="topbar-logo-float" aria-label="Home">
        <img
          src={process.env.PUBLIC_URL + "/JTVCF/home page/logo v3.png"}
          alt="DailyVotion Logo"
          className="topbar-logo-float-img"
        />
      </a>

      <span className="topbar-admin-label" aria-hidden="true">
        Administration
      </span>

      <button
        className="topbar-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Open menu"
      >
        <span className="topbar-menu-icon"></span>
      </button>

      {/* Remove top bar logout button, only show in dropdown */}

      {menuOpen && (
        <div className="topbar-dropdown-menu">
          <ul>
            {items.map((item, idx) => (
              <li key={idx}><a href={item.link}>{item.label}</a></li>
            ))}
            {/* Logout button below About, styled like other items */}
            <li>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#fff",
                  fontWeight: "normal",
                  fontSize: "inherit",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                  padding: 0,
                  margin: 0
                }}
                onClick={handleLogout}
              >Logout</button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default TopBar;

import React from "react";
import { useNavigate } from "react-router-dom";

function AdminTopBar() {
  const navigate = useNavigate();

  return (
    <header className="admin-topbar-fixed">
      <div className="admin-topbar-title" onClick={() => navigate("/admindashboard")}>
        Admin Panel
      </div>
      <nav className="admin-topbar-menu">
        <button className="admin-topbar-menu-item" onClick={() => navigate("/adminlogin")}>Login</button>
        <button className="admin-topbar-menu-item" onClick={() => navigate("/adminregister")}>Register</button>
        <button className="admin-topbar-menu-item" onClick={() => navigate("/")}>User Site</button>
      </nav>
      <style>{`
.admin-topbar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 64px;
  background: #008b8b;
  color: #fff;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  font-size: 1.2rem;
}
.admin-topbar-title {
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
  letter-spacing: 1px;
  user-select: none;
}
.admin-topbar-menu {
  display: flex;
  gap: 1.2rem;
}
.admin-topbar-menu-item {
  background: none;
  border: none;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
  padding: 0.3rem 0.7rem;
  border-radius: 5px;
  transition: background 0.2s;
}
.admin-topbar-menu-item:hover {
  background: #006d6d;
}
@media (max-width: 700px) {
  .admin-topbar-fixed {
    height: 54px;
    padding: 0 0.7rem;
    font-size: 1rem;
  }
  .admin-topbar-title {
    font-size: 1.05rem;
  }
  .admin-topbar-menu {
    gap: 0.5rem;
  }
  .admin-topbar-menu-item {
    font-size: 0.95rem;
    padding: 0.2rem 0.5rem;
  }
}
      `}</style>
    </header>
  );
}

export default AdminTopBar;
