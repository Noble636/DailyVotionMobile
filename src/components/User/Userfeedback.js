import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Userfeedback() {
  const [feedback, setFeedback] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    const userId = localStorage.getItem("userId");
    if (!feedback.trim() || !userId) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1800);
      return;
    }
    try {
      const res = await fetch(
        `https://dailyvotionbackend-91wt.onrender.com/api/user/${userId}/feedback`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: feedback })
        }
      );
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
    <>

      <div className="userfeedback-container">
        <style>{`
.userfeedback-container {
  min-height: 100vh;
  background: #f5f7fb;
  font-family: 'Segoe UI', Arial, sans-serif;
  box-sizing: border-box;
  padding: 72px 16px 32px 16px;
  color: #0f172a;
  position: relative;
}
.userfeedback-main {
  margin: 1.2rem auto 0 auto;
  width: 100%;
  max-width: 520px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  padding: 1.6rem 1.2rem 1.3rem 1.2rem;
  box-sizing: border-box;
}
.userfeedback-title {
  color: #0b62d6;
  font-size: 1.45rem;
  font-weight: 800;
  margin-bottom: 0.8rem;
  text-align: center;
}
.userfeedback-explanation {
  color: #334155;
  margin-bottom: 1rem;
  font-size: 1rem;
  text-align: center;
  line-height: 1.5;
}
.userfeedback-textarea {
  width: 100%;
  margin-top: 1.2rem;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  font-size: 1.02rem;
  min-height: 100px;
  resize: vertical;
  box-sizing: border-box;
  background: #f8fafc;
  color: #0f172a;
}
.userfeedback-textarea:focus {
  outline: 2px solid #0b62d6;
  outline-offset: 2px;
  border-color: #0b62d6;
}
.userfeedback-btns {
  display: flex;
  gap: 1rem;
  margin-top: 1.2rem;
  justify-content: flex-end;
}
.userfeedback-btn {
  background: #0b62d6;
  color: #fff;
  border: none;
  padding: 0.65rem 1.2rem;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
  font-weight: 700;
  box-shadow: 0 6px 16px rgba(11, 98, 214, 0.22);
}
.userfeedback-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(11, 98, 214, 0.26);
}
.userfeedback-btn:focus-visible {
  outline: 3px solid #93c5fd;
  outline-offset: 2px;
}
.userfeedback-cancel-btn {
  background: #475467;
  color: #fff;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(71, 84, 103, 0.2);
}
.userfeedback-cancel-btn:focus-visible {
  outline: 3px solid #cbd5e1;
  outline-offset: 2px;
}
.userfeedback-back-btn {
  position: absolute;
  right: 20px;
  top: 78px;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: #0b62d6;
  color: #fff;
  border: none;
  padding: 0.45rem 0.85rem;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(11, 98, 214, 0.25);
}
.userfeedback-back-btn:focus-visible {
  outline: 3px solid #93c5fd;
  outline-offset: 2px;
}
@media (max-width: 700px) {
  .userfeedback-main {
    max-width: 98vw;
    padding: 1.1rem 4vw 1rem 4vw;
    border-radius: 12px;
    margin-top: 0.7rem;
  }
  .userfeedback-title {
    font-size: 1.2rem;
  }
  .userfeedback-explanation {
    font-size: 0.96rem;
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
    text-align: center;
  }
  .userfeedback-back-btn {
    top: 70px;
    right: 14px;
    padding: 0.4rem 0.75rem;
  }
}
        `}</style>

        <style>{`
          .feedback-back-btn {
            position: fixed;
            top: 12px;
            right: 12px;
            left: auto;
            background: linear-gradient(135deg, #0b62d6 0%, #044a9f 100%);
            color: #ffffff;
            border: none;
            padding: 0.6rem 1rem;
            border-radius: 12px;
            font-size: 0.95rem;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(11, 98, 214, 0.25);
            transition: all 0.2s ease;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            min-height: 44px;
            touch-action: manipulation;
          }
          .feedback-back-btn:hover {
            background: linear-gradient(135deg, #044a9f 0%, #033d82 100%);
            transform: translateY(-2px);
          }
          .feedback-back-btn:active {
            transform: scale(0.97);
          }
        `}</style>
        <button
          className="feedback-back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Back
        </button>

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
              background: '#ecfdf3',
              color: '#065f46',
              padding: '1.2rem 2.2rem',
              borderRadius: '14px',
              fontWeight: 700,
              fontSize: '1.05rem',
              boxShadow: '0 4px 16px rgba(15, 23, 42, 0.12)',
              border: '1px solid #bbf7d0',
              zIndex: 9999,
              textAlign: 'center'
            }}>
              Your feedback has been recorded successfully!
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Userfeedback;
