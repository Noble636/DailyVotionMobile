import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const soapSections = [
  { key: "scripture", label: "Scripture", description: "Write the Bible verse or passage you are reflecting on." },
  { key: "observation", label: "Observation", description: "Share what you notice or learn from the scripture." },
  { key: "application", label: "Application", description: "Describe how you can apply this scripture to your life." },
  { key: "prayer", label: "Prayer", description: "Write a prayer related to your reflection." },
];

function UserJournal() {
  const navigate = useNavigate();
  const [bibleGuidePopupPos, setBibleGuidePopupPos] = useState({ x: 180, y: 120 });
  const bibleGuideDragRef = useRef({ dragging: false, offsetX: 0, offsetY: 0 });
  const bibleGuidePopupRef = useRef(null);
  const [zoomImage, setZoomImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  
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
  
  const [showBibleGuide, setShowBibleGuide] = useState(false);
  const [bibleGuideImages, setBibleGuideImages] = useState([]);
  const [loadingBibleGuide, setLoadingBibleGuide] = useState(false);

  const fetchBibleGuideImages = async () => {
    setLoadingBibleGuide(true);
    try {
      const res = await fetch("https://dailyvotionbackend-91wt.onrender.com/api/bible-guide/images");
      const data = await res.json();
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
  
  const handleShowBibleGuide = () => {
    setShowBibleGuide(true);
    fetchBibleGuideImages();
  };
  
  const [inputErrors, setInputErrors] = useState({});
  const [showValidation, setShowValidation] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyEntries, setHistoryEntries] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState(null);
  const [editedEntry, setEditedEntry] = useState({});
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

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

  const handleEditEntry = (entry) => {
    setEditingEntryId(entry._id || entry.id);
    setEditedEntry({
      date: entry.date,
      scripture: entry.scripture,
      observation: entry.observation,
      application: entry.application,
      prayer: entry.prayer
    });
  };

  const handleCancelEdit = () => {
    setEditingEntryId(null);
    setEditedEntry({});
  };

  const handleSaveEdit = async (entryId) => {
    try {
      setLoadingHistory(true);
      // Get user id from localStorage
      const userId = localStorage.getItem('userId');
      const response = await fetch(`/api/user/${userId}/journal/${entryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: editedEntry.date,
          scripture: editedEntry.scripture,
          observation: editedEntry.observation,
          application: editedEntry.application,
          prayer: editedEntry.prayer,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update journal entry');
      }
      setShowUpdatePopup(false);
      setEditingEntryId(null);
      setEditedEntry({});
      await fetchHistory(); // Refresh history after update
    } catch (err) {
      alert(err.message || 'Error updating journal entry');
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleEditFieldChange = (field, value) => {
    setEditedEntry(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const [journal, setJournal] = useState({ date: "", scripture: "", observation: "", application: "", prayer: "" });
  const [currentSection, setCurrentSection] = useState(null);
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
    if (!userId) return;
    
    try {
      const res = await fetch(`https://dailyvotionbackend-91wt.onrender.com/api/user/${userId}/journal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(journal)
      });
      const data = await res.json();
      if (res.ok) {
        setShowSavePopup(true);
        setTimeout(() => {
          setShowSavePopup(false);
          setJournal({ date: "", scripture: "", observation: "", application: "", prayer: "" });
          setCurrentSection(null);
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const pdfUrl = "/" + encodeURIComponent("NIVBible.pdf") + "#navpanes=0&toolbar=0&scrollbar=1";

  return (
    <div className="journal-container">
      <style>{`
        * { box-sizing: border-box; }
        body, html {
          margin: 0;
          padding: 0;
          background: #ffffff !important;
          font-family: "Inter", "Segoe UI", Arial, sans-serif;
          color: #0f172a;
        }
        
        .journal-container {
          min-height: 100vh;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
          padding-top: 24px;
        }
        
        .journal-back-btn {
          position: fixed;
          top: 12px;
          right: 12px;
          left: auto;
          background: linear-gradient(135deg, #0b62d6 0%, #044a9f 100%);
          color: #ffffff;
          border: none;
          padding: 0.6rem 1rem;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(11, 98, 214, 0.25);
          transition: all 0.2s ease;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          min-height: 44px;
          touch-action: manipulation;
        }
        
        .journal-back-btn:hover {
          background: linear-gradient(135deg, #044a9f 0%, #033d82 100%);
          transform: translateY(-2px);
        }
        
        .journal-back-btn:active {
          transform: scale(0.97);
        }

        .journal-intro {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
          padding: 0 1rem;
          text-align: center;
        }

        .journal-title {
          color: #0f172a;
          font-size: 1.5rem;
          font-weight: 800;
          margin: 0;
        }
        
        .journal-subtitle {
          color: #64748b;
          font-size: 0.95rem;
          margin: 0;
          line-height: 1.5;
          max-width: 720px;
        }
        
        .journal-date-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
        }
        
        .journal-date-row label {
          color: #0f172a;
          font-weight: 600;
          font-size: 1rem;
        }
        
        .journal-date-row input[type="date"] {
          padding: 0.6rem;
          border-radius: 8px;
          border: 2px solid #cbd5e1;
          font-size: 1rem;
          background: #ffffff;
          color: #0f172a;
          min-height: 44px;
        }
        
        .journal-header-actions {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        
        .journal-action-btn {
          background: linear-gradient(135deg, #0b62d6 0%, #044a9f 100%);
          color: #ffffff;
          border: none;
          padding: 0.6rem 1rem;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          min-height: 44px;
          min-width: 110px;
          box-shadow: 0 2px 8px rgba(11, 98, 214, 0.2);
        }
        
        .journal-action-btn:hover {
          background: linear-gradient(135deg, #044a9f 0%, #033d82 100%);
          transform: translateY(-1px);
        }
        
        .journal-action-btn:active {
          transform: scale(0.98);
        }
        
        .journal-main {
          flex: 1;
          padding: 1rem;
          max-width: 600px;
          margin: 0 auto;
          width: 100%;
        }
        
        .journal-section-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .journal-section-card {
          background: #ffffff;
          border: 2px solid #e2e8f0;
          border-radius: 14px;
          padding: 1.2rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          transition: all 0.2s ease;
          cursor: pointer;
          position: relative;
        }
        
        .journal-section-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 5px;
          background: linear-gradient(180deg, #0b62d6 0%, #044a9f 100%);
          border-radius: 14px 0 0 14px;
        }
        
        .journal-section-card.active {
          border-color: #0b62d6;
          box-shadow: 0 4px 16px rgba(11, 98, 214, 0.15);
        }
        
        .journal-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        
        .journal-section-title {
          color: #0f172a;
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0;
        }
        
        .journal-section-status {
          background: #10b981;
          color: #ffffff;
          padding: 0.3rem 0.7rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        
        .journal-section-status.empty {
          background: #94a3b8;
        }
        
        .journal-section-desc {
          color: #64748b;
          font-size: 0.95rem;
          line-height: 1.5;
          margin: 0;
        }
        
        .journal-editor-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 9998;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        
        .journal-editor {
          background: #ffffff;
          border-radius: 16px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }
        
        .journal-editor-header {
          background: linear-gradient(135deg, #0b62d6 0%, #044a9f 100%);
          color: #ffffff;
          padding: 1rem 1.2rem;
          border-radius: 16px 16px 0 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .journal-editor-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin: 0;
        }
        
        .journal-editor-close {
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 2rem;
          cursor: pointer;
          padding: 0;
          min-width: 44px;
          min-height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .journal-editor-body {
          padding: 1.5rem;
          overflow-y: auto;
          flex: 1;
        }
        
        .journal-editor-desc {
          background: #f1f5f9;
          padding: 1rem;
          border-radius: 10px;
          color: #475569;
          font-size: 0.95rem;
          margin-bottom: 1rem;
          border-left: 4px solid #0b62d6;
        }
        
        .journal-editor-label {
          color: #0f172a;
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 0.5rem;
          display: block;
        }
        
        .journal-editor-textarea {
          width: 100%;
          border: 2px solid #cbd5e1;
          border-radius: 10px;
          padding: 1rem;
          font-size: 1rem;
          color: #0f172a;
          background: #ffffff;
          resize: vertical;
          min-height: 200px;
          font-family: inherit;
          transition: all 0.2s ease;
        }
        
        .journal-editor-textarea:focus {
          outline: none;
          border-color: #0b62d6;
          box-shadow: 0 0 0 3px rgba(11, 98, 214, 0.1);
        }
        
        .journal-error {
          color: #dc2626;
          font-size: 0.9rem;
          margin-top: 0.5rem;
          font-weight: 500;
        }
        
        .journal-editor-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
        }
        
        .journal-btn-save {
          flex: 1;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          border: none;
          padding: 0.8rem;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          min-height: 48px;
        }
        
        .journal-btn-save:active {
          transform: scale(0.98);
        }
        
        .journal-btn-clear {
          background: #f1f5f9;
          color: #475569;
          border: 2px solid #cbd5e1;
          padding: 0.8rem 1.2rem;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          min-height: 48px;
        }
        
        .journal-btn-clear:active {
          transform: scale(0.98);
        }
        
        .journal-bottom-actions {
          padding: 1rem;
          max-width: 600px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .journal-btn-primary {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          border: none;
          padding: 0.9rem;
          border-radius: 12px;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
          min-height: 50px;
        }
        
        .journal-btn-primary:active {
          transform: scale(0.98);
        }
        
        .journal-btn-secondary {
          background: linear-gradient(135deg, #0b62d6 0%, #044a9f 100%);
          color: #ffffff;
          border: none;
          padding: 0.9rem;
          border-radius: 12px;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(11, 98, 214, 0.25);
          min-height: 50px;
        }
        
        .journal-btn-secondary:active {
          transform: scale(0.98);
        }
        
        .journal-btn-cancel {
          background: #f1f5f9;
          color: #475569;
          border: 2px solid #cbd5e1;
          padding: 0.9rem;
          border-radius: 12px;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          min-height: 50px;
        }
        
        .journal-btn-cancel:active {
          transform: scale(0.98);
        }
        
        .journal-save-popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          border-radius: 14px;
          box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3);
          padding: 1.5rem 2rem;
          font-size: 1.1rem;
          font-weight: 700;
          z-index: 99999;
          text-align: center;
          animation: popIn 0.3s ease-out;
        }
        
        @keyframes popIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        
        .journal-history-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        
        .journal-history-popup {
          background: #ffffff;
          border-radius: 16px;
          max-width: 650px;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
          padding: 1.5rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          position: relative;
        }
        
        .journal-history-close {
          position: absolute;
          top: 12px;
          right: 12px;
          background: transparent;
          border: none;
          font-size: 2rem;
          color: #64748b;
          cursor: pointer;
          min-width: 44px;
          min-height: 44px;
        }
        
        .journal-history-title {
          color: #0f172a;
          font-size: 1.4rem;
          font-weight: 800;
          margin: 0 0 1.5rem 0;
        }
        
        .journal-history-entry {
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-left: 5px solid #0b62d6;
          border-radius: 12px;
          padding: 1.2rem;
          margin-bottom: 1rem;
        }
        
        .journal-history-date {
          font-weight: 700;
          color: #0b62d6;
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }
        
        .journal-history-field {
          margin-bottom: 0.75rem;
          color: #1e293b;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        
        .journal-history-field strong {
          color: #0f172a;
          font-weight: 600;
          display: block;
          margin-bottom: 0.25rem;
        }
        
        .journal-history-edit-input {
          width: 100%;
          border: 2px solid #cbd5e1;
          border-radius: 8px;
          padding: 0.7rem;
          font-size: 0.95rem;
          color: #0f172a;
          background: #ffffff;
          font-family: inherit;
          resize: vertical;
          min-height: 80px;
          margin-top: 0.25rem;
        }
        
        .journal-history-edit-input:focus {
          outline: none;
          border-color: #0b62d6;
          box-shadow: 0 0 0 3px rgba(11, 98, 214, 0.1);
        }
        
        .journal-history-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
          flex-wrap: wrap;
        }
        
        .journal-history-btn-edit {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #ffffff;
          border: none;
          padding: 0.7rem 1.2rem;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          min-height: 44px;
          flex: 1;
          min-width: 100px;
        }
        
        .journal-history-btn-edit:active {
          transform: scale(0.98);
        }
        
        .journal-history-btn-save {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          border: none;
          padding: 0.7rem 1.2rem;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          min-height: 44px;
          flex: 1;
          min-width: 100px;
        }
        
        .journal-history-btn-save:active {
          transform: scale(0.98);
        }
        
        .journal-history-btn-cancel {
          background: #f1f5f9;
          color: #475569;
          border: 2px solid #cbd5e1;
          padding: 0.7rem 1.2rem;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          min-height: 44px;
          flex: 1;
          min-width: 100px;
        }
        
        .journal-history-btn-cancel:active {
          transform: scale(0.98);
        }
        
        .journal-bibleguide-popup-movable {
          background: #ffffff;
          border-radius: 14px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          width: 90%;
          max-width: 400px;
          position: fixed;
        }
        
        .journal-bibleguide-header {
          background: linear-gradient(135deg, #0b62d6 0%, #044a9f 100%);
          color: #ffffff;
          padding: 1rem 1.2rem;
          border-radius: 14px 14px 0 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: grab;
          user-select: none;
        }
        
        .journal-bibleguide-header:active {
          cursor: grabbing;
        }
        
        .journal-bibleguide-close {
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 2rem;
          cursor: pointer;
          min-width: 44px;
          min-height: 44px;
        }
        
        .journal-bibleguide-list {
          padding: 1rem;
          max-height: 60vh;
          overflow-y: auto;
        }
        
        .journal-bibleguide-listitem {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          padding: 0.75rem;
          margin-bottom: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .journal-bibleguide-listitem:hover {
          border-color: #0b62d6;
          background: #f1f5f9;
        }
        
        .journal-bibleguide-listitem img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 8px;
          border: 2px solid #e2e8f0;
        }
        
        .journal-bible-popup {
          position: fixed;
          background: #ffffff;
          border-radius: 14px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          z-index: 9999;
        }
        
        .bible-header {
          background: linear-gradient(135deg, #0b62d6 0%, #044a9f 100%);
          color: #ffffff;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: grab;
          user-select: none;
          border-radius: 14px 14px 0 0;
        }
        
        .bible-header:active {
          cursor: grabbing;
        }
        
        .bible-title {
          font-weight: 700;
          font-size: 1rem;
        }
        
        .bible-content {
          flex: 1;
          overflow: auto;
          background: #ffffff;
        }
        
        .bible-pdf-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        
        .bible-info-card {
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          padding: 1rem;
          margin: 1rem;
          color: #1e293b;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        
        @media (max-width: 640px) {
          .journal-container {
            padding-top: 64px;
          }
          
          .journal-back-btn {
            top: 8px;
            left: 8px;
            padding: 0.5rem 0.8rem;
            font-size: 0.9rem;
          }
          
          .journal-title {
            font-size: 1.3rem;
          }
          
          .journal-subtitle {
            font-size: 0.9rem;
          }
          
          .journal-main {
            padding: 0.75rem;
          }
          
          .journal-editor {
            max-width: 100%;
            max-height: 95vh;
            margin: 0.5rem;
          }
          
          .journal-history-popup {
            max-width: 100%;
          }
          
          .journal-history-actions {
            flex-direction: column;
          }
          
          .journal-history-btn-edit,
          .journal-history-btn-save,
          .journal-history-btn-cancel {
            width: 100%;
          }
          
          .journal-bibleguide-popup-movable {
            width: 95%;
            max-width: 95%;
            left: 2.5% !important;
            top: 10% !important;
          }
          
          .journal-bible-popup {
            width: 95% !important;
            height: 85vh !important;
            left: 2.5% !important;
            top: 7.5% !important;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <button
        className="journal-back-btn"
        onClick={() => navigate('/profile')}
        aria-label="Go back to profile"
        style={{ right: 12, left: 'auto' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Back
      </button>

      <div className="journal-intro">
        <h1 className="journal-title">SOAP Journal</h1>
        <p className="journal-subtitle">
          Do your devotion using the SOAP method: Scripture, Observation, Application, Prayer.
        </p>
        
        <div className="journal-date-row">
          <label htmlFor="journal-date">Date:</label>
          <input
            id="journal-date"
            type="date"
            name="date"
            value={journal.date}
            onChange={handleChange}
          />
          {showValidation && inputErrors.date && (
            <div className="journal-error">{inputErrors.date}</div>
          )}
        </div>
        
        <div className="journal-header-actions">
          <button
            className="journal-action-btn"
            onClick={() => setShowHistory(true)}
          >
            History
          </button>
          <button
            className="journal-action-btn"
            onClick={handleShowBibleGuide}
          >
            Bible Guide
          </button>
        </div>
      </div>

      {showSavePopup && (
        <div className="journal-save-popup">
          ✓ Journal entry saved!
        </div>
      )}

      {showUpdatePopup && (
        <div className="journal-save-popup">
          ✓ Journal updated successfully!
        </div>
      )}

      <div className="journal-main">
        <div className="journal-section-list">
          {soapSections.map((section) => (
            <div
              key={section.key}
              className={`journal-section-card ${currentSection === section.key ? 'active' : ''}`}
              onClick={() => setCurrentSection(section.key)}
            >
              <div className="journal-section-header">
                <h3 className="journal-section-title">{section.label}</h3>
                <span className={`journal-section-status ${journal[section.key] ? '' : 'empty'}`}>
                  {journal[section.key] ? '✓ Done' : 'Empty'}
                </span>
              </div>
              <p className="journal-section-desc">{section.description}</p>
            </div>
          ))}
        </div>
      </div>

      {currentSection && (
        <div className="journal-editor-overlay" onClick={() => setCurrentSection(null)}>
          <div className="journal-editor" onClick={(e) => e.stopPropagation()}>
            <div className="journal-editor-header">
              <h2 className="journal-editor-title">
                {soapSections.find(s => s.key === currentSection)?.label}
              </h2>
              <button
                className="journal-editor-close"
                onClick={() => setCurrentSection(null)}
                aria-label="Close editor"
              >
                ×
              </button>
            </div>
            
            <div className="journal-editor-body">
              <div className="journal-editor-desc">
                {soapSections.find(s => s.key === currentSection)?.description}
              </div>
              
              <label htmlFor={`editor-${currentSection}`} className="journal-editor-label">
                {soapSections.find(s => s.key === currentSection)?.label}:
              </label>
              <textarea
                id={`editor-${currentSection}`}
                name={currentSection}
                value={journal[currentSection]}
                onChange={handleChange}
                className="journal-editor-textarea"
                placeholder={`Write your ${soapSections.find(s => s.key === currentSection)?.label.toLowerCase()} here...`}
              />
              {showValidation && inputErrors[currentSection] && (
                <div className="journal-error">{inputErrors[currentSection]}</div>
              )}
              
              <div className="journal-editor-actions">
                <button
                  className="journal-btn-save"
                  onClick={() => setCurrentSection(null)}
                >
                  Done
                </button>
                <button
                  className="journal-btn-clear"
                  onClick={() => handleClear(currentSection)}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="journal-bottom-actions">
        <button className="journal-btn-primary" onClick={handleSaveAll}>
          Save Journal Entry
        </button>
        <button className="journal-btn-secondary" onClick={() => setShowBible(!showBible)}>
          {showBible ? 'Close Bible' : 'Open Bible'}
        </button>
      </div>

      {showHistory && (
        <div className="journal-history-overlay" onClick={() => setShowHistory(false)}>
          <div className="journal-history-popup" onClick={(e) => e.stopPropagation()}>
            <button
              className="journal-history-close"
              onClick={() => setShowHistory(false)}
              aria-label="Close history"
            >
              ×
            </button>
            <h2 className="journal-history-title">Journal History</h2>
            {loadingHistory ? (
              <div>Loading...</div>
            ) : historyEntries.length === 0 ? (
              <div>No journal entries found.</div>
            ) : (
              <div>
                {historyEntries.map((entry, idx) => {
                  const entryId = entry._id || entry.id;
                  const isEditing = editingEntryId === entryId;

                  return (
                    <div key={idx} className="journal-history-entry">
                      <div className="journal-history-date">
                        {entry.date ? new Date(entry.date).toLocaleDateString() : ''}
                      </div>
                      
                      <div className="journal-history-field">
                        <strong>Scripture:</strong>
                        {isEditing ? (
                          <textarea
                            className="journal-history-edit-input"
                            value={editedEntry.scripture || ''}
                            onChange={(e) => handleEditFieldChange('scripture', e.target.value)}
                          />
                        ) : (
                          <span>{entry.scripture}</span>
                        )}
                      </div>
                      
                      <div className="journal-history-field">
                        <strong>Observation:</strong>
                        {isEditing ? (
                          <textarea
                            className="journal-history-edit-input"
                            value={editedEntry.observation || ''}
                            onChange={(e) => handleEditFieldChange('observation', e.target.value)}
                          />
                        ) : (
                          <span>{entry.observation}</span>
                        )}
                      </div>
                      
                      <div className="journal-history-field">
                        <strong>Application:</strong>
                        {isEditing ? (
                          <textarea
                            className="journal-history-edit-input"
                            value={editedEntry.application || ''}
                            onChange={(e) => handleEditFieldChange('application', e.target.value)}
                          />
                        ) : (
                          <span>{entry.application}</span>
                        )}
                      </div>
                      
                      <div className="journal-history-field">
                        <strong>Prayer:</strong>
                        {isEditing ? (
                          <textarea
                            className="journal-history-edit-input"
                            value={editedEntry.prayer || ''}
                            onChange={(e) => handleEditFieldChange('prayer', e.target.value)}
                          />
                        ) : (
                          <span>{entry.prayer}</span>
                        )}
                      </div>

                      <div className="journal-history-actions">
                        {isEditing ? (
                          <>
                            <button
                              className="journal-history-btn-save"
                              onClick={() => handleSaveEdit(entryId)}
                            >
                              Save Changes
                            </button>
                            <button
                              className="journal-history-btn-cancel"
                              onClick={handleCancelEdit}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            className="journal-history-btn-edit"
                            onClick={() => handleEditEntry(entry)}
                          >
                            Edit Entry
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {showBibleGuide && (
        <div className="journal-history-overlay" onClick={() => setShowBibleGuide(false)}>
          <div
            className="journal-bibleguide-popup-movable"
            ref={bibleGuidePopupRef}
            style={{ left: bibleGuidePopupPos.x, top: bibleGuidePopupPos.y }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="journal-bibleguide-header" onMouseDown={startBibleGuideDrag}>
              <span style={{ fontWeight: 700, fontSize: '1.08rem' }}>Bible Reading Guide</span>
              <button
                className="journal-bibleguide-close"
                onClick={() => setShowBibleGuide(false)}
                aria-label="Close Bible Guide"
              >
                ×
              </button>
            </div>
            <div className="journal-bibleguide-list">
              {loadingBibleGuide ? (
                <div>Loading...</div>
              ) : bibleGuideImages.length === 0 ? (
                <div>No Bible Guide images found.</div>
              ) : (
                <div>
                  {bibleGuideImages.map(img => (
                    <div
                      key={img.id}
                      className="journal-bibleguide-listitem"
                      onClick={() => setZoomImage(img)}
                    >
                      <img
                        src={img.base64 || (img.filename ? `https://dailyvotionbackend-91wt.onrender.com/uploads/${img.filename}` : '')}
                        alt={img.image_name || 'Bible Guide'}
                        onError={e => { e.target.onerror = null; e.target.src = '/broken-image.png'; }}
                      />
                      <span style={{ fontWeight: 600, color: '#0b62d6' }}>
                        {img.image_name || img.filename || 'Bible Guide'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {zoomImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={() => setZoomImage(null)}
        >
          <button
            onClick={() => setZoomImage(null)}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: '#0b62d6',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 24,
              padding: '8px 20px',
              cursor: 'pointer',
              fontWeight: 700,
              minWidth: 44,
              minHeight: 44
            }}
          >
            ×
          </button>
          <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}>
            <img
              src={zoomImage.base64 || (zoomImage.filename ? `https://dailyvotionbackend-91wt.onrender.com/uploads/${zoomImage.filename}` : '')}
              alt="Bible Guide"
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                transform: `scale(${zoomLevel})`,
                borderRadius: 12,
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
              }}
              onClick={(e) => e.stopPropagation()}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 10,
                background: 'rgba(11, 98, 214, 0.9)',
                borderRadius: 10,
                padding: '10px 15px'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setZoomLevel(z => Math.max(z - 0.2, 0.5))}
                style={{
                  background: '#fff',
                  color: '#0b62d6',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 20,
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  minWidth: 44,
                  minHeight: 44
                }}
              >
                -
              </button>
              <span style={{ color: '#fff', fontWeight: 600, alignSelf: 'center', minWidth: 80, textAlign: 'center' }}>
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel(z => Math.min(z + 0.2, 3))}
                style={{
                  background: '#fff',
                  color: '#0b62d6',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 20,
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  minWidth: 44,
                  minHeight: 44
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}

      {showBible && (
        <div
          className="journal-bible-popup"
          ref={popupRef}
          style={{
            left: popupPos.x,
            top: popupPos.y,
            width: window.innerWidth > 640 ? biblePopupSize.width : '95%',
            height: window.innerWidth > 640 ? biblePopupSize.height : '85vh'
          }}
        >
          <div className="bible-header" onMouseDown={startDrag}>
            <span className="bible-title">New International Version Bible</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setShowBibleInfo(!showBibleInfo)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: 6,
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  minHeight: 36
                }}
              >
                Info
              </button>
              <button
                onClick={() => setShowBible(false)}
                style={{
                  background: '#dc2626',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: '1.5rem',
                  padding: '4px 12px',
                  cursor: 'pointer',
                  minWidth: 44,
                  minHeight: 44
                }}
              >
                ×
              </button>
            </div>
          </div>

          {showBibleInfo && (
            <div className="bible-info-card">
              <p style={{ margin: '0 0 0.5rem 0' }}>Scripture quotations taken from The Holy Bible, New International Version®, NIV®.</p>
              <p style={{ margin: '0.5rem 0' }}>Copyright © 1973, 1978, 1984 by Biblica, Inc.</p>
              <p style={{ margin: '0.5rem 0 0 0' }}>Used by permission of Zondervan. All rights reserved worldwide.</p>
            </div>
          )}

          <div className="bible-content">
            <iframe
              ref={bibleIframeRef}
              src={pdfUrl}
              title="Bible PDF"
              className="bible-pdf-iframe"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserJournal;