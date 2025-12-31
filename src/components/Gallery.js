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
          width: 100vw;
          background: linear-gradient(135deg, #b3e5fc 60%, #b39ddb 100%);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          font-family: Arial, sans-serif;
        }
        .gallery-back-btn {
          position: absolute;
          top: 32px;
          left: 32px;
          background: rgba(255,255,255,0.7);
          border: none;
          border-radius: 18px;
          padding: 0.7rem 1.5rem;
          font-size: 1.1rem;
          font-weight: bold;
          color: #008b8b;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,139,139,0.10);
          z-index: 2;
        }
        .gallery-albums {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          justify-content: center;
          align-items: center;
          margin-top: 120px;
          z-index: 1;
        }
        .gallery-album-card {
          background: rgba(255,255,255,0.55);
          border-radius: 32px;
          box-shadow: 0 4px 16px rgba(0,139,139,0.10);
          padding: 2.5rem 3.5rem;
          cursor: pointer;
          font-size: 1.3rem;
          font-weight: bold;
          color: #008b8b;
          transition: transform 0.2s, box-shadow 0.2s;
          text-align: center;
          z-index: 1;
        }
        .gallery-album-card:hover {
          transform: translateY(-8px) scale(1.04);
          box-shadow: 0 8px 32px rgba(156,39,176,0.18);
        }
        .gallery-album-title {
          margin-bottom: 0;
        }
        .gallery-images {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.7rem;
          width: 100%;
          max-width: 440px;
          margin: 0 auto 1rem auto;
          height: calc(100vh - 120px);
          overflow-y: auto;
          padding: 0 8px 1rem 8px;
          background: transparent;
          position: relative;
        }
        .gallery-img-thumb {
          width: 100%;
          aspect-ratio: 1.2/1;
          object-fit: cover;
          border-radius: 14px;
          box-shadow: 0 2px 8px rgba(0,139,139,0.10);
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          background: #fff;
        }
        .gallery-img-thumb:hover {
          transform: scale(1.08);
          box-shadow: 0 8px 32px rgba(156,39,176,0.18);
        }
        .gallery-fullscreen {
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
        .gallery-full-img {
          max-width: 90vw;
          max-height: 90vh;
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(156,39,176,0.18);
          background: #fff;
        }
        @media (max-width: 600px) {
          .gallery-images {
            max-width: 98vw;
            width: 98vw;
            padding: 0 2vw 1rem 2vw;
            gap: 0.5rem;
          }
        }
      `}</style>
      <button className="gallery-back-btn" onClick={() => setSelectedAlbum(null)} style={{ display: selectedAlbum !== null ? "block" : "none" }}>
        ← Back
      </button>
      <button
        className="gallery-back-btn"
        style={{ top: "32px", right: "32px", left: "auto", background: "rgba(255,255,255,0.7)", display: selectedAlbum === null ? "block" : "none" }}
        onClick={() => window.location.href = "/about"}
      >
        ← Back to About
      </button>
      {selectedAlbum === null && (
        <div className="gallery-albums">
          {albums.map((album, idx) => (
            <div className="gallery-album-card" key={album.id} onClick={() => setSelectedAlbum(idx)}>
              <div className="gallery-album-title">{album.name}</div>
            </div>
          ))}
        </div>
      )}
      {selectedAlbum !== null && !fullscreenImg && (
        <div className="gallery-images">
          {images.map((img, i) => (
            <GalleryImageThumb key={img.id} img={img} onClick={() => handleThumbClick(img)} />
          ))}
        </div>
      )}
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
