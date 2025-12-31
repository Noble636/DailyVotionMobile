import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../TopBar";

function Userfeedback() {
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
      await res.json();
      setShowPopup(true);
      setFeedback("");
      setTimeout(() => {
        setShowPopup(false);
        navigate(-1);
      }, 1800);
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
  box-sizing: border-box;
  padding-top: 64px;
}
@keyframes userlogin-colorwave {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}
.userfeedback-main {
  margin-top: 1.2rem;
  width: 100%;
  max-width: 480px;
  background: radial-gradient(circle at 20% 20%, rgba(220,220,220,0.85) 0%, rgba(220,220,220,0.75) 60%, rgba(200,200,200,0.6) 100%);
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.18), 0 2px 8px 0 rgba(0,139,139,0.12);
  padding: 2rem 1.2rem;
  border: 2px solid #fff;
  box-sizing: border-box;
}
.userfeedback-title {
  color: #008b8b;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  text-shadow: 0 0 2px #fff, 0 2px 8px #fff, 0 0 8px #008b8b;
}
.userfeedback-explanation {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1rem;
  text-align: center;
}
.userfeedback-textarea {
  width: 100%;
  margin-top: 1.2rem;
  padding: 0.7rem;
  border-radius: 8px;
  border: 1px solid #cce4e4;
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
  box-sizing: border-box;
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
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.userfeedback-btn:hover {
  background: #006d6d;
}
.userfeedback-cancel-btn {
  background: #d32f2f;
  color: #fff;
  font-weight: 500;
}
@media (max-width: 700px) {
  .userfeedback-main {
    max-width: 98vw;
    padding: 1.2rem 2vw;
    border-radius: 12px;
    margin-top: 0.7rem;
  }
  .userfeedback-title {
    font-size: 1.1rem;
  }
  .userfeedback-explanation {
    font-size: 0.95rem;
  }
  .userfeedback-btns {
    flex-direction: column;
    gap: 0.7rem;
    align-items: stretch;
  }
  .userfeedback-btn,
  .userfeedback-cancel-btn {
    width: 100%;
    margin-left: 0 !important;
  }
}
      `}</style>
      <TopBar
        title="Feedback"
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
        />
        <div className="userfeedback-btns">
          <button className="userfeedback-btn" onClick={handleSave}>Save</button>
          <button
            className="userfeedback-btn userfeedback-cancel-btn"
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
