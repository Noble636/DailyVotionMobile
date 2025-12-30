import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      const res = await fetch("https://dailyvotionbackend-91wt.onrender.com/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("userId", data.user.id);
        navigate("/userprofile");
      } else {
        setStatus(data.error || "Login failed.");
      }
    } catch {
      setStatus("Server error. Please try again.");
    }
  };

  return (
    <div className="userlogin-mobile-bg">
      <style>{`
.userlogin-mobile-bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #008b8b 60%, #e0f7fa 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.userlogin-mobile-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,139,139,0.13), 0 2px 8px rgba(44,62,80,0.10);
  padding: 2.2rem 1.2rem 1.5rem 1.2rem;
  width: 94vw;
  max-width: 370px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.userlogin-title {
  color: #008b8b;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
  text-align: center;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px #e0f7fa, 0 0 2px #fff;
}
.userlogin-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}
.userlogin-input {
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 8px;
  border: 1.5px solid #008b8b;
  font-size: 1.08rem;
  background: #f7f9fc;
  color: #222;
  box-shadow: 0 1px 4px rgba(0,139,139,0.06);
}
.userlogin-input:focus {
  outline: 2px solid #008b8b;
  background: #e0f7fa;
}
.userlogin-btn {
  width: 100%;
  background: #008b8b;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 1rem 0;
  font-size: 1.13rem;
  font-weight: 600;
  margin-top: 0.2rem;
  box-shadow: 0 2px 8px rgba(0,139,139,0.10);
  transition: background 0.2s;
}
.userlogin-btn:active,
.userlogin-btn:hover {
  background: #006d6d;
}
.userlogin-status {
  color: #d32f2f;
  font-size: 1rem;
  margin-top: 0.7rem;
  text-align: center;
  min-height: 1.2em;
}
.userlogin-links {
  margin-top: 1.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  align-items: center;
}
.userlogin-link {
  color: #008b8b;
  font-size: 1rem;
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
@media (max-width: 400px) {
  .userlogin-mobile-card {
    padding: 1.2rem 0.5rem 1rem 0.5rem;
    max-width: 98vw;
  }
  .userlogin-title {
    font-size: 1.3rem;
  }
}
      `}</style>
      <form className="userlogin-mobile-card userlogin-form" onSubmit={handleLogin}>
        <div className="userlogin-title">User Login</div>
        <input
          className="userlogin-input"
          type="email"
          placeholder="Email"
          autoComplete="username"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="userlogin-input"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="userlogin-btn" type="submit">Login</button>
        <div className="userlogin-status">{status}</div>
        <div className="userlogin-links">
          <button
            className="userlogin-link"
            type="button"
            onClick={() => navigate("/userregister")}
          >
            Create Account
          </button>
          <button
            className="userlogin-link"
            type="button"
            onClick={() => navigate("/userfpw")}
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserLogin;
