import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="userfpw-container">
      <style>{`
        .fpw-back-btn {
          position: fixed;
          top: 12px;
          right: 12px;
          left: auto;
          background: linear-gradient(135deg, #0b62d6 0%, #044a9f 100%);
          color: #ffffff;
          border: none;
          padding: 0.6rem 1rem;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(11, 98, 214, 0.25);
          transition: all 0.2s ease;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          min-height: 44px;
          touch-action: manipulation;
        }
        .fpw-back-btn:hover {
          background: linear-gradient(135deg, #044a9f 0%, #033d82 100%);
          transform: translateY(-2px);
        }
        .fpw-back-btn:active {
          transform: scale(0.97);
        }
        .userfpw-container {
          min-height: 100vh;
          background: #f5f7fb;
          font-family: 'Segoe UI', Arial, sans-serif;
          box-sizing: border-box;
          padding: 72px 16px 32px 16px;
          color: #0f172a;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .userfpw-main {
          margin: 1.2rem auto 0 auto;
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
          padding: 1.6rem 1.2rem 1.3rem 1.2rem;
          box-sizing: border-box;
        }
        .userfpw-title {
          color: #0b62d6;
          font-size: 1.45rem;
          font-weight: 800;
          margin-bottom: 0.8rem;
          text-align: center;
        }
        .userfpw-explanation {
          color: #334155;
          margin-bottom: 1rem;
          font-size: 1rem;
          text-align: center;
          line-height: 1.5;
        }
        .userfpw-form {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }
        .userfpw-input {
          width: 100%;
          padding: 0.85rem 1rem;
          border-radius: 12px;
          border: 1px solid #cbd5e1;
          font-size: 1.02rem;
          min-height: 44px;
          box-sizing: border-box;
          background: #f8fafc;
          color: #0f172a;
        }
        .userfpw-input:focus {
          outline: 2px solid #0b62d6;
          outline-offset: 2px;
          border-color: #0b62d6;
        }
        .userfpw-submitbtn {
          background: #0b62d6;
          color: #fff;
          border: none;
          padding: 0.7rem 1.2rem;
          border-radius: 10px;
          font-size: 1rem;
          cursor: pointer;
          font-weight: 700;
          box-shadow: 0 6px 16px rgba(11, 98, 214, 0.22);
          margin-top: 0.5rem;
        }
        .userfpw-submitbtn:hover {
          background: #044a9f;
        }
        .userfpw-error {
          color: #dc2626;
          font-size: 0.98rem;
          margin-top: -0.7rem;
          margin-bottom: 0.2rem;
          text-align: center;
        }
        .userfpw-success {
          color: #059669;
          background: #ecfdf3;
          border: 1px solid #bbf7d0;
          padding: 0.7rem 1rem;
          border-radius: 10px;
          font-weight: 600;
          margin-bottom: 0.7rem;
          text-align: center;
        }
        .userfpw-eye {
          cursor: pointer;
          user-select: none;
        }
        @media (max-width: 700px) {
          .userfpw-main {
            max-width: 98vw;
            padding: 1.1rem 4vw 1rem 4vw;
            border-radius: 12px;
            margin-top: 0.7rem;
          }
          .userfpw-title {
            font-size: 1.2rem;
          }
        }
      `}</style>
      <button
        className="fpw-back-btn"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Back
      </button>
      <div className="userfpw-main">
        <h2 className="userfpw-title">Forgot Password</h2>
        <div className="userfpw-explanation">Enter your email to receive a one-time password (OTP) and reset your password securely.</div>
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
  );
}

export default UserFPW;
