import React, { useState, useEffect } from "react";
import Cropper from 'react-easy-crop';
import getCroppedImg from './getCroppedImg';
import "../../css/User/UserEditProfile.css";

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
          // Redirect to UserProfile.js after popup
          window.location.href = '/profile';
        }, 1200);
        window.dispatchEvent(new Event('profileUpdated'));
      } else {
        alert(data.error || 'Update failed');
      }
    } catch (err) {
      alert('Server error. Please try again later.');
    }
  };

  const bgStyle = {
    minHeight: '100vh',
    width: '100vw',
    background: "url('/JTVCF/gallery/about us/13.jpg') center center / cover no-repeat",
    overflowY: 'auto'
  };

  return (
    <div style={bgStyle} className="editprofile-bg">
      <div className="editprofile-flex">
        <div className="editprofile-formbox">
          <h2 className="editprofile-title">Edit Profile</h2>
          <form onSubmit={handleSave}>
            <label>Change Name:</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="New Name"
            />

            <label>Change Username:</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="New Username"
            />

            <label>Change Password:</label>
            <div className="editprofile-password-field">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="New Password"
              />
              <span
                className="editprofile-eye"
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

            <label>Confirm New Password:</label>
            <div className="editprofile-password-field">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
              <span
                className="editprofile-eye"
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

            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
            />

            <label>Phone Number (optional):</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="Phone Number"
            />

            <label>Upload Profile Picture:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePicChange}
            />
            {cropping && (
              <div style={{ position: 'relative', width: 250, height: 250, margin: '1rem auto' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', justifyContent: 'flex-start' }}>
                  <button
                    type="button"
                    style={{ zIndex: 1000 }}
                    onClick={handleCropSave}
                    disabled={!croppedAreaPixels}
                  >
                    Save Crop
                  </button>
                  <button type="button" onClick={() => setCropping(false)}>Cancel</button>
                </div>
                <div style={{ width: 250, height: 250, position: 'relative' }}>
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
            {showImagePopup && (
              <div style={{
                position: 'fixed',
                top: '20%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: '#008b8b',
                color: '#fff',
                padding: '1rem 2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(0,139,139,0.15)',
                zIndex: 9999
              }}>
                Image uploaded successfully!
              </div>
            )}
            {showInfoPopup && (
              <div style={{
                position: 'fixed',
                top: '28%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: '#008b8b',
                color: '#fff',
                padding: '1rem 2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(0,139,139,0.15)',
                zIndex: 9999
              }}>
                Your info is updated!
              </div>
            )}

            <button className="editprofile-save-btn" type="submit">
              Save Changes
            </button>
            <button
              className="editprofile-cancel-btn"
              type="button"
              style={{
                marginTop: "0.5rem",
                background: "#eee",
                color: "#008b8b",
                border: "none",
                borderRadius: "8px",
                padding: "0.7rem 1.5rem",
                fontSize: "1rem",
                fontWeight: "500",
                cursor: "pointer"
              }}
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
          </form>
        </div>
        <div className="editprofile-info-guide">
          <div className="editprofile-currentinfo">
            <h3>Current Profile Info</h3>
            <p>Name: {name || <span style={{color:'#888'}}>Not set</span>}</p>
            <p>Username: {username || <span style={{color:'#888'}}>Not set</span>}</p>
            <p>Email: {email || <span style={{color:'#888'}}>Not set</span>}</p>
            <p>Phone: {phone || <span style={{color:'#888'}}>Not set</span>}</p>
          </div>
          <div className="editprofile-guidebox">
            <h3>Profile Editing Tips</h3>
            <p>
              Update your details as needed.<br />
              Leave fields blank to keep current info.<br />
              Your changes are private and secure.
            </p>
          </div>
          <div className="editprofile-warningbox">
            <strong>Security Warning:</strong><br />
            Never share your password with anyone, including admins. Your password is private and should be kept secure at all times.
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserEditProfile;