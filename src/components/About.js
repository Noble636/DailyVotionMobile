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
    <div className="aboutpage-container" style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #b3e5fc 60%, #b39ddb 100%)",
      fontFamily: "Arial, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      {/* Capstone Top Bar */}
      <style>{`
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
        .aboutpage-aboutus {
          width: 100vw;
          max-width: 500px;
          margin: 0 auto 1.5rem auto;
          background: rgba(255,255,255,0.85);
          border-radius: 32px;
          box-shadow: 0 4px 16px rgba(0,139,139,0.10);
          padding: 1.5rem 1.2rem 1.2rem 1.2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .aboutpage-aboutus h2 {
          color: #008b8b;
          margin-bottom: 1rem;
          text-align: center;
        }
        .aboutpage-aboutus p {
          font-size: 1.1rem;
          color: #333;
          margin-bottom: 1rem;
          text-align: center;
        }
        .aboutpage-gallery-scroll {
          width: 100vw;
          max-width: 500px;
          margin: 0 auto;
          flex: 1;
          overflow-y: auto;
          padding-bottom: 2rem;
        }
        .aboutpage-collage-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          width: 100%;
        }
        .aboutpage-img-grid {
          width: 100%;
          aspect-ratio: 4/3;
          border-radius: 12px;
          object-fit: cover;
          box-shadow: 0 4px 16px rgba(0,139,139,0.12);
          background: #e0f7fa;
        }
        @media (max-width: 600px) {
          .aboutpage-aboutus, .aboutpage-gallery-scroll {
            max-width: 98vw;
            padding-left: 0.2rem;
            padding-right: 0.2rem;
          }
        }
      `}</style>
      <div className="aboutpage-topbar">
        <div className="aboutpage-logo">Daily Votion</div>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/gallery">Gallery</a></li>
        </ul>
      </div>
      <div className="aboutpage-aboutus">
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
      <div className="aboutpage-gallery-scroll">
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
