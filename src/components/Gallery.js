import React, { useState, useEffect } from "react";

function Gallery() {
  // Inject keyframes, pseudo-classes, and media queries
  React.useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      .gallery-bubble {
        position: absolute;
        border-radius: 50%;
        background: rgba(156, 39, 176, 0.18);
        animation: galleryBubbleUp 8s linear infinite;
      }
      @keyframes galleryBubbleUp {
        0% { transform: translateY(100vh) scale(1); opacity: 0.7; }
        80% { opacity: 0.5; }
        100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
      }
      .gallery-album-card:hover {
        transform: translateY(-8px) scale(1.04);
        box-shadow: 0 8px 32px rgba(156,39,176,0.18);
      }
      .gallery-img-thumb:hover {
        transform: scale(1.08);
        box-shadow: 0 8px 32px rgba(156,39,176,0.18);
      }
    `;
    document.head.appendChild(styleTag);
    return () => { document.head.removeChild(styleTag); };
  }, []);
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

  // Inline styles
  const styles = {
    container: {
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #b3e5fc 60%, #b39ddb 100%)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      fontFamily: 'Arial, sans-serif',
    },
    bubbles: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 0,
    },
    backBtn: {
      position: 'absolute',
      top: 32,
      left: 32,
      background: 'rgba(255,255,255,0.7)',
      border: 'none',
      borderRadius: 18,
      padding: '0.7rem 1.5rem',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: '#008b8b',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(0,139,139,0.10)',
      zIndex: 2,
    },
    backBtnAlt: {
      position: 'absolute',
      top: 32,
      right: 32,
      left: 'auto',
      background: 'rgba(255,255,255,0.7)',
      border: 'none',
      borderRadius: 18,
      padding: '0.7rem 1.5rem',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: '#008b8b',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(0,139,139,0.10)',
      zIndex: 2,
    },
    albums: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2rem',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 120,
      zIndex: 1,
    },
    albumCard: {
      background: 'rgba(255,255,255,0.55)',
      borderRadius: 32,
      boxShadow: '0 4px 16px rgba(0,139,139,0.10)',
      padding: '2.5rem 3.5rem',
      cursor: 'pointer',
      fontSize: '1.3rem',
      fontWeight: 'bold',
      color: '#008b8b',
      transition: 'transform 0.2s, box-shadow 0.2s',
      textAlign: 'center',
      zIndex: 1,
    },
    albumTitle: {
      marginBottom: 0,
    },
    images: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1.5rem',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 120,
      zIndex: 1,
      position: 'absolute',
      left: 0,
      right: 0,
    },
    imgThumb: {
      width: 180,
      height: 140,
      objectFit: 'cover',
      borderRadius: 18,
      boxShadow: '0 2px 8px rgba(0,139,139,0.10)',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
      background: '#fff',
    },
    fullscreen: {
      position: 'fixed',
      left: 0,
      top: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(40,0,60,0.45)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      cursor: 'pointer',
    },
    fullImg: {
      maxWidth: '90vw',
      maxHeight: '90vh',
      borderRadius: 24,
      boxShadow: '0 8px 32px rgba(156,39,176,0.18)',
      background: '#fff',
    },
  };

  return (
    <div className="gallery-container" style={styles.container}>
      <div className="gallery-bubbles" style={styles.bubbles}>
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
      <button className="gallery-back-btn" style={{...styles.backBtn, display: selectedAlbum !== null ? "block" : "none"}} onClick={() => setSelectedAlbum(null)}>
        ← Back
      </button>
      <button
        className="gallery-back-btn"
        style={{...styles.backBtnAlt, display: selectedAlbum === null ? "block" : "none"}}
        onClick={() => window.location.href = "/about"}
      >
        ← Back to About
      </button>
      {selectedAlbum === null && (
        <div className="gallery-albums" style={styles.albums}>
          {albums.map((album, idx) => (
            <div className="gallery-album-card" key={album.id} style={styles.albumCard} onClick={() => setSelectedAlbum(idx)}>
              <div className="gallery-album-title" style={styles.albumTitle}>{album.name}</div>
            </div>
          ))}
        </div>
      )}
      {selectedAlbum !== null && !fullscreenImg && (
        <div className="gallery-images" style={styles.images}>
          {images.map((img, i) => (
            <GalleryImageThumb key={img.id} img={img} onClick={() => handleThumbClick(img)} />
          ))}
        </div>
      )}
      {fullscreenImg && (
        <div className="gallery-fullscreen" style={styles.fullscreen} onClick={() => setFullscreenImg(null)}>
          <img src={fullscreenImg} alt={fullscreenImgName || "Full"} className="gallery-full-img" style={styles.fullImg} />
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
      style={{ width: 180, height: 140, objectFit: 'cover', borderRadius: 18, boxShadow: '0 2px 8px rgba(0,139,139,0.10)', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', background: '#fff' }}
    />
  );
}

export default Gallery;
