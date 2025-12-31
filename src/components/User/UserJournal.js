import React, { useState, useRef, useEffect } from "react";
import TopBar from "../TopBar";

const soapSections = [
  { key: "scripture", label: "Scripture", description: "Write the Bible verse or passage you are reflecting on." },
  { key: "observation", label: "Observation", description: "Share what you notice or learn from the scripture." },
  { key: "application", label: "Application", description: "Describe how you can apply this scripture to your life." },
  { key: "prayer", label: "Prayer", description: "Write a prayer related to your reflection." },
];

function UserJournal() {
  // Bible Guide movable popup state
  const [bibleGuidePopupPos, setBibleGuidePopupPos] = useState({ x: 180, y: 120 });
  const bibleGuideDragRef = useRef({ dragging: false, offsetX: 0, offsetY: 0 });
  const bibleGuidePopupRef = useRef(null);
  // Bible Guide image zoom modal
  const [zoomImage, setZoomImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  // Bible Guide drag logic
  useEffect(() => {
    const handleMove = (e) => {
      if (!bibleGuideDragRef.current.dragging) return;
      const nx = e.clientX - bibleGuideDragRef.current.offsetX;
      const ny = e.clientY - bibleGuideDragRef.current.offsetY;
      const rect = bibleGuidePopupRef.current ? bibleGuidePopupRef.current.getBoundingClientRect() : { width: 520, height: 420 };
      const maxX = Math.max(8, window.innerWidth - rect.width - 8);
      const maxY = Math.max(8, window.innerHeight - rect.height - 8);
      const clampedX = Math.max(8, Math.min(maxX, nx));
      const clampedY = Math.max(8, Math.min(maxY, ny));
      setBibleGuidePopupPos({ x: clampedX, y: clampedY });
    };
    const handleUp = () => { bibleGuideDragRef.current.dragging = false; };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);
  const startBibleGuideDrag = (e) => {
    bibleGuideDragRef.current.dragging = true;
    bibleGuideDragRef.current.offsetX = e.clientX - bibleGuidePopupPos.x;
    bibleGuideDragRef.current.offsetY = e.clientY - bibleGuidePopupPos.y;
  };
  // Bible Guide popup state
  const [showBibleGuide, setShowBibleGuide] = useState(false);
  const [bibleGuideImages, setBibleGuideImages] = useState([]);
  const [loadingBibleGuide, setLoadingBibleGuide] = useState(false);

  // Fetch Bible Guide images
  const fetchBibleGuideImages = async () => {
    setLoadingBibleGuide(true);
    try {
      const res = await fetch("https://dailyvotionbackend-91wt.onrender.com/api/bible-guide/images");
      const data = await res.json();
      // For each image, fetch base64
      const withBase64 = await Promise.all(data.map(async img => {
        try {
          const res = await fetch(`https://dailyvotionbackend-91wt.onrender.com/api/bible-guide/image/${img.id}`);
          const d = await res.json();
          return { ...img, base64: d.base64 };
        } catch {
          return img;
        }
      }));
      setBibleGuideImages(Array.isArray(withBase64) ? withBase64 : []);
    } catch {
      setBibleGuideImages([]);
    }
    setLoadingBibleGuide(false);
  };
  // Open Bible Guide popup
  const handleShowBibleGuide = () => {
    setShowBibleGuide(true);
    fetchBibleGuideImages();
  };
  const [inputErrors, setInputErrors] = useState({});
  const [showValidation, setShowValidation] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyEntries, setHistoryEntries] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const fetchHistory = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
    setLoadingHistory(true);
    try {
      const res = await fetch(`https://dailyvotionbackend-91wt.onrender.com/api/user/${userId}/journal`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setHistoryEntries(data);
      } else {
        setHistoryEntries([]);
      }
    } catch (err) {
      setHistoryEntries([]);
    }
    setLoadingHistory(false);
  };

  useEffect(() => {
    if (showHistory) {
      fetchHistory();
    }
  }, [showHistory]);

  const [journal, setJournal] = useState({ date: "", scripture: "", observation: "", application: "", prayer: "" });
  const [visibleSections, setVisibleSections] = useState({ scripture: false, observation: false, application: false, prayer: false });
  const [showBible, setShowBible] = useState(false);
  const [showBibleInfo, setShowBibleInfo] = useState(false);
  const bibleIframeRef = useRef(null);
  const [popupPos, setPopupPos] = useState({ x: 160, y: 120 });
  const dragRef = useRef({ dragging: false, offsetX: 0, offsetY: 0 });
  const popupRef = useRef(null);
  const [biblePopupSize, setBiblePopupSize] = useState({ width: 610, height: window.innerHeight * 0.8 });

  useEffect(() => {
    const handleMove = (e) => {
      if (!dragRef.current.dragging) return;
      const nx = e.clientX - dragRef.current.offsetX;
      const ny = e.clientY - dragRef.current.offsetY;
      const rect = popupRef.current ? popupRef.current.getBoundingClientRect() : { width: 720, height: window.innerHeight * 0.8 };
      const maxX = Math.max(8, window.innerWidth - rect.width - 8);
      const maxY = Math.max(8, window.innerHeight - rect.height - 8);

      const clampedX = Math.max(8, Math.min(maxX, nx));
      const clampedY = Math.max(8, Math.min(maxY, ny));
      setPopupPos({ x: clampedX, y: clampedY });
    };
    const handleUp = () => { dragRef.current.dragging = false; };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  useEffect(() => {
    if (showBible) {
      const timeoutId = setTimeout(() => {
        if (bibleIframeRef.current) {
          bibleIframeRef.current.focus();
        }
      }, 500); 
      return () => clearTimeout(timeoutId);
    }
  }, [showBible]);

  const startDrag = (e) => {
    dragRef.current.dragging = true;
    dragRef.current.offsetX = e.clientX - popupPos.x;
    dragRef.current.offsetY = e.clientY - popupPos.y;
  };

  const handleChange = (e) => setJournal({ ...journal, [e.target.name]: e.target.value });
  const handleShowSection = (key) => setVisibleSections({ ...visibleSections, [key]: !visibleSections[key] });
  const handleClear = (key) => setJournal({ ...journal, [key]: "" });
  const [showSavePopup, setShowSavePopup] = useState(false);
  const handleSaveAll = async () => {
    setShowValidation(true);
    const errors = {};
    if (!journal.date) errors.date = 'Date is required.';
    if (!journal.scripture) errors.scripture = 'Scripture is required.';
    if (!journal.observation) errors.observation = 'Observation is required.';
    if (!journal.application) errors.application = 'Application is required.';
    if (!journal.prayer) errors.prayer = 'Prayer is required.';
    setInputErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const userId = localStorage.getItem('userId');
    if (!userId) {
      return;
    }
    try {
      const res = await fetch(`https://dailyvotionbackend-91wt.onrender.com/api/user/${userId}/journal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(journal)
      });
      const data = await res.json();
      if (res.ok) {
        setShowSavePopup(true);
        setTimeout(() => setShowSavePopup(false), 1200);
      }
    } catch (err) {
    }
  };

  const pdfUrl = "/" + encodeURIComponent("NIVBible.pdf") + "#navpanes=0&toolbar=0&scrollbar=1";

  return (
    <div className="journalpage-container">
      <TopBar
        menuItems={[
          { label: "Profile", link: "/profile" },
          { label: "About", link: "/about" },
          { label: "Logout", link: "/" }
        ]}
      />
      <style>{`
.journal-input-error {
  color: #e53935;
  font-size: 0.95rem;
  margin-top: 4px;
  margin-bottom: 2px;
  font-weight: 500;
}
.journal-save-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  color: #008b8b;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  padding: 2rem 2.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  z-index: 99999;
  text-align: center;
}
.journal-history-field {
  color: #222;
  margin-bottom: 4px;
}
.journal-history-field strong {
  color: #008b8b;
}
.journal-history-field span {
  color: #222;
}
.journal-history-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.35);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.journal-history-popup {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  max-width: 700px;
  width: 96%;
  max-height: 80vh;
  overflow-y: auto;
  padding: 2rem 2.5rem;
  position: relative;
}
.journal-history-close {
  position: absolute;
  top: 12px;
  right: 18px;
  background: transparent;
  border: none;
  font-size: 24px;
  color: #008b8b;
  cursor: pointer;
}
.journal-history-title {
  color: #008b8b;
  margin-bottom: 1.2rem;
}
.journal-history-empty {
  color: #888;
}
.journal-history-entry {
  margin-bottom: 1.5rem;
  background: #f7f8fa;
  border: 2px solid #008b8b;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 1.2rem 1.5rem;
  transition: box-shadow 0.2s;
}
.journal-history-date {
  font-weight: bold;
  color: #008b8b;
  margin-bottom: 4px;
}
.journalpage-container {
  min-height: 100vh;
  background: linear-gradient(120deg, #08a3ad 0%, #43e9f6 25%, #00c6b2 50%, #008b8b 75%, #005e5e 100%);
  background-size: 200% 200%;
  animation: journal-colorwave 12s ease-in-out infinite;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
@keyframes journal-colorwave {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}
.journalpage-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  border-radius: 18px;
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.journalpage-title {
  color: #008b8b;
  font-size: 1.7rem;
  font-weight: bold;
  margin-bottom: 0.7rem;
  text-align: center;
  margin-top: 0.5rem;         
}
.journalpage-guide-main {
  color: #555;
  font-size: 1.05rem;
  text-align: center;
  margin-bottom: 1.2rem;
  margin-bottom: 0.7rem;      
}
.journalpage-date {
  width: 100%;
  max-width: 650px;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  justify-content: center;
  margin-bottom: 0.7rem;      
}
.journalpage-date label {
  color: #222;
  font-weight: 500;
}
.journalpage-date input[type="date"] {
  padding: 0.4rem;
  border-radius: 6px;
  border: 2px solid #222;
  font-size: 1rem;
  background: #fff;
  color: #222;
}
.journalpage-soap-row {
  display: flex;
  gap: 2.5rem;
  margin-bottom: 2rem;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
}
.journalpage-soap-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 270px;
  min-height: 60px;
  justify-content: flex-start;
  transition: min-height 0.3s;
}
.journalpage-soap-col.closed {
  min-height: 60px !important;
  margin-bottom: 0 !important;
}
.journalpage-soap-btn {
  background: #007c8a;
  color: #fff;
  border: 2px solid #08a3ad;
  border-radius: 8px;
  padding: 0.7rem 1.2rem;
  font-size: 0.98rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 0.5rem;
  transition: background 0.2s, color 0.2s;
  width: 100%;
}
.journalpage-soap-btn.active,
.journalpage-soap-btn:hover {
  background: #005e5e;
  color: #fff;
  border-color: #005e5e;
}
.journalpage-guide-text {
  width: 100%;
  min-height: 40px;
  font-size: 0.95rem;
  color: #222;
  text-align: center;
  background: #f7f8fa;
  border-radius: 6px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.journalpage-section-box {
  width: 100%;
  min-height: 260px;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: min-height 0.3s, margin-bottom 0.3s;
}
.journalpage-section-box.closed {
  min-height: 0 !important;
  margin-bottom: 0 !important;
  overflow: hidden;
  height: 0 !important;
}
.journalpage-section-box textarea,
.journalpage-section-textarea {
  border: 2.5px solid #222;
  padding: 1rem;
  font-size: 1.12rem;
  margin-bottom: 1.2rem;
  background: #f7f8fa;
  height: 320px;
  resize: none;
  color: #222;
}
.journalpage-section-actions {
  display: flex;
  gap: 0.5rem;
}
.journalpage-save-btn {
  background: #007c8a;
  color: #fff;
  border: none;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  padding: 0.6rem 1.3rem;
  font-size: 0.95rem;
  transition: background 0.2s;
}
.journalpage-save-btn:hover {
  background: #005e5e;
  color: #fff;
  border: none;
}
.journalpage-clear-btn {
  background: #222;
  color: #fff;
  border: none;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  transition: background 0.2s, color 0.2s;
}
.journalpage-clear-btn:hover {
  background: #fff;
  color: #222;
  border: 2px solid #222;
}
.journalpage-bottom-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
}
.journalpage-save-btn,
.journalpage-play-btn {
  /* shared placeholders */
}
.journalpage-bible-btn {
  background: #007c8a;
  color: #fff;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  min-width: 120px;
  transition: background 0.2s;
}
.journalpage-bible-btn:hover {
  background: #005e5e;
}
.journalpage-bible-popup {
  position: fixed;
  width: 610px;
  max-width: calc(100% - 48px);
  height: 80vh;
  min-width: 350px;
  min-height: 250px;
  resize: both;
  overflow: auto;
  border-radius: 8px;
  box-shadow: 0 18px 48px rgba(0,0,0,0.22);
  z-index: 9999;
  display: flex;
  flex-direction: column;
}
.journalpage-bible-popup .bible-header {
  background: linear-gradient(90deg,#0b6b66,#078f8b);
  color: #fff;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: grab;
  user-select: none;
  flex-shrink: 0;
}
.journalpage-bible-popup .bible-header:active { cursor: grabbing; }
.bible-title {
  font-weight: 700;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%; 
}
.bible-title strong {
  font-weight: 900;
  text-decoration: underline;
}
.bible-content {
  padding: 0;
  overflow: auto;
  flex: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
}
.bible-pdf-wrap {
  flex: 1 1 auto;
  min-height: 0; 
  display: flex;
  flex-direction: column;
  padding: 0;
  background: #fff;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
}
.bible-pdf-iframe {
  width: 100% !important;
  height: 100% !important;
  border: none;
  background: #fff;
}
.bible-pdf-wrap.crop-sidebars .bible-pdf-iframe {
  width: calc(100% + 260px) !important;
  max-width: none !important;
  margin-left: -130px;                  
  height: 100% !important;
  border: none;
  background: #fff !important;
  display: block;
}
.bible-pdf-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}
@media (max-width: 900px) {
  .bible-pdf-wrap.crop-sidebars .bible-pdf-iframe {
    width: 100% !important;
    margin-left: 0;
  }
}
.journalpage-bible-popup svg { max-width: 100%; }
@media (max-width: 980px) {
  .journalpage-bible-popup {
    width: 92%;
    height: 78vh;
    left: 4% !important;
    top: 8% !important;
  }
}
.journalpage-save-btn,
.journalpage-bible-btn {
  font-size: 0.9rem;      
  font-weight: 400;       
  padding: 0.45rem 1rem;  
  min-width: 100px;       
  border-radius: 6px;
  line-height: 1;         
}
.journalpage-save-btn:hover { background: #006d6d; }
.journalpage-bible-btn:hover { background: #006d6d; }
.bible-info-btn {
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255,255,255,0.12);
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}
.bible-info-btn:hover { opacity: 0.95; }
.bible-info-card {
  margin: 8px 12px;
  background: #fff;
  color: #083;
  border-radius: 6px;
  padding: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  max-width: 520px;
  position: relative;
  z-index: 4;
}
.bible-info-card .bible-info-text p {
  margin: 6px 0;
  line-height: 1.25;
  color: #0b6b66;
  font-size: 0.95rem;
}
.bible-info-close {
  margin-top: 8px;
  background: #078f8b;
  color: #fff;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}
.bible-info-close:hover { background: #006d6d; }
.journalpage-img-bg {
  background: linear-gradient(180deg,#fde9f2 0%,#fbe2ef 100%);
  padding: 1rem 0;
  width: 100%;
  color: #fff;
  margin-top: 40px;
}
.journalpage-img-bg .journalpage-guide-main,
.journalpage-img-bg .journalpage-guide-text {
  color: #fff !important;
  background: transparent !important;
}
.journalpage-img-bg .journalpage-date label,
.journalpage-img-bg .journalpage-title {
  color: #fff !important;
}
@media (max-width: 700px) {
  .journal-bibleguide-overlay,
  .journal-history-overlay {
    align-items: center !important;
    justify-content: center !important;
    display: flex !important;
  }
  .journal-bibleguide-popup-movable,
  .journal-history-popup {
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%) !important;
    position: fixed !important;
    margin: 0 !important;
    max-width: 98vw !important;
    width: 98vw !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
  }
}
@media (max-width: 700px) {
  .journalpage-container {
    padding: 0;
    min-height: 100vh;
    overflow-x: hidden;
  }
  .journalpage-main {
    align-items: center;
    justify-content: center;
    margin-top: 24px;
    padding-left: 0;
    padding-right: 0;
  }
  .journalpage-title,
  .journalpage-guide-main,
  .journalpage-date,
  .journalpage-soap-row,
  .journalpage-bottom-actions > div {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .journalpage-soap-col {
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 400px;
  }
  .journalpage-section-box,
  .journalpage-section-box textarea,
  .journalpage-section-textarea {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .journalpage-save-btn,
  .journalpage-bible-btn,
  .journalpage-cancel-btn {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 400px;
    display: block;
  }
}
      `}</style>
        {showSavePopup && (
          <div className="journal-save-popup">
            Journal entry saved!
          </div>
        )}

      <div
        className="journalpage-img-bg"
        style={{
          background: "url('/JTVCF/for background picture/5.jpg') center top / cover no-repeat",
          padding: "1rem 0 0 0",
          marginBottom: "0",
          minHeight: "120px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start"
        }}
      >
        <div className="journalpage-title">SOAP Journal</div>
        <p className="journalpage-guide-main">
          Do your devotion using the SOAP method: Scripture, Observation, Application, Prayer.
        </p>
        <div className="journalpage-date">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={journal.date}
            onChange={handleChange}
            required
          />
          {showValidation && inputErrors.date && (
            <div className="journal-input-error">{inputErrors.date}</div>
          )}
          <button
            className="journal-history-btn"
            type="button"
            onClick={() => setShowHistory(true)}
            style={{ marginLeft: '1rem', background: '#008b8b', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.4rem 1rem', fontWeight: '500', cursor: 'pointer' }}
          >
            Journal History
          </button>
          <button
            className="journal-bibleguide-btn"
            type="button"
            onClick={handleShowBibleGuide}
            style={{ marginLeft: '1rem', background: '#1976d2', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.4rem 1rem', fontWeight: '500', cursor: 'pointer' }}
          >
            Bible Guide
          </button>
      {showBibleGuide && (
        <div className="journal-bibleguide-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            className="journal-bibleguide-popup-movable"
            ref={bibleGuidePopupRef}
            style={{ left: bibleGuidePopupPos.x, top: bibleGuidePopupPos.y, width: 340, position: 'absolute', background: '#fff', borderRadius: 8, boxShadow: '0 18px 48px rgba(0,0,0,0.22)' }}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="journal-bibleguide-header"
              style={{ background: 'linear-gradient(90deg,#0b6b66,#078f8b)', color: '#fff', padding: '10px 16px', cursor: 'grab', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
              onMouseDown={startBibleGuideDrag}
            >
              <span style={{ fontWeight: 700, fontSize: '1.08rem' }}>Bible Reading Guide</span>
              <button
                className="journal-bibleguide-close"
                type="button"
                onClick={() => setShowBibleGuide(false)}
                aria-label="Close Bible Guide"
                style={{ fontSize: '1.8rem', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginLeft: 12 }}
              >
                &times;
              </button>
            </div>
            <div style={{ padding: '1.2rem 1.5rem', maxHeight: '70vh', overflowY: 'auto' }}>
              {loadingBibleGuide ? (
                <div>Loading...</div>
              ) : bibleGuideImages.length === 0 ? (
                <div className="journal-bibleguide-empty">No Bible Guide images found.</div>
              ) : (
                <div className="journal-bibleguide-list">
                  {bibleGuideImages.map(img => (
                    <div key={img.id} className="journal-bibleguide-listitem" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18, background: '#f7f8fa', borderRadius: 8, padding: 8, cursor: 'pointer' }}
                      onClick={() => setZoomImage(img)}
                    >
                      <img
                        src={img.base64 ? img.base64 : (img.filename ? `https://dailyvotionbackend-91wt.onrender.com/uploads/${img.filename}` : '')}
                        alt={img.image_name || 'Bible Guide'}
                        style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 6, border: '1px solid #e0e0e0' }}
                        onError={e => { e.target.onerror = null; e.target.src = '/broken-image.png'; }}
                      />
                      <span style={{ fontWeight: 500, fontSize: '1rem', color: '#008b8b' }}>{img.image_name || img.filename || 'Bible Guide'}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bible Guide image zoom modal */}
      {zoomImage && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)', zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ position: 'absolute', top: 24, right: 32, zIndex: 1000000, pointerEvents: 'auto' }}>
            <button onClick={() => setZoomImage(null)} style={{ background: '#008b8b', color: '#fff', border: 'none', borderRadius: 6, fontSize: 22, padding: '6px 16px', cursor: 'pointer', zIndex: 1000001, pointerEvents: 'auto' }}>×</button>
          </div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <img src={zoomImage.base64 ? zoomImage.base64 : (zoomImage.filename ? `https://dailyvotionbackend-91wt.onrender.com/uploads/${zoomImage.filename}` : '')} alt="Bible Guide" style={{ maxWidth: '90vw', maxHeight: '80vh', transform: `scale(${zoomLevel})`, transition: 'transform 0.2s', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', display: 'block', margin: '0 auto' }} />
            <div style={{
              position: 'absolute', bottom: '6%', right: '7%', display: 'flex', flexDirection: 'row', gap: 10, background: 'rgba(0,139,139,0.18)', borderRadius: 8, padding: '8px 12px', alignItems: 'center', zIndex: 999999, pointerEvents: 'auto'
            }}>
              <button onClick={() => setZoomLevel(z => Math.max(z - 0.2, 0.5))} style={{ background: 'rgba(255,255,255,0.7)', color: '#008b8b', border: 'none', borderRadius: 6, fontSize: 20, padding: '8px 14px', cursor: 'pointer', fontWeight: 'bold', opacity: 0.85 }}>-</button>
              <span style={{ color: '#fff', fontWeight: 500, fontSize: '1rem', opacity: 0.85 }}>Zoom: {Math.round(zoomLevel * 100)}%</span>
              <button onClick={() => setZoomLevel(z => Math.min(z + 0.2, 3))} style={{ background: 'rgba(255,255,255,0.7)', color: '#008b8b', border: 'none', borderRadius: 6, fontSize: 20, padding: '8px 14px', cursor: 'pointer', fontWeight: 'bold', opacity: 0.85 }}>+</button>
            </div>
          </div>
        </div>
      )}
        </div>
      {showHistory && (
        <div className="journal-history-overlay">
          <div className="journal-history-popup">
            <button
              className="journal-history-close"
              type="button"
              onClick={() => setShowHistory(false)}
              aria-label="Close Journal History"
            >
              &times;
            </button>
            <h2 className="journal-history-title">Journal History</h2>
            {loadingHistory ? (
              <div>Loading...</div>
            ) : historyEntries.length === 0 ? (
              <div className="journal-history-empty">No journal entries found.</div>
            ) : (
              <div>
                {historyEntries.map((entry, idx) => (
                  <div key={idx} className="journal-history-entry">
                    <div className="journal-history-date">{entry.date ? entry.date.slice(0, 10) : ''}</div>
                    <div className="journal-history-field"><strong>Scripture:</strong> <span>{entry.scripture}</span></div>
                    <div className="journal-history-field"><strong>Observation:</strong> <span>{entry.observation}</span></div>
                    <div className="journal-history-field"><strong>Application:</strong> <span>{entry.application}</span></div>
                    <div className="journal-history-field"><strong>Prayer:</strong> <span>{entry.prayer}</span></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      </div>

      <div className="journalpage-pink-bg">
        <div className="journalpage-main">
          <div className="journalpage-soap-row">
            {soapSections.map((section) => (
              <div className={`journalpage-soap-col${!visibleSections[section.key] ? " closed" : ""}`} key={section.key}>
                <button
                  className={`journalpage-soap-btn${visibleSections[section.key] ? " active" : ""}`}
                  title={section.label}
                  onClick={() => handleShowSection(section.key)}
                >
                  {section.label}
                </button>
                <div
                  className={`journalpage-guide-text${!visibleSections[section.key] ? " closed" : ""}`}
                  style={{
                    display: visibleSections[section.key] ? "flex" : "none",
                    height: visibleSections[section.key] ? "40px" : "0",
                  }}
                >
                  {section.description}
                </div>
                <div
                  className={`journalpage-section-box${!visibleSections[section.key] ? " closed" : ""}`}
                  style={{
                    display: visibleSections[section.key] ? "flex" : "none",
                    height: visibleSections[section.key] ? "320px" : "0",
                  }}
                >
                  <label className="journalpage-section-label">{section.label}:</label>
                  <textarea
                    name={section.key}
                    value={journal[section.key]}
                    onChange={handleChange}
                    rows={5}
                    required
                  />
                  {showValidation && inputErrors[section.key] && (
                    <div className="journal-input-error">{inputErrors[section.key]}</div>
                  )}
                  <div className="journalpage-section-actions">
                    <button className="journalpage-clear-btn" onClick={() => handleClear(section.key)}>Clear</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="journalpage-bottom-actions">
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1.2rem' }}>
              <button
                className="journalpage-save-btn"
                style={{ minWidth: '120px', padding: '0.6rem 0', fontSize: '1rem', borderRadius: '8px', fontWeight: '500' }}
                onClick={handleSaveAll}
              >
                Save
              </button>
              <button
                className="journalpage-bible-btn"
                style={{ minWidth: '120px', padding: '0.6rem 0', fontSize: '1rem', borderRadius: '8px', fontWeight: '500', background: '#008b8b', color: '#fff', border: 'none' }}
                title="Open Bible"
                onClick={() => setShowBible(prev => !prev)}
              >
                {showBible ? "Close Bible" : "Bible"}
              </button>
              <button
                className="journalpage-cancel-btn"
                style={{ minWidth: '120px', padding: '0.6rem 0', fontSize: '1rem', borderRadius: '8px', fontWeight: '500', background: '#d32f2f', color: '#fff', border: 'none' }}
                onClick={() => window.location.href = '/profile'}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {showBible && (
        <div
          className="journalpage-bible-popup"
          style={{ left: popupPos.x, top: popupPos.y, width: biblePopupSize.width, height: biblePopupSize.height }}
          role="dialog"
          aria-modal="false"
          ref={popupRef}
          onMouseUp={e => {
            // Save size after manual resize
            if (popupRef.current) {
              const rect = popupRef.current.getBoundingClientRect();
              setBiblePopupSize({ width: rect.width, height: rect.height });
            }
          }}
        >
          <div className="bible-header" onMouseDown={startDrag}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="bible-title">New International Version Bible</div>

              <div style={{ display: "flex", gap: 8 }}>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button
                type="button"
                className="bible-info-btn"
                onClick={() => setShowBibleInfo((s) => !s)}
                aria-expanded={showBibleInfo}
                aria-controls="bible-info-card"
              >
                Bible Info
              </button>
              <button
                type="button"
                className="bible-close-btn"
                onClick={() => setShowBible(false)}
                aria-label="Close Bible"
                style={{
                  background: "#d32f2f",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: 600,
                  fontSize: "1rem",
                  padding: "6px 14px",
                  cursor: "pointer"
                }}
              >
                ×
              </button>
            </div>
          </div>

          {showBibleInfo && (
            <div id="bible-info-card" className="bible-info-card" role="dialog" aria-modal="false" style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', padding: '1.2rem 2rem', color: '#222', fontWeight: 500 }}>
              <div className="bible-info-text">
                <p>Scripture quotations taken from The Holy Bible, New International Version®, NIV®.</p>
                <p>Copyright © 1973, 1978, 1984 by Biblica, Inc..</p>
                <p>Used by permission of Zondervan. All rights reserved worldwide.</p>
              </div>
            </div>
          )}
          
          <div className="bible-content">
             <div className="bible-pdf-wrap">
               <iframe
                 ref={bibleIframeRef} 
                 src={pdfUrl}
                 title="Bible PDF"
                 className="bible-pdf-iframe"
                 allowFullScreen
               />
             </div>
           </div>
        </div>
      )}
    </div>
  );
}

export default UserJournal;