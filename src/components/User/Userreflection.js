import React, { useState, useEffect } from "react";
import TopBar from "../TopBar";

function UserReflection() {
  const [reflectionText, setReflectionText] = useState("");
  const [reflections, setReflections] = useState([]);
  const [sentNotice, setSentNotice] = useState(false);
  const [loading, setLoading] = useState(true);
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
        setReflections(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const latestReflection = reflections.length > 0 ? reflections[0] : null;

  const myResponses = reflections
    .filter((r) => r.response)
    .map((r) => ({
      id: r.id,
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
          .then((data) => setReflections(data || []));
      })
      .catch(() => {
      });
  };

  return (
    <div className="userreflection-container">
      <style>{`
.userreflection-container {
  min-height: 100vh;
  background: linear-gradient(120deg, #08a3ad 0%, #43e9f6 25%, #00c6b2 50%, #008b8b 75%, #005e5e 100%);
  background-size: 200% 200%;
  animation: userlogin-colorwave 12s ease-in-out infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 64px;
  box-sizing: border-box;
}
@keyframes userlogin-colorwave {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}
.userreflection-container > .topbar-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  z-index: 999;
  box-sizing: border-box;
}
.userreflection-container {
  padding-top: 56px;
}
.userreflection-main {
  margin: 1.4rem auto 0;
  width: 100%;
  max-width: 1200px;
  display: flex;
  gap: 2rem;
  padding: 1.25rem;
  box-sizing: border-box;
  align-items: stretch;
  justify-content: center;
}
.userreflection-left {
  flex: 0 0 480px;
  display: flex;
  flex-direction: column;
  background: radial-gradient(circle at 20% 20%, rgba(220,220,220,0.85) 0%, rgba(220,220,220,0.75) 60%, rgba(200,200,200,0.6) 100%);
  border-radius: 22px;
  padding: 2.5rem 2rem;
  box-shadow: 12px 18px 40px 0 rgba(0,0,0,0.32), 4px 8px 16px 0 rgba(0,139,139,0.18);
  box-sizing: border-box;
  border: 2.5px solid #fff;
  min-width: 340px;
  max-width: 480px;
  width: 100%;
  align-items: center;
  z-index: 2;
  backdrop-filter: blur(14px) saturate(120%);
  min-height: 500px;
}
.userreflection-left-title {
  color: #008b8b;
  text-shadow: 0 0 2px #fff, 0 2px 8px #fff, 0 0 8px #008b8b;
}
.userreflection-left-list {
  overflow-y: auto;
  flex: 1 1 auto;
  padding-right: 8px;
  max-height: calc(100vh - 220px);
  box-sizing: border-box;
}
.userreflection-response-meta { justify-content: flex-end; }
.userreflection-right {
  flex: 1 1 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
  min-width: 420px;
}
.userreflection-verse-card {
  background: radial-gradient(circle at 20% 20%, rgba(220,220,220,0.85) 0%, rgba(220,220,220,0.75) 60%, rgba(200,200,200,0.6) 100%);
  border-radius: 22px;
  padding: 2.5rem 2rem;
  padding-top: 0.5rem !important;
  box-shadow: 12px 18px 40px 0 rgba(0,0,0,0.32), 4px 8px 16px 0 rgba(0,139,139,0.18);
  box-sizing: border-box;
  border: 2.5px solid #fff;
  min-width: 480px;
  max-width: 480px;
  flex: 0 0 480px;
  min-height: 150px;
  max-height: 150px;
  height: 150px !important;
  width: 100%;
  align-items: center;
  z-index: 2;
  backdrop-filter: blur(14px) saturate(120%);
  min-height: 230px;
  height: 250px;
}
.userreflection-verse-title {
  color: #008b8b;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-size: 2rem;
  padding-top: 3.0rem;
  text-shadow: 0 0 2px #fff, 0 2px 8px #fff, 0 0 8px #008b8b;
}
.userreflection-verse-text {
  font-size: 1.18rem;
  color: #234;
  margin-bottom: 0.6rem;
}
.userreflection-verse-meta {
  display: flex;
  justify-content: space-between;
  color: #6b6b6b;
  font-size: 0.92rem;
}
.userreflection-form {
  background: radial-gradient(circle at 20% 20%, rgba(220,220,220,0.85) 0%, rgba(220,220,220,0.75) 60%, rgba(200,200,200,0.6) 100%);
  border-radius: 22px;
  box-shadow: 12px 18px 40px 0 rgba(0,0,0,0.32), 4px 8px 16px 0 rgba(0,139,139,0.18);
  padding: 2.5rem 2rem;
  min-width: 340px;
  max-width: 480px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  backdrop-filter: blur(14px) saturate(120%);
  box-sizing: border-box;
  border: 2.5px solid #fff;
}
.userreflection-form-label {
  font-weight: 600;
  color: #006d6d;
}
.userreflection-textarea {
  min-height: 100px;
  font-size: 1.08rem;
  margin-bottom: 0.7rem;
  resize: none;
  width: 100%;
  border: 1px solid #cce4e4;
  border-radius: 8px;
  padding: 0.8rem;
}
.userreflection-form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}
.userreflection-btn {
  background: #008b8b;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.1rem;
  cursor: pointer;
}
.userreflection-sent {
  color: #fff;
  background: #008b8b;
  padding: 6px 8px;
  border-radius: 6px;
  display: inline-block;
  width: max-content;
  margin-top: 0.25rem;
}
.userreflection-left-list::-webkit-scrollbar { width: 10px; }
.userreflection-left-list::-webkit-scrollbar-thumb { background: rgba(0,139,139,0.18); border-radius: 8px; }
.userreflection-left-list::-webkit-scrollbar-track { background: transparent; }
@media (max-width: 1000px) {
  .userreflection-main { flex-direction: column; padding: 1rem; gap: 1rem; }
  .userreflection-left, .userreflection-right { flex: 0 0 100%; max-width: 100%; }
  .userreflection-textarea { min-height: 100px; }
}
      `}</style>
      <TopBar
        title="Reflection & Journal"
        menuItems={[
          { label: "Profile", link: "/profile" },
          { label: "About", link: "/about" },
        ]}
      />

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
            <span>{latestReflection ? new Date(latestReflection.sent_at).toLocaleString() : ""}</span>
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
          <div className="userreflection-form-actions" style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className="userreflection-btn">
              Submit Reflection
            </button>
            <button
              type="button"
              className="userreflection-cancel-btn"
              style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.4rem 1rem', fontWeight: '500', cursor: 'pointer' }}
              onClick={() => window.location.href = '/profile'}
            >
              Cancel
            </button>
          </div>
          {sentNotice && <div className="userreflection-sent">Reflection submitted — thank you.</div>}
        </form>

        {/* 3. Previous Reflections */}
        <aside className="userreflection-left" style={{ maxWidth: 480, width: "100%" }}>
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
            }
          </div>
        </aside>
      </div>
    </div>
  );
}

export default UserReflection;