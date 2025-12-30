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
    <div className="aboutpage-mobile-container">
      <style>{`
.aboutpage-mobile-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #b3e5fc 60%, #b39ddb 100%);
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  position: relative;
  overflow-x: hidden;
}
.aboutpage-mobile-bubbles {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
}
.aboutpage-mobile-bubble {
  position: absolute;
  border-radius: 50%;
  background: rgba(156, 39, 176, 0.18);
  animation: bubbleUp 8s linear infinite;
}
@keyframes bubbleUp {
  0% { transform: translateY(100vh) scale(1); opacity: 0.7; }
  80% { opacity: 0.5; }
  100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
}
.aboutpage-mobile-main {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0 0.5rem;
  margin-top: 0;
  z-index: 1;
}
.aboutpage-mobile-collage {
  width: 100vw;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 0.7rem;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
}
.aboutpage-mobile-img-float {
  width: 44vw;
  max-width: 160px;
  height: 24vw;
  max-height: 110px;
  object-fit: cover;
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(0,139,139,0.12);
  margin: 0.3rem;
  background: linear-gradient(135deg, #e0f7fa 60%, #b2ebf2 100%);
  transition: transform 0.3s;
}
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
.aboutpage-mobile-text {
  background: rgba(255,255,255,0.85);
  border-radius: 18px;
  box-shadow: 0 4px 16px rgba(0,139,139,0.10);
  padding: 1.2rem 1.1rem 1.5rem 1.1rem;
  margin: 0.5rem 0 1.5rem 0;
  width: 96vw;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.aboutpage-mobile-text h2 {
  color: #008b8b;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  text-align: left;
}
.aboutpage-mobile-text p {
  font-size: 1.08rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: left;
}
.aboutpage-mobile-btn {
  margin-top: 1.2rem;
  align-self: center;
  padding: 0.7rem 2.2rem;
  border-radius: 24px;
  background: #008b8b;
  color: #fff;
  border: none;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,139,139,0.10);
  transition: background 0.2s;
}
.aboutpage-mobile-btn:active,
.aboutpage-mobile-btn:hover {
  background: #006d6d;
}
@media (max-width: 500px) {
  .aboutpage-mobile-collage {
    max-width: 98vw;
    gap: 0.3rem;
  }
  .aboutpage-mobile-img-float {
    width: 46vw;
    max-width: 140px;
    height: 28vw;
    max-height: 90px;
  }
  .aboutpage-mobile-text {
    padding: 0.8rem 0.5rem 1rem 0.5rem;
    max-width: 98vw;
  }
}
      `}</style>
      <TopBar />
      <div className="aboutpage-mobile-bubbles">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="aboutpage-mobile-bubble"
            style={{
              left: `${Math.random() * 90 + 2}%`,
              width: `${Math.random() * 32 + 18}px`,
              height: `${Math.random() * 32 + 18}px`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
      </div>
      <div className="aboutpage-mobile-main">
        <div className="aboutpage-mobile-collage">
          {[1,2,3,4,5,6,7,8].map(num => (
            <img
              key={num}
              src={imageBase + num + ".jpg"}
              alt={`About ${num}`}
              className="aboutpage-mobile-img-float about-float-animate"
            />
          ))}
        </div>
        <div className="aboutpage-mobile-text about-float-animate">
          <h2>About Us</h2>
          <p>
            At Daily Votion, we believe that spiritual growth should be personal, accessible, and rooted in community. Our platform offers an interactive space where individuals can engage with daily devotionals, share personal prayers, and connect with others in faith. Whether you're starting your spiritual journey or deepening your walk with God, Daily Votion provides tools to reflect, pray, and grow every day. With features like guided devotionals, prayer walls, and community support, we aim to inspire and encourage you—one day, one prayer, one step at a time.
          </p>
          <p>
            Join us in making faith a daily habit and building a stronger spiritual life through connection and devotion.
          </p>
          <button
            className="aboutpage-mobile-btn"
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
