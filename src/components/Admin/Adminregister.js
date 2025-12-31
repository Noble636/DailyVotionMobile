import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminRegister() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAdminCode, setShowAdminCode] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    adminCode: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successTimeout, setSuccessTimeout] = useState(null);
  const handleRegisterClick = async (e) => {
    e.preventDefault();
    if (!agreed) {
      alert("You must agree to the terms and agreements before registering.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (!form.adminCode.trim()) {
      alert("Admin code is required.");
      return;
    }
    try {
      const response = await fetch("https://dailyvotionbackend-91wt.onrender.com/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          username: form.username,
          email: form.email,
          mobile: form.mobile,
          password: form.password,
          adminCode: form.adminCode
        })
      });
      const data = await response.json();
      if (response.ok) {
        setShowSuccessPopup(true);
        const timeout = setTimeout(() => {
          setShowSuccessPopup(false);
          navigate("/adminlogin");
        }, 1500);
        setSuccessTimeout(timeout);
      } else {
      }
    } catch (err) {
    }
  };

  React.useEffect(() => {
    return () => {
      if (successTimeout) clearTimeout(successTimeout);
    };
  }, [successTimeout]);

  return (
    <div className="adminregister-container">
      <style>{`
.adminregister-container {
  min-height: 100vh;
  background: #08a3ad;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 64px;
  box-sizing: border-box;
  overflow-x: hidden;
}
.adminregister-paper {
  width: 100%;
  max-width: 480px;
  margin: 2rem auto;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  box-sizing: border-box;
  overflow: visible;
}
.adminregister-form-col,
.adminregister-terms-col {
  width: 100%;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.08);
  border: 1px solid rgba(0,0,0,0.06);
  box-sizing: border-box;
  padding: 2rem 2.2rem;
  margin: 0 auto;
}
.adminregister-form-col {
  margin-bottom: 1.2rem;
}
.adminregister-title {
  color: #008b8b;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
}
.adminregister-input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #cbe7e7;
  border-radius: 8px;
  font-size: 1rem;
  padding: 0.7rem;
  margin-bottom: 1rem;
}
.adminregister-btn {
  background: #008b8b;
  color: #fff;
  border: none;
  padding: 0.8rem 0;
  border-radius: 7px;
  font-size: 1.05rem;
  font-weight: 500;
  cursor: pointer;
  min-width: 160px;
  transition: background 0.15s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.adminregister-btn:hover:enabled {
  background: #006d6d;
}
.adminregister-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  background: #b2dfdb;
  color: #fff;
}
.adminregister-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
}
.adminregister-cancel-btn {
  background: #fff;
  color: #008b8b;
  border: 2px solid #008b8b;
  border-radius: 8px;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.adminregister-cancel-btn:hover {
  background: #008b8b;
  color: #fff;
}
.adminregister-password-field {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
}
.adminregister-password-field input[type="password"],
.adminregister-password-field input[type="text"] {
  flex: 1;
  max-width: 100%;
  padding-right: 2.5rem;
  box-sizing: border-box;
  border: 1px solid #cbe7e7;
  border-radius: 8px;
  font-size: 1rem;
  padding: 0.7rem;
  margin-bottom: 0;
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
  color: #888;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}
.adminlogin-eye:hover {
  color: #008b8b;
}
.adminlogin-eye svg {
  display: block;
  width: 20px;
  height: 20px;
}
.adminregister-terms-box {
  background: #fff;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
  padding: 1.1rem;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.adminregister-terms-title {
  margin: 0 0 0.8rem 0;
  padding: 0;
  font-size: 1.1rem;
  color: #0b6b66;
  font-weight: 700;
}
.adminregister-terms-checkbox {
  margin: 0;
  align-items: center;
  gap: 0.6rem;
}
@media (max-width: 700px) {
  .adminregister-container {
    padding: 0 0 24px 0;
    align-items: flex-start;
    overflow-x: hidden;
  }
  .adminregister-paper {
    max-width: 98vw;
    width: 100%;
    margin: 0 auto;
    padding: 0.5rem 0 2rem 0;
    border-radius: 0;
    gap: 1.2rem;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    box-sizing: border-box;
  }
  .adminregister-form-col,
  .adminregister-terms-col {
    max-width: 98vw;
    width: 100%;
    padding: 1.2rem 4vw;
    border-radius: 12px;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .adminregister-form-col {
    margin-bottom: 1.2rem;
  }
}
      `}</style>
      {showSuccessPopup && (
        <div className="adminregister-modal-overlay">
          <div className="adminregister-modal-box">
            <div className="adminregister-modal-content">
              <h3 style={{ color: '#008b8b', marginBottom: '1rem' }}>Admin registered successfully!</h3>
              <p style={{ color: '#222', fontSize: '1rem', marginBottom: 0 }}>You will be redirected to the login page.</p>
            </div>
          </div>
        </div>
      )}
      <div className="adminregister-paper">
        <div className="adminregister-form-col">
          <h2 className="adminregister-title">Create Admin Account</h2>
          <form onSubmit={handleRegisterClick}>
            <input type="text" name="fullName" placeholder="Full Name" className="adminregister-input" value={form.fullName} onChange={handleChange} required />
            <input type="text" name="username" placeholder="Username" className="adminregister-input" value={form.username} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" className="adminregister-input" value={form.email} onChange={handleChange} required />
            <input type="text" name="mobile" placeholder="Mobile Number (optional)" className="adminregister-input" value={form.mobile} onChange={handleChange} />

            <div className="adminregister-password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="adminregister-input"
                value={form.password}
                onChange={handleChange}
                required
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

            <div className="adminregister-password-field">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="adminregister-input"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
                <span
                  className="adminlogin-eye"
                  onClick={() => setShowConfirm(!showConfirm)}
                  title="Show/Hide Password"
                  role="button"
                  tabIndex={0}
                >
                  {showConfirm ? (
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

            <div className="adminregister-password-field">
              <input
                type={showAdminCode ? "text" : "password"}
                name="adminCode"
                placeholder="Choose your admin code"
                className="adminregister-input"
                value={form.adminCode}
                onChange={handleChange}
                required
              />
                <span
                  className="adminlogin-eye"
                  onClick={() => setShowAdminCode(!showAdminCode)}
                  title="Show/Hide Password"
                  role="button"
                  tabIndex={0}
                >
                  {showAdminCode ? (
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

            <div className="adminregister-actions">
              <button type="submit" className="adminregister-btn" disabled={!agreed}>Register</button>
              <button
                type="button"
                className="adminregister-cancel-btn"
                onClick={() => navigate("/adminlogin")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <aside className="adminregister-terms-col">
          <div className="adminregister-terms-box">
            <h3 className="adminregister-terms-title">Terms & Agreements</h3>

            <p style={{ color: "#b12704", fontWeight: "700" }}>
              Warning: Admin accounts have elevated privileges!
            </p>
            <ul>
              <li>Admin accounts can manage users, content, and sensitive data.</li>
              <li>Only trusted members of the organization should have admin access.</li>
              <li>Never share your admin credentials with anyone outside the organization.</li>
              <li>Misuse of admin privileges may result in account suspension or legal action.</li>
              <li>You are responsible for all actions taken using your admin account.</li>
              <li>By registering, you agree to follow all organizational guidelines and policies.</li>
            </ul>
            <p>Please keep contact details and sensitive data secure.</p>
            
            <label className="adminregister-terms-checkbox">
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
              />
              I have read and agree to the terms and agreements
            </label>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default AdminRegister;