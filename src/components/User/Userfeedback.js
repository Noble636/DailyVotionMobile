import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../TopBar";

function Userfeedback() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    const userId = localStorage.getItem('userId');
    if (!feedback.trim() || !userId) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1800);
      return;
    }
    try {
      const res = await fetch(`https://dailyvotionbackend-91wt.onrender.com/api/user/${userId}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: feedback })
      });
      const data = await res.json();
      if (res.ok) {
        setShowPopup(true);
        setFeedback("");
        setTimeout(() => {
          setShowPopup(false);
          navigate(-1);
        }, 1800);
      } else {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 1800);
      }
    } catch (err) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1800);
    }
  };

  const handleCancel = () => {
    setFeedback("");
    navigate(-1);
  };
  return (
    <div className="userfeedback-container">
      <style>{`
.userfeedback-container {
  min-height: 100vh;
  background: linear-gradient(120deg, #08a3ad 0%, #43e9f6 25%, #00c6b2 50%, #008b8b 75%, #005e5e 100%);
  background-size: 200% 200%;
  animation: userlogin-colorwave 12s ease-in-out infinite;
  font-family: 'Segoe UI', Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  box-sizing: border-box;
  padding-top: 70px;
}
@keyframes userlogin-colorwave {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}
.userfeedback-container > .topbar-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  z-index: 999;
  box-sizing: border-box;
}
.userfeedback-main {
  margin-top: 2.5rem;
  width: 100%;
  max-width: 500px;
  background: radial-gradient(circle at 20% 20%, rgba(220,220,220,0.85) 0%, rgba(220,220,220,0.75) 60%, rgba(200,200,200,0.6) 100%);
  border-radius: 22px;
  box-shadow: 12px 18px 40px 0 rgba(0,0,0,0.32), 4px 8px 16px 0 rgba(0,139,139,0.18);
  padding: 2.5rem 2rem;
  border: 2.5px solid #fff;
}
.userfeedback-topbar {
  background-color: #008b8b;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  width: 100vw;
  left: 0;
  right: 0;
  box-sizing: border-box;
  margin: 0;
  position: relative;
  display: none;
}
.userfeedback-logo {
  color: white;
  font-weight: bold;
  font-size: 20px;
}
.userfeedback-menu-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  margin-left: auto;
  display: flex;
  align-items: center;
}
.userfeedback-menu-icon {
  display: block;
  width: 28px;
  height: 4px;
  background: #fff;
  border-radius: 2px;
  position: relative;
}
.userfeedback-menu-icon span {
  position: absolute;
  left: 0;
  width: 28px;
  height: 4px;
  background: #fff;
  border-radius: 2px;
}
.userfeedback-menu-icon span:first-child {
  top: -8px;
}
.userfeedback-menu-icon span:last-child {
  top: 8px;
}
.userfeedback-dropdown-menu {
  position: absolute;
  top: 54px;
  right: 32px;
  background: #008b8b;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,139,139,0.18);
  z-index: 100;
  min-width: 180px;
}
.userfeedback-dropdown-menu ul {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.userfeedback-link-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  text-align: left;
  padding: 10px 16px;
  border-radius: 6px;
  margin: 2px 0;
  transition: background 0.2s, text-shadow 0.2s, text-decoration 0.2s;
}
.userfeedback-link-btn:hover {
  background: #006d6d;
  text-decoration: underline;
  text-shadow: 0 0 8px #fff, 0 0 16px #008b8b;
}
.userfeedback-title {
  color: #008b8b;
  font-size: 1.7rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  text-shadow: 0 0 2px #fff, 0 2px 8px #fff, 0 0 8px #008b8b;
}
.userfeedback-explanation {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1rem;
}
.userfeedback-textarea {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  margin-top: 1.2rem;
  padding: 0.7rem;
  border-radius: 6px;
  border: 1px solid #cce4e4;
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
}
.userfeedback-btns {
  display: flex;
  gap: 1rem;
  margin-top: 1.2rem;
  justify-content: flex-end;
}
.userfeedback-btn {
  background: #008b8b;
  color: #fff;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.userfeedback-btn:hover {
  background: #006d6d;
}
      `}</style>
      <TopBar
        menuItems={[
          { label: "Profile", link: "/profile" },
          { label: "Journal", link: "/journal" },
          { label: "About", link: "/about" },
          { label: "Logout", link: "/" }
        ]}
      />
      <div className="userfeedback-main">
        <div className="userfeedback-title">App Feedback & Report</div>
        <div className="userfeedback-explanation">
          You can share your feedback or report any issues you encounter. Your input helps us improve the app experience for everyone.
        </div>
        <textarea
          className="userfeedback-textarea"
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          placeholder="Type your feedback or report here..."
          style={{ marginLeft: '0.5rem', marginRight: '0.5rem', width: 'calc(100% - 1rem)' }}
        />
        <div className="userfeedback-btns">
          <button className="userfeedback-btn" onClick={handleSave}>Save</button>
          <button
            className="userfeedback-btn"
            style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.4rem 1rem', fontWeight: '500', cursor: 'pointer', marginLeft: '1rem' }}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
        {showPopup && (
          <div style={{
            position: 'fixed',
            top: '25%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#e0f7fa',
            color: '#008b8b',
            padding: '1.2rem 2.2rem',
            borderRadius: '14px',
            fontWeight: 600,
            fontSize: '1.15rem',
            boxShadow: '0 4px 16px rgba(8,163,173,0.18)',
            zIndex: 9999,
            textAlign: 'center'
          }}>
            Your feedback has been recorded successfully!
          </div>
        )}
      </div>
    </div>
  );
}

export default Userfeedback;
