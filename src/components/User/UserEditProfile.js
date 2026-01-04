import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cropper from 'react-easy-crop';
import getCroppedImg from './getCroppedImg';

function UserEditProfile() {
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropping, setCropping] = useState(false);
  const [rawImage, setRawImage] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetch(`https://dailyvotionbackend-91wt.onrender.com/api/user/${userId}`)
        .then(res => res.json())
        .then(data => {
          setName(data.fullName || '');
          setUsername(data.username || '');
          setEmail(data.email || '');
          setPhone(data.mobile || '');
        });
    }
  }, []);

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setRawImage(reader.result);
        setCropping(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropSave = async () => {
    try {
      const croppedBlob = await getCroppedImg(rawImage, croppedAreaPixels, 250);
      setProfilePic(new File([croppedBlob], 'profile.jpg', { type: 'image/jpeg' }));
      setCropping(false);
    } catch (err) {
      alert('Crop failed');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const userId = localStorage.getItem('userId');
    const formData = new FormData();
    if (name) formData.append('fullName', name);
    if (username) formData.append('username', username);
    if (email) formData.append('email', email);
    if (phone) formData.append('mobile', phone);
    if (password) formData.append('password', password);
    if (profilePic) formData.append('profilePic', profilePic);
    try {
      const res = await fetch(`https://dailyvotionbackend-91wt.onrender.com/api/user/${userId}`, {
        method: 'PUT',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        if (profilePic) {
          setShowImagePopup(true);
          setTimeout(() => setShowImagePopup(false), 1000);
        }
        setShowInfoPopup(true);
        setTimeout(() => {
          setShowInfoPopup(false);
          navigate('/profile');
        }, 1200);
        window.dispatchEvent(new Event('profileUpdated'));
      } else {
        alert(data.error || 'Update failed');
      }
    } catch (err) {
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className="editprofile-bg">
      <style>{`
        * { box-sizing: border-box; }
        body, html {
          margin: 0;
          padding: 0;
          background: #ffffff !important;
          font-family: "Inter", "Segoe UI", Arial, sans-serif;
          color: #0f172a;
        }
        .editprofile-bg {
          min-height: 100vh;
          width: 100%;
          background: #f8fafc;
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 12px;
          position: relative;
        }
        .editprofile-back-btn {
          position: fixed;
          top: 16px;
          right: 16px;
          background: linear-gradient(135deg, #0b62d6 0%, #044a9f 100%);
          color: #ffffff;
          border: none;
          padding: 0.7rem 1.2rem;
          border-radius: 12px;
          font-size: 1rem;
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
        .editprofile-back-btn:hover {
          background: linear-gradient(135deg, #044a9f 0%, #033d82 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(11, 98, 214, 0.35);
        }
        .editprofile-back-btn:active {
          transform: scale(0.97);
        }
        .editprofile-back-btn:focus-visible {
          outline: 3px solid #0b62d6;
          outline-offset: 2px;
        }
        .editprofile-back-arrow {
          width: 20px;
          height: 20px;
          fill: #ffffff;
        }
        .editprofile-flex {
          width: 100%;
          max-width: 500px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 60px;
        }
        .editprofile-formbox {
          width: 100%;
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 2px 12px rgba(11, 98, 214, 0.08);
          padding: 1.5rem 1.2rem;
          border: 2px solid #e2e8f0;
          position: relative;
        }
        .editprofile-formbox::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 5px;
          background: linear-gradient(180deg, #0b62d6 0%, #044a9f 100%);
          border-radius: 16px 0 0 16px;
        }
        .editprofile-title {
          color: #0f172a;
          font-size: 1.6rem;
          font-weight: 800;
          margin: 0 0 1.5rem 0;
          text-align: center;
        }
        .editprofile-formbox form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .editprofile-form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .editprofile-formbox label {
          font-weight: 600;
          color: #0f172a;
          font-size: 1rem;
        }
        .editprofile-formbox input[type="text"],
        .editprofile-formbox input[type="password"],
        .editprofile-formbox input[type="email"],
        .editprofile-formbox input[type="tel"] {
          width: 100%;
          border: 2px solid #cbd5e1;
          border-radius: 10px;
          font-size: 1rem;
          padding: 0.9rem;
          background: #ffffff;
          color: #0f172a;
          transition: all 0.2s ease;
          -webkit-appearance: none;
          appearance: none;
        }
        .editprofile-formbox input:focus {
          outline: none;
          border-color: #0b62d6;
          box-shadow: 0 0 0 3px rgba(11, 98, 214, 0.1);
        }
        .editprofile-formbox input::placeholder {
          color: #94a3b8;
        }
        .editprofile-formbox input[type="file"] {
          padding: 0.6rem;
          border: 2px dashed #cbd5e1;
          border-radius: 10px;
          background: #f8fafc;
          cursor: pointer;
          font-size: 0.95rem;
          transition: all 0.2s ease;
        }
        .editprofile-formbox input[type="file"]:hover {
          border-color: #0b62d6;
          background: #f1f5f9;
        }
        .editprofile-password-field {
          position: relative;
          display: flex;
          align-items: center;
        }
        .editprofile-password-field input {
          flex: 1;
          padding-right: 50px;
        }
        .editprofile-eye {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          background: transparent;
          border: none;
          padding: 8px;
          min-width: 44px;
          min-height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          touch-action: manipulation;
          border-radius: 6px;
          transition: background 0.2s ease;
        }
        .editprofile-eye:hover {
          background: #f1f5f9;
        }
        .editprofile-eye:active {
          background: #e2e8f0;
          transform: translateY(-50%) scale(0.95);
        }
        .editprofile-eye:focus-visible {
          outline: 2px solid #0b62d6;
          outline-offset: 2px;
        }
        .editprofile-save-btn {
          background: linear-gradient(135deg, #0b62d6 0%, #044a9f 100%);
          color: #ffffff;
          border: none;
          padding: 1rem 0;
          border-radius: 12px;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(11, 98, 214, 0.2);
          transition: all 0.2s ease;
          min-height: 48px;
          touch-action: manipulation;
        }
        .editprofile-save-btn:hover {
          background: linear-gradient(135deg, #044a9f 0%, #033d82 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(11, 98, 214, 0.3);
        }
        .editprofile-save-btn:active {
          transform: scale(0.98);
        }
        .editprofile-cancel-btn {
          background: #f1f5f9;
          color: #475569;
          border: 2px solid #cbd5e1;
          padding: 0.9rem 0;
          border-radius: 12px;
          font-size: 1.02rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          min-height: 48px;
          touch-action: manipulation;
        }
        .editprofile-cancel-btn:hover {
          background: #e2e8f0;
          border-color: #94a3b8;
        }
        .editprofile-cancel-btn:active {
          transform: scale(0.98);
        }
        .editprofile-info-guide {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        }
        .editprofile-currentinfo,
        .editprofile-guidebox,
        .editprofile-warningbox {
          background: #ffffff;
          border-radius: 14px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
          padding: 1.2rem;
          border: 2px solid #e2e8f0;
          position: relative;
        }
        .editprofile-currentinfo::before,
        .editprofile-guidebox::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 5px;
          background: linear-gradient(180deg, #0b62d6 0%, #044a9f 100%);
          border-radius: 14px 0 0 14px;
        }
        .editprofile-warningbox {
          background: #fef3f2;
          border-color: #fed7d7;
        }
        .editprofile-warningbox::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 5px;
          background: linear-gradient(180deg, #f97316 0%, #ea580c 100%);
          border-radius: 14px 0 0 14px;
        }
        .editprofile-currentinfo h3,
        .editprofile-guidebox h3 {
          color: #0b62d6;
          margin: 0 0 1rem 0;
          font-size: 1.15rem;
          font-weight: 700;
        }
        .editprofile-currentinfo p,
        .editprofile-guidebox p {
          margin: 0.6rem 0;
          color: #1e293b;
          font-size: 1rem;
          line-height: 1.6;
        }
        .editprofile-warningbox {
          color: #7c2d12;
        }
        .editprofile-warningbox strong {
          color: #ea580c;
          font-weight: 700;
        }
        .crop-container {
          background: #ffffff;
          border: 2px solid #e2e8f0;
          border-radius: 14px;
          padding: 1.2rem;
          margin: 1rem 0;
        }
        .crop-controls {
          display: flex;
          gap: 0.8rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        .crop-btn {
          background: linear-gradient(135deg, #0b62d6 0%, #044a9f 100%);
          color: #ffffff;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          min-height: 44px;
          flex: 1;
          min-width: 120px;
        }
        .crop-btn:hover {
          background: linear-gradient(135deg, #044a9f 0%, #033d82 100%);
        }
        .crop-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .crop-btn.cancel {
          background: #f1f5f9;
          color: #475569;
          border: 2px solid #cbd5e1;
        }
        .crop-btn.cancel:hover {
          background: #e2e8f0;
        }
        .crop-area {
          width: 100%;
          max-width: 300px;
          height: 300px;
          position: relative;
          margin: 0 auto;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid #e2e8f0;
        }
        .popup-notification {
          position: fixed;
          top: 80px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          padding: 1rem 1.8rem;
          border-radius: 14px;
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
          z-index: 9999;
          font-weight: 700;
          font-size: 1rem;
          animation: popIn 0.3s ease-out;
        }
        @keyframes popIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        @media (max-width: 480px) {
          .editprofile-bg {
            padding: 16px 10px;
          }
          .editprofile-back-btn {
            top: 12px;
            right: 12px;
            padding: 0.6rem 1rem;
            font-size: 0.95rem;
          }
          .editprofile-back-arrow {
            width: 18px;
            height: 18px;
          }
          .editprofile-flex {
            max-width: 100%;
            margin-top: 56px;
          }
          .editprofile-formbox {
            padding: 1.2rem 1rem;
          }
          .editprofile-title {
            font-size: 1.4rem;
          }
          .editprofile-formbox input[type="text"],
          .editprofile-formbox input[type="password"],
          .editprofile-formbox input[type="email"],
          .editprofile-formbox input[type="tel"] {
            padding: 0.8rem;
            font-size: 16px;
          }
          .crop-area {
            height: 250px;
            max-width: 250px;
          }
          .crop-controls {
            flex-direction: column;
          }
          .crop-btn {
            width: 100%;
          }
        }
        @media (min-width: 768px) {
          .editprofile-bg {
            padding: 40px 24px;
          }
          .editprofile-back-btn {
            top: 24px;
            right: 24px;
          }
          .editprofile-flex {
            max-width: 600px;
            margin-top: 0;
          }
          .editprofile-formbox {
            padding: 2rem 1.8rem;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <button
        className="editprofile-back-btn"
        onClick={() => navigate('/profile')}
        aria-label="Go back to profile"
      >
        <svg className="editprofile-back-arrow" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
        </svg>
        Back
      </button>

      <div className="editprofile-flex">
        <div className="editprofile-formbox">
          <h2 className="editprofile-title">Edit Profile</h2>
          <form onSubmit={handleSave}>
            <div className="editprofile-form-group">
              <label htmlFor="name">Change Name:</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="New Name"
              />
            </div>

            <div className="editprofile-form-group">
              <label htmlFor="username">Change Username:</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="New Username"
              />
            </div>

            <div className="editprofile-form-group">
              <label htmlFor="password">Change Password:</label>
              <div className="editprofile-password-field">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="New Password"
                />
                <button
                  type="button"
                  className="editprofile-eye"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M2 2l16 16" stroke="#4b5563" strokeWidth="2"/>
                      <path d="M10 4C5 4 1.73 8.11 1 10c.73 1.89 4 6 9 6 2.1 0 4.06-.61 5.62-1.62" stroke="#4b5563" strokeWidth="2" fill="none"/>
                      <circle cx="10" cy="10" r="4" stroke="#4b5563" strokeWidth="2" fill="none"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M10 4C5 4 1.73 8.11 1 10c.73 1.89 4 6 9 6s8.27-4.11 9-6c-.73-1.89-4-6-9-6zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" fill="#4b5563"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="editprofile-form-group">
              <label htmlFor="confirmPassword">Confirm New Password:</label>
              <div className="editprofile-password-field">
                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  className="editprofile-eye"
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                  title={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M2 2l16 16" stroke="#4b5563" strokeWidth="2"/>
                      <path d="M10 4C5 4 1.73 8.11 1 10c.73 1.89 4 6 9 6 2.1 0 4.06-.61 5.62-1.62" stroke="#4b5563" strokeWidth="2" fill="none"/>
                      <circle cx="10" cy="10" r="4" stroke="#4b5563" strokeWidth="2" fill="none"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M10 4C5 4 1.73 8.11 1 10c.73 1.89 4 6 9 6s8.27-4.11 9-6c-.73-1.89-4-6-9-6zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" fill="#4b5563"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="editprofile-form-group">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>

            <div className="editprofile-form-group">
              <label htmlFor="phone">Phone Number (optional):</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Phone Number"
              />
            </div>

            <div className="editprofile-form-group">
              <label htmlFor="profilePic">Upload Profile Picture:</label>
              <input
                id="profilePic"
                type="file"
                accept="image/*"
                onChange={handlePicChange}
              />
            </div>

            {cropping && (
              <div className="crop-container">
                <div className="crop-controls">
                  <button
                    type="button"
                    className="crop-btn"
                    onClick={handleCropSave}
                    disabled={!croppedAreaPixels}
                  >
                    Save Crop
                  </button>
                  <button 
                    type="button" 
                    className="crop-btn cancel"
                    onClick={() => setCropping(false)}
                  >
                    Cancel
                  </button>
                </div>
                <div className="crop-area">
                  <Cropper
                    image={rawImage}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                </div>
              </div>
            )}

            <button className="editprofile-save-btn" type="submit">
              Save Changes
            </button>
            <button
              className="editprofile-cancel-btn"
              type="button"
              onClick={() => navigate('/profile')}
            >
              Cancel
            </button>
          </form>
        </div>

        <div className="editprofile-info-guide">
          <div className="editprofile-currentinfo">
            <h3>Current Profile Info</h3>
            <p><strong>Name:</strong> {name || <span style={{color:'#94a3b8'}}>Not set</span>}</p>
            <p><strong>Username:</strong> {username || <span style={{color:'#94a3b8'}}>Not set</span>}</p>
            <p><strong>Email:</strong> {email || <span style={{color:'#94a3b8'}}>Not set</span>}</p>
            <p><strong>Phone:</strong> {phone || <span style={{color:'#94a3b8'}}>Not set</span>}</p>
          </div>

          <div className="editprofile-guidebox">
            <h3>Profile Editing Tips</h3>
            <p>
              Update your details as needed. Leave fields blank to keep current info. Your changes are private and secure.
            </p>
          </div>

          <div className="editprofile-warningbox">
            <p><strong>Security Warning:</strong><br />
            Never share your password with anyone, including admins. Your password is private and should be kept secure at all times.</p>
          </div>
        </div>
      </div>

      {showImagePopup && (
        <div className="popup-notification">
          ✓ Image uploaded successfully!
        </div>
      )}

      {showInfoPopup && (
        <div className="popup-notification">
          ✓ Your info is updated!
        </div>
      )}
    </div>
  );
}

export default UserEditProfile;