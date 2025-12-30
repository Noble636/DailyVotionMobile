import React, { useState, useEffect } from "react";
import "../css/Gallery.css";

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
      <div className="gallery-bubbles">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="gallery-bubble"
            style={{
              left: `${Math.random() * 90 + 2}%`,
              width: `${Math.random() * 32 + 18}px`,
              height: `${Math.random() * 32 + 18}px`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
      </div>
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
        <div className="gallery-images" style={{ marginTop: "120px", position: "absolute", left: 0, right: 0 }}>
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
