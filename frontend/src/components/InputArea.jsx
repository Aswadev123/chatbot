import React, { useState, useRef, useEffect } from 'react';

export default function InputArea({ onSendMessage, isLoading, isOnline }) {
  const [inputText, setInputText] = useState('');
  const textareaRef = useRef(null);

  // Auto-grow textarea height as the user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      // Restrict upper limits via max-height in CSS, setting direct height to scrollHeight here
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading || !isOnline) return;

    onSendMessage(inputText);
    setInputText('');
    
    // Reset textarea height to default
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    // Submit on Enter key without shift modifiers
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="input-panel">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <textarea
            ref={textareaRef}
            className="chat-input"
            placeholder={
              !isOnline 
                ? 'Connecting to server...' 
                : isLoading 
                  ? 'Waiting for AI response...' 
                  : 'Type a message... (Press Enter to send.)'
            }
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading || !isOnline}
            rows={1}
          />
          <button 
            type="submit" 
            className="send-btn" 
            disabled={!inputText.trim() || isLoading || !isOnline}
            title="Send Message"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
