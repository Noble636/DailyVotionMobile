import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../TopBar";

function Login() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!emailOrUsername.trim() || !password.trim()) {
      setWarning("Please enter both email/username and password.");
      return;
    }
    setWarning("");
    try {
      const res = await fetch("https://dailyvotionbackend-91wt.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrUsername, password })
      });
      const data = await res.json();
      if (res.ok) {
        if (data.id) {
          localStorage.setItem('userId', data.id);
        }
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('rememberedUser', emailOrUsername);
          localStorage.setItem('rememberedPass', password);
        } else {
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('rememberedUser');
          localStorage.removeItem('rememberedPass');
        }
        navigate("/profile");
      } else {
        setWarning(data.error || "Login failed");
      }
    } catch (err) {
      setWarning("Server error. Please try again later.");
    }
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  React.useEffect(() => {
    const remembered = localStorage.getItem('rememberMe') === 'true';
    if (remembered) {
      setRememberMe(true);
      setEmailOrUsername(localStorage.getItem('rememberedUser') || "");
      setPassword(localStorage.getItem('rememberedPass') || "");
    }
  }, []);

  React.useEffect(() => {
    if (!rememberMe) {
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('rememberedUser');
      localStorage.removeItem('rememberedPass');
    }
  }, [rememberMe]);

  return (
    <div className="userlogin-outer">
      <style>{`
        html.userlogin-no-scroll, body.userlogin-no-scroll {
          height: 100vh !important;
          overflow: hidden !important;
        }
        .userlogin-warning {
          color: #d32f2f;
          margin-bottom: 1rem;
          font-weight: 500;
          text-align: center;
          font-size: 1rem;
        }
        .userlogin-outer {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          height: 100vh !important;
          overflow: hidden !important;
          background: linear-gradient(120deg, #08a3ad 0%, #43e9f6 25%, #00c6b2 50%, #008b8b 75%, #005e5e 100%);
          background-size: 200% 200%;
          animation: userlogin-colorwave 12s ease-in-out infinite;
          display: flex;
          flex-direction: column;
          padding-top: 56px;
          position: relative;
        }
        .userlogin-outer::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none;
          z-index: 0;
          background: none;
        }
        @keyframes userlogin-sparkle-move {
          0% {
            background-position:
              10% 20%, 70% 80%, 40% 60%, 80% 30%, 55% 10%,
              25% 75%, 60% 40%, 85% 60%, 35% 15%, 15% 50%, 90% 10%, 75% 55%;
            opacity: 1;
          }
          25% {
            background-position:
              15% 25%, 65% 75%, 45% 65%, 75% 35%, 60% 15%,
              30% 80%, 65% 45%, 80% 65%, 40% 20%, 20% 55%, 95% 15%, 70% 60%;
            opacity: 0.8;
          }
          50% {
            background-position:
              20% 30%, 60% 70%, 50% 70%, 70% 40%, 65% 20%,
              35% 85%, 70% 50%, 75% 70%, 45% 25%, 25% 60%, 85% 20%, 65% 65%;
            opacity: 1;
          }
          75% {
            background-position:
              15% 25%, 65% 75%, 45% 65%, 75% 35%, 60% 15%,
              30% 80%, 65% 45%, 80% 65%, 40% 20%, 20% 55%, 95% 15%, 70% 60%;
            opacity: 0.8;
          }
          100% {
            background-position:
              10% 20%, 70% 80%, 40% 60%, 80% 30%, 55% 10%,
              25% 75%, 60% 40%, 85% 60%, 35% 15%, 15% 50%, 90% 10%, 75% 55%;
            opacity: 1;
          }
        }
        @keyframes userlogin-colorwave {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        .userlogin-outer::-webkit-scrollbar {
          display: none;
        }
        .userlogin-main {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          max-width: 1100px;
          margin: 2rem auto;
          position: relative;
          gap: 3.5rem;
        }
        .userlogin-form-glass {
          background: radial-gradient(circle at 20% 20%, rgba(220,220,220,0.85) 0%, rgba(220,220,220,0.75) 60%, rgba(200,200,200,0.6) 100%);
          border-radius: 22px;
          box-shadow: 12px 18px 40px 0 rgba(0,0,0,0.32), 4px 8px 16px 0 rgba(0,139,139,0.18);
          padding: 2.5rem 2rem;
          min-width: 340px;
          max-width: 370px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 2;
          margin-right: 0.5rem;
          backdrop-filter: blur(14px) saturate(120%);
        }
        .userlogin-form-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .userlogin-title {
          color: #222;
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 2rem;
          text-align: center;
        }
        .userlogin-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .userlogin-input {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #cbe7e7;
          border-radius: 7px;
          font-size: 1rem;
          padding: 0.7rem;
          background: #f7f8fa;
          margin-bottom: 0.1rem;
        }
        .userlogin-password-row {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
        }
        .userlogin-eye {
          position: absolute;
          right: 12px;
          top: 12px;
          cursor: pointer;
          font-size: 1.2rem;
          user-select: none;
          background: transparent;
          border: none;
          padding: 0;
        }
        .userlogin-options-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.95rem;
        }
        .userlogin-remember input[type="checkbox"] {
          accent-color: #08a3ad;
          margin-right: 4px;
        }
        .userlogin-forgot {
          background: none;
          color: #08a3ad;
          border: none;
          padding: 0;
          font-size: 1rem;
          cursor: pointer;
          text-decoration: underline;
          transition: color 0.2s;
        }
        .userlogin-forgot:hover {
          color: #006d6d;
        }
        .userlogin-loginbtn {
          background: #08a3ad;
          color: #fff;
          border: none;
          padding: 0.8rem 0;
          border-radius: 7px;
          font-size: 1.1rem;
          font-weight: 500;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: background 0.2s;
        }
        .userlogin-loginbtn:hover {
          background: #006d6d;
        }
        .userlogin-divider {
          width: 100%;
          height: 1px;
          background: #eee;
          margin: 1.5rem 0;
        }
        .userlogin-register-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.7rem;
        }
        .userlogin-createbtn {
          background: #08a3ad;
          color: #fff;
          border: none;
          padding: 0.7rem 0;
          border-radius: 7px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          width: 100%;
          transition: background 0.2s;
        }
        .userlogin-createbtn:hover {
          background: #006d6d;
        }
        .userlogin-images {
          position: relative;
          flex: 1 1 400px;
          min-width: 400px;
          height: 480px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-end;
          z-index: 1;
        }
        .userlogin-img {
          position: absolute;
          width: 320px;
          height: 180px;
          object-fit: cover;
          border-radius: 18px;
          box-shadow: 12px 18px 40px 0 rgba(0,0,0,0.22), 4px 8px 16px 0 rgba(0,139,139,0.14);
          background: #eee;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .userlogin-img-top {
          top: -15px;
          right: 40px;
          z-index: 3;
        }
        .userlogin-img-middle {
          top: 150px;
          right: -40px;
          z-index: 4;
        }
        .userlogin-img-bottom {
          top: 315px;
          right: 75px;
          z-index: 5;
        }
      `}</style>
      <TopBar
        logo="DailyVotion"
        menuItems={[
          { label: "Home", link: "/" },
          { label: "Login", link: "/login" },
          { label: "Admin", link: "/adminauth" },
          { label: "About", link: "/about" }
        ]}
      />
      <div className="userlogin-main">
        <div className="userlogin-form-glass">
          <div className="userlogin-form-content">
            <h2 className="userlogin-title">Login to DailyVotion</h2>
            {warning && (
              <div className="userlogin-warning">
                {warning}
              </div>
            )}
            <form onSubmit={handleLogin} className="userlogin-form">
              <input
                type="text"
                placeholder="Email Or Username"
                className="userlogin-input"
                value={emailOrUsername}
                onChange={e => setEmailOrUsername(e.target.value)}
                required
              />
              <div className="userlogin-password-row">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="userlogin-input"
                  value={password}
                  onChange={handleChange}
                  required
                />
                <span
                  className="userlogin-eye"
                  onClick={() => setShowPassword(!showPassword)}
                  title="Show/Hide Password"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <path d="M2 2l16 16" stroke="#888" strokeWidth="2"/>
                      <path d="M10 4C5 4 1.73 8.11 1 10c.73 1.89 4 6 9 6 2.1 0 4.06-.61 5.62-1.62" stroke="#888" strokeWidth="2" fill="none"/>
                      <circle cx="10" cy="10" r="4" stroke="#888" strokeWidth="2" fill="none"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <path d="M10 4C5 4 1.73 8.11 1 10c.73 1.89 4 6 9 6s8.27-4.11 9-6c-.73-1.89-4-6-9-6zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" fill="#888"/>
                    </svg>
                  )}
                </span>
              </div>
              <div className="userlogin-options-row">
                <label className="userlogin-remember">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                  />
                  Remember Me
                </label>
                <button
                  type="button"
                  className="userlogin-forgot"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </button>
              </div>
              <button
                type="submit"
                className="userlogin-loginbtn"
              >
                Log In
              </button>
            </form>
            <div className="userlogin-divider"></div>
            <div className="userlogin-register-row">
              <span>New to DailyVotion?</span>
              <button
                className="userlogin-createbtn"
                onClick={() => navigate("/register")}
              >
                Create An Account
              </button>
            </div>
          </div>
        </div>
        <div className="userlogin-images">
          <img src="/JTVCF/for background picture/3.jpg" alt="Image 1" className="userlogin-img userlogin-img-top" />
          <img src="/JTVCF/for background picture/1.jpg" alt="Image 2" className="userlogin-img userlogin-img-middle" />
          <img src="/JTVCF/gallery/ministry or organization/3.jpg" alt="Image 3" className="userlogin-img userlogin-img-bottom" />
        </div>
      </div>
    </div>
  );
}

export default Login;
