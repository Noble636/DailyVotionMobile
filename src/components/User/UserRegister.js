import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../TopBar";

function UserRegister() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAgreementModal(true);
  };

  const handleCompleteSignup = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
      try {
        const checkRes = await fetch(`https://dailyvotionbackend-91wt.onrender.com/api/admin/users`);
        const users = await checkRes.json();
        const usernameTaken = users.some(u => u.username === form.username);
        const emailTaken = users.some(u => u.email === form.email);
        if (usernameTaken) {
          alert("Username is already taken. Please choose another.");
          return;
        }
        if (emailTaken) {
          alert("Email is already registered. Please use another.");
          return;
        }
      } catch (err) {
      }
    try {
      const res = await fetch("https://dailyvotionbackend-91wt.onrender.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          username: form.username,
          email: form.email,
          mobile: form.mobile,
          password: form.password
        })
      });
      const data = await res.json();
      if (res.ok) {
        if (data.id) {
          localStorage.setItem('userId', data.id);
        }
        setShowAgreementModal(false);
        setShowSuccessModal(true);
        setForm({
          fullName: "",
          username: "",
          email: "",
          mobile: "",
          password: "",
          confirmPassword: ""
        });
        setAgreed(false);
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate("/login");
        }, 2000);
      } else {
        setWarning(data.error || "Registration failed");
      }
    } catch (err) {
      setWarning("Server error. Please try again later.");
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="userlogin-outer">
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          background: #fff;
          font-family: Arial, sans-serif;
        }
        .userlogin-outer {
          font-family: Arial, sans-serif;
          background: #fff;
          min-height: 100vh;
          display: block;
          box-sizing: border-box;
          overflow-x: hidden;
        }
        .userlogin-content {
          margin-top: 32px;
        }
        .userlogin-form-glass {
          width: 95%;
          max-width: 340px;
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
          width: 5px;
          min-width: 5px;
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
        .userlogin-loginbtn, .userregister-signup-btn {
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
        .userlogin-loginbtn:hover, .userregister-signup-btn:hover {
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
        .userlogin-createbtn, .userregister-login-btn {
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
        .userlogin-createbtn:hover, .userregister-login-btn:hover {
          background: #0b62d6;
          color: #fff;
          border-color: #044a9f;
        }
        .userlogin-warning, .warning-strong {
          color: #d32f2f;
          margin-bottom: 1rem;
          font-weight: 500;
          text-align: center;
          font-size: 1rem;
        }
        @media (max-width: 600px) {
          .userlogin-form-glass {
            max-width: 98vw;
            width: 98vw;
          }
          .userlogin-form-glass::before {
            width: 6px;
            min-width: 6px;
          }
          .userlogin-form-content {
            padding: 1.2rem 0.5rem 1.2rem 0.5rem;
          }
          .userlogin-title {
            font-size: 1.2rem;
          }
        }
        .agreement-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3000;
          padding: 16px;
          box-sizing: border-box;
        }
        .agreement-modal {
          background: #fff;
          border-radius: 10px;
          max-width: 640px;
          width: 100%;
          padding: 1.2rem 1.4rem;
          box-shadow: 0 8px 30px rgba(0,0,0,0.25);
          box-sizing: border-box;
        }
        .agreement-modal h3 {
          margin-top: 0;
          color: #008b8b;
        }
        .agreement-modal p, .agreement-modal ul {
          color: #222;
          line-height: 1.45;
          margin: 0.4rem 0 0.8rem 0;
        }
        .agreement-modal ul {
          padding-left: 1.1rem;
        }
        .agreement-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin: 0.6rem 0;
          font-size: 0.95rem;
          color: #173;
        }
        .agreement-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.7rem;
          margin-top: 0.8rem;
        }
        .userregister-btn-secondary {
          background: #f1f1f1;
          color: #444;
          border: none;
          padding: 0.5rem 0.9rem;
          border-radius: 6px;
          cursor: pointer;
        }
        .agreement-modal .userregister-signup-btn[disabled] {
          opacity: 0.55;
          cursor: not-allowed;
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
            <h2 className="userlogin-title">Create your Account</h2>
            {warning && <div className="warning-strong">{warning}</div>}
            <form className="userlogin-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="userlogin-input"
                value={form.fullName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="userlogin-input"
                value={form.username}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="userlogin-input"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number (optional)"
                className="userlogin-input"
                value={form.mobile}
                onChange={handleChange}
              />
              <div className="userlogin-password-row">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="userlogin-input"
                  value={form.password}
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
              <div className="userlogin-password-row">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="userlogin-input"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <span
                  className="userlogin-eye"
                  onClick={() => setShowConfirm(!showConfirm)}
                  title="Show/Hide Password"
                >
                  {showConfirm ? (
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
              <button type="submit" className="userregister-signup-btn">SIGN UP</button>
              <div className="userlogin-divider"></div>
              <div className="userlogin-register-row">
                <span>Already have an Account?</span>
                <button
                  className="userregister-login-btn"
                  type="button"
                  onClick={() => navigate("/login")}
                >
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showAgreementModal && (
        <div className="agreement-overlay">
          <div className="agreement-modal">
            <h3>Terms & Agreement</h3>
              <p>
                Before creating an account, you must agree to the following:
              </p>
              <ul>
                <li>Your account and personal information will be securely stored on our servers.</li>
                <li>Protect your password and never share it with anyone, including other users or administrators.</li>
                <li>Respect the privacy of others and do not post personal contact details or sensitive information in public areas, such as prayer requests.</li>
                <li>Use this platform responsibly and refrain from any abusive, offensive, or inappropriate behavior.</li>
                <li>By registering, you agree to our Terms of Service and Privacy Policy.</li>
              </ul>
            <label className="agreement-row">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              I have read and agree to the terms above.
            </label>
            <div className="agreement-actions">
              <button className="userregister-btn-secondary" onClick={() => setShowAgreementModal(false)}>Cancel</button>
              <button
                className="userregister-signup-btn"
                onClick={handleCompleteSignup}
                disabled={!agreed}
                title={!agreed ? "You must agree before completing sign up" : "Complete sign up"}
              >
                Complete Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
      {showSuccessModal && (
        <div className="agreement-overlay">
          <div className="agreement-modal" style={{textAlign: 'center', padding: '2rem 1.4rem'}}>
            <h3 style={{marginBottom: '0.5rem'}}>Sign up successful</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserRegister;
