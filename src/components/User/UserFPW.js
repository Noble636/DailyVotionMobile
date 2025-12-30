import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../TopBar";

function UserFPW() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const API_BASE = process.env.REACT_APP_API_BASE || 'https://dailyvotionbackend-91wt.onrender.com';
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    setError("");
    setSubmitted(true);
    try {
  const resp = await fetch(`${API_BASE}/api/user/forgot-password/verify-email`, {
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
  const resp = await fetch(`${API_BASE}/api/user/forgot-password/verify-otp`, {
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
  const resp = await fetch(`${API_BASE}/api/user/forgot-password/reset-password`, {
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
      navigate('/login');
    } catch (err) {
      console.error('reset-password error', err);
      setError('Failed to reset password');
    }
  };

  return (
    <div className="userfpw-outer">
      <TopBar
        logo="DailyVotion"
        menuItems={[
          { label: "Home", link: "/" },
          { label: "Login", link: "/login" },
          { label: "Admin", link: "/adminauth" },
          { label: "About", link: "/about" }
        ]}
      />
      <div className="userfpw-main">
        <div className="userfpw-form-glass">
          <h2 className="userfpw-title">Forgot Password</h2>
          {showOTP && !showReset && (
            <form className="userfpw-form" onSubmit={handleOTPSubmit}>
              <div className="userfpw-success">
                An OTP has been sent to:
                <input
                  type="text"
                  className="userfpw-input"
                  value={email}
                  readOnly
                  style={{ background: "#e0f7fa", color: "#222", fontWeight: "bold", marginBottom: "0.5rem" }}
                />
                Please enter the OTP below to confirm your identity.
              </div>
              <input
                type="text"
                className="userfpw-input"
                placeholder="Enter OTP"
                value={otp}
                onChange={e => setOTP(e.target.value)}
                required
              />
              {error && <div className="userfpw-error">{error}</div>}
              <button type="submit" className="userfpw-submitbtn">Verify OTP</button>
            </form>
          )}
          {showReset && (
            <form className="userfpw-form" onSubmit={handleResetSubmit}>
              <div className="userfpw-success">
                You may now change your password.
              </div>
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="userfpw-input"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                  style={{ paddingRight: "2.5rem" }}
                />
                <span
                  className="userfpw-eye"
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
                  className="userfpw-input"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  style={{ paddingRight: "2.5rem" }}
                />
                <span
                  className="userfpw-eye"
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
              {error && <div className="userfpw-error">{error}</div>}
              <button type="submit" className="userfpw-submitbtn">Change Password</button>
            </form>
          )}
          {!showOTP && !showReset && (
            <form className="userfpw-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="userfpw-input"
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              {error && <div className="userfpw-error">{error}</div>}
              <button type="submit" className="userfpw-submitbtn">Send OTP</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserFPW;
