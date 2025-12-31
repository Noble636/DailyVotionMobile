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
    <div className="userregister-outer">
      <style>{`
        body::-webkit-scrollbar, html::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        body {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .userregister-outer {
          background: linear-gradient(120deg, #08a3ad 0%, #43e9f6 25%, #00c6b2 50%, #008b8b 75%, #005e5e 100%);
          background-size: 200% 200%;
          animation: userregister-colorwave 12s ease-in-out infinite;
          position: relative;
          min-height: 100vh;
          overflow: hidden !important;
          display: flex;
          flex-direction: column;
          padding-top: 0px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        @keyframes userregister-colorwave {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        .userregister-outer::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none;
          z-index: 0;
          background: none;
        }
        .userregister-outer::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        .userregister-main {
          margin: 1.2rem auto 0 auto;
          width: 100%;
          max-width: 480px;
          background: radial-gradient(circle at 20% 20%, rgba(220,220,220,0.85) 0%, rgba(220,220,220,0.75) 60%, rgba(200,200,200,0.6) 100%);
          border-radius: 18px;
          box-shadow: 0 8px 32px 0 rgba(0,0,0,0.18), 0 2px 8px 0 rgba(0,139,139,0.12);
          padding: 2rem 1.2rem;
          border: 2px solid #fff;
          box-sizing: border-box;
        }
        .userregister-title {
          color: #008b8b;
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          text-align: center;
          text-shadow: 0 0 2px #fff, 0 2px 8px #fff, 0 0 8px #008b8b;
        }
        .userregister-form {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          width: 100%;
        }
        .userregister-input {
          width: 100%;
          padding: 0.7rem;
          border-radius: 8px;
          border: 1px solid #cce4e4;
          font-size: 1rem;
          background: #f7f8fa;
          box-sizing: border-box;
        }
        .userregister-btn {
          background: #008b8b;
          color: #fff;
          border: none;
          padding: 0.7rem 1.2rem;
          border-radius: 6px;
          font-size: 1.1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        .userregister-btn:hover {
          background: #006d6d;
        }
        .userregister-login-link {
          margin-top: 18px;
          text-align: center;
          color: #008b8b;
          font-size: 1rem;
        }
        .userregister-login-btn {
          background: #fff;
          color: #08a3ad;
          border: 1px solid #08a3ad;
          border-radius: 7px;
          padding: 0.7rem 0;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          width: 100%;
          transition: background 0.2s, color 0.2s;
          margin-top: 8px;
        }
        .userregister-login-btn:hover {
          background: #08a3ad;
          color: #fff;
        }
        .userregister-images {
          position: relative;
          flex: 1 1 400px;
          min-width: 400px;
          height: 480px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-end;
          z-index: 2;
        }
        .userregister-img-holder {
          position: absolute;
          width: 320px;
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .userregister-img-holder-top {
          top: -15px;
          right: 40px;
          z-index: 3;
        }
        .userregister-img-holder-middle {
          top: 150px;
          right: -40px;
          z-index: 4;
        }
        .userregister-img-holder-bottom {
          top: 315px;
          right: 75px;
          z-index: 5;
        }
        .userregister-img {
          width: 320px;
          height: 180px;
          object-fit: cover;
          border-radius: 18px;
          box-shadow: 12px 18px 40px 0 rgba(0,0,0,0.22), 4px 8px 16px 0 rgba(0,139,139,0.14);
          background: #eee;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .userregister-img-text {
          position: absolute;
          right: -250px;
          top: 50px;
          color: #111;
          font-size: 1.7rem;
          font-weight: 700;
          background: none;
          padding: 0;
          border-radius: 0;
          box-shadow: none;
          z-index: 10;
          text-align: right;
        }
        .userregister-img-text-bottom {
          top: unset;
          bottom: 60px;
          right: -280px;
          left: unset;
          font-size: 1.7rem;
          text-align: right;
        }
        .userregister-password-row {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
        }
        .userregister-eye {
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
        .warning-strong {
          color: #b12704;
          font-weight: 700;
          margin-top: 0.6rem;
        }
        .editprofile-bg {
          scrollbar-width: none;
        }
        .editprofile-bg::-webkit-scrollbar {
          display: none;
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
      <div className="userregister-main">
        <div className="userregister-form-glass">
          <div className="userregister-form-content">
            <h2 className="userregister-title">Create your Account</h2>
            <form className="userregister-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="userregister-input"
                value={form.fullName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="userregister-input"
                value={form.username}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="userregister-input"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number (optional)"
                className="userregister-input"
                value={form.mobile}
                onChange={handleChange}
              />
              <div className="userregister-password-row">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="userregister-input"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className="userregister-eye"
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

              <div className="userregister-password-row">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="userregister-input"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <span
                  className="userregister-eye"
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
              <div className="userregister-login-link">
                Already have an Account?
                <a href="/login">
                  <button type="button" className="userregister-login-btn">LOGIN</button>
                </a>
              </div>
            </form>
            {warning && <div className="warning-strong">{warning}</div>}
          </div>
        </div>
        <div className="userregister-images">
          <div className="userregister-img-holder userregister-img-holder-top">
            <img src={process.env.PUBLIC_URL + "/JTVCF/gallery/about us/11.jpg"} alt="Group" className="userregister-img" />
            <div className="userregister-img-text userregister-img-text-top">Join the journey.</div>
          </div>
          <div className="userregister-img-holder userregister-img-holder-middle">
            <img src={process.env.PUBLIC_URL + "/JTVCF/gallery/about us/5.jpg"} alt="Ministry" className="userregister-img" />
          </div>
          <div className="userregister-img-holder userregister-img-holder-bottom">
            <img src={process.env.PUBLIC_URL + "/JTVCF/gallery/about us/10.jpg"} alt="Worship" className="userregister-img" />
            <div className="userregister-img-text userregister-img-text-bottom">Be part of <b>JTVCF</b></div>
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
