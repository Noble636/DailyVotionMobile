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
      {/* Inline CSS */}
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
        .aboutpage-collage {
          position: relative;
          width: 600px;
          height: 900px;
          flex-shrink: 0;
          top: 40px;
        }
        .aboutpage-img-float {
          position: absolute;
          object-fit: cover;
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
          0% { transform: translateY(0) scale(1); opacity: 1; }
          80% { opacity: 0.7; }
          100% { transform: translateY(-100vh) scale(1.2); opacity: 0; }
        }
        .aboutpage-gallery {
          display: flex;
          flex-direction: row;
          gap: 2rem;
          margin: 0 auto;
          width: 900px;
          max-width: 100vw;
          align-items: flex-start;
          position: relative;
          top: 40px;
          justify-content: center;
        }
        .aboutpage-text {
          background: rgba(255,255,255,0.55);
          border-radius: 40px 40px 18px 18px;
          box-shadow: 0 4px 16px rgba(0,139,139,0.10);
          padding: 0.2rem 2rem 0.2rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          min-height: 180px;
          align-items: flex-start;
          width: 350px;
          margin: 0;
          margin-top: 0;
          z-index: 1;
        }
        .aboutpage-text h2 {
          color: #008b8b;
          margin-bottom: 1rem;
          text-align: left;
        }
        .aboutpage-text p {
          font-size: 1.1rem;
          color: #333;
          margin-bottom: 1rem;
          text-align: left;
        }
        .aboutpage-container {
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #b3e5fc 60%, #b39ddb 100%);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }
        @media (max-width: 1200px) {
          .aboutpage-gallery {
            flex-direction: column;
            width: 100vw;
            align-items: center;
            gap: 1rem;
          }
          .aboutpage-collage, .aboutpage-text {
            width: 90vw !important;
            min-width: 0 !important;
            max-width: 98vw !important;
            height: auto !important;
            min-height: 0 !important;
            max-height: none !important;
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
      <div className="aboutpage-gallery" style={{ display: "flex", flexDirection: "row", width: "100vw", maxWidth: "1100px", height: "calc(100vh - 80px)", margin: "0 auto", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div className="aboutpage-collage" style={{ position: "relative", width: 480, height: "calc(100vh - 120px)", minHeight: 400, maxHeight: "calc(100vh - 120px)", marginRight: 32, overflow: "hidden" }}>
          <img src={imageBase + "1.jpg"} alt="About 1" className="aboutpage-img-float about-float-animate" style={{ top: 40, left: 40, maxWidth: 220, maxHeight: 140, zIndex: 5, borderRadius: "18px", boxShadow: "0 8px 32px rgba(0,139,139,0.18)", objectFit: "cover", transform: "rotate(-7deg)", position: "absolute" }} />
          <img src={imageBase + "2.jpg"} alt="About 2" className="aboutpage-img-float about-float-animate" style={{ top: 0, left: 180, maxWidth: 180, maxHeight: 120, zIndex: 6, borderRadius: "16px", boxShadow: "0 6px 24px rgba(0,139,139,0.15)", objectFit: "cover", transform: "rotate(8deg)", position: "absolute" }} />
          <img src={imageBase + "3.jpg"} alt="About 3" className="aboutpage-img-float about-float-animate" style={{ top: 120, left: 120, maxWidth: 200, maxHeight: 140, zIndex: 7, borderRadius: "20px", boxShadow: "0 6px 24px rgba(0,139,139,0.15)", objectFit: "cover", transform: "rotate(-12deg)", position: "absolute" }} />
          <img src={imageBase + "4.jpg"} alt="About 4" className="aboutpage-img-float about-float-animate" style={{ top: 180, left: 220, maxWidth: 140, maxHeight: 90, zIndex: 8, borderRadius: "14px", boxShadow: "0 4px 16px rgba(0,139,139,0.12)", objectFit: "cover", transform: "rotate(5deg)", position: "absolute" }} />
          <img src={imageBase + "5.jpg"} alt="About 5" className="aboutpage-img-float about-float-animate" style={{ top: 80, left: 320, maxWidth: 180, maxHeight: 120, zIndex: 9, borderRadius: "18px", boxShadow: "0 6px 24px rgba(0,139,139,0.15)", objectFit: "cover", transform: "rotate(-10deg)", position: "absolute" }} />
          <img src={imageBase + "6.jpg"} alt="About 6" className="aboutpage-img-float about-float-animate" style={{ top: 220, left: 320, maxWidth: 120, maxHeight: 100, zIndex: 10, borderRadius: "15px", boxShadow: "0 4px 16px rgba(0,139,139,0.12)", objectFit: "cover", transform: "rotate(12deg)", position: "absolute" }} />
          <img src={imageBase + "7.jpg"} alt="About 7" className="aboutpage-img-float about-float-animate" style={{ top: 280, left: 180, maxWidth: 100, maxHeight: 80, zIndex: 11, borderRadius: "14px", boxShadow: "0 4px 16px rgba(0,139,139,0.12)", objectFit: "cover", transform: "rotate(-6deg)", position: "absolute" }} />
          <img src={imageBase + "8.jpg"} alt="About 8" className="aboutpage-img-float about-float-animate" style={{ top: 300, left: 320, maxWidth: 100, maxHeight: 70, zIndex: 12, borderRadius: "12px", boxShadow: "0 4px 16px rgba(0,139,139,0.12)", objectFit: "cover", transform: "rotate(7deg)", position: "absolute" }} />
          <img src={imageBase + "9.jpg"} alt="About 9" className="aboutpage-img-float about-float-animate" style={{ top: 360, left: 120, maxWidth: 120, maxHeight: 80, zIndex: 13, borderRadius: "14px", boxShadow: "0 4px 16px rgba(0,139,139,0.12)", objectFit: "cover", transform: "rotate(-8deg)", position: "absolute" }} />
          <img src={imageBase + "10.jpg"} alt="About 10" className="aboutpage-img-float about-float-animate" style={{ top: 380, left: 220, maxWidth: 100, maxHeight: 70, zIndex: 14, borderRadius: "12px", boxShadow: "0 4px 16px rgba(0,139,139,0.12)", objectFit: "cover", transform: "rotate(10deg)", position: "absolute" }} />
          <img src={imageBase + "11.jpg"} alt="About 11" className="aboutpage-img-float about-float-animate" style={{ top: 440, left: 320, maxWidth: 80, maxHeight: 60, zIndex: 15, borderRadius: "10px", boxShadow: "0 4px 16px rgba(0,139,139,0.12)", objectFit: "cover", transform: "rotate(-5deg)", position: "absolute" }} />
          <img src={imageBase + "12.jpg"} alt="About 12" className="aboutpage-img-float about-float-animate" style={{ top: 440, left: 180, maxWidth: 80, maxHeight: 60, zIndex: 16, borderRadius: "10px", boxShadow: "0 4px 16px rgba(0,139,139,0.12)", objectFit: "cover", transform: "rotate(6deg)", position: "absolute" }} />
          <img src={imageBase + "13.jpg"} alt="About 13" className="aboutpage-img-float about-float-animate" style={{ top: 500, left: 220, maxWidth: 60, maxHeight: 50, zIndex: 17, borderRadius: "8px", boxShadow: "0 4px 16px rgba(0,139,139,0.12)", objectFit: "cover", transform: "rotate(-9deg)", position: "absolute" }} />
        </div>
        <div className="aboutpage-text about-float-animate" style={{ width: 480, height: "calc(100vh - 120px)", minHeight: 400, maxHeight: "calc(100vh - 120px)", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", marginLeft: 32 }}>
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
