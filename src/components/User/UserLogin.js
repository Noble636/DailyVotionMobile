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
        body, html {
          margin: 0;
          padding: 0;
          background: #08a3ad;
          font-family: Arial, sans-serif;
        }
        .userlogin-outer {
          font-family: Arial, sans-serif;
          background: linear-gradient(120deg, #08a3ad 0%, #43e9f6 25%, #00c6b2 50%, #008b8b 75%, #005e5e 100%);
          min-height: 100vh;
          display: block;
          box-sizing: border-box;
          overflow-x: hidden;
        }
        .userlogin-content {
          margin-top: 32px;
          margin-left: 24px; /* Nudge right, adjust as needed */
          margin-right: 0;
          width: 98vw;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 0;
          box-sizing: border-box;
        }
        .userlogin-form-glass {
          background: radial-gradient(circle at 20% 20%, rgba(220,220,220,0.85) 0%, rgba(220,220,220,0.75) 60%, rgba(200,200,200,0.6) 100%);
          border-radius: 14px;
          box-shadow: 12px 18px 40px 0 rgba(0,0,0,0.32), 4px 8px 16px 0 rgba(0,139,139,0.18);
          padding: 1.2rem 0.5rem 1.2rem 0.5rem;
          width: 100%;
          max-width: 400px;
          margin: 0 auto 1rem auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 2;
          box-sizing: border-box;
        }
        .userlogin-title {
          color: #222;
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 2rem;
          text-align: center;
        }
        .userlogin-form-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
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
        .userlogin-warning {
          color: #d32f2f;
          margin-bottom: 1rem;
          font-weight: 500;
          text-align: center;
          font-size: 1rem;
        }
        @media (max-width: 600px) {
          .userlogin-content,
          .userlogin-form-glass {
            max-width: 98vw;
            width: 98vw;
            margin-left: auto;
            margin-right: auto;
            padding: 0 2vw;
          }
            
          .userlogin-form-glass {
            padding: 1.2rem 0.5rem 1.2rem 0.5rem;
            border-radius: 14px;
            background: radial-gradient(circle at 20% 20%, rgba(220,220,220,0.85) 0%, rgba(220,220,220,0.75) 60%, rgba(200,200,200,0.6) 100%);
            box-shadow: 12px 18px 40px 0 rgba(0,0,0,0.32), 4px 8px 16px 0 rgba(0,139,139,0.18);
            margin: 0 auto 1rem auto;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-sizing: border-box;
          }
          .userlogin-title {
            font-size: 1.2rem;
          }
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
      <div className="userlogin-content">
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
      </div>
    </div>
  );
}

export default Login;
