import React, { useState } from "react";
import AdminTopBar from "./AdminTopBar";
// Removed: import "../../css/Admin/AdminFPW.css";
import { useNavigate } from "react-router-dom";

function AdminFPW() {
  const [showAuth, setShowAuth] = useState(true);
  const [showAdminCode, setShowAdminCode] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [error, setError] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const API_BASE = process.env.REACT_APP_API_BASE || 'https://dailyvotionbackend-91wt.onrender.com';

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!adminCode.trim()) {
      setError("Please enter your AdminAuth code.");
      return;
    }
    setError("");
    setShowAuth(false);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your admin email address.");
      return;
    }
    setError("");
    try {
  const resp = await fetch(`${API_BASE}/api/admin/forgot-password/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await resp.json();
      if (!resp.ok) {
        setError(data && data.error ? data.error : 'Failed to send OTP');
        return;
      }
      setShowOTP(true);
    } catch (err) {
      console.error('send-otp error', err);
      setError('Failed to send OTP');
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError("Please enter the OTP sent to your email.");
      return;
    }
    setError("");
    try {
  const resp = await fetch(`${API_BASE}/api/admin/forgot-password/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await resp.json();
      if (!resp.ok) {
        setError(data && data.error ? data.error : 'Invalid OTP');
        return;
      }
      setShowReset(true);
      setShowOTP(false);
    } catch (err) {
      console.error('verify-otp error', err);
      setError('Failed to verify OTP');
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword.trim() || !confirmPassword.trim()) {
      setError("Please fill in both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    try {
  const resp = await fetch(`${API_BASE}/api/admin/forgot-password/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword })
      });
      const data = await resp.json();
      if (!resp.ok) {
        setError(data && data.error ? data.error : 'Failed to reset password');
        return;
      }
      alert('Password changed successfully. You may now log in.');
      navigate('/adminlogin');
    } catch (err) {
      console.error('reset-password error', err);
      setError('Failed to reset password');
    }
  };

  return (
    <div className="adminfpw-outer">
      <style>{`
.adminfpw-outer {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  height: 100vh !important;
  overflow: hidden !important;
  background: #08a3ad;
  display: flex;
  flex-direction: column;
  padding-top: 0px;
}
.adminfpw-main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.adminfpw-form-glass {
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
  backdrop-filter: blur(14px) saturate(120%);
}
.adminfpw-title {
  color: #222;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
}
.adminfpw-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.adminfpw-input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #cbe7e7;
  border-radius: 7px;
  font-size: 1rem;
  padding: 0.7rem;
  background: #f7f8fa;
  margin-bottom: 0.1rem;
}
.adminfpw-submitbtn {
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
.adminfpw-submitbtn:hover {
  background: #006d6d;
}
.adminfpw-error {
  color: #d32f2f;
  margin-bottom: 0.5rem;
  font-weight: 500;
  text-align: center;
  font-size: 1rem;
}
.adminfpw-success {
  color: #006d6d;
  background: #e0f7fa;
  border-radius: 7px;
  padding: 1.2rem;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 1.2rem;
}
      `}</style>
      <AdminTopBar />
      <div className="adminfpw-main">
        <div className="adminfpw-form-glass">
          <h2 className="adminfpw-title">Admin Forgot Password</h2>
          {showAuth && (
            <form className="adminfpw-form" onSubmit={handleAuthSubmit}>
              <div className="adminfpw-success">
                Please enter your AdminAuth code to proceed with password reset.
              </div>
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  type={showAdminCode ? "text" : "password"}
                  className="adminfpw-input"
                  placeholder="Enter AdminAuth code"
                  value={adminCode}
                  onChange={e => setAdminCode(e.target.value)}
                  required
                  style={{ paddingRight: "2.5rem" }}
                />
                <span
                  className="adminfpw-eye"
                  onClick={() => setShowAdminCode(!showAdminCode)}
                  title="Show/Hide AdminAuth Code"
                  role="button"
                  tabIndex={0}
                  style={{ position: "absolute", right: 12, top: 12, cursor: "pointer" }}
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
              {error && <div className="adminfpw-error">{error}</div>}
              <button type="submit" className="adminfpw-submitbtn">Verify AdminAuth Code</button>
            </form>
          )}
          {!showAuth && !showOTP && !showReset && (
            <form className="adminfpw-form" onSubmit={handleEmailSubmit}>
              <input
                type="email"
                className="adminfpw-input"
                placeholder="Enter your admin email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              {error && <div className="adminfpw-error">{error}</div>}
              <button type="submit" className="adminfpw-submitbtn">Send OTP</button>
            </form>
          )}
          {!showAuth && showOTP && (
            <form className="adminfpw-form" onSubmit={handleOTPSubmit}>
              <div className="adminfpw-success">
                An OTP has been sent to: <strong>{email}</strong><br />
                Please enter the OTP below to confirm your identity.
              </div>
              <input
                type="text"
                className="adminfpw-input"
                placeholder="Enter OTP"
                value={otp}
                onChange={e => setOTP(e.target.value)}
                required
              />
              {error && <div className="adminfpw-error">{error}</div>}
              <button type="submit" className="adminfpw-submitbtn">Verify OTP</button>
            </form>
          )}
          {!showAuth && !showOTP && showReset && (
            <form className="adminfpw-form" onSubmit={handleResetSubmit}>
              <div className="adminfpw-success">
                You may now change your password.
              </div>
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="adminfpw-input"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                  style={{ paddingRight: "2.5rem" }}
                />
                <span
                  className="adminfpw-eye"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  title="Show/Hide Password"
                  role="button"
                  tabIndex={0}
                  style={{ position: "absolute", right: 12, top: 12, cursor: "pointer" }}
                >
                  {showNewPassword ? (
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
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="adminfpw-input"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  style={{ paddingRight: "2.5rem" }}
                />
                <span
                  className="adminfpw-eye"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  title="Show/Hide Password"
                  role="button"
                  tabIndex={0}
                  style={{ position: "absolute", right: 12, top: 12, cursor: "pointer" }}
                >
                  {showConfirmPassword ? (
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
              {error && <div className="adminfpw-error">{error}</div>}
              <button type="submit" className="adminfpw-submitbtn">Change Password</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminFPW;
