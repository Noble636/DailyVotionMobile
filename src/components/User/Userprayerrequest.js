import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../TopBar";

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
  background: linear-gradient(120deg, #08a3ad 0%, #43e9f6 25%, #00c6b2 50%, #008b8b 75%, #005e5e 100%);
  background-size: 200% 200%;
  animation: userlogin-colorwave 12s ease-in-out infinite;
  font-family: 'Segoe UI', Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 20px;
  padding-top: 56px;
  padding-bottom: 30px;
  box-sizing: border-box;
}
@keyframes userlogin-colorwave {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
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
.userprayerrequest-main {
  margin: 1.2rem auto 0;
  max-width: 1400px;
  display: inline-flex;
  flex-direction: row;
  gap: 2.5rem;
  box-sizing: border-box;
  align-items: stretch;
}
.userprayerrequest-main-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}
.userprayerrequest-left-stack {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1 1 0%;
  align-items: stretch;
  margin-bottom: 0.6rem;
  align-self: stretch;
}
.userprayerrequest-left {
  background: radial-gradient(circle at 20% 20%, rgba(220,220,220,0.85) 0%, rgba(220,220,220,0.75) 60%, rgba(200,200,200,0.6) 100%);
  border-radius: 22px;
  box-shadow: 12px 18px 40px 0 rgba(0,0,0,0.32), 4px 8px 16px 0 rgba(0,139,139,0.18);
  padding: 1rem 2rem 1.2rem 2rem;
  min-width: 340px;
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  backdrop-filter: blur(14px) saturate(120%);
  box-sizing: border-box;
  padding-bottom: 0;
  min-height: 0;
}
.userprayerrequest-textarea {
  width: 100%;
  min-height: 140px;
  padding: 0.9rem;
  border-radius: 8px;
  border: 1px solid #cbe7e7;
  font-size: 1.08rem;
  background: #f7f8fa;
  margin-bottom: 1.2rem;
  box-sizing: border-box;
  resize: vertical;
}
.userprayerrequest-btns {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  width: 100%;
}
.userprayerrequest-btn {
  background: linear-gradient(90deg, #08a3ad 0%, #008b8b 100%);
  color: #fff;
  border: none;
  padding: 0.6rem 1.3rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.08rem;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0,139,139,0.12);
  transition: background 0.2s;
}
.userprayerrequest-btn:hover {
  background: linear-gradient(90deg, #008b8b 0%, #08a3ad 100%);
}
.userprayerrequest-cancel-btn {
  background: #d32f2f;
  color: #fff;
  border: none;
  padding: 0.5rem 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
}
.userprayerrequest-right {
  background: radial-gradient(circle at 20% 20%, rgba(220,220,220,0.85) 0%, rgba(220,220,220,0.75) 60%, rgba(200,200,200,0.6) 100%);
  border-radius: 22px;
  box-shadow: 12px 18px 40px 0 rgba(0,0,0,0.32), 4px 8px 16px 0 rgba(0,139,139,0.18);
  padding: 2.5rem 2rem;
  min-width: 340px;
  max-width: 420px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  backdrop-filter: blur(14px) saturate(120%);
  box-sizing: border-box;
  align-self: flex-start;
  max-height: none;
  min-height: 600px;
  outline: none !important;
}
.userprayerrequest-history-title {
  color: #008b8b;
  font-size: 1.15rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.6rem;
}
.userprayerrequest-list {
  margin-top: 0.6rem;
  width: 100%;
  flex: 1 1 auto;                
  overflow-y: auto;              
  padding-right: 8px;
  box-sizing: border-box;
  max-height: calc(100% - 20px); 
}
.userprayerrequest-title {
  color: #008b8b;
  font-size: 2.4rem;
  font-weight: 800;
  margin-top: 0.1rem;
  margin-bottom: 0.7rem;
  text-align: center;
  text-shadow: 0 0 2px #fff, 0 2px 8px #fff, 0 0 8px #008b8b;
  letter-spacing: 0.5px;
}
.userprayerrequest-history-text {
  color: #222;
  font-size: 0.98rem;
  margin-bottom: 0.6rem;
}
.userprayerrequest-response-btn {
  background: #006d6d;
  color: #fff;
  border: none;
  padding: 0.45rem 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.92rem;
}
.userprayerrequest-response {
  background: #fffbe6;
  border-radius: 6px;
  padding: 0.7rem;
  margin-top: 0.6rem;
  color: #333;
}
.userprayerrequest-list::-webkit-scrollbar { width: 10px; }
.userprayerrequest-list::-webkit-scrollbar-thumb { background: rgba(0,139,139,0.18); border-radius: 8px; }
.userprayerrequest-list::-webkit-scrollbar-track { background: transparent; }
.userprayerrequest-bottom-box-left {
  background: radial-gradient(circle at 20% 20%, rgba(220,220,220,0.85) 0%, rgba(220,220,220,0.75) 60%, rgba(200,200,200,0.6) 100%);
  border-radius: 18px;
  padding: 1.2rem 1.2rem;
  box-shadow: 0 6px 16px rgba(60,60,60,0.10);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;
  box-sizing: border-box;
  margin-top: 1.0rem;
  margin-bottom: 0;
  max-width: 600px;
  align-self: center;
}
.userprayerrequest-bottom-title {
  color: #008b8b;
  font-weight: 700;
  font-size: 1.08rem;
  text-align: center;
  text-shadow: 0 0 2px #fff;
}
.userprayerrequest-bottom-box { display: none; }
@media (max-width: 1000px) {
  .userprayerrequest-main { flex-direction: column; align-items: center; gap: 1.25rem; }
  .userprayerrequest-left-stack, .userprayerrequest-right { flex: 0 0 98%; max-width: 98%; }
  .userprayerrequest-right { max-height: none; }
}
@media (max-width: 700px) {
  .userprayerrequest-container {
    padding: 0 4vw 24px 4vw;
    min-height: 100vh;
    box-sizing: border-box;
  }
  .userprayerrequest-main-wrapper {
    width: 100%;
    padding: 0;
  }
  .userprayerrequest-main {
    flex-direction: column !important;
    gap: 1.2rem !important;
    align-items: center !important;
    width: 100%;
    margin: 0;
  }
  .userprayerrequest-left-stack,
  .userprayerrequest-right,
  .userprayerrequest-left,
  .userprayerrequest-bottom-box-left {
    max-width: 100vw !important;
    min-width: 0 !important;
    width: 100% !important;
    border-radius: 12px !important;
    padding-left: 4vw !important;
    padding-right: 4vw !important;
    box-sizing: border-box !important;
  }
  .userprayerrequest-left,
  .userprayerrequest-right {
    padding: 1.2rem 4vw 1.2rem 4vw !important;
    min-width: 0 !important;
    margin: 0 auto 0 auto !important;
    box-shadow: 0 2px 12px rgba(0,0,0,0.10) !important;
  }
  .userprayerrequest-title {
    font-size: 1.3rem !important;
    margin-bottom: 0.5rem !important;
    margin-top: 0.2rem !important;
  }
  .userprayerrequest-explanation,
  .userprayerrequest-bottom-title {
    font-size: 1rem !important;
    text-align: center !important;
  }
  .userprayerrequest-btns {
    flex-direction: column !important;
    gap: 0.7rem !important;
    width: 100% !important;
    align-items: stretch !important;
  }
  .userprayerrequest-btn,
  .userprayerrequest-cancel-btn {
    width: 100% !important;
    font-size: 1.05rem !important;
    padding: 0.7rem 0 !important;
    border-radius: 8px !important;
    margin: 0 !important;
  }
  .userprayerrequest-textarea {
    min-height: 100px !important;
    font-size: 1rem !important;
    padding: 0.7rem !important;
  }
  .userprayerrequest-right {
    margin-top: 1.2rem !important;
    min-height: 0 !important;
    max-height: none !important;
    padding: 1.2rem 4vw !important;
  }
  .userprayerrequest-history-title {
    font-size: 1.1rem !important;
    margin-bottom: 0.5rem !important;
  }
  .userprayerrequest-list {
    max-height: 300px !important;
    padding-right: 0 !important;
  }
}
      `}</style>
      <TopBar
        menuItems={[
          { label: "Profile", link: "/profile" },
          { label: "About", link: "/about" },
          { label: "Logout", link: "/" }
        ]}
      />

      <div className="userprayerrequest-main-wrapper">
        <div className="userprayerrequest-main">
          <div className="userprayerrequest-left-stack">
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
                  style={{ marginLeft: '1rem', background: '#d32f2f', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.4rem 1rem', fontWeight: '500', cursor: 'pointer' }}
                  onClick={() => navigate('/profile')}
                >
                  Cancel
                </button>
              </div>

              {sentNotice && <div className="sent-notice">Sent to admin — thank you.</div>}
            </div>

            <div className="userprayerrequest-bottom-box-left userprayerrequest-static-note">
              <div className="userprayerrequest-bottom-title">Share with the community</div>
              <p>
                Please use the form on the left to submit a prayer request for the church to pray over.
                Requests are reviewed by the admin and may be included in Sunday prayers or receive an admin reply below.
                Thank you for trusting us to stand with you in prayer.
              </p>
            </div>
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
      </div>
    </div>
  );
}

export default Userprayerrequest;
