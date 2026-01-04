import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminTopBar from "./AdminTopBar";
function AdminDashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="admindash-container"
      style={{ background: "#fff" }}
    >
      <style>{`
.admindash-container {
  position: relative;
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  padding-top: 64px;
}
.admindash-container::before {
  content: "";
  position: absolute;
  inset: 0;
  background: transparent;
  pointer-events: none;
  z-index: 0;
}
.admindash-container > * {
  position: relative;
  z-index: 1;
}
.admindash-main {
  flex: 1;
  padding: 0.8rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  scrollbar-width: thin;
  box-sizing: border-box;
}
.admindash-main::-webkit-scrollbar {
  display: none;
}
.admindash-title {
  color: #1a3a52 !important;
  font-size: 2.3rem;
  font-weight: 900;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 2rem 0 1rem 0;
  letter-spacing: 1px;
}
.admindash-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 1fr;
  gap: 1.25rem;
  width: 92%;
  max-width: 1000px;
  margin: 0 auto;
}
.admindash-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(248, 252, 255, 1) 100%);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(44, 90, 160, 0.15), 0 2px 8px 0 rgba(0, 0, 0, 0.08);
  border: 2px solid rgba(44, 90, 160, 0.15);
  padding: 1.5rem 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  min-height: 160px;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  backdrop-filter: blur(10px) saturate(120%);
}
.admindash-card h2 {
  color: #2c5aa0;
  font-size: 1.3rem;
  margin-bottom: 0.7rem;
  font-weight: 700;
  text-shadow: none;
  transition: color 0.3s, transform 0.3s;
}
.admindash-card p {
  color: #556b82;
  font-size: 1rem;
  margin-bottom: 1.2rem;
  line-height: 1.5;
  transition: color 0.3s;
}
.admindash-btn {
  background: linear-gradient(135deg, #2c5aa0 0%, #3d7bb8 100%);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 0.8rem 1.8rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  align-self: center;
  margin-top: auto;
  min-width: 160px;
  box-shadow: 0 6px 20px 0 rgba(44, 90, 160, 0.3);
  letter-spacing: 0.3px;
}
.admindash-btn:hover {
  background: linear-gradient(135deg, #3d7bb8 0%, #4a8dd9 100%);
  box-shadow: 0 10px 32px 0 rgba(44, 90, 160, 0.4);
  transform: translateY(-3px) scale(1.03);
}
@media (max-width: 700px) {
  .admindash-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.6rem;
    width: 98vw;
    max-width: 98vw;
    box-sizing: border-box;
    margin: 0 auto;
  }
  .admindash-card {
    min-width: 0;
    max-width: 99%;
    min-height: 100px;
    padding: 0.5rem 0.3rem;
    font-size: 0.95rem;
    box-sizing: border-box;
  }
  .admindash-title {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  .admindash-card h2 {
    font-size: 1rem;
  }
  .admindash-btn {
    min-width: 100px;
    font-size: 0.95rem;
    padding: 0.5rem 0.7rem;
  }
}
      `}</style>
      <AdminTopBar
        menuItems={[
          { label: "Home", link: "/" },
          { label: "User Login", link: "/login" },
          { label: "About", link: "/about" }
        ]}
      />
      <div className="admindash-main">
        <h1 className="admindash-title">Admin Dashboard</h1>

        <div className="admindash-grid">
          <div className="admindash-card">
            <h2>User Account Management</h2>
            <p>
              Manage user accounts, including registration, roles, and access control.
            </p>
            <button
              className="admindash-btn"
              onClick={() => navigate("/Manageuser")}
            >
              Manage Users
            </button>
          </div>

          <div className="admindash-card">
            <h2>Devotional Content Delivery</h2>
            <p>
              Schedule and deliver daily devotionals, scriptures, and reflections to users.
            </p>
            <button
              className="admindash-btn"
              onClick={() => navigate("/Managecontent")}
            >
              Manage Content
            </button>
          </div>

          <div className="admindash-card">
            <h2>Interactive Prayer</h2>
            <p>
              Oversee prayer requests, inspirational quotes, responses, and interactive features.
            </p>
            <button className="admindash-btn" onClick={() => navigate("/manageprayer")}>Manage Prayers</button>
          </div>

          <div className="admindash-card">
            <h2>Application Feedback</h2>
            <p>
              Users can rate and provide feedback about their experience using the app.
            </p>
            <button className="admindash-btn" onClick={() => navigate("/managefeedback")}>Manage Feedback</button>
          </div>

          <div className="admindash-card" style={{ gridColumn: "1 / span 2", justifySelf: "center" }}>
            <h2>Gallery & Bible Guide</h2>
            <p>
              Upload pictures for gallery albums and Bible Reading Guide.
            </p>
            <button className="admindash-btn" onClick={() => navigate("/adminaddpictures")}>Upload Pictures</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
