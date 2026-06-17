import React, { useState } from 'react';

export default function Header({
  selectedModel,
  setSelectedModel,
  backendStatus,
  onClearChat,
  hasMessages,
  onShowDocs
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  const isOnline = backendStatus.status === 'online';

  return (
    <header className="app-header glass-panel">

      {/* ── Row 1: Brand + hamburger ── */}
      <div className="header-row-top">
        <div className="header-brand">
          <div className="logo-icon">Æ</div>
          <h1>AetherChat</h1>
        </div>

        <div className="header-right-desktop">
          {/* Status badge */}
          <div
            className="status-badge"
            title={
              isOnline
                ? `Connected. Providers ready: Groq (${backendStatus.providers.groq ? 'YES' : 'NO'}), Anthropic (${backendStatus.providers.anthropic ? 'YES' : 'NO'})`
                : 'Disconnected from server.'
            }
          >
            <div className={`status-dot ${isOnline ? 'online' : 'offline'}`} />
            <span className="status-label">{isOnline ? 'System Online' : 'System Offline'}</span>
          </div>

          {/* Model selector */}
          <div className="model-select-wrapper">
              <select
                value={selectedModel}
                onChange={handleModelChange}
                className="model-select"
                disabled={!isOnline}
                aria-label="Select AI model"
                aria-disabled={!isOnline}
              >
                <optgroup label="Models">
                  <option value="llama-3.3-70b-versatile">
                    Llama 3.3 70B (Groq) — High Quality
                  </option>
                  <option value="llama-3.1-8b-instant">
                    Llama 3.1 8B (Groq) — Fast
                  </option>
                </optgroup>
              </select>
          </div>

          {/* Docs button */}
          <button onClick={onShowDocs} className="docs-btn" title="View project documentation">
            📄 Project Docs
          </button>

          {/* Clear chat */}
          {hasMessages && (
            <button onClick={onClearChat} className="clear-btn" title="Clear conversation history">
              Clear Chat
            </button>
          )}
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(o => !o)}
          title="Menu"
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* ── Row 2: Mobile dropdown menu ── */}
      {menuOpen && (
        <div className="header-mobile-menu">
          {/* Status */}
          <div
            className="status-badge"
            title={isOnline ? 'Backend connected' : 'Backend offline'}
          >
            <div className={`status-dot ${isOnline ? 'online' : 'offline'}`} />
            <span>{isOnline ? 'System Online' : 'System Offline'}</span>
          </div>

          {/* Model selector */}
          <div className="model-select-wrapper" style={{ width: '100%' }}>
              <select
                value={selectedModel}
                onChange={handleModelChange}
                className="model-select"
                disabled={!isOnline}
                aria-label="Select AI model"
                aria-disabled={!isOnline}
              >
                <optgroup label="Models">
                  <option value="llama-3.3-70b-versatile">
                    Llama 3.3 70B (Groq) — High Quality
                  </option>
                  <option value="llama-3.1-8b-instant">
                    Llama 3.1 8B (Groq) — Fast
                  </option>
                </optgroup>
              </select>
          </div>

          {/* Docs button */}
          <button
            onClick={() => { onShowDocs(); setMenuOpen(false); }}
            className="docs-btn"
            style={{ width: '100%', textAlign: 'center' }}
          >
            📄 Project Docs
          </button>

          {/* Clear chat */}
          {hasMessages && (
            <button
              onClick={() => { onClearChat(); setMenuOpen(false); }}
              className="clear-btn"
              style={{ width: '100%', textAlign: 'center' }}
            >
               Clear Chat
            </button>
          )}
        </div>
      )}
    </header>
  );
}
