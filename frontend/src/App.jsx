import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import InputArea from './components/InputArea';
import ProjectDocs from './components/ProjectDocs';

const API_BASE_URL = 'http://localhost:5000';

export default function App() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('aetherchat_history');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [selectedModel, setSelectedModel] = useState(() => {
    return localStorage.getItem('aetherchat_model') || 'llama-3.3-70b-versatile';
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  
  const [backendStatus, setBackendStatus] = useState({
    status: 'offline',
    providers: { groq: false, anthropic: false }
  });

  // Verify backend connectivity and read active provider capabilities on load
  const checkBackendStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/status`);
      if (response.ok) {
        const data = await response.json();
        setBackendStatus(data);
      } else {
        setBackendStatus({ status: 'offline', providers: { groq: false, anthropic: false } });
      }
    } catch (error) {
      console.warn('Backend server is offline or unreachable.');
      setBackendStatus({ status: 'offline', providers: { groq: false, anthropic: false } });
    }
  };

  useEffect(() => {
    checkBackendStatus();
    // Refresh status check every 8 seconds
    const interval = setInterval(checkBackendStatus, 8000);
    return () => clearInterval(interval);
  }, []);

  // Persist state updates to local storage
  useEffect(() => {
    localStorage.setItem('aetherchat_history', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('aetherchat_model', selectedModel);
  }, [selectedModel]);

  const handleSendMessage = async (text) => {
    if (isLoading) return;

    // 1. Construct user message entry
    const userMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    // 2. Identify the provider based on target model string
    const provider = selectedModel.includes('claude') ? 'anthropic' : 'groq';

    try {
      // 3. Post prompt history to server
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages,
          provider: provider,
          model: selectedModel
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }

      const result = await response.json();
      
      // 4. Append assistant message
      setMessages(prev => [...prev, { role: 'assistant', content: result.text }]);
    } catch (error) {
      console.error('Chat error:', error);
      // Inject a clear system error message into the chat so the user is informed
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: `⚠️ **System Diagnostic Warning**\n\nFailed to receive response from backend.\n\n*Detail: ${error.message}*\n\nPlease make sure:\n- The backend server is running.\n- You have provided valid API keys in your backend \`.env\` file.\n- Your internet connection is active.` 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear your chat history?')) {
      setMessages([]);
    }
  };

  return (
    <div className="app-container">
      <Header 
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        backendStatus={backendStatus}
        onClearChat={handleClearChat}
        hasMessages={messages.length > 0}
        onShowDocs={() => setShowDocs(true)}
      />
      
      <ChatWindow 
        messages={messages} 
        isLoading={isLoading} 
        onSendSamplePrompt={handleSendMessage}
      />
      
      <InputArea 
        onSendMessage={handleSendMessage} 
        isLoading={isLoading}
        isOnline={backendStatus.status === 'online'}
      />

      {/* Project Docs Modal Overlay */}
      {showDocs && (
        <div
          onClick={() => setShowDocs(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(7, 10, 19, 0.85)',
            backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 1100, height: '88vh',
              borderRadius: 18, overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
              position: 'relative',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowDocs(false)}
              style={{
                position: 'absolute', top: 16, right: 16, zIndex: 10,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#94a3b8', borderRadius: 8,
                width: 32, height: 32, cursor: 'pointer',
                fontSize: '1rem', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; e.currentTarget.style.color = '#ef4444'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#94a3b8'; }}
              title="Close docs"
            >✕</button>
            <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
              <ProjectDocs />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
