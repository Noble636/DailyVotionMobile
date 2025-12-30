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
    <header className="topbar-mobile-container">
      <style>{`
.topbar-mobile-container {
  background-color: #008b8b;
  padding: 8px 0 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100vw;
  min-height: 60px;
  z-index: 100;
}
.topbar-logo-float {
  position: absolute;
  left: 12px;
  top: 4px;
  z-index: 200;
  display: flex;
  align-items: center;
  text-decoration: none;
}
.topbar-logo-float-img {
  height: 54px;
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
  position: absolute;
  right: 12px;
  top: 10px;
  z-index: 201;
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
.topbar-mobile-title {
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  margin: 0 auto;
  text-align: center;
  letter-spacing: 1px;
}
.topbar-dropdown-menu {
  position: absolute;
  top: 60px;
  right: 8px;
  background: #008b8b;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0,139,139,0.18);
  z-index: 300;
  min-width: 160px;
  width: 70vw;
  max-width: 260px;
  animation: fadeInMenu 0.2s;
}
@keyframes fadeInMenu {
  from { opacity: 0; transform: translateY(-10px);}
  to { opacity: 1; transform: translateY(0);}
}
.topbar-dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.topbar-dropdown-menu li {
  padding: 14px 20px;
  color: #fff;
  cursor: pointer;
  border-bottom: 1px solid #006d6d;
  transition: background 0.2s;
  width: 100%;
  box-sizing: border-box;
  font-size: 1.08rem;
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
  width: 100%;
}
.topbar-dropdown-menu button {
  background: none;
  border: none;
  color: #fff;
  font-weight: normal;
  font-size: inherit;
  cursor: pointer;
  width: 100%;
  text-align: left;
  padding: 0;
  margin: 0;
}
@media (max-width: 500px) {
  .topbar-mobile-title {
    font-size: 1rem;
  }
  .topbar-dropdown-menu {
    min-width: 120px;
    width: 90vw;
    max-width: 98vw;
  }
}
      `}</style>
      <a href="/" className="topbar-logo-float">
        <img
          src={process.env.PUBLIC_URL + "/JTVCF/home page/logo v3.png"}
          alt="DailyVotion Logo"
          className="topbar-logo-float-img"
        />
      </a>
      <div className="topbar-mobile-title">Daily Votion</div>
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
