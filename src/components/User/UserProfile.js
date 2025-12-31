import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../TopBar";
import { getVerseOfTheDay } from "../BibleVerse";

function UserProfile() {
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [user, setUser] = useState({
    fullName: '',
    username: '',
  });
  const [profilePicBase64, setProfilePicBase64] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetch(`https://dailyvotionbackend-91wt.onrender.com/api/user/${userId}`)
        .then(res => res.json())
        .then(data => {
          setUser({
            fullName: data.fullName,
            username: data.username,
          });
        });
      fetch(`https://dailyvotionbackend-91wt.onrender.com/api/user/${userId}/profile-pic`)
          .then(res => res.ok ? res.json() : Promise.resolve({}))
          .then(data => {
            if (data.base64) {
              setProfilePicBase64(data.base64);
            } else {
              setProfilePicBase64('');
            }
          });
    }
  }, []);
    useEffect(() => {
      const handleStorage = () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
          fetch(`https://dailyvotionbackend-91wt.onrender.com/api/user/${userId}`)
            .then(res => res.json())
            .then(data => {
              setUser({
                fullName: data.fullName,
                username: data.username,
              });
              setShowInfoPopup(true);
              setTimeout(() => setShowInfoPopup(false), 1200);
            });
          fetch(`https://dailyvotionbackend-91wt.onrender.com/api/user/${userId}/profile-pic?${Date.now()}`)
              .then(res => res.ok ? res.json() : Promise.resolve({}))
              .then(data => {
                if (data.base64) {
                  setProfilePicBase64(data.base64);
                } else {
                  setProfilePicBase64('');
                }
              });
        }
      };
      window.addEventListener('profileUpdated', handleStorage);
      return () => window.removeEventListener('profileUpdated', handleStorage);
    }, []);

  const [latestPrayer, setLatestPrayer] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetch(`https://dailyvotionbackend-91wt.onrender.com/api/user/${userId}/prayer`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setLatestPrayer(data[0]);
          } else {
            setLatestPrayer(null);
          }
        });
    }
  }, []);

  const [latestSOAP, setLatestSOAP] = useState(null);
  const [reflections, setReflections] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetch(`https://dailyvotionbackend-91wt.onrender.com/api/user/${userId}/journal/latest`)
        .then(res => res.json())
        .then(data => {
          if (data && data.scripture) {
            setLatestSOAP({
              title: "Today's SOAP",
              scripture: data.scripture,
              observation: data.observation,
              application: data.application,
              prayer: data.prayer,
              date: data.date
            });
          } else {
            setLatestSOAP(null);
          }
        });
      fetch(`https://dailyvotionbackend-91wt.onrender.com/api/user/${userId}/reflections`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setReflections(data);
          } else {
            setReflections([]);
          }
        });
    }
  }, []);

  const getLatestSOAP = () => {
    if (latestSOAP && latestSOAP.scripture) return latestSOAP;
    return {
      title: "No Journal Entries Yet",
      scripture: "",
      observation: "",
      application: "",
      prayer: "",
      date: ""
    };
  };

  const openModal = (type) => {
    if (type === "verse") {
      const verse = getVerseOfTheDay();
      setModalData({
        title: "Verse of the Day",
        content: `"${verse.text}" – ${verse.ref}`
      });
    } else if (type === "soap") {
      setModalData(getLatestSOAP());
    } else if (type === "prayer") {
      setModalData(latestPrayer);
    } else if (type === "church") {
      setModalData({
        title: "Full Gospel Christian Church - Worship Service",
        content: [
          "WORSHIP SERVICE SUNDAY | 10AM-12NOON",
          "-------------------------------------------------------------------------------------------------------------",
          "PAGE · THE LINK",
          "Address: JTVCF Center 46 Luzon St. Zone 5 Central Signal, Taguig, Philippines",
          "Contact No.: 09320825895",
          "Email: jesusthetruevine_jvtcf1988@yahoo.com"
        ]
      });
    }
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
    setModalData(null);
  };

  return (
    <div
      className="userprofile-bg"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/JTVCF/gallery/about%20us/13.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100vw",
        overflow: "auto",
      }}
    >
      <style>{`
        .userprofile-bg {
          font-family: Arial, sans-serif;
          min-height: 100vh;
          width: 100vw;
          background: center center / cover no-repeat;
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
        }
        .userprofile-main {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          width: 100vw;
          min-height: 100vh;
          padding: 0;
          margin: 0;
          gap: 0;
          box-sizing: border-box;
        }
        .userprofile-left,
        .userprofile-right {
          width: 98vw;
          max-width: 98vw;
          min-width: 0;
          margin: 0 auto 18px auto;
          background: rgba(255,255,255,0.85);
          border-radius: 14px;
          box-shadow: 0 4px 18px rgba(0,139,139,0.10);
          padding: 1.2rem 0.7rem 1.2rem 0.7rem;
          box-sizing: border-box;
        }
        .userprofile-left {
          align-items: center;
          display: flex;
          flex-direction: column;
          height: auto;
          min-height: 0;
          max-width: 98vw;
        }
        .userprofile-avatar-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1.2rem;
        }
        .userprofile-avatar {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 0.7rem;
          border: 2px solid #008b8b;
        }
        .userprofile-name {
          margin: 0;
          font-size: 1.2rem;
          font-weight: bold;
          color: #008b8b;
          margin-bottom: 0.3rem;
          text-align: center;
        }
        .userprofile-username {
          font-size: 0.95rem;
          color: #555;
          margin-bottom: 0.7rem;
          text-align: center;
        }
        .userprofile-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.7rem;
          width: 100%;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        .userprofile-btn {
          background: #008b8b;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 0.95rem;
          font-weight: 500;
          padding: 0.5rem 0.7rem;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,139,139,0.10);
          transition: background 0.2s, box-shadow 0.2s;
          min-width: 90px;
          width: 45%;
          max-width: 160px;
          margin: 0 2% 0 2%;
        }
        .userprofile-verse {
          margin: 0.5rem auto 0 auto;
          width: 100%;
          max-width: 600px;
          padding: 1rem 0.5rem;
          box-sizing: border-box;
          text-align: center;
          word-break: break-word;
          overflow-wrap: break-word;
          white-space: pre-line;
        }
        .userprofile-box.userprofile-verse {
          min-height: 120px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .userprofile-right {
          gap: 1.2rem;
          max-height: none;
          height: auto;
          overflow-y: visible;
          margin-bottom: 24px;
        }
        .userprofile-box {
          background: linear-gradient(120deg, #e0f7fa 0%, #b2ebf2 60%, #f7f8fa 100%);
          border: 1px solid #e0e0e0;
          box-shadow: 0 4px 18px rgba(0,139,139,0.10);
          border-radius: 14px;
          padding: 1rem 0.7rem;
          margin-bottom: 0.7rem;
          width: 100%;
          margin-left: auto;
          margin-right: auto;
          box-sizing: border-box;
        }
        .userprofile-post {
          background: none;
          padding: 0;
          border-radius: 0;
          margin-top: 0.5rem;
        }
        .userprofile-date {
          font-size: 0.95rem;
          color: #888;
          margin-bottom: 0.3rem;
        }
        .userprofile-content {
          margin: 0;
          font-style: italic;
          font-size: 1.05rem;
          color: #333;
        }
        .userprofile-box.clickable { cursor: pointer; }
        .userprofile-box.clickable:hover {
          transform: translateY(-3px) scale(1.01);
          box-shadow: 0 8px 24px rgba(8,163,173,0.13), 0 2px 8px rgba(0,139,139,0.10);
          border-color: #43e9f6;
          background: linear-gradient(120deg, #e0f7fa 0%, #f7f8fa 100%);
          transition: box-shadow 0.2s, transform 0.18s, border 0.18s;
        }
        .profile-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1200;
          padding: 10px;
          box-sizing: border-box;
        }
        .profile-modal {
          background: #fff;
          border-radius: 10px;
          max-width: 98vw;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          padding: 1rem 0.7rem;
          box-shadow: 0 10px 40px rgba(0,0,0,0.18);
          position: relative;
        }
        .profile-modal-close {
          position: absolute;
          right: 10px;
          top: 8px;
          background: transparent;
          border: none;
          font-size: 22px;
          cursor: pointer;
          color: #333;
        }
        .profile-modal-title {
          color: #008b8b;
          margin-top: 0;
          margin-bottom: 0.6rem;
        }
        .profile-modal-content { color: #222; line-height: 1.5; }
        .profile-modal-content.preformatted p { margin: 6px 0; white-space: pre-line; }
        @media (max-width: 800px) {
          .profile-modal { max-width: 96%; padding: 1rem; }
        }
        @media (max-width: 1200px) {
          .userprofile-main {
            flex-direction: column;
            align-items: center;
            gap: 2rem;
          }
          .userprofile-left,
          .userprofile-right {
            max-width: 95vw;
            width: 100%;
            margin-bottom: 2rem;
          }
        }
      `}</style>
      <TopBar
        menuItems={[
          { label: "Profile", link: "/profile" },
          { label: "About", link: "/about" },
          { label: "Logout", link: "/" }
        ]}
      />

      {showInfoPopup && (
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
          Your info is updated!
        </div>
      )}
      <div className="userprofile-main">
        <div className="userprofile-left">
          <div className="userprofile-avatar-section">
            <img
              src={profilePicBase64
                ? profilePicBase64
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || user.username || 'Me')}&background=008b8b&color=fff&size=128`}
              alt="User"
              className="userprofile-avatar"
              onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || user.username || 'Me')}&background=008b8b&color=fff&size=128`; }}
            />
            <h2 className="userprofile-name">{user.fullName || 'Your Name'}</h2>
            <p className="userprofile-username">{user.username ? `@${user.username}` : '@username'}</p>
          </div>

          <div className="userprofile-buttons">
            <button className="userprofile-btn" onClick={() => navigate("/editprofile")}>Edit Profile</button>
            <button className="userprofile-btn" onClick={() => navigate("/journal")}>Journal</button>
            <button className="userprofile-btn" onClick={() => navigate("/userprayerrequest")}>Add Prayer Request</button>
            <button className="userprofile-btn" onClick={() => navigate("/userreflection")}>Reflection</button>
            <button className="userprofile-btn" onClick={() => navigate("/userfeedback")}>App Feedback</button>
          </div>

          <div
            className="userprofile-box userprofile-verse clickable"
            onClick={() => openModal("verse")}
            role="button"
            tabIndex={0}
          >
            <h3>Verse of the Day</h3>
              {(() => {
                const verse = getVerseOfTheDay();
                return <p style={{margin: "0.5rem 0 0 0"}}>{`"${verse.text}" – ${verse.ref}`}</p>;
              })()}
          </div>
        </div>

        <div className="userprofile-right">
          <div
            className="userprofile-box clickable"
            onClick={() => openModal("soap")}
            role="button"
            tabIndex={0}
          >
            <h3>Recent Post</h3>
            <div className="userprofile-post" style={{ minHeight: '100px' }}>
              {latestSOAP && latestSOAP.scripture ? (
                <>
                  <p className="userprofile-date">{latestSOAP.date ? new Date(latestSOAP.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</p>
                  <p className="userprofile-content">{latestSOAP.scripture}</p>
                </>
              ) : (
                <p className="userprofile-content">No Journal Entries Yet</p>
              )}
            </div>
          </div>

          <div
            className="userprofile-box clickable"
            onClick={() => openModal("prayer")}
            role="button"
            tabIndex={0}
          >
            <h3>Prayer Requests</h3>
            {latestPrayer ? (
              <div>
                <p><strong>Date:</strong> {latestPrayer.date ? latestPrayer.date.slice(0, 10) : ""}</p>
                <p><strong>Your Prayer:</strong> {latestPrayer.text}</p>
                <button
                  style={{
                    marginTop: '0.5rem',
                    background: '#008b8b',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.5rem 1rem',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                  onClick={e => {
                    e.stopPropagation();
                    openModal('prayer');
                  }}
                >
                  View Admin Response
                </button>
              </div>
            ) : (
              <p style={{ color: '#888' }}>No Prayer Requests Yet</p>
            )}
          </div>

          <div
            className="userprofile-box clickable"
            onClick={() => navigate("/userreflection")}
            role="button"
            tabIndex={0}
          >
            <h3>Reflection Activities</h3>
            {reflections.length === 0 ? (
              <p style={{ color: '#888' }}>No reflection activity from admin yet.</p>
            ) : (
              <ul style={{ paddingLeft: 0, margin: 0 }}>
                {reflections.map((reflection) => (
                  <li key={reflection.id} style={{ listStyle: 'none', marginBottom: '0.7rem', background: '#e0f7fa', borderRadius: '8px', padding: '0.7rem' }}>
                    <div style={{ fontWeight: 500, color: '#006d6d' }}>{reflection.message}</div>
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>Sent: {reflection.sent_at ? new Date(reflection.sent_at).toLocaleString() : ''}</div>
                    {reflection.response && (
                      <div style={{ color: '#07484a', fontSize: '0.96rem', marginTop: '0.3rem' }}><strong>Your Response:</strong> {reflection.response}</div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div
            className="userprofile-box clickable"
            onClick={() => openModal("church")}
            role="button"
            tabIndex={0}
          >
            <h3>Church Schedule</h3>
            <p>Sunday Worship • 10:00 AM - 12:00 NOON</p>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="profile-modal-overlay" onClick={closeModal}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <button className="profile-modal-close" onClick={closeModal}>×</button>
            <h3 className="profile-modal-title">{modalData?.title || (modalType === "prayer" ? "Latest Prayer Request" : "")}</h3>

            {modalType === "verse" && (
              <div className="profile-modal-content">
                <p>{modalData?.content}</p>
              </div>
            )}

            {modalType === "soap" && modalData && (
              <div className="profile-modal-content">
                {modalData.scripture ? (
                  <>
                    <p><strong>Scripture:</strong> {modalData.scripture}</p>
                    <p><strong>Observation:</strong> {modalData.observation}</p>
                    <p><strong>Application:</strong> {modalData.application}</p>
                    <p><strong>Prayer:</strong> {modalData.prayer}</p>
                  </>
                ) : (
                  <p>No Journal Entries Yet</p>
                )}
              </div>
            )}

            {modalType === "prayer" && (
              <div className="profile-modal-content">
                {modalData ? (
                  <>
                    <p><strong>Date:</strong> {modalData.date}</p>
                    <p><strong>Your Prayer:</strong> {modalData.text}</p>
                    <button
                      style={{
                        marginTop: '0.5rem',
                        background: '#008b8b',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.5rem 1rem',
                        fontSize: '1rem',
                        cursor: 'pointer'
                      }}
                      onClick={e => e.stopPropagation()}
                    >
                      {modalData.response ? "Hide Admin Response" : "View Admin Response"}
                    </button>
                    {modalData.response ? (
                      <p style={{marginTop:'0.7rem'}}><strong>Admin Response:</strong> {modalData.response}</p>
                    ) : (
                      <p style={{ color: '#888' }}>No admin response yet.</p>
                    )}
                  </>
                ) : (
                  <p style={{ color: '#888' }}>No Prayer Requests Yet</p>
                )}
              </div>
            )}

            {modalType === "church" && modalData && (
              <div className="profile-modal-content preformatted">
                {Array.isArray(modalData.content)
                  ? modalData.content.map((line, i) => <p key={i}>{line}</p>)
                  : <p>{modalData.content}</p>
                }
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;