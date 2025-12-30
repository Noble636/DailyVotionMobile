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

  // Inline styles
  const styles = {
    container: {
      backgroundColor: '#008b8b',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
    },
    logoFloat: {
      position: 'absolute',
      top: -20,
      left: 10,
      zIndex: 200,
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
    },
    logoImg: {
      height: 90,
      width: 'auto',
      filter: 'drop-shadow(0 8px 32px rgba(0,139,139,0.22))',
    },
    menuBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 8,
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
    },
    menuIcon: {
      display: 'block',
      width: 28,
      height: 4,
      background: '#fff',
      borderRadius: 2,
      position: 'relative',
    },
    dropdownMenu: {
      position: 'absolute',
      top: 50,
      right: 20,
      background: '#008b8b',
      borderRadius: 8,
      boxShadow: '0 4px 16px rgba(0,139,139,0.18)',
      zIndex: 100,
      minWidth: 160,
    },
    ul: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
    },
    li: {
      padding: '12px 20px',
      color: '#fff',
      cursor: 'pointer',
      borderBottom: '1px solid #006d6d',
      transition: 'background 0.2s',
      width: '100%',
      boxSizing: 'border-box',
    },
    liLast: {
      borderBottom: 'none',
    },
    a: {
      color: '#fff',
      textDecoration: 'none',
      display: 'block',
    },
    liHover: {
      background: '#006d6d',
    },
  };

  // For pseudo-elements, inject a <style> tag
  React.useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
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
      .topbar-menu-icon::before { top: -10px; }
      .topbar-menu-icon::after { top: 10px; }
      .topbar-dropdown-menu li:hover { background: #006d6d; }
    `;
    document.head.appendChild(styleTag);
    return () => { document.head.removeChild(styleTag); };
  }, []);

  return (
    <header style={styles.container}>
      <a href="/" style={styles.logoFloat}>
        <img
          src={process.env.PUBLIC_URL + "/JTVCF/home page/logo v3.png"}
          alt="DailyVotion Logo"
          style={styles.logoImg}
        />
      </a>
      <button
        style={styles.menuBtn}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Open menu"
      >
        <span className="topbar-menu-icon" style={styles.menuIcon}></span>
      </button>
      {menuOpen && (
        <div className="topbar-dropdown-menu" style={styles.dropdownMenu}>
          <ul style={styles.ul}>
            {items.map((item, idx) => (
              <li
                key={idx}
                style={{
                  ...styles.li,
                  ...(idx === items.length - 1 && !showLogout ? styles.liLast : {}),
                }}
              >
                <a href={item.link} style={styles.a}>{item.label}</a>
              </li>
            ))}
            {showLogout && (
              <li style={styles.li}>
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
