import React, { useEffect } from "react";

const imageBase = "/JTVCF/gallery/about us/";

function About() {
  useEffect(() => {
    const animatedEls = document.querySelectorAll('.about-float-animate');
    const onScroll = () => {
      animatedEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
          el.classList.add('about-float-visible');
        } else {
          el.classList.remove('about-float-visible');
        }
      });
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="aboutpage-container">
      {/* Capstone Top Bar CSS */}
      <style>{`
        .about-float-animate {
          opacity: 0;
          transform: translateY(60px);
          transition: opacity 1.3s cubic-bezier(.22, 1, .36, 1), transform 1.3s cubic-bezier(.22, 1, .36, 1);
          will-change: opacity, transform;
        }
        .about-float-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .aboutpage-topbar {
          background-color: #008b8b;
          padding: 14px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100vw;
          left: 0;
          right: 0;
          box-sizing: border-box;
          margin: 0;
          position: relative;
        }
        .aboutpage-logo {
          color: #fff;
          font-weight: bold;
          font-size: 1.3rem;
        }
        .aboutpage-menu-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          margin-left: auto;
          display: flex;
          align-items: center;
        }
        .aboutpage-menu-icon {
          display: block;
          width: 28px;
          height: 4px;
          background: #fff;
          border-radius: 2px;
          position: relative;
        }
        .aboutpage-menu-icon::before,
        .aboutpage-menu-icon::after {
          content: '';
          display: block;
          width: 28px;
          height: 4px;
          background: #fff;
          border-radius: 2px;
          position: absolute;
          left: 0;
          transition: 0.2s;
        }
        .aboutpage-menu-icon::before {
          top: -10px;
        }
        .aboutpage-menu-icon::after {
          top: 10px;
        }
        .aboutpage-topbar ul {
          list-style: none;
          display: flex;
          gap: 20px;
          margin: 0;
          padding: 0;
        }
        .aboutpage-topbar li a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: 0.3s;
        }
        .aboutpage-topbar li a:hover {
          text-decoration: underline;
          text-shadow: 0 0 8px white;
        }
        .aboutpage-dropdown-menu {
          position: absolute;
          top: 54px;
          right: 32px;
          background: #008b8b;
          border-radius: 8px;
          box-shadow: 0 4px 16px rgba(0,139,139,0.18);
          z-index: 100;
          min-width: 180px;
        }
        .aboutpage-dropdown-menu ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
        }
        .aboutpage-dropdown-menu li {
          padding: 12px 20px;
          color: #fff;
          cursor: pointer;
          border-bottom: 1px solid #006d6d;
          transition: background 0.2s;
          width: 100%;
          box-sizing: border-box;
        }
        .aboutpage-dropdown-menu li:last-child {
          border-bottom: none;
        }
        .aboutpage-dropdown-menu li:hover {
          background: #006d6d;
        }
        .aboutpage-link-btn {
          background: none;
          border: none;
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
          width: 100%;
          text-align: left;
          padding: 0;
        }
        /* --- The rest of your About page styles can follow here if needed --- */
      `}</style>
      {/* Capstone Top Bar JSX */}
      <div className="aboutpage-topbar">
        <div className="aboutpage-logo">Daily Votion</div>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/gallery">Gallery</a></li>
        </ul>
      </div>
      <div className="aboutpage-bubbles">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="aboutpage-bubble"
            style={{
              left: `${Math.random() * 90 + 2}%`,
              width: `${Math.random() * 32 + 18}px`,
              height: `${Math.random() * 32 + 18}px`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
      </div>
      <div className="aboutpage-gallery">
        <div className="aboutpage-text about-float-animate">
          <h2>About Us</h2>
          <p>
            At Daily Votion, we believe that spiritual growth should be personal, accessible, and rooted in community. Our platform offers an interactive space where individuals can engage with daily devotionals, share personal prayers, and connect with others in faith. Whether you're starting your spiritual journey or deepening your walk with God, Daily Votion provides tools to reflect, pray, and grow every day. With features like guided devotionals, prayer walls, and community support, we aim to inspire and encourage you—one day, one prayer, one step at a time.
          </p>
          <p>
            Join us in making faith a daily habit and building a stronger spiritual life through connection and devotion.
          </p>
          <button
            style={{
              marginTop: "2rem",
              alignSelf: "center",
              padding: "0.7rem 2rem",
              borderRadius: "24px",
              background: "#008b8b",
              color: "#fff",
              border: "none",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,139,139,0.10)"
            }}
            onClick={() => window.location.href = "/gallery"}
          >
            View Gallery
          </button>
        </div>
        <div className="aboutpage-collage-grid">
          {[...Array(13)].map((_, i) => (
            <img
              key={i}
              src={imageBase + (i + 1) + ".jpg"}
              alt={`About ${i + 1}`}
              className="aboutpage-img-grid"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
