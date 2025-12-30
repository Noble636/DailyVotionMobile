import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/TopBar.css";

const TopBar = ({ menuItems }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Remove Logout from items, will add manually below About only on profile page
  const items = (menuItems ?? [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" }
  ]).filter(item => item.label !== "Logout");

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  // Only show Logout button if on user profile page
  const showLogout = window.location.pathname === "/profile";

  return (
    <header className="topbar-container">
      <a href="/" className="topbar-logo-float">
        <img
          src={process.env.PUBLIC_URL + "/JTVCF/home page/logo v3.png"}
          alt="DailyVotion Logo"
          className="topbar-logo-float-img"
        />
      </a>
      <button
        className="topbar-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Open menu"
      >
        <span className="topbar-menu-icon"></span>
      </button>
      {menuOpen && (
        <div className="topbar-dropdown-menu">
          <ul>
            {items.map((item, idx) => (
              <li key={idx}><a href={item.link}>{item.label}</a></li>
            ))}
            {/* Logout button below About, only on profile page, styled like other items */}
            {showLogout && (
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
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

export default TopBar;
