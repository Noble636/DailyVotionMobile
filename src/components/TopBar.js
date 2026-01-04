import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <style>{`
        .topbar-container {
          background: linear-gradient(135deg, #0b62d6 0%, #044a9f 100%);
          padding: 10px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
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
          background: linear-gradient(135deg, #0b62d6 0%, #044a9f 100%);
          border-radius: 8px;
          box-shadow: 0 4px 16px rgba(4, 74, 159, 0.18);
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
      `}</style>
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
