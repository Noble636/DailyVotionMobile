import React from "react";
import TopBar from "./TopBar";

const imageBase = "/JTVCF/gallery/about us/";
const images = Array.from({ length: 13 }, (_, i) => `${imageBase}${i + 1}.jpg`);

function About() {
  return (
    <div className="aboutpage-container">
      <style>{`
        .aboutpage-container {
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #b3e5fc 60%, #b39ddb 100%);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }
        .aboutpage-content {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          max-width: 480px;
          width: 100%;
          margin: 0 auto;
          padding-left: 16px;
          padding-right: 16px;
        }
        .aboutpage-text {
          background: rgba(255,255,255,0.85);
          border-radius: 24px;
          box-shadow: 0 4px 16px rgba(0,139,139,0.10);
          padding: 1.5rem 1rem;
          width: 100%;
          max-width: 440px;
          margin: 1.5rem 0 1rem 0;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .aboutpage-text h2 {
          color: #008b8b;
          margin-bottom: 1rem;
          text-align: center;
          width: 100%;
        }
        .aboutpage-text p {
          font-size: 1.1rem;
          color: #333;
          margin-bottom: 1rem;
          text-align: center;
          width: 100%;
        }
        .aboutpage-gallery {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.7rem;
          width: 100%;
          max-width: 440px;
          margin: 0.5rem 0 1rem 0;
        }
        .aboutpage-img {
          width: 100%;
          aspect-ratio: 1.2/1;
          object-fit: cover;
          border-radius: 14px;
          box-shadow: 0 2px 8px rgba(0,139,139,0.10);
          background: #fff;
        }
        .aboutpage-text button {
          margin-top: 0.2rem !important;
        }
        @media (max-width: 600px) {
          .aboutpage-content {
            max-width: 100vw;
            width: 100vw;
            padding-left: 8px;
            padding-right: 8px;
          }
          .aboutpage-text,
          .aboutpage-gallery {
            max-width: 100vw;
            width: 100vw;
            padding: 0;
          }
          .aboutpage-gallery {
            gap: 0.5rem;
          }
        }
      `}</style>
      <TopBar />
      <div className="aboutpage-content">
        <div className="aboutpage-text">
          <h2>About Us</h2>
          <p>
            At Daily Votion, we believe that spiritual growth should be personal, accessible, and rooted in community. Our platform offers an interactive space where individuals can engage with daily devotionals, share personal prayers, and connect with others in faith. Whether you're starting your spiritual journey or deepening your walk with God, Daily Votion provides tools to reflect, pray, and grow every day. With features like guided devotionals, prayer walls, and community support, we aim to inspire and encourage you—one day, one prayer, one step at a time.
          </p>
          <p>
            Join us in making faith a daily habit and building a stronger spiritual life through connection and devotion.
          </p>
          <button
            style={{
              marginTop: "1rem",
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
        <div className="aboutpage-gallery">
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`About ${idx + 1}`}
              className="aboutpage-img"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
