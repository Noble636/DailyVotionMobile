import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserReflection() {
  const [reflectionText, setReflectionText] = useState("");
  const [reflections, setReflections] = useState([]);
  const [sentNotice, setSentNotice] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`https://dailyvotionbackend-91wt.onrender.com/api/user/${userId}/reflections`)
      .then((res) => res.json())
      .then((data) => {
        setReflections(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const latestReflection = reflections.length > 0 ? reflections[0] : null;

  const myResponses = reflections
    .filter((r) => r.response)
    .map((r, idx) => ({
      id: r.id || idx, // fallback to index if id is missing
      adminMessage: r.message || r.adminMessage || "",
      adminName: "Admin",
      sent_at: r.sent_at,
      response: r.response,
      responded_at: r.responded_at,
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reflectionText.trim() || !latestReflection) return;
    const userId = localStorage.getItem("userId");
    fetch(
      `https://dailyvotionbackend-91wt.onrender.com/api/user/${userId}/reflection/${latestReflection.id}/response`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response: reflectionText }),
      }
    )
      .then((res) => res.json())
      .then(() => {
        setReflectionText("");
        setSentNotice(true);
        setTimeout(() => setSentNotice(false), 2500);
        fetch(`https://dailyvotionbackend-91wt.onrender.com/api/user/${userId}/reflections`)
          .then((res) => res.json())
          .then((data) => setReflections(Array.isArray(data) ? data : []));
      })
      .catch(() => {});
  };

  return (
    <div className="userreflection-container">
      <style>{`
.userreflection-container {
  min-height: 100vh;
  background: #f5f7fb;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 72px;
  box-sizing: border-box;
  color: #0f172a;
  position: relative;
}
.userreflection-main {
  margin: 1.4rem auto 0;
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.1rem;
  box-sizing: border-box;
  align-items: center;
  justify-content: flex-start;
}
.userreflection-verse-card,
.userreflection-form,
.userreflection-left {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  box-sizing: border-box;
  max-width: 520px;
  width: 100%;
  align-items: center;
  margin: 0 auto;
}
.userreflection-verse-card {
  padding: 1.6rem 1.4rem 1.2rem 1.4rem;
  min-height: 180px;
  height: auto;
}
.userreflection-verse-title {
  color: #0b62d6;
  font-weight: 800;
  margin-bottom: 0.45rem;
  font-size: 1.6rem;
  padding-top: 0.4rem;
  text-align: center;
}
.userreflection-verse-text {
  font-size: 1.05rem;
  color: #0f172a;
  margin-bottom: 0.7rem;
  text-align: center;
  line-height: 1.5;
}
.userreflection-verse-meta {
  display: flex;
  justify-content: space-between;
  color: #475467;
  font-size: 0.95rem;
  width: 100%;
}
.userreflection-form {
  padding: 1.4rem 1.4rem 1.2rem 1.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.userreflection-form-label {
  font-weight: 700;
  color: #0f172a;
}
.userreflection-textarea {
  min-height: 110px;
  font-size: 1.02rem;
  margin-bottom: 0.8rem;
  resize: none;
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  padding: 0.85rem 1rem;
  background: #f8fafc;
  color: #0f172a;
}
.userreflection-textarea:focus {
  outline: 2px solid #0b62d6;
  outline-offset: 2px;
  border-color: #0b62d6;
}
.userreflection-form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
  gap: 1rem;
  width: 100%;
}
.userreflection-btn {
  background: #0b62d6;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.7rem 1.2rem;
  cursor: pointer;
  font-weight: 700;
  box-shadow: 0 6px 16px rgba(11, 98, 214, 0.22);
}
.userreflection-btn:focus-visible {
  outline: 3px solid #93c5fd;
  outline-offset: 2px;
}
.userreflection-cancel-btn {
  background: #475467;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.7rem 1.1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(71, 84, 103, 0.2);
}
.userreflection-cancel-btn:focus-visible {
  outline: 3px solid #cbd5e1;
  outline-offset: 2px;
}
.userreflection-sent {
  color: #065f46;
  background: #ecfdf3;
  border: 1px solid #bbf7d0;
  padding: 8px 10px;
  border-radius: 10px;
  display: inline-block;
  width: 100%;
  text-align: center;
  margin-top: 0.4rem;
}
.userreflection-left {
  display: flex;
  flex-direction: column;
  padding: 1.3rem 1.2rem 1.1rem 1.2rem;
  min-width: 240px;
  min-height: 200px;
  max-height: 320px;
  overflow-y: auto;
}
.userreflection-left-title {
  color: #0b62d6;
  text-align: center;
  margin-bottom: 0.7rem;
  font-weight: 800;
}
.userreflection-left-list {
  overflow-y: auto;
  flex: 1 1 auto;
  padding-right: 8px;
  max-height: 220px;
  box-sizing: border-box;
  width: 100%;
}
.userreflection-response-item {
  margin-bottom: 1.2rem;
  background: #f8fafc;
  border-radius: 12px;
  padding: 0.8rem 1rem;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
  border: 1px solid #e2e8f0;
}
.userreflection-response-meta {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9rem;
  color: #475467;
  margin-bottom: 0.2rem;
}
.userreflection-response-admin {
  font-size: 1rem;
  color: #0f172a;
  margin-bottom: 0.2rem;
}
.userreflection-response-text {
  font-size: 1rem;
  color: #0f172a;
}
.TopBar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 100;
  background: #0b62d6;
  box-shadow: 0 2px 10px rgba(11,98,214,0.25);
}
.userreflection-back-btn {
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
.userreflection-back-btn:focus-visible {
  outline: 3px solid #93c5fd;
  outline-offset: 2px;
}
@media (max-width: 700px) {
  .userreflection-back-btn {
    top: 72px;
    right: 14px;
    padding: 0.4rem 0.75rem;
  }
}
@media (max-width: 700px) {
  .userreflection-main {
    padding: 0.65rem;
    gap: 0.9rem;
  }
  .userreflection-verse-card,
  .userreflection-form,
  .userreflection-left {
    max-width: 98vw;
    min-width: 0;
    width: 100%;
    border-radius: 12px;
    padding-left: 4vw;
    padding-right: 4vw;
  }
  .userreflection-verse-title {
    font-size: 1.25rem;
    padding-top: 0.4rem;
  }
  .userreflection-verse-text {
    font-size: 0.98rem;
  }
  .userreflection-form {
    padding: 1rem 4vw 0.9rem 4vw;
  }
  .userreflection-left {
    padding: 1rem 4vw 0.9rem 4vw;
    max-height: 220px;
  }
  .userreflection-left-list {
    max-height: 120px;
    padding-right: 0;
  }
}
      `}</style>


      <style>{`
        .reflection-back-btn {
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
        .reflection-back-btn:hover {
          background: linear-gradient(135deg, #044a9f 0%, #033d82 100%);
          transform: translateY(-2px);
        }
        .reflection-back-btn:active {
          transform: scale(0.97);
        }
      `}</style>
      <button
        className="reflection-back-btn"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Back
      </button>

      <div className="userreflection-main">
        {/* 1. Reflection & Journal sent by admin */}
        <div className="userreflection-verse-card">
          <div className="userreflection-verse-title">Reflection & Journal</div>
          <div className="userreflection-verse-text">
            {latestReflection ? (
              latestReflection.message
            ) : (
              <span style={{ color: "#888" }}>No reflection sent by admin yet.</span>
            )}
          </div>
          <div className="userreflection-verse-meta">
            <span>Sent by: Admin</span>
            <span>{latestReflection && latestReflection.sent_at ? new Date(latestReflection.sent_at).toLocaleString() : ""}</span>
          </div>
        </div>

        {/* 2. Write your reflection */}
        <form className="userreflection-form" onSubmit={handleSubmit}>
          <textarea
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            placeholder="Write your reflection..."
            className="userreflection-textarea"
            rows={6}
          />
          <div className="userreflection-form-actions">
            <button type="submit" className="userreflection-btn">
              Submit Reflection
            </button>
            <button
              type="button"
              className="userreflection-cancel-btn"
              onClick={() => window.location.href = '/profile'}
            >
              Cancel
            </button>
          </div>
          {sentNotice && <div className="userreflection-sent">Reflection submitted — thank you.</div>}
        </form>

        {/* 3. Previous Reflections */}
        <aside className="userreflection-left">
          <h3 className="userreflection-left-title">Previous Reflections</h3>
          <div className="userreflection-left-list">
            {loading ? (
              <div>Loading...</div>
            ) : myResponses.length === 0 ? (
              <div style={{ color: "#888" }}>No previous reflections yet.</div>
            ) : (
              myResponses.map((resp) => (
                <div key={resp.id} className="userreflection-response-item">
                  <div className="userreflection-response-meta">
                    <span className="userreflection-response-date">
                      {resp.responded_at ? new Date(resp.responded_at).toLocaleString() : ""}
                    </span>
                  </div>
                  <div className="userreflection-response-admin">
                    <strong>Admin:</strong> {resp.adminMessage}
                  </div>
                  <div className="userreflection-response-text">
                    <strong>Your Reflection:</strong> {resp.response}
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default UserReflection;