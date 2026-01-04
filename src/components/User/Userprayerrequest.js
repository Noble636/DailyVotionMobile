import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Userprayerrequest() {
  const [prayer, setPrayer] = useState("");
  const [requests, setRequests] = useState([]);
  const [showResponseId, setShowResponseId] = useState(null);
  const [sentNotice, setSentNotice] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetch(`https://dailyvotionbackend-91wt.onrender.com/api/user/${userId}/prayer`)
        .then(res => res.json())
        .then(data => setRequests(data));
    }
  }, []);

  const handleSubmit = async () => {
    if (!prayer.trim()) return;
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not logged in.');
      return;
    }
    try {
      const res = await fetch(`https://dailyvotionbackend-91wt.onrender.com/api/user/${userId}/prayer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: prayer })
      });
      const data = await res.json();
      if (res.ok) {
        setRequests([data.prayer, ...requests]);
        setPrayer("");
        setSentNotice(true);
        setTimeout(() => setSentNotice(false), 3000);
      } else {
        alert(data.error || 'Failed to submit prayer request.');
      }
    } catch (err) {
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className="userprayerrequest-container">
      <style>{`
.userprayerrequest-container {
  min-height: 100vh;
  background: #f5f7fb;
  font-family: 'Segoe UI', Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 20px 32px 20px;
  padding-top: 72px;
  box-sizing: border-box;
  color: #0f172a;
  position: relative;
}
.userprayerrequest-container > .topbar-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 999;
  box-sizing: border-box;
}
.userprayerrequest-main-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}
.userprayerrequest-main {
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 0 auto;
}
.userprayerrequest-back-btn {
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
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(11, 98, 214, 0.25);
}
.userprayerrequest-back-btn:focus-visible {
  outline: 3px solid #93c5fd;
  outline-offset: 2px;
}
@media (max-width: 640px) {
  .userprayerrequest-back-btn {
    top: 70px;
    right: 14px;
    padding: 0.4rem 0.75rem;
  }
}
.userprayerrequest-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  padding: 1.5rem;
  box-sizing: border-box;
}
.userprayerrequest-top {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.userprayerrequest-title {
  color: #0b62d6;
  font-size: 1.6rem;
  font-weight: 800;
  margin: 0 0 0.4rem 0;
}
.userprayerrequest-explanation {
  margin: 0 0 1rem 0;
  color: #334155;
  line-height: 1.5;
  font-size: 1rem;
}
.userprayerrequest-textarea {
  width: 100%;
  min-height: 120px;
  padding: 0.9rem 1rem;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  font-size: 1rem;
  background: #f8fafc;
  margin-bottom: 1rem;
  box-sizing: border-box;
  resize: vertical;
  color: #0f172a;
}
.userprayerrequest-textarea:focus {
  outline: 2px solid #0b62d6;
  outline-offset: 2px;
  border-color: #0b62d6;
}
.userprayerrequest-btns {
  display: flex;
  gap: 0.8rem;
  justify-content: flex-end;
  width: 100%;
  flex-wrap: wrap;
}
.userprayerrequest-btn {
  background: #0b62d6;
  color: #fff;
  border: none;
  padding: 0.7rem 1.4rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 6px 16px rgba(11, 98, 214, 0.25);
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}
.userprayerrequest-btn:focus-visible {
  outline: 3px solid #93c5fd;
  outline-offset: 2px;
}
.userprayerrequest-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(11, 98, 214, 0.28);
}
.userprayerrequest-left {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.userprayerrequest-cancel-btn {
  background: #475467;
  color: #fff;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(71, 84, 103, 0.2);
}
.userprayerrequest-cancel-btn:focus-visible {
  outline: 3px solid #cbd5e1;
  outline-offset: 2px;
}
.userprayerrequest-right {
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: #f8fafc;
  padding: 1.1rem 1.2rem;
  box-sizing: border-box;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.userprayerrequest-history-title {
  color: #0b62d6;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: left;
  margin: 0;
}
.userprayerrequest-list {
  margin-top: 0.4rem;
  width: 100%;
  flex: 1 1 auto;
  overflow-y: auto;
  padding-right: 6px;
  box-sizing: border-box;
  max-height: 520px;
}
.userprayerrequest-item {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.85rem 0.9rem;
  margin-bottom: 0.7rem;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
}
.userprayerrequest-date {
  color: #475467;
  font-size: 0.92rem;
}
.request-status {
  font-size: 0.88rem;
  font-weight: 700;
  padding: 0.28rem 0.6rem;
  border-radius: 999px;
  text-transform: capitalize;
}
.request-status.pending { background: #fff7ed; color: #c2410c; border: 1px solid #fed7aa; }
.request-status.responded { background: #ecfdf3; color: #047857; border: 1px solid #bbf7d0; }
.userprayerrequest-history-text {
  color: #0f172a;
  font-size: 0.98rem;
  margin: 0.55rem 0;
  line-height: 1.45;
}
.userprayerrequest-response-btn {
  background: #0b62d6;
  color: #fff;
  border: none;
  padding: 0.55rem 0.9rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
}
.userprayerrequest-response-btn:focus-visible {
  outline: 3px solid #93c5fd;
  outline-offset: 2px;
}
.userprayerrequest-response {
  background: #e0f2fe;
  border-radius: 10px;
  padding: 0.75rem 0.85rem;
  margin-top: 0.6rem;
  color: #0f172a;
  border: 1px solid #bfdbfe;
}
.userprayerrequest-list::-webkit-scrollbar { width: 10px; }
.userprayerrequest-list::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 8px; }
.userprayerrequest-list::-webkit-scrollbar-track { background: transparent; }
.userprayerrequest-bottom-box-left {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem 1.1rem;
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}
.userprayerrequest-bottom-title {
  color: #0b62d6;
  font-weight: 700;
  font-size: 1.05rem;
  text-align: left;
  margin: 0;
}
.sent-notice {
  margin-top: 0.8rem;
  background: #ecfdf3;
  color: #065f46;
  border: 1px solid #bbf7d0;
  padding: 0.55rem 0.75rem;
  border-radius: 10px;
  font-weight: 600;
  width: 100%;
  text-align: center;
}
@media (max-width: 960px) {
  .userprayerrequest-btns {
    justify-content: flex-start;
  }
}
@media (max-width: 640px) {
  .userprayerrequest-container {
    padding: 0 16px 24px 16px;
    padding-top: 76px;
  }
  .userprayerrequest-card {
    padding: 0.85rem;
  }
  .userprayerrequest-title {
    text-align: center;
    font-size: 1.3rem;
  }
  .userprayerrequest-explanation {
    text-align: center;
    font-size: 0.95rem;
  }
  .userprayerrequest-top {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }
  .userprayerrequest-textarea {
    min-height: 80px;
    padding: 0.75rem 0.85rem;
  }
  .userprayerrequest-btns {
    flex-direction: column;
    align-items: stretch;
  }
  .userprayerrequest-btn,
  .userprayerrequest-cancel-btn {
    width: 100%;
    text-align: center;
  }
  .userprayerrequest-right {
    min-height: auto;
    margin-top: 0.4rem;
  }
  .userprayerrequest-list {
    max-height: none;
  }
}
      `}</style>


      <style>{`
        .prayer-back-btn {
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
        .prayer-back-btn:hover {
          background: linear-gradient(135deg, #044a9f 0%, #033d82 100%);
          transform: translateY(-2px);
        }
        .prayer-back-btn:active {
          transform: scale(0.97);
        }
      `}</style>
      <button
        className="prayer-back-btn"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Back
      </button>

      <div className="userprayerrequest-main-wrapper">
        <div className="userprayerrequest-main">
          <div className="userprayerrequest-card">
            <div className="userprayerrequest-top">
              <div className="userprayerrequest-left">
                <div className="userprayerrequest-title">Add Prayer Request</div>
                <div className="userprayerrequest-explanation">
                  Type your prayer request below. It will be reviewed by the admin team.
                </div>

                <textarea
                  className="userprayerrequest-textarea"
                  value={prayer}
                  onChange={e => setPrayer(e.target.value)}
                  placeholder="Type your prayer request here..."
                />

                <div className="userprayerrequest-btns">
                  <button className="userprayerrequest-btn" onClick={handleSubmit}>Submit</button>
                  <button
                    className="userprayerrequest-cancel-btn"
                    onClick={() => navigate('/profile')}
                  >
                    Cancel
                  </button>
                </div>

                {sentNotice && <div className="sent-notice">Sent to admin — thank you.</div>}
              </div>

              <div className="userprayerrequest-right">
                <div className="userprayerrequest-history-title">Prayer Request History</div>

                <div className="userprayerrequest-list">
                  {requests.map(req => (
                    <div className="userprayerrequest-item" key={req.id}>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <div className="userprayerrequest-date">{req.date ? req.date.slice(0, 10) : ""}</div>
                        <div className={`request-status ${req.status}`}>{req.status === "pending" ? "Pending" : "Responded"}</div>
                      </div>

                      <div className="userprayerrequest-history-text">{req.text}</div>

                      <button
                        className="userprayerrequest-response-btn"
                        onClick={() => setShowResponseId(showResponseId === req.id ? null : req.id)}
                      >
                        {showResponseId === req.id ? "Hide Response" : "View Admin Response"}
                      </button>

                      {showResponseId === req.id && req.response && (
                        <div className="userprayerrequest-response">{req.response}</div>
                      )}
                      {showResponseId === req.id && !req.response && (
                        <div className="userprayerrequest-response">No response yet.</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="userprayerrequest-bottom-box-left userprayerrequest-static-note">
              <div className="userprayerrequest-bottom-title">Share with the community</div>
              <p>
                Please use the form above to submit a prayer request for the church to pray over.
                Requests are reviewed by the admin and may be included in Sunday prayers or receive an admin reply below.
                Thank you for trusting us to stand with you in prayer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userprayerrequest;
