import React, { useEffect } from "react";

import TopBar from "./TopBar";
import "../css/About.css";

const imageBase = "/JTVCF/gallery/about us/";
const collageImages = [
  { src: "1.jpg", style: { top: 40, left: 40, width: 220, height: 140, zIndex: 2 } },
  { src: "2.jpg", style: { top: 0, left: 300, width: 100, height: 70, zIndex: 5 } },
  { src: "3.jpg", style: { top: 100, left: 420, width: 120, height: 90, zIndex: 4 } },
  { src: "4.jpg", style: { top: 200, left: 80, width: 140, height: 100, zIndex: 3 } },
  { src: "5.jpg", style: { top: 260, left: 320, width: 180, height: 110, zIndex: 1 } },
  { src: "6.jpg", style: { top: 340, left: 180, width: 120, height: 80, zIndex: 6 } },
  { src: "7.jpg", style: { top: 160, left: 220, width: 100, height: 70, zIndex: 7 } },
  { src: "8.jpg", style: { top: 320, left: 40, width: 110, height: 80, zIndex: 8 } },
  { src: "9.jpg", style: { top: 380, left: 400, width: 90, height: 60, zIndex: 9 } },
  { src: "10.jpg", style: { top: 60, left: 560, width: 90, height: 60, zIndex: 10 } },
  { src: "11.jpg", style: { top: 220, left: 540, width: 80, height: 50, zIndex: 11 } },
  { src: "12.jpg", style: { top: 320, left: 540, width: 80, height: 50, zIndex: 12 } },
  { src: "13.jpg", style: { top: 400, left: 260, width: 70, height: 50, zIndex: 13 } },
];

function About() {
  React.useEffect(() => {
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
