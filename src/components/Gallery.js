import React, { useState, useEffect } from "react";

const albums = [
  {
    name: "Bible Reading Guide",
    folder: "/JTVCF/ALBUM/bible reading guide/",
    images: [
      "january.jpg", "february.jpg", "march.jpg", "april.jpg", "july.jpg", "august.jpg", "september.jpg", "october.jpg"
    ]
  },
  {
    name: "Cell Summit 2024",
    folder: "/JTVCF/ALBUM/cell summit 2024/",
    images: Array.from({ length: 10 }, (_, i) => `${i + 1}.jpg`)
  },
  {
    name: "JTVCF 37th Anniversary",
    folder: "/JTVCF/ALBUM/JTVCF 37th anniversary/",
    images: Array.from({ length: 11 }, (_, i) => `${i + 1}.jpg`)
  },
  {
    name: "Ministry Staff",
    folder: "/JTVCF/ALBUM/ministry staff/",
    images: Array.from({ length: 7 }, (_, i) => `${i + 1}.jpg`)
  },
  {
    name: "Water Baptism",
    folder: "/JTVCF/ALBUM/water baptism/",
    images: Array.from({ length: 12 }, (_, i) => `${i + 1}.jpg`)
  }
];

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
    <div className="gallery-container">
      <style>{`
        .gallery-container {
          min-height: 100vh;
          width: 100%;
          background: #f0f4f8;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0;
          padding-top: 80px;
          color: #1a1a1a;
        }

        .gallery-back-btn {
          position: fixed;
          top: 90px;
          right: 20px;
          z-index: 100;
          background: #2c5aa0;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0.6rem 1.2rem;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: all 0.2s ease;
          min-height: 44px;
          display: inline-flex !important;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
        }

        .gallery-back-btn:active {
          transform: scale(0.95);
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
        }

        .gallery-main-content {
          width: 100%;
          max-width: 480px;
          padding: 1rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .gallery-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a3a52;
          text-align: center;
          margin: 0;
          padding-top: 0.5rem;
        }

        .gallery-albums {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
        }

        .gallery-album-card {
          background: #ffffff;
          border: 1px solid #d0d7de;
          border-left: 4px solid #2c5aa0;
          border-radius: 12px;
          padding: 1rem 1.25rem;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          color: #1a1a1a;
          transition: all 0.2s ease;
          text-align: left;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          min-height: 54px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          -webkit-tap-highlight-color: transparent;
        }

        .gallery-album-card:active {
          transform: scale(0.98);
          background: #f8fafc;
          box-shadow: 0 1px 4px rgba(44, 90, 160, 0.15);
        }

        .gallery-album-title {
          margin: 0;
          flex: 1;
        }

        .gallery-album-icon {
          font-size: 1.5rem;
        }

        .gallery-images {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
          width: 100%;
          padding-bottom: 1rem;
        }

        .gallery-img-thumb {
          width: 100%;
          aspect-ratio: 1/1;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          cursor: pointer;
          transition: all 0.2s ease;
          background: #ffffff;
          border: 1px solid #e0e0e0;
        }

        .gallery-img-thumb:active {
          transform: scale(0.95);
          box-shadow: 0 4px 12px rgba(44, 90, 160, 0.2);
        }

        .gallery-fullscreen {
          position: fixed;
          left: 0;
          top: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          cursor: pointer;
          padding: 1rem;
          box-sizing: border-box;
        }

        .gallery-full-img {
          max-width: 95vw;
          max-height: 90vh;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          background: #ffffff;
        }

        .gallery-back-in-gallery {
          position: fixed;
          top: 90px;
          left: 20px;
        }

        @media (max-width: 700px) {
          .gallery-container {
            padding-top: 80px;
          }
          
          .gallery-images {
            gap: 0.5rem;
          }
        }
      `}</style>

      <button
        className="gallery-back-btn"
        onClick={() => setSelectedAlbum(null)}
        style={{ display: selectedAlbum !== null ? "inline-flex" : "none" }}
      >
        ← Back
      </button>

      <button
        className="gallery-back-btn"
        onClick={() => navigate("/about")}
        style={{ display: selectedAlbum === null ? "inline-flex" : "none" }}
      >
        ← Back to About
      </button>

      <div className="gallery-main-content">
        {selectedAlbum === null && (
          <>
            <h1 className="gallery-title">🖼️ Gallery</h1>
            <div className="gallery-albums">
              {albumList.map((album, idx) => (
                <div className="gallery-album-card" key={album.id} onClick={() => setSelectedAlbum(idx)}>
                  <span className="gallery-album-icon">📷</span>
                  <div className="gallery-album-title">{album.name}</div>
                </div>
              ))}
            </div>
          </>
        )}
        {selectedAlbum !== null && !fullscreenImg && (
          <>
            <h2 className="gallery-title">{albumList[selectedAlbum]?.name}</h2>
            <div className="gallery-images">
              {images.map((img, i) => (
                <GalleryImageThumb key={img.id} img={img} onClick={() => handleThumbClick(img)} />
              ))}
            </div>
          </>
        )}
      </div>

      {fullscreenImg && (
        <div className="gallery-fullscreen" onClick={() => setFullscreenImg(null)}>
          <img src={fullscreenImg} alt={fullscreenImgName || "Full"} className="gallery-full-img" />
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
      className="gallery-img-thumb"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    />
  );
}

export default Gallery;
