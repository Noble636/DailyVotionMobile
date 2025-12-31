import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../TopBar";

function UserRegister() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !password.trim()) {
      setWarning("Please fill in all fields.");
      return;
    }
    setWarning("");
    try {
      const res = await fetch("https://dailyvotionbackend-91wt.onrender.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/login");
      } else {
        setWarning(data.error || "Registration failed");
      }
    } catch (err) {
      setWarning("Server error. Please try again later.");
    }
  };

  return (
    <>
      <TopBar
        title="Register"
        menuItems={[
          { label: "Home", link: "/" },
          { label: "Login", link: "/login" },
          { label: "About", link: "/about" }
        ]}
      />
      <div className="userregister-container">
        <style>{`
.userregister-container {
  min-height: 100vh;
  background: linear-gradient(120deg, #08a3ad 0%, #43e9f6 25%, #00c6b2 50%, #008b8b 75%, #005e5e 100%);
  background-size: 200% 200%;
  animation: userlogin-colorwave 12s ease-in-out infinite;
  font-family: 'Segoe UI', Arial, sans-serif;
  box-sizing: border-box;
  padding-top: 64px;
}
@keyframes userlogin-colorwave {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}
.userregister-main {
  margin: 1.2rem auto 0 auto;
  width: 100%;
  max-width: 480px;
  background: radial-gradient(circle at 20% 20%, rgba(220,220,220,0.85) 0%, rgba(220,220,220,0.75) 60%, rgba(200,200,200,0.6) 100%);
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.18), 0 2px 8px 0 rgba(0,139,139,0.12);
  padding: 2rem 1.2rem;
  border: 2px solid #fff;
  box-sizing: border-box;
}
.userregister-title {
  color: #008b8b;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  text-shadow: 0 0 2px #fff, 0 2px 8px #fff, 0 0 8px #008b8b;
}
.userregister-form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  width: 100%;
}
.userregister-input {
  width: 100%;
  padding: 0.7rem;
  border-radius: 8px;
  border: 1px solid #cce4e4;
  font-size: 1rem;
  background: #f7f8fa;
  box-sizing: border-box;
}
.userregister-btn {
  background: #008b8b;
  color: #fff;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.userregister-btn:hover {
  background: #006d6d;
}
.userregister-warning {
  color: #d32f2f;
  margin-bottom: 1rem;
  font-weight: 500;
  text-align: center;
  font-size: 1rem;
}
@media (max-width: 700px) {
  .userregister-main {
    max-width: 98vw;
    padding: 1.2rem 2vw;
    border-radius: 12px;
    margin-top: 0.7rem;
  }
  .userregister-title {
    font-size: 1.1rem;
  }
  .userregister-btn {
    width: 100%;
    font-size: 1rem;
    padding: 0.7rem 0;
  }
}
        `}</style>
        <div className="userregister-main">
          <div className="userregister-title">Create Your Account</div>
          {warning && <div className="userregister-warning">{warning}</div>}
          <form className="userregister-form" onSubmit={handleRegister}>
            <input
              className="userregister-input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              className="userregister-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              className="userregister-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button className="userregister-btn" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserRegister;
