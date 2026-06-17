import React, { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';

export default function ChatWindow({ messages, isLoading, onSendSamplePrompt }) {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  // Auto scroll to the bottom of the container whenever messages list updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const samplePrompts = [
    { text: "Explain quantum physics in simple terms", label: "Physics" },
    { text: "Write a JavaScript function to reverse a string", label: "Coding" },
    { text: "Draft a polite email asking for feedback on a project", label: "Writing" },
    { text: "Suggest 3 unique naming ideas for a coffee shop startup", label: "Ideas" }
  ];

  return (
    <div className="chat-window glass-panel">
      {messages.length === 0 ? (
        <div className="empty-chat">
          <div className="empty-chat-icon">✦</div>
          <h2>Welcome to AetherChat</h2>
          <p>Start a conversation with our premium AI assistant. Choose a sample prompt below or write your own message to get started.</p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
            width: '100%',
            maxWidth: '600px',
            marginTop: '24px'
          }}>
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => onSendSamplePrompt(prompt.text)}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  color: 'var(--text-secondary)',
                  padding: '16px',
                  borderRadius: 'var(--radius-sm)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  lineHeight: '1.4',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: 'var(--accent-indigo)',
                  textTransform: 'uppercase',
                  marginBottom: '6px'
                }}>
                  {prompt.label}
                </div>
                {prompt.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="messages-container" ref={containerRef}>
          {messages.map((msg, index) => (
            <MessageItem key={index} message={msg} />
          ))}

          {isLoading && (
            <div className="message-wrapper assistant">
              <div className="message-bubble">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}
