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
.adminlogin-container {
  min-height: 100vh;
  background: linear-gradient(120deg, #08a3ad 0%, #43e9f6 25%, #00c6b2 50%, #008b8b 75%, #005e5e 100%);
  background-size: 200% 200%;
  animation: userlogin-colorwave 12s ease-in-out infinite;
  box-sizing: border-box;
  padding-top: 64px;
}
@keyframes userlogin-colorwave {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}
.adminlogin-main {
  margin: 1.2rem auto 0 auto;
  width: 100%;
  max-width: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.adminlogin-paper {
  background: radial-gradient(circle at 20% 20%, rgba(220,220,220,0.85) 0%, rgba(220,220,220,0.75) 60%, rgba(200,200,200,0.6) 100%);
  border-radius: 22px;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.18), 0 2px 8px 0 rgba(0,139,139,0.12);
  padding: 2rem 1.2rem;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}
.adminlogin-title {
  color: #008b8b;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
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
  border: 1px solid #cbe7e7;
  border-radius: 8px;
  font-size: 1.08rem;
  padding: 0.85rem 1rem;
  margin-bottom: 0.1rem;
  background: #f7f8fa;
}
.adminlogin-password-field {
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}
.adminlogin-password-field input[type="password"],
.adminlogin-password-field input[type="text"] {
  width: 100%;
  padding-right: 2.5rem;
  box-sizing: border-box;
  border: 1px solid #cbe7e7;
  border-radius: 7px;
  font-size: 1rem;
  padding: 0.7rem;
  background: #f7f8fa;
}
.adminlogin-eye {
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
.adminlogin-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
}
.adminlogin-forgot {
  background: none;
  color: #008b8b;
  border: none;
  padding: 0;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s;
}
.adminlogin-forgot:hover {
  color: #006d6d;
  text-decoration: underline;
}
.adminlogin-loginbtn {
  background: #008b8b;
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
.adminlogin-loginbtn:hover {
  background: #006d6d;
}
.adminlogin-createbtn {
  background: #fff;
  color: #008b8b;
  border: 1px solid #008b8b;
  border-radius: 8px;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  margin-top: 0.7rem;
  transition: background 0.2s, color 0.2s;
}
.adminlogin-createbtn:hover {
  background: #008b8b;
  color: #fff;
}
.adminlogin-divider {
  width: 100%;
  height: 1px;
  background: #eee;
  margin: 1.5rem 0;
}
.adminlogin-register {
  width: 100%;
  text-align: center;
  margin-top: 1rem;
}
.adminlogin-register-title {
  display: block;
  font-size: 1rem;
  color: #222;
  font-weight: 500;
  margin-bottom: 0.5rem;
}
.adminlogin-warning {
  color: #d32f2f;
  margin-bottom: 1rem;
  font-weight: 500;
  text-align: center;
  font-size: 1rem;
}
@media (max-width: 700px) {
  .adminlogin-main {
    max-width: 98vw;
    padding: 1.2rem 2vw;
    margin-top: 0.7rem;
  }
  .adminlogin-paper {
    max-width: 98vw;
    padding: 1.2rem 2vw;
    border-radius: 14px;
  }
  .adminlogin-title {
    font-size: 1.1rem;
  }
  .adminlogin-loginbtn,
  .adminlogin-createbtn {
    width: 100%;
    font-size: 1rem;
    padding: 0.7rem 0;
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
