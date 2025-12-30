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
        <div className="aboutpage-collage">
          <img src={imageBase + "1.jpg"} alt="About 1" className="aboutpage-img-float about-float-animate" style={{ position: "absolute", top: 40, left: 40, maxWidth: 220, maxHeight: 140, zIndex: 5, borderRadius: "18px", boxShadow: "0 8px 32px rgba(0,139,139,0.18)", objectFit: "cover", transform: "rotate(-7deg)" }} />
          <img src={imageBase + "2.jpg"} alt="About 2" className="aboutpage-img-float about-float-animate" style={{ position: "absolute", top: 0, left: 180, maxWidth: 180, maxHeight: 120, zIndex: 6, borderRadius: "16px", boxShadow: "0 6px 24px rgba(0,139,139,0.15)", objectFit: "cover", transform: "rotate(8deg)" }} />
          <img src={imageBase + "3.jpg"} alt="About 3" className="aboutpage-img-float about-float-animate" style={{ position: "absolute", top: 120, left: 120, maxWidth: 200, maxHeight: 140, zIndex: 7, borderRadius: "20px", boxShadow: "0 6px 24px rgba(0,139,139,0.15)", objectFit: "cover", transform: "rotate(-12deg)" }} />
          <img src={imageBase + "4.jpg"} alt="About 4" className="aboutpage-img-float about-float-animate" style={{ position: "absolute", top: 180, left: 220, maxWidth: 140, maxHeight: 90, zIndex: 8, borderRadius: "14px", boxShadow: "0 4px 16px rgba(0,139,139,0.12)", objectFit: "cover", transform: "rotate(5deg)" }} />
          <img src={imageBase + "5.jpg"} alt="About 5" className="aboutpage-img-float about-float-animate" style={{ position: "absolute", top: 80, left: 320, maxWidth: 180, maxHeight: 120, zIndex: 9, borderRadius: "18px", boxShadow: "0 6px 24px rgba(0,139,139,0.15)", objectFit: "cover", transform: "rotate(-10deg)" }} />
          <img src={imageBase + "6.jpg"} alt="About 6" className="aboutpage-img-float about-float-animate" style={{ position: "absolute", top: 220, left: 320, maxWidth: 120, maxHeight: 100, zIndex: 10, borderRadius: "15px", boxShadow: "0 4px 16px rgba(0,139,139,0.12)", objectFit: "cover", transform: "rotate(12deg)" }} />
          <img src={imageBase + "7.jpg"} alt="About 7" className="aboutpage-img-float about-float-animate" style={{ position: "absolute", top: 280, left: 180, maxWidth: 100, maxHeight: 80, zIndex: 11, borderRadius: "14px", boxShadow: "0 4px 16px rgba(0,139,139,0.12)", objectFit: "cover", transform: "rotate(-6deg)" }} />
          <img src={imageBase + "8.jpg"} alt="About 8" className="aboutpage-img-float about-float-animate" style={{ position: "absolute", top: 300, left: 320, maxWidth: 100, maxHeight: 70, zIndex: 12, borderRadius: "12px", boxShadow: "0 4px 16px rgba(0,139,139,0.12)", objectFit: "cover", transform: "rotate(7deg)" }} />
          <img src={imageBase + "9.jpg"} alt="About 9" className="aboutpage-img-float about-float-animate" style={{ position: "absolute", top: 360, left: 120, maxWidth: 120, maxHeight: 80, zIndex: 13, borderRadius: "14px", boxShadow: "0 4px 16px rgba(0,139,139,0.12)", objectFit: "cover", transform: "rotate(-8deg)" }} />
          <img src={imageBase + "10.jpg"} alt="About 10" className="aboutpage-img-float about-float-animate" style={{ position: "absolute", top: 380, left: 220, maxWidth: 100, maxHeight: 70, zIndex: 14, borderRadius: "12px", boxShadow: "0 4px 16px rgba(0,139,139,0.12)", objectFit: "cover", transform: "rotate(10deg)" }} />
          <img src={imageBase + "11.jpg"} alt="About 11" className="aboutpage-img-float about-float-animate" style={{ position: "absolute", top: 440, left: 320, maxWidth: 80, maxHeight: 60, zIndex: 15, borderRadius: "10px", boxShadow: "0 4px 16px rgba(0,139,139,0.12)", objectFit: "cover", transform: "rotate(-5deg)" }} />
          <img src={imageBase + "12.jpg"} alt="About 12" className="aboutpage-img-float about-float-animate" style={{ position: "absolute", top: 440, left: 180, maxWidth: 80, maxHeight: 60, zIndex: 16, borderRadius: "10px", boxShadow: "0 4px 16px rgba(0,139,139,0.12)", objectFit: "cover", transform: "rotate(6deg)" }} />
          <img src={imageBase + "13.jpg"} alt="About 13" className="aboutpage-img-float about-float-animate" style={{ position: "absolute", top: 500, left: 220, maxWidth: 60, maxHeight: 50, zIndex: 17, borderRadius: "8px", boxShadow: "0 4px 16px rgba(0,139,139,0.12)", objectFit: "cover", transform: "rotate(-9deg)" }} />
        </div>
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
      </div>
    </div>
  );
}

export default About;
