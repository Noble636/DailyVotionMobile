import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminTopBar from "./AdminTopBar";

function AdminLogin() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const [warning, setWarning] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    setWarning("");
    try {
      const res = await fetch("https://dailyvotionbackend-91wt.onrender.com/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrUsername: email, password })
      });
      const data = await res.json();
      if (res.ok && data.type === "admin") {
        sessionStorage.setItem("adminUser", JSON.stringify(data));
        if (data.id) {
          localStorage.setItem("adminId", data.id);
        }
        if (rememberMe) {
          localStorage.setItem('adminRememberMe', 'true');
          localStorage.setItem('adminRememberedUser', email);
          localStorage.setItem('adminRememberedPass', password);
        } else {
          localStorage.removeItem('adminRememberMe');
          localStorage.removeItem('adminRememberedUser');
          localStorage.removeItem('adminRememberedPass');
        }
        navigate("/admindashboard");
      } else {
        setWarning(data.error || "Login failed");
      }
    } catch (err) {
      setWarning("Server error. Please try again later.");
    }
  };

  React.useEffect(() => {
    const remembered = localStorage.getItem('adminRememberMe') === 'true';
    if (remembered) {
      setRememberMe(true);
      setEmail(localStorage.getItem('adminRememberedUser') || "");
      setPassword(localStorage.getItem('adminRememberedPass') || "");
    }
  }, []);

  React.useEffect(() => {
    if (!rememberMe) {
      localStorage.removeItem('adminRememberMe');
      localStorage.removeItem('adminRememberedUser');
      localStorage.removeItem('adminRememberedPass');
    }
  }, [rememberMe]);

  return (
    <div className="adminlogin-container">
      <style>{`
        * {
          box-sizing: border-box;
        }
        body, html {
          margin: 0;
          padding: 0;
          background: #f5f5f5;
        }
        .adminlogin-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%);
          background-attachment: fixed;
          box-sizing: border-box;
          padding-top: 60px;
          overflow-x: hidden;
          width: 100%;
        }
        .adminlogin-main {
          margin: 1.5rem auto 0;
          width: calc(100% - 24px);
          max-width: 480px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 12px;
        }
        .adminlogin-paper {
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          padding: 1.8rem 1.2rem;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-sizing: border-box;
          border-left: 5px solid #0066cc;
        }
        .adminlogin-title {
          color: #1a1a1a;
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 1.8rem;
          margin-top: 0;
          text-align: center;
        }
        .adminlogin-paper form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .adminlogin-paper form input[type="email"],
        .adminlogin-paper form input[type="text"] {
          width: 100%;
          box-sizing: border-box;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 1rem;
          padding: 0.9rem 1rem;
          background: #f8f9fa;
          color: #333;
          transition: all 0.2s ease;
          -webkit-appearance: none;
          appearance: none;
        }
        .adminlogin-paper form input[type="email"]:focus,
        .adminlogin-paper form input[type="text"]:focus {
          outline: none;
          border-color: #0066cc;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
        }
        .adminlogin-paper form input::placeholder {
          color: #888;
        }
        .adminlogin-password-field {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
        }
        .adminlogin-password-field input[type="password"],
        .adminlogin-password-field input[type="text"] {
          width: 100%;
          padding-right: 3rem;
          box-sizing: border-box;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 1rem;
          padding: 0.9rem 1rem;
          background: #f8f9fa;
          color: #333;
          transition: all 0.2s ease;
          -webkit-appearance: none;
          appearance: none;
        }
        .adminlogin-password-field input:focus {
          outline: none;
          border-color: #0066cc;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
        }
        .adminlogin-eye {
          position: absolute;
          right: 12px;
          cursor: pointer;
          font-size: 1.2rem;
          user-select: none;
          background: transparent;
          border: none;
          padding: 8px;
          margin-right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          transition: color 0.2s ease;
          min-width: 44px;
          min-height: 44px;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        .adminlogin-eye:hover {
          color: #0066cc;
        }
        .adminlogin-eye:active {
          transform: scale(0.95);
        }
        .adminlogin-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
          width: 100%;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .adminlogin-options label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          color: #333;
          font-weight: 500;
        }
        .adminlogin-options input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #0066cc;
        }
        .adminlogin-forgot {
          background: none;
          color: #0066cc;
          border: none;
          padding: 0;
          font-size: 0.9rem;
          cursor: pointer;
          text-decoration: underline;
          font-weight: 500;
          transition: color 0.2s ease;
          touch-action: manipulation;
        }
        .adminlogin-forgot:hover {
          color: #004ca3;
        }
        .adminlogin-forgot:active {
          transform: scale(0.98);
        }
        .adminlogin-loginbtn {
          background: linear-gradient(135deg, #0066cc 0%, #004ca3 100%);
          color: #fff;
          border: none;
          padding: 1rem 0;
          border-radius: 10px;
          font-size: 1.05rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 102, 204, 0.2);
          min-height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        .adminlogin-loginbtn:hover {
          background: linear-gradient(135deg, #004ca3 0%, #003d82 100%);
          box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
          transform: translateY(-2px);
        }
        .adminlogin-loginbtn:active {
          transform: translateY(0);
          box-shadow: 0 2px 6px rgba(0, 102, 204, 0.2);
        }
        .adminlogin-loginbtn:focus {
          outline: 2px solid #0066cc;
          outline-offset: 2px;
        }
        .adminlogin-divider {
          width: 100%;
          height: 1px;
          background: #e0e0e0;
          margin: 1.5rem 0;
        }
        .adminlogin-register {
          width: 100%;
          text-align: center;
          margin-top: 0.5rem;
        }
        .adminlogin-register-title {
          display: block;
          font-size: 0.95rem;
          color: #333;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .adminlogin-createbtn {
          background: #ffffff;
          color: #0066cc;
          border: 2px solid #0066cc;
          border-radius: 10px;
          padding: 0.9rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          min-height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        .adminlogin-createbtn:hover {
          background: #0066cc;
          color: #fff;
          box-shadow: 0 4px 12px rgba(0, 102, 204, 0.2);
          transform: translateY(-2px);
        }
        .adminlogin-createbtn:active {
          transform: translateY(0);
        }
        .adminlogin-createbtn:focus {
          outline: 2px solid #0066cc;
          outline-offset: 2px;
        }
        .adminlogin-warning {
          color: #d32f2f;
          background: #ffebee;
          border: 1px solid #ef5350;
          border-radius: 8px;
          padding: 0.8rem 1rem;
          margin-bottom: 1rem;
          font-weight: 600;
          text-align: center;
          font-size: 0.95rem;
          width: 100%;
          box-sizing: border-box;
        }
        @media (max-width: 480px) {
          .adminlogin-container {
            padding-top: 56px;
          }
          .adminlogin-main {
            margin: 1rem auto 0;
            width: calc(100% - 16px);
            padding: 0 8px;
          }
          .adminlogin-paper {
            padding: 1.5rem 1rem;
            border-radius: 14px;
          }
          .adminlogin-title {
            font-size: 1.4rem;
            margin-bottom: 1.5rem;
          }
          .adminlogin-paper form {
            gap: 0.9rem;
          }
          .adminlogin-paper form input {
            font-size: 16px;
            padding: 0.85rem 0.9rem;
          }
          .adminlogin-loginbtn {
            min-height: 46px;
            font-size: 1rem;
          }
          .adminlogin-options {
            font-size: 0.85rem;
          }
          .adminlogin-register-title {
            font-size: 0.9rem;
          }
        }
        @media (min-width: 768px) {
          .adminlogin-main {
            margin: 3rem auto 0;
          }
          .adminlogin-paper {
            max-width: 500px;
            padding: 2.5rem 2rem;
          }
          .adminlogin-title {
            font-size: 1.8rem;
            margin-bottom: 2rem;
          }
          .adminlogin-paper form input {
            font-size: 1.05rem;
            padding: 1rem 1.1rem;
          }
          .adminlogin-loginbtn {
            min-height: 50px;
            font-size: 1.1rem;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
      <AdminTopBar />

      <div className="adminlogin-main">
        <div className="adminlogin-paper">
          <h2 className="adminlogin-title">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username or Email"
              className="adminlogin-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="adminlogin-password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="adminlogin-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                className="adminlogin-eye"
                onClick={() => setShowPassword(!showPassword)}
                title="Show/Hide Password"
                role="button"
                tabIndex={0}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M2 2l16 16" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 4C5 4 1.73 8.11 1 10c.73 1.89 4 6 9 6 2.1 0 4.06-.61 5.62-1.62" stroke="#888" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="10" cy="10" r="4" stroke="#888" strokeWidth="2" fill="none"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M10 4C5 4 1.73 8.11 1 10c.73 1.89 4 6 9 6s8.27-4.11 9-6c-.73-1.89-4-6-9-6zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" fill="#888"/>
                  </svg>
                )}
              </span>
            </div>

            {warning && <div className="adminlogin-warning">{warning}</div>}

            <div className="adminlogin-options">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <button type="button" className="adminlogin-forgot" onClick={() => navigate("/adminfpw")}>Forgot password?</button>
            </div>

            <button type="submit" className="adminlogin-loginbtn">Login</button>
          </form>

          <div className="adminlogin-divider"></div>

          <div className="adminlogin-register">
            <span className="adminlogin-register-title">New administrator account?</span>
            <button className="adminlogin-createbtn" onClick={() => navigate("/adminregister")}>Create Admin Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
