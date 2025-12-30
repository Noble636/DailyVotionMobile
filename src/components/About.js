import React, { useEffect } from "react";
import TopBar from "./TopBar";

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
        .aboutpage-container {
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #b3e5fc 60%, #b39ddb 100%);
          min-height: 100vh;
          width: 100vw;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 56px; /* Add space for the fixed top bar */
        }
        .aboutpage-bubbles {
          position: absolute;
          left: 0;
          top: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 0;
        }
        .aboutpage-bubble {
          position: absolute;
          border-radius: 50%;
          background: rgba(156, 39, 176, 0.18);
          animation: bubbleUp 8s linear infinite;
        }
        @keyframes bubbleUp {
          0% {
            transform: translateY(100vh) scale(1);
            opacity: 0.7;
          }
          80% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-10vh) scale(1.2);
            opacity: 0;
          }
        }
        .aboutpage-gallery {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100vw;
          max-width: 100vw;
          padding: 0;
        }
        .aboutpage-collage {
          width: 95vw;
          max-width: 400px;
          min-width: 220px;
          height: 220px;
          margin: 0 auto 1.2rem auto;
          position: relative;
          overflow: hidden;
          background: transparent;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .aboutpage-img-float {
          object-fit: cover;
          position: absolute;
        }
        .aboutpage-text {
          width: 95vw;
          max-width: 400px;
          margin: 0 auto 2rem auto;
          padding: 1.2rem 1rem;
          align-items: center;
          background: rgba(255,255,255,0.85);
          border-radius: 32px;
          box-shadow: 0 4px 16px rgba(0,139,139,0.10);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          z-index: 1;
        }
        .aboutpage-text h2,
        .aboutpage-text p {
          text-align: center;
        }
        .aboutpage-text h2 {
          color: #008b8b;
          margin-bottom: 1rem;
        }
        .aboutpage-text p {
          font-size: 1.1rem;
          color: #333;
          margin-bottom: 1rem;
        }
        .aboutpage-text ul {
          margin: 0;
          padding-left: 1.2rem;
          color: #008b8b;
          font-size: 1rem;
        }
        @media (max-width: 500px) {
          .aboutpage-collage {
            height: 160px;
            max-width: 98vw;
          }
          .aboutpage-text {
            padding: 1rem 0.3rem;
            max-width: 98vw;
          }
        }
        .aboutpage-collage-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          width: 95vw;
          max-width: 400px;
          margin: 0 auto;
        }
        .aboutpage-img-grid {
          width: 100%;
          aspect-ratio: 4/3;
          height: 120px;         /* Fixed height for all images */
          border-radius: 12px;
          object-fit: cover;
          box-shadow: 0 4px 16px rgba(0,139,139,0.12);
          background: #e0f7fa;
        }
        .TopBar, .topbar, .aboutpage-topbar {
          width: 100vw;
          max-width: 100vw;
          height: 56px;
          background: #008b8b;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 10;
          padding: 0 1rem;
          box-sizing: border-box;
        }

        .topbar-logo {
          height: 40px;
          width: auto;
          display: block;
        }

        .topbar-menu {
          /* Style your menu icon/button here */
        }
      `}</style>
      <TopBar />
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
