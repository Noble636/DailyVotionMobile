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
          background: #fff; /* White background */
          font-family: Arial, sans-serif;
        }
        .userlogin-outer {
          font-family: Arial, sans-serif;
          background: #fff; /* White background */
          min-height: 100vh;
          display: block;
          box-sizing: border-box;
          overflow-x: hidden;
        }

        .userlogin-content {
          margin-top: 32px;
        }

        .userlogin-form-glass {
          width: 100%;
          max-width: 400px;
          margin: 0 auto 1rem auto;
          display: flex;
          flex-direction: row;
          align-items: stretch;
          z-index: 2;
          box-sizing: border-box;
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 4px 24px rgba(11,98,214,0.08);
          overflow: hidden;
        }
        .userlogin-form-glass::before {
          content: "";
          display: block;
          width: 32px;
          min-width: 32px;
          background: linear-gradient(180deg, #0b62d6 0%, #044a9f 100%);
        }
        .userlogin-form-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 1.2rem;
        }
        .userlogin-title {
          color: #222;
          font-size: 1.2rem;
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
          accent-color: #0b62d6;
          margin-right: 4px;
        }
        .userlogin-forgot {
          background: none;
          color: #0b62d6;
          border: none;
          padding: 0;
          font-size: 1rem;
          cursor: pointer;
          text-decoration: underline;
          transition: color 0.2s;
        }
        .userlogin-forgot:hover {
          color: #044a9f;
        }
        .userlogin-loginbtn {
          background: #0b62d6;
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
          background: #044a9f;
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
          background: #fff;
          color: #0b62d6;
          border: 2px solid #0b62d6;
          padding: 0.7rem 0;
          border-radius: 7px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          width: 100%;
          transition: background 0.2s, color 0.2s, border 0.2s;
        }
        .userlogin-createbtn:hover {
          background: #0b62d6;
          color: #fff;
          border-color: #044a9f;
        }
        .userlogin-warning {
          color: #d32f2f;
          margin-bottom: 1rem;
          font-weight: 500;
          text-align: center;
          font-size: 1rem;
        }
        @media (max-width: 600px) {
          .userlogin-form-glass {
            flex-direction: row;
            padding: 0;
            border-radius: 14px;
            background: #fff;
            box-shadow: 12px 18px 40px 0 rgba(11,98,214,0.12), 4px 8px 16px 0 rgba(4,74,159,0.10);
            margin: 0 auto 1rem auto;
            z-index: 2;
            display: flex;
            align-items: stretch;
            box-sizing: border-box;
          }
          .userlogin-form-glass::before {
            width: 18px;
            min-width: 18px;
          }
          .userlogin-form-content {
            padding: 1.2rem 0.5rem 1.2rem 0.5rem;
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
