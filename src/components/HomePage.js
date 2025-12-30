import React, { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";


const logoPath = '/JTVCF/home page/logo v3.png'; 
const DailyVotion = () => {
  const navigate = useNavigate();
  const seekBarRef = useRef();

  const isUserLoggedIn = !!localStorage.getItem('userId');
  const isAdminLoggedIn = !!localStorage.getItem('adminId') || !!sessionStorage.getItem('adminUser');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (seekBarRef.current) {
        seekBarRef.current.style.width = percent + '%';
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Responsive styles for split layout (desktop) and stacked (mobile)
  const styles = {
    seekBarContainer: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: 4,
      background: 'rgba(0,0,0,0.05)',
      zIndex: 1000,
    },
    seekBar: {
      height: '100%',
      background: 'linear-gradient(90deg, #f7b733, #fc4a1a)',
      width: '0%',
      transition: 'width 0.2s',
    },
    splitContainer: {
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(120deg, #16777a 0%, #e0c9f7 100%)',
      position: 'relative',
      zIndex: 2,
    },
    leftPanel: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 0,
      padding: '0 2vw',
    },
    logoImage: {
      width: 'min(90vw, 420px)',
      maxWidth: 420,
      height: 'auto',
      display: 'block',
      background: 'none',
    },
    rightPanel: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 0,
      padding: '0 2vw',
    },
    welcomeHeader: {
      fontSize: 48,
      fontWeight: 900,
      margin: '0 0 16px 0',
      color: '#222',
      textAlign: 'center',
      lineHeight: 1.1,
    },
    dailyVotionBrand: {
      color: '#f7b733',
      fontWeight: 900,
    },
    bibleVerse: {
      fontSize: 20,
      fontStyle: 'italic',
      color: '#333',
      marginBottom: 4,
      textAlign: 'center',
    },
    bibleReference: {
      fontSize: 16,
      color: '#888',
      marginBottom: 24,
      textAlign: 'center',
    },
    getStartedButton: {
      padding: '16px 0',
      width: 220,
      fontSize: 20,
      fontWeight: 700,
      color: '#fff',
      background: 'linear-gradient(90deg, #f7b733, #fc4a1a)',
      border: 'none',
      borderRadius: 10,
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      margin: '20px 0 0 0',
      alignSelf: 'center',
      transition: 'background 0.2s',
    },
    // Responsive overrides for mobile
    '@media (max-width: 800px)': {
      splitContainer: {
        flexDirection: 'column',
        padding: '32px 0',
      },
      leftPanel: {
        padding: 0,
        marginBottom: 16,
      },
      rightPanel: {
        padding: 0,
      },
      welcomeHeader: {
        fontSize: 32,
      },
      getStartedButton: {
        width: '90vw',
        maxWidth: 320,
        fontSize: 18,
      },
      logoImage: {
        width: '70vw',
        maxWidth: 260,
      },
    },
  };

  // Inline media query for mobile responsiveness
  React.useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      @media (max-width: 800px) {
        .splitContainer { flex-direction: column !important; padding: 32px 0 !important; }
        .leftPanel { padding: 0 !important; margin-bottom: 16px !important; }
        .rightPanel { padding: 0 !important; }
        .welcomeHeader { font-size: 32px !important; }
        .getStartedButton { width: 90vw !important; max-width: 320px !important; font-size: 18px !important; }
        .logoImage { width: 70vw !important; max-width: 260px !important; }
      }
    `;
    document.head.appendChild(styleTag);
    return () => { document.head.removeChild(styleTag); };
  }, []);

  return (
    <>
      <div style={styles.seekBarContainer}>
        <div style={styles.seekBar} ref={seekBarRef}></div>
      </div>
      <div className="splitContainer" style={styles.splitContainer}>
        <div className="leftPanel" style={styles.leftPanel}>
          <img 
            src={logoPath} 
            alt="Jesus The True Vine Christian Fellowship Logo" 
            className="logoImage"
            style={styles.logoImage}
          />
        </div>
        <div className="rightPanel" style={styles.rightPanel}>
          <h1 className="welcomeHeader" style={styles.welcomeHeader}>
            Welcome to <span style={styles.dailyVotionBrand}>DailyVotion</span>
          </h1>
          <p style={styles.bibleVerse}>
            "When the time is right, I the Lord will make it happen"
          </p>
          <p style={styles.bibleReference}>
            Isaiah 60:22
          </p>
          <button 
            className="getStartedButton"
            style={styles.getStartedButton}
            onClick={() => {
              if (isAdminLoggedIn) {
                navigate("/admindashboard");
              } else if (isUserLoggedIn) {
                navigate("/profile");
              } else {
                navigate("/login");
              }
            }}
          >
            Get Started!
          </button>
        </div>
      </div>

      {/* Restored homepage content below */}
      <div style={{
        width: '100vw',
        background: "url('/JTVCF/for background picture/3.webp') center center/cover no-repeat",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 0',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          width: '90vw',
          maxWidth: 400,
          background: 'rgba(255,255,255,0.92)',
          borderRadius: 16,
          padding: 20,
          fontSize: 15,
          color: '#333',
          boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
          marginBottom: 24,
          textAlign: 'center',
        }}>
          <span style={{fontWeight: 700, fontSize: 18, color: '#fc4a1a', marginBottom: 8, display: 'block'}}>Greetings in Christ!</span>
          <br />
          From all of us at Jesus the True Vine Christian Fellowship, Taguig City, we warmly welcome you to <b>DailyVotion: An Interactive Digital Devotional Prayer Platform.</b> May the grace, peace, and love of our Lord Jesus Christ be with you as you begin or continue your spiritual journey with us.
        </div>
        <img src={"/JTVCF/gallery/ministry or organization/15.jpg"} alt="Top" style={{width: '90vw', maxWidth: 320, height: 'auto', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.09)', margin: '12px 0', objectFit: 'cover'}} />
        <img src={"/JTVCF/gallery/about us/13.jpg"} alt="Middle" style={{width: '90vw', maxWidth: 320, height: 'auto', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.09)', margin: '12px 0', objectFit: 'cover'}} />
        <img src={"/JTVCF/gallery/about us/7.jpg"} alt="Bottom" style={{width: '90vw', maxWidth: 320, height: 'auto', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.09)', margin: '12px 0', objectFit: 'cover'}} />
      </div>
      <div style={{
        width: '100vw',
        background: "url('/JTVCF/for background picture/3.webp') center center/cover no-repeat",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 0',
        position: 'relative',
        zIndex: 1,
      }}>
        <img src={'/JTVCF/home page/2.jpg'} alt="Top left" style={{width: '90vw', maxWidth: 320, height: 'auto', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.09)', margin: '12px 0', objectFit: 'cover'}} />
        <img src={'/JTVCF/home page/1.jpg'} alt="Top right" style={{width: '90vw', maxWidth: 320, height: 'auto', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.09)', margin: '12px 0', objectFit: 'cover'}} />
        <img src={'/JTVCF/gallery/ministry or organization/6.jpg'} alt="Middle left" style={{width: '90vw', maxWidth: 320, height: 'auto', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.09)', margin: '12px 0', objectFit: 'cover'}} />
        <img src={'/JTVCF/gallery/about us/2.jpg'} alt="Bottom left" style={{width: '90vw', maxWidth: 320, height: 'auto', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.09)', margin: '12px 0', objectFit: 'cover'}} />
        <div style={{width: '90vw', maxWidth: 400, background: 'rgba(255,255,255,0.92)', borderRadius: 16, padding: 20, fontSize: 15, color: '#333', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', margin: '24px 0 0 0', textAlign: 'center'}}>
          <p>
            As you use this platform, may your heart be filled with the joy of God’s Word, your spirit be renewed through prayer, and your faith be strengthened each day. Remember that devotion is not just an act — it is a daily walk with God, a conversation with our Creator, and a reflection of His goodness in our lives.
          </p>
          <p>
            Use DailyVotion to record your reflections, lift up prayer requests, and share testimonies so we may encourage one another.
          </p>
        </div>
      </div>
    </>
  );
};

export default DailyVotion;