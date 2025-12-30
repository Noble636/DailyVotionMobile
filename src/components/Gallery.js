import React, { useState, useEffect } from "react";

function Gallery() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [images, setImages] = useState([]);
  const [fullscreenImg, setFullscreenImg] = useState(null);
  const [fullscreenImgName, setFullscreenImgName] = useState("");

  useEffect(() => {
    fetch("https://dailyvotionbackend-91wt.onrender.com/api/gallery/albums")
      .then(res => res.json())
      .then(data => setAlbums(data));
  }, []);

  useEffect(() => {
    if (selectedAlbum !== null) {
      const albumId = albums[selectedAlbum]?.id;
      if (albumId) {
        fetch(`https://dailyvotionbackend-91wt.onrender.com/api/gallery/album/${albumId}/images`)
          .then(res => res.json())
          .then(data => setImages(data));
      }
    } else {
      setImages([]);
    }
  }, [selectedAlbum, albums]);

  const getImageBase64 = async (imageId) => {
    const res = await fetch(`https://dailyvotionbackend-91wt.onrender.com/api/gallery/image/${imageId}`);
    const data = await res.json();
    return data.base64;
  };

  const handleThumbClick = async (img) => {
    const base64 = await getImageBase64(img.id);
    setFullscreenImg(base64);
    setFullscreenImgName(img.image_name);
  };

  return (
    <div className="gallery-mobile-container">
      <style>{`
.gallery-mobile-container {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #b3e5fc 60%, #b39ddb 100%);
  position: relative;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  padding: 0;
}
.gallery-mobile-bubbles {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
}
.gallery-mobile-bubble {
  position: absolute;
  border-radius: 50%;
  background: rgba(156, 39, 176, 0.18);
  animation: galleryMobileBubbleUp 8s linear infinite;
}
@keyframes galleryMobileBubbleUp {
  0% { transform: translateY(100vh) scale(1); opacity: 0.7; }
  80% { opacity: 0.5; }
  100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
}
.gallery-mobile-back-btn {
  position: fixed;
  top: 18px;
  left: 12px;
  background: rgba(255,255,255,0.8);
  border: none;
  border-radius: 18px;
  padding: 0.6rem 1.2rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: #008b8b;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,139,139,0.10);
  z-index: 10;
}
.gallery-mobile-back-btn.right {
  left: auto;
  right: 12px;
}
.gallery-mobile-albums {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  justify-content: flex-start;
  align-items: center;
  margin-top: 80px;
  width: 100vw;
  z-index: 1;
}
.gallery-mobile-album-card {
  background: rgba(255,255,255,0.85);
  border-radius: 18px;
  box-shadow: 0 4px 16px rgba(0,139,139,0.10);
  padding: 1.3rem 1.2rem;
  cursor: pointer;
  font-size: 1.15rem;
  font-weight: bold;
  color: #008b8b;
  transition: transform 0.2s, box-shadow 0.2s;
  text-align: center;
  width: 90vw;
  max-width: 340px;
}
.gallery-mobile-album-card:active,
.gallery-mobile-album-card:hover {
  transform: scale(1.04);
  box-shadow: 0 8px 32px rgba(156,39,176,0.18);
}
.gallery-mobile-images {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  justify-content: center;
  align-items: flex-start;
  margin-top: 80px;
  width: 100vw;
  z-index: 1;
}
.gallery-mobile-img-thumb {
  width: 44vw;
  max-width: 150px;
  height: 28vw;
  max-height: 110px;
  object-fit: cover;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0,139,139,0.10);
  cursor: pointer;
  background: #fff;
  transition: transform 0.2s, box-shadow 0.2s;
}
.gallery-mobile-img-thumb:active,
.gallery-mobile-img-thumb:hover {
  transform: scale(1.08);
  box-shadow: 0 8px 32px rgba(156,39,176,0.18);
}
.gallery-mobile-fullscreen {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(40,0,60,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  cursor: pointer;
}
.gallery-mobile-full-img {
  max-width: 96vw;
  max-height: 90vh;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(156,39,176,0.18);
  background: #fff;
}
@media (max-width: 500px) {
  .gallery-mobile-album-card {
    padding: 1rem 0.5rem;
    max-width: 98vw;
    font-size: 1rem;
  }
  .gallery-mobile-images {
    gap: 0.3rem;
  }
  .gallery-mobile-img-thumb {
    width: 46vw;
    max-width: 120px;
    height: 30vw;
    max-height: 90px;
  }
}
      `}</style>
      <div className="gallery-mobile-bubbles">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="gallery-mobile-bubble"
            style={{
              left: `${Math.random() * 90 + 2}%`,
              width: `${Math.random() * 32 + 18}px`,
              height: `${Math.random() * 32 + 18}px`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
      </div>
      {selectedAlbum !== null ? (
        <button className="gallery-mobile-back-btn" onClick={() => setSelectedAlbum(null)}>
          ← Back
        </button>
      ) : (
        <button
          className="gallery-mobile-back-btn right"
          onClick={() => window.location.href = "/about"}
        >
          ← About
        </button>
      )}
      {selectedAlbum === null && (
        <div className="gallery-mobile-albums">
          {albums.map((album, idx) => (
            <div className="gallery-mobile-album-card" key={album.id} onClick={() => setSelectedAlbum(idx)}>
              {album.name}
            </div>
          ))}
        </div>
      )}
      {selectedAlbum !== null && !fullscreenImg && (
        <div className="gallery-mobile-images">
          {images.map((img) => (
            <GalleryImageThumb key={img.id} img={img} onClick={() => handleThumbClick(img)} />
          ))}
        </div>
      )}
      {fullscreenImg && (
        <div className="gallery-mobile-fullscreen" onClick={() => setFullscreenImg(null)}>
          <img src={fullscreenImg} alt={fullscreenImgName || "Full"} className="gallery-mobile-full-img" />
        </div>
      )}
    </div>
  );
}

function GalleryImageThumb({ img, onClick }) {
  const [src, setSrc] = useState("");
  useEffect(() => {
    fetch(`https://dailyvotionbackend-91wt.onrender.com/api/gallery/image/${img.id}`)
      .then(res => res.json())
      .then(data => setSrc(data.base64));
  }, [img.id]);
  return (
    <img
      src={src}
      alt={img.image_name || "Gallery"}
      className="gallery-mobile-img-thumb"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    />
  );
}

export default Gallery;
