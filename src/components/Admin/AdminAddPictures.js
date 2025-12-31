import React, { useState, useEffect } from "react";
import AdminTopBar from "./AdminTopBar";

function AdminAddPictures() {
  // Notification popup state
  // (already declared at the top of the function)
  // Gallery images per album
  const [albumImages, setAlbumImages] = useState({});
  // Track loading state for delete actions
  const [deletingAlbumId, setDeletingAlbumId] = useState(null);
  const [deletingPhotoId, setDeletingPhotoId] = useState(null);
  // Gallery albums state
  const [albums, setAlbums] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState("");
  const [galleryImages, setGalleryImages] = useState([]); // multiple images
  const [galleryImagePreviews, setGalleryImagePreviews] = useState([]);
  // Bible Reading Guide state
  const [brgImage, setBrgImage] = useState(null);
  const [brgImageName, setBrgImageName] = useState("");
  const [brgStatus, setBrgStatus] = useState("");
  const [brgImages, setBrgImages] = useState([]);
  const [editingImageId, setEditingImageId] = useState(null);
  const [editingImageName, setEditingImageName] = useState("");
  // Notification popup state
  const [notification, setNotification] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  // Confirm delete modal state
  const [confirmDelete, setConfirmDelete] = useState({ type: null, id: null, albumId: null });

  // Gallery state
  const [albumName, setAlbumName] = useState("");
  const [galleryStatus, setGalleryStatus] = useState("");
  // Fetch albums on mount
  useEffect(() => {
    fetch("https://dailyvotionbackend-91wt.onrender.com/api/gallery/albums")
      .then(res => res.json())
      .then(data => {
        setAlbums(data);
      });
  }, []);

  // Helper to fetch gallery images with base64 for an album
  const fetchGalleryImagesWithBase64 = async (albumId) => {
    const res = await fetch(`https://dailyvotionbackend-91wt.onrender.com/api/gallery/album/${albumId}/images`);
    const imgs = await res.json();
    const withBase64 = await Promise.all(imgs.map(async img => {
      try {
        const res2 = await fetch(`https://dailyvotionbackend-91wt.onrender.com/api/gallery/image/${img.id}`);
        const data2 = await res2.json();
        return { ...img, base64: data2.base64 };
      } catch {
        return img;
      }
    }));
    setAlbumImages(prev => ({ ...prev, [albumId]: withBase64 }));
  };

  // Fetch images for selected album whenever selectedAlbumId changes
  useEffect(() => {
    if (!selectedAlbumId) return;
    fetchGalleryImagesWithBase64(selectedAlbumId);
  }, [selectedAlbumId]);

  // Delete album handler
  const handleDeleteAlbum = async (albumId) => {
    setDeletingAlbumId(albumId);
    try {
      const res = await fetch(`https://dailyvotionbackend-91wt.onrender.com/api/admin/gallery/album/${albumId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId })
      });
      if (res.ok) {
        setNotification("Album deleted.");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 1500);
        fetch("https://dailyvotionbackend-91wt.onrender.com/api/gallery/albums")
          .then(res => res.json())
          .then(data => setAlbums(data));
        setGalleryStatus("");
        setAlbumImages(prev => {
          const copy = { ...prev };
          delete copy[albumId];
          return copy;
        });
        if (selectedAlbumId === albumId) setSelectedAlbumId("");
      } else {
        const error = await res.json();
        setNotification(error?.error ? error.error : "Failed to delete album.");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 1800);
      }
    } catch (err) {
      setNotification("Server error: " + (err?.message || ""));
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 1800);
    }
    setDeletingAlbumId(null);
  };

  // Delete photo handler
  const handleDeletePhoto = async (albumId, photoId) => {
    setDeletingPhotoId(photoId);
    try {
      const res = await fetch(`https://dailyvotionbackend-91wt.onrender.com/api/admin/gallery/album/${albumId}/image/${photoId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId })
      });
      if (res.ok) {
        setNotification("Photo deleted.");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 1500);
        await fetchGalleryImagesWithBase64(albumId);
        setGalleryStatus("");
      } else {
        setNotification("Failed to delete photo.");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 1800);
      }
    } catch {
      setNotification("Server error.");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 1800);
    }
    setDeletingPhotoId(null);
  };

  // Assume adminId is stored in localStorage
  const adminId = localStorage.getItem('adminId');

  // Bible Reading Guide upload handler
  const handleBrgUpload = async (e) => {
    e.preventDefault();
    if (!brgImage || !adminId) {
      setNotification("Please select an image.");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 1800);
      return;
    }
    const formData = new FormData();
    formData.append("image", brgImage);
    formData.append("imageName", brgImageName);
    formData.append("adminId", adminId);
    try {
      const res = await fetch("https://dailyvotionbackend-91wt.onrender.com/api/admin/bible-guide/image", {
        method: "POST",
        body: formData
      });
      if (res.ok) {
        setNotification("Image uploaded successfully!");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 1500);
        setBrgImage(null);
        setBrgImageName("");
        fetchBrgImages();
      } else {
        setNotification("Upload failed.");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 1800);
      }
    } catch {
      setNotification("Server error.");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 1800);
    }
  };

  // Fetch Bible Guide images
  const fetchBrgImages = async () => {
    const res = await fetch("https://dailyvotionbackend-91wt.onrender.com/api/bible-guide/images");
    const data = await res.json();
    // For each image, fetch base64
    const withBase64 = await Promise.all(data.map(async img => {
      try {
        const res2 = await fetch(`https://dailyvotionbackend-91wt.onrender.com/api/bible-guide/image/${img.id}`);
        const data2 = await res2.json();
        return { ...img, base64: data2.base64 };
      } catch {
        return img;
      }
    }));
    setBrgImages(withBase64);
  };

  useEffect(() => {
    fetchBrgImages();
  }, []);

  // Delete Bible Guide image
  const handleDeleteBrgImage = async (imageId) => {
    try {
      const res = await fetch(`https://dailyvotionbackend-91wt.onrender.com/api/admin/bible-guide/image/${imageId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setNotification("Bible Guide image deleted.");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 1500);
        fetchBrgImages();
      } else {
        setNotification("Failed to delete Bible Guide image.");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 1800);
      }
    } catch {
      setNotification("Server error.");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 1800);
    }
  };

  // Start editing image name
  const startEditImageName = (imageId, currentName) => {
    setEditingImageId(imageId);
    setEditingImageName(currentName);
  };

  // Save new image name
  const handleSaveImageName = async (imageId) => {
    try {
      const res = await fetch(`https://dailyvotionbackend-91wt.onrender.com/api/admin/bible-guide/image/${imageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageName: editingImageName })
      });
      if (res.ok) {
        setNotification("Image name updated.");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 1500);
        fetchBrgImages();
        setEditingImageId(null);
        setEditingImageName("");
      } else {
        setNotification("Failed to update image name.");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 1800);
      }
    } catch {
      setNotification("Server error.");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 1800);
    }
  };
  // Notification popup component
  const NotificationPopup = ({ message, show }) => (
    show ? (
      <div style={{
        position: 'fixed',
        top: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#008b8b',
        color: '#fff',
        borderRadius: '10px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        padding: '1rem 2.2rem',
        fontSize: '1.08rem',
        fontWeight: 500,
        zIndex: 99999,
        textAlign: 'center',
        minWidth: '220px',
        maxWidth: '90vw',
      }}>
        {message}
      </div>
    ) : null
  );

  // Confirm delete modal component
  const ConfirmDeleteModal = ({ show, type, onConfirm, onCancel }) => (
    show ? (
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 999999,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', padding: '2rem 2.5rem', minWidth: 280, textAlign: 'center' }}>
          <div style={{ fontWeight: 600, fontSize: '1.15rem', color: '#d32f2f', marginBottom: 18 }}>
            Confirm {type === 'album' ? 'album' : 'photo'} deletion?
          </div>
          <div style={{ marginBottom: 18, color: '#444' }}>
            This action cannot be undone.
          </div>
          <button className="adminaddpics-btn" style={{ background: '#d32f2f', marginRight: 12 }} onClick={onConfirm}>Delete</button>
          <button className="adminaddpics-btn" style={{ background: '#888' }} onClick={onCancel}>Cancel</button>
        </div>
      </div>
    ) : null
  );

  // Gallery album creation
  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    if (!albumName || !adminId) {
      setGalleryStatus("Album name required.");
      return;
    }
    try {
      const res = await fetch("https://dailyvotionbackend-91wt.onrender.com/api/admin/gallery/album", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: albumName, adminId })
      });
      const data = await res.json();
      if (res.ok && data.albumId) {
        setGalleryStatus("Album created!");
        setAlbumName("");
        // Refresh albums
        fetch("https://dailyvotionbackend-91wt.onrender.com/api/gallery/albums")
          .then(res => res.json())
          .then(data => setAlbums(data));
      } else {
        setGalleryStatus("Failed to create album.");
      }
    } catch {
      setGalleryStatus("Server error.");
    }
  };

  // Gallery image upload (multiple)
  const handleGalleryUpload = async (e) => {
    e.preventDefault();
    if (!selectedAlbumId || galleryImages.length === 0 || !adminId) {
      setGalleryStatus("Select album and images.");
      return;
    }
    let successCount = 0;
    for (let i = 0; i < galleryImages.length; i++) {
      const file = galleryImages[i];
      const formData = new FormData();
      formData.append("image", file);
      formData.append("imageName", file.name);
      formData.append("adminId", adminId);
      try {
        const res = await fetch(`https://dailyvotionbackend-91wt.onrender.com/api/admin/gallery/album/${selectedAlbumId}/image`, {
          method: "POST",
          body: formData
        });
        if (res.ok) successCount++;
      } catch {}
    }
    setGalleryStatus(successCount === galleryImages.length ? "All images uploaded!" : `Uploaded ${successCount}/${galleryImages.length} images.`);
    setGalleryImages([]);
    setGalleryImagePreviews([]);
    // Refetch images for album after upload
    if (selectedAlbumId) {
      await fetchGalleryImagesWithBase64(selectedAlbumId);
    }
  };
  // Handle image selection and preview
  const handleGalleryImageChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryImages(files);
    // Preview
    const previews = files.map(file => URL.createObjectURL(file));
    setGalleryImagePreviews(previews);
  };

  return (
    <div
      className="adminaddpics-container"
      style={{
        minHeight: '100vh',
        background: "url('/JTVCF/for background picture/AdminDashboard.png') center center / cover no-repeat",
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <style>{`
/* Gallery image preview styles */
.adminaddpics-preview-wrap {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin: 0.7rem 0 1.2rem 0;
}
.adminaddpics-preview-imgbox {
    background: #f7f8fa;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 90px;
    overflow: hidden;
}
.adminaddpics-preview-img {
    max-width: 80px;
    max-height: 80px;
    border-radius: 6px;
    object-fit: cover;
    display: block;
}
/* Unique styles for AdminAddPictures */
.adminaddpics-container {
    min-height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
}
.adminaddpics-main {
    display: flex;
    flex-direction: row;
    gap: 2.5rem;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    max-width: 1100px;
    margin: 4.5rem auto 0 auto;
    padding: 0 1.5rem;
    box-sizing: border-box;
}
.adminaddpics-card {
     background: rgba(255,255,255,0.55);
     border-radius: 18px;
     box-shadow: 0 8px 32px rgba(0,139,139,0.10);
     padding: 2rem 2.2rem;
     min-width: 340px;
     max-width: 480px;
     flex: 1 1 0;
     display: flex;
     flex-direction: column;
     align-items: stretch;
     margin-bottom: 2rem;
     border: 2px solid #fff;
     backdrop-filter: blur(12px);
     -webkit-backdrop-filter: blur(12px);
}
.adminaddpics-title {
     color: #fff;
     font-size: 1.35rem;
     font-weight: bold;
     margin-bottom: 1.2rem;
     text-align: left;
     text-shadow: 0 2px 8px #008b8b, 0 0 12px #2d3e50, 0 0 2px #fff;
     -webkit-text-stroke: 1px #fff;
}
.adminaddpics-form {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}
.adminaddpics-label {
    font-weight: 500;
    color: #0b6b66;
    margin-bottom: 0.2rem;
}
.adminaddpics-input {
    border: 1px solid #cbe7e7;
    border-radius: 8px;
    font-size: 1rem;
    padding: 0.7rem;
    margin-bottom: 0.2rem;
    background: #f7fdfd;
}
.adminaddpics-select {
    border: 1px solid #cbe7e7;
    border-radius: 8px;
    font-size: 1rem;
    padding: 0.7rem;
    background: #f7fdfd;
    margin-bottom: 0.2rem;
}
.adminaddpics-btn {
    background: #008b8b;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0.7rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    margin-top: 0.5rem;
    transition: background 0.18s;
}
.adminaddpics-btn:hover {
    background: #006d6d;
}
.adminaddpics-status {
    color: #008b8b;
    font-weight: 500;
    margin-top: 0.7rem;
    font-size: 1rem;
}
@media (max-width: 900px) {
    .adminaddpics-main {
        flex-direction: column;
        gap: 1.5rem;
        align-items: stretch;
        max-width: 98vw;
        padding: 0 0.5rem;
    }
    .adminaddpics-card {
        min-width: 0;
        max-width: 98vw;
        margin-bottom: 1.2rem;
    }
}
@media (max-width: 700px) {
  .adminaddpics-main {
    flex-direction: column !important;
    gap: 1.2rem !important;
    align-items: stretch !important;
    max-width: 99vw !important;
    padding: 0 0.2rem !important;
    margin: 2.5rem 0 0 0 !important;
  }
  .adminaddpics-card {
    min-width: 0 !important;
    max-width: 99vw !important;
    width: 99vw !important;
    padding: 1.1rem 0.5rem !important;
    border-radius: 10px !important;
    margin-bottom: 1.2rem !important;
  }
  .adminaddpics-title {
    font-size: 1.1rem !important;
    margin-bottom: 0.7rem !important;
  }
  .adminaddpics-form {
    gap: 0.5rem !important;
  }
  .adminaddpics-input,
  .adminaddpics-select {
    font-size: 0.98rem !important;
    padding: 0.5rem !important;
  }
  .adminaddpics-btn {
    font-size: 0.98rem !important;
    padding: 0.5rem 1rem !important;
    border-radius: 7px !important;
  }
  .adminaddpics-preview-imgbox {
    width: 60px !important;
    height: 60px !important;
    padding: 3px !important;
  }
  .adminaddpics-preview-img {
    max-width: 54px !important;
    max-height: 54px !important;
  }
}
      `}</style>
      <NotificationPopup message={notification} show={showNotification} />
      <AdminTopBar
        menuItems={[
          { label: "Dashboard", link: "/admindashboard" },
          { label: "Home", link: "/" },
        ]}
      />
      <div className="adminaddpics-main">
        <div className="adminaddpics-card adminaddpics-left">
          <h2 className="adminaddpics-title">Bible Reading Guide</h2>
          <form onSubmit={handleBrgUpload} className="adminaddpics-form">
            <label className="adminaddpics-label">Image Name (optional):</label>
            <input className="adminaddpics-input" type="text" value={brgImageName} onChange={e => setBrgImageName(e.target.value)} />
            <label className="adminaddpics-label">Upload Image:</label>
            <input className="adminaddpics-input" type="file" accept="image/*" onChange={e => setBrgImage(e.target.files[0])} required />
            <button className="adminaddpics-btn" type="submit">Upload</button>
            {brgStatus && <div className="adminaddpics-status">{brgStatus}</div>}
          </form>

          {/* Bible Guide images list */}
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontWeight: 600, fontSize: '1.08rem', color: '#008b8b' }}>Bible Guide Images</h3>
            {brgImages.length === 0 ? (
              <div style={{ color: '#888', fontSize: '0.98rem' }}>No Bible Guide images uploaded.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {brgImages.map(img => (
                  <div key={img.id} style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#f7f8fa', borderRadius: 8, padding: 8 }}>
                    <img
                      src={img.base64 ? img.base64 : '/broken-image.png'}
                      alt={img.image_name || 'Bible Guide'}
                      style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 6, border: '1px solid #e0e0e0' }}
                      onError={e => { e.target.onerror = null; e.target.src = '/broken-image.png'; }}
                    />
                    {editingImageId === img.id ? (
                      <>
                        <input
                          type="text"
                          value={editingImageName}
                          onChange={e => setEditingImageName(e.target.value)}
                          style={{ fontSize: '1rem', padding: '2px 8px', borderRadius: 4, border: '1px solid #ccc' }}
                        />
                        <button className="adminaddpics-btn" style={{ marginLeft: 8 }} onClick={() => handleSaveImageName(img.id)}>Save</button>
                        <button className="adminaddpics-btn" style={{ marginLeft: 4, background: '#888' }} onClick={() => setEditingImageId(null)}>Cancel</button>
                      </>
                    ) : (
                      <span style={{ fontWeight: 500, fontSize: '1rem', color: '#008b8b', marginRight: 8 }}>{img.image_name || img.filename || 'Bible Guide'}</span>
                    )}
                    <button className="adminaddpics-btn" style={{ background: '#1976d2', marginLeft: 8 }} onClick={() => startEditImageName(img.id, img.image_name)}>Rename</button>
                    <button
                      className="adminaddpics-btn"
                      style={{ background: '#d32f2f', marginLeft: 8 }}
                      onClick={() => setConfirmDelete({ type: 'brg', id: img.id })}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="adminaddpics-card adminaddpics-right">
          <h2 className="adminaddpics-title">Gallery Albums</h2>
          <form onSubmit={handleCreateAlbum} className="adminaddpics-form" style={{ marginBottom: '1.2rem' }}>
            <label className="adminaddpics-label">Create New Album:</label>
            <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'center' }}>
              <input className="adminaddpics-input" type="text" value={albumName} onChange={e => setAlbumName(e.target.value)} placeholder="Album Name" required />
              <button className="adminaddpics-btn" type="submit">Create Album</button>
            </div>
          </form>

          {/* Only one album select and upload form */}
          <div className="adminaddpics-form" style={{ marginBottom: '1.5rem' }}>
            <label className="adminaddpics-label">Select Album:</label>
            <select className="adminaddpics-select" value={selectedAlbumId} onChange={e => setSelectedAlbumId(e.target.value)} required>
              <option value="">Select Album</option>
              {albums.map(album => (
                <option key={album.id} value={album.id}>{album.name}</option>
              ))}
            </select>
            {/* Upload images to selected album */}
            {selectedAlbumId && (
              <form onSubmit={handleGalleryUpload} className="adminaddpics-form" style={{ marginTop: '1.5rem' }}>
                <label className="adminaddpics-label">Upload Images:</label>
                <input className="adminaddpics-input" type="file" accept="image/*" multiple onChange={handleGalleryImageChange} required />
                {/* Preview selected images */}
                {galleryImagePreviews.length > 0 && (
                  <div className="adminaddpics-preview-wrap">
                    {galleryImagePreviews.map((src, idx) => (
                      <div key={idx} className="adminaddpics-preview-imgbox">
                        <img src={src} alt={`Preview ${idx + 1}`} className="adminaddpics-preview-img" />
                      </div>
                    ))}
                  </div>
                )}
                <button className="adminaddpics-btn" type="submit">Upload to Album</button>
              </form>
            )}
          </div>

          {/* Show selected album actions and images only */}
          {selectedAlbumId && (
            <div style={{ marginBottom: '2rem', border: '1px solid #e0e0e0', borderRadius: 10, padding: '1rem', background: '#f7f8fa' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontWeight: 600, fontSize: '1.08rem', color: '#008b8b' }}>{albums.find(a => a.id === selectedAlbumId)?.name}</span>
                <button
                  className="adminaddpics-btn"
                  style={{ background: '#d32f2f', marginLeft: 12, padding: '0.4rem 1rem' }}
                  disabled={deletingAlbumId === selectedAlbumId}
                  onClick={() => setConfirmDelete({ type: 'album', id: selectedAlbumId })}
                >
                  {deletingAlbumId === selectedAlbumId ? 'Deleting...' : 'Delete Album'}
                </button>
              </div>
              {/* Show images in selected album visually */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {(albumImages[selectedAlbumId] && albumImages[selectedAlbumId].length > 0) ? (
                  albumImages[selectedAlbumId].map(img => (
                    <div key={img.id} className="adminaddpics-preview-imgbox" style={{ position: 'relative', marginBottom: 8 }}>
                      <img
                        src={img.base64 ? img.base64 : (img.filename ? `https://dailyvotionbackend-91wt.onrender.com/uploads/${img.filename}` : '')}
                        alt={img.image_name || 'Photo'}
                        className="adminaddpics-preview-img"
                        onError={e => { e.target.onerror = null; e.target.src = '/broken-image.png'; }}
                      />
                      <div style={{ position: 'absolute', bottom: 4, left: 4, right: 4, textAlign: 'center', fontSize: '0.95rem', color: '#008b8b', background: 'rgba(255,255,255,0.85)', borderRadius: 4, padding: '2px 0', fontWeight: 500 }}>{img.image_name || img.filename || 'Photo'}</div>
                      <button
                        className="adminaddpics-btn"
                        style={{ position: 'absolute', top: 4, right: 4, background: '#d32f2f', color: '#fff', fontSize: '0.85rem', padding: '2px 8px', borderRadius: 6, zIndex: 2 }}
                        disabled={deletingPhotoId === img.id}
                        onClick={() => setConfirmDelete({ type: 'photo', id: img.id, albumId: selectedAlbumId })}
                      >
                        {deletingPhotoId === img.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  ))
                ) : (
                  <span style={{ color: '#888', fontSize: '0.98rem' }}>No photos in this album.</span>
                )}
              </div>
            </div>
          )}
          {/* galleryStatus message after main upload form */}
          {galleryStatus && <div className="adminaddpics-status">{galleryStatus}</div>}
        </div>
      </div>

      {/* Confirm delete modal for album */}
      <ConfirmDeleteModal
        show={confirmDelete.type === 'album' && confirmDelete.id === selectedAlbumId}
        type="album"
        onConfirm={() => { setConfirmDelete({ type: null, id: null }); handleDeleteAlbum(selectedAlbumId); }}
        onCancel={() => setConfirmDelete({ type: null, id: null })}
      />

      {/* Confirm delete modal for photo */}
      <ConfirmDeleteModal
        show={confirmDelete.type === 'photo' && confirmDelete.id}
        type="photo"
        onConfirm={() => { setConfirmDelete({ type: null, id: null }); handleDeletePhoto(confirmDelete.albumId, confirmDelete.id); }}
        onCancel={() => setConfirmDelete({ type: null, id: null })}
      />

      {/* Confirm delete modal for Bible Guide image */}
      <ConfirmDeleteModal
        show={confirmDelete.type === 'brg' && confirmDelete.id}
        type="Bible Guide"
        onConfirm={() => { setConfirmDelete({ type: null, id: null }); handleDeleteBrgImage(confirmDelete.id); }}
        onCancel={() => setConfirmDelete({ type: null, id: null })}
      />
    </div>
  );
}

export default AdminAddPictures;