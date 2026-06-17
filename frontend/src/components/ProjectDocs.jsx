import { useState } from 'react';


// ── Sub-components ─────────────────────────────────────────────────────────
function Badge({ label, color }) {
  return (
    <span style={{
      display: 'inline-block', padding: '2px 10px', borderRadius: '999px',
      fontSize: '0.75rem', fontWeight: 700, background: color, color: '#fff',
      marginRight: 6, marginBottom: 4,
    }}>{label}</span>
  );
}

function Code({ children, label }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ margin: '12px 0', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'rgba(0,0,0,0.4)', padding: '6px 14px', fontSize: '0.72rem',
          color: '#64748b', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
          <span>{label}</span>
          <button onClick={() => { navigator.clipboard.writeText(children); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            style={{ background: 'none', border: 'none', color: copied ? '#10b981' : '#64748b',
              cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700 }}>
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      )}
      <pre style={{ margin: 0, padding: '14px 16px', background: 'rgba(0,0,0,0.25)',
        overflowX: 'auto', fontSize: '0.85rem', lineHeight: 1.7, color: '#e2e8f0',
        fontFamily: "'Fira Code', monospace" }}>
        <code>{children}</code>
      </pre>
    </div>
  );
}

function Card({ title, icon, children, accent = '#00f2fe' }) {
  return (
    <div style={{
      background: 'rgba(13,18,34,0.7)', border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 14, padding: '22px 24px', marginBottom: 20,
      backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    }}>
      <h3 style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14,
        fontSize: '1rem', fontWeight: 700, color: accent }}>
        <span style={{ fontSize: '1.2rem' }}>{icon}</span> {title}
      </h3>
      <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', gap: 12, padding: '8px 0',
      borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.87rem' }}>
      <span style={{ color: '#64748b', minWidth: 160, flexShrink: 0 }}>{label}</span>
      <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{value}</span>
    </div>
  );
}

// ── Main Docs Component ─────────────────────────────────────────────────────
export default function ProjectDocs() {
  const [active, setActive] = useState('overview');

  const nav = [
    { id: 'overview',   label: 'Overview',       icon: '✦' },
    { id: 'stack',      label: 'Tech Stack',      icon: '⚙️' },
    { id: 'structure',  label: 'File Structure',  icon: '📁' },
    { id: 'backend',    label: 'Backend',         icon: '🖥️' },
    { id: 'frontend',   label: 'Frontend',        icon: '🎨' },
    { id: 'api',        label: 'API Reference',   icon: '🔌' },
    { id: 'run',        label: 'How to Run',      icon: '🚀' },
  ];

  return (
    <div style={{
      minHeight: '100vh', background: '#070a13', color: '#f1f5f9',
      fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'flex',
      backgroundImage: 'radial-gradient(at 0% 0%, rgba(99,102,241,0.12) 0px, transparent 40%), radial-gradient(at 100% 100%, rgba(0,242,254,0.08) 0px, transparent 45%)',
    }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: 240, flexShrink: 0, background: 'rgba(13,18,34,0.8)',
        backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(255,255,255,0.06)',
        padding: '32px 0', position: 'sticky', top: 0, height: '100vh',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '0 24px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{
            fontSize: '1.2rem', fontWeight: 800, letterSpacing: -0.5,
            background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Æ AetherChat</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 4 }}>Project Documentation</div>
        </div>
        <nav style={{ padding: '16px 12px', flex: 1 }}>
          {nav.map(n => (
            <button key={n.id} onClick={() => setActive(n.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10, width: '100%',
              padding: '10px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
              fontSize: '0.87rem', fontWeight: active === n.id ? 700 : 500,
              background: active === n.id ? 'rgba(0,242,254,0.1)' : 'transparent',
              color: active === n.id ? '#00f2fe' : '#94a3b8',
              textAlign: 'left', marginBottom: 2,
              transition: 'all 0.15s ease',
            }}>
              <span>{n.icon}</span> {n.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)',
          fontSize: '0.72rem', color: '#475569' }}>
          v1.0 · Node.js + React
        </div>
      </aside>

      {/* ── Content ── */}
      <main style={{ flex: 1, padding: '40px 48px', overflowY: 'auto', maxWidth: 860 }}>

        {/* OVERVIEW */}
        {active === 'overview' && (
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8, letterSpacing: -0.5 }}>
              AetherChat
            </h1>
            <p style={{ color: '#64748b', marginBottom: 28, fontSize: '1rem' }}>
              A premium, full-stack AI chatbot with multi-provider LLM support.
            </p>

            <Card title="What is AetherChat?" icon="✦" accent="#00f2fe">
              <p>AetherChat is a <strong style={{color:'#f1f5f9'}}>full-stack AI chat application</strong> built with a React (Vite) frontend and an Express.js backend. It supports multiple LLM providers — <strong style={{color:'#f1f5f9'}}>Groq</strong> (Llama models) and <strong style={{color:'#f1f5f9'}}>Anthropic</strong> (Claude models) — selectable from the UI at runtime.</p>
              <br/>
              <p>The app features a premium glassmorphism dark-mode UI with chat history persistence, real-time backend status detection, code block rendering with copy functionality, and multi-turn conversation memory.</p>
            </Card>

            <Card title="Key Features" icon="⭐" accent="#a855f7">
              <ul style={{ paddingLeft: 18 }}>
                <li>🤖 Multi-provider LLM support (Groq + Anthropic)</li>
                <li>💬 Multi-turn conversation memory</li>
                <li>💾 Chat history persisted in <code style={{color:'#00f2fe'}}>localStorage</code></li>
                <li>🔍 Live backend connectivity status badge</li>
                <li>📋 Code block rendering with one-click copy</li>
                <li>⌨️ Auto-growing textarea input (Enter to send)</li>
                <li>🎨 Premium glassmorphism dark-mode UI</li>
                <li>📱 Responsive layout for mobile + desktop</li>
              </ul>
            </Card>

            <Card title="Architecture" icon="🏗️" accent="#6366f1">
              <p>The project is a <strong style={{color:'#f1f5f9'}}>monorepo</strong> split into two independent apps:</p>
              <br/>
              <Row label="Frontend" value="React + Vite SPA (port 5173)" />
              <Row label="Backend" value="Express.js REST API (port 5000)" />
              <Row label="Communication" value="HTTP REST — fetch() API" />
              <Row label="State" value="React useState + localStorage" />
            </Card>
          </div>
        )}

        {/* TECH STACK */}
        {active === 'stack' && (
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 24 }}>Tech Stack</h1>

            <Card title="Frontend" icon="🎨" accent="#6366f1">
              <Row label="Framework" value="React 19 (JSX)" />
              <Row label="Build Tool" value="Vite 8" />
              <Row label="Language" value="JavaScript (JSX)" />
              <Row label="Styling" value="Vanilla CSS with CSS Variables" />
              <Row label="Fonts" value="Plus Jakarta Sans · Fira Code (Google Fonts)" />
              <Row label="State Management" value="React useState / useEffect hooks" />
              <Row label="Persistence" value="browser localStorage" />
              <Row label="HTTP Client" value="native fetch() API" />
              <div style={{marginTop:14}}>
                <Badge label="React 19" color="#3b82f6" />
                <Badge label="Vite 8" color="#a855f7" />
                <Badge label="Vanilla CSS" color="#0ea5e9" />
                <Badge label="ESLint" color="#f59e0b" />
              </div>
            </Card>

            <Card title="Backend" icon="🖥️" accent="#00f2fe">
              <Row label="Runtime" value="Node.js (ESM modules)" />
              <Row label="Framework" value="Express.js 4" />
              <Row label="Language" value="JavaScript (ES Modules)" />
              <Row label="Env Config" value="dotenv" />
              <Row label="Dev Server" value="nodemon" />
              <Row label="CORS" value="cors package" />
              <div style={{marginTop:14}}>
                <Badge label="Node.js" color="#22c55e" />
                <Badge label="Express 4" color="#f97316" />
                <Badge label="dotenv" color="#eab308" />
                <Badge label="nodemon" color="#8b5cf6" />
              </div>
            </Card>

            <Card title="LLM Providers" icon="🤖" accent="#a855f7">
              <Row label="Groq SDK" value="groq-sdk — Llama 3.3 70B, Llama 3.1 8B" />
              <Row label="Anthropic SDK" value="@anthropic-ai/sdk — Claude 3.5 Sonnet" />
              <Row label="Groq Console" value="https://console.groq.com/" />
              <Row label="Anthropic Console" value="https://console.anthropic.com/" />
              <div style={{marginTop:14}}>
                <Badge label="groq-sdk" color="#f97316" />
                <Badge label="@anthropic-ai/sdk" color="#6366f1" />
              </div>
            </Card>
          </div>
        )}

        {/* FILE STRUCTURE */}
        {active === 'structure' && (
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 24 }}>File Structure</h1>
            <Card title="Project Tree" icon="📁" accent="#00f2fe">
              <Code label="Monorepo Layout">{`A:/projects/AIchat/
├── backend/
│   ├── .env                  # API keys & port config
│   ├── index.js              # Express server entry point
│   ├── package.json
│   └── services/
│       └── llm.js            # Groq + Anthropic service layer
│
└── frontend/
    ├── index.html            # Root HTML + Google Fonts
    ├── vite.config.js        # Vite + React plugin config
    ├── package.json
    └── src/
        ├── main.jsx          # React DOM mount point
        ├── App.jsx           # Root component + state mgmt
        ├── index.css         # Global design system (CSS vars)
        └── components/
            ├── Header.jsx    # Logo, model selector, status
            ├── ChatWindow.jsx # Message list + sample prompts
            ├── MessageItem.jsx# Message rendering + code blocks
            └── InputArea.jsx  # Auto-grow textarea + send btn`}</Code>
            </Card>

            <Card title="Backend Files" icon="🖥️" accent="#6366f1">
              <Row label="index.js" value="Express server, CORS, logger, /api/status, /api/chat endpoints" />
              <Row label="services/llm.js" value="Initializes Groq & Anthropic clients, exports generateChatCompletion()" />
              <Row label=".env" value="PORT, GROQ_API_KEY, ANTHROPIC_API_KEY" />
            </Card>

            <Card title="Frontend Files" icon="🎨" accent="#a855f7">
              <Row label="App.jsx" value="Holds all state: messages, model, loading, backendStatus. handleSendMessage()" />
              <Row label="Header.jsx" value="Brand logo, model selector dropdown, connection badge, clear chat" />
              <Row label="ChatWindow.jsx" value="Empty state with sample prompts, message list, typing indicator" />
              <Row label="MessageItem.jsx" value="Parses markdown, renders code blocks with copy button, inline code, lists" />
              <Row label="InputArea.jsx" value="Auto-grow textarea, Enter to send, Shift+Enter for newline, loading states" />
              <Row label="index.css" value="CSS custom properties, glassmorphism, animations, responsive media queries" />
            </Card>
          </div>
        )}

        {/* BACKEND */}
        {active === 'backend' && (
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 24 }}>Backend Deep Dive</h1>

            <Card title="Express Server (index.js)" icon="🖥️" accent="#00f2fe">
              <p>The backend is a minimal <strong style={{color:'#f1f5f9'}}>Express.js REST API</strong> using ES Modules. It exposes three endpoints and delegates all LLM logic to the service layer.</p>
              <Code label="backend/index.js — Key Structure">{`import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateChatCompletion } from './services/llm.js';

dotenv.config();
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// Health / status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    providers: {
      groq:      !!process.env.GROQ_API_KEY,
      anthropic: !!process.env.ANTHROPIC_API_KEY,
    }
  });
});

// Chat completion endpoint
app.post('/api/chat', async (req, res) => {
  const { messages, provider, model } = req.body;
  const result = await generateChatCompletion({ messages, provider, model });
  res.json(result);  // { text, provider, model }
});

app.listen(5000);`}</Code>
            </Card>

            <Card title="LLM Service Layer (services/llm.js)" icon="🤖" accent="#a855f7">
              <p>A unified abstraction over both Groq and Anthropic SDKs. The service initializes clients at startup (if keys exist) and exports a single <code style={{color:'#00f2fe'}}>generateChatCompletion()</code> function.</p>
              <br/>
              <Row label="Groq default model" value="llama-3.3-70b-versatile" />
              <Row label="Anthropic default" value="claude-3-5-sonnet-20240620" />
              <Row label="Anthropic system msgs" value="Extracted from messages array into top-level `system` field" />
              <Row label="Response format" value="{ text: string, provider: string, model: string }" />
            </Card>

            <Card title=".env Configuration" icon="🔑" accent="#f97316">
              <Code label="backend/.env">{`# Server Port
PORT=5000

# Groq — https://console.groq.com/
GROQ_API_KEY=your_groq_key_here

# Anthropic — https://console.anthropic.com/
ANTHROPIC_API_KEY=your_anthropic_key_here`}</Code>
              <p style={{marginTop:8, fontSize:'0.82rem', color:'#f97316'}}>⚠️ Never commit .env to Git. Both keys are optional — the backend starts with whichever keys are provided.</p>
            </Card>
          </div>
        )}

        {/* FRONTEND */}
        {active === 'frontend' && (
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 24 }}>Frontend Deep Dive</h1>

            <Card title="App.jsx — Root State" icon="⚛️" accent="#3b82f6">
              <p>All application state lives in <strong style={{color:'#f1f5f9'}}>App.jsx</strong>. State is passed down as props and callbacks.</p>
              <br/>
              <Row label="messages" value="Array of { role, content } — full conversation history" />
              <Row label="selectedModel" value="Currently chosen LLM model string" />
              <Row label="isLoading" value="Boolean — true while awaiting API response" />
              <Row label="backendStatus" value="{ status, providers: { groq, anthropic } }" />
              <br/>
              <p><strong style={{color:'#f1f5f9'}}>localStorage</strong> persists <code style={{color:'#00f2fe'}}>messages</code> and <code style={{color:'#00f2fe'}}>selectedModel</code> across page reloads. The backend status is polled every <strong style={{color:'#f1f5f9'}}>8 seconds</strong>.</p>
            </Card>

            <Card title="Component Breakdown" icon="🧩" accent="#6366f1">
              <Row label="Header" value="Model dropdown, live status dot, clear chat button" />
              <Row label="ChatWindow" value="Shows empty state + sample prompts or scrollable message list + typing dots" />
              <Row label="MessageItem" value="Parses response text: separates code blocks (```) from plain text, renders lists" />
              <Row label="InputArea" value="Textarea auto-grows; Enter submits, Shift+Enter adds newline; disabled during loading" />
            </Card>

            <Card title="Design System (index.css)" icon="🎨" accent="#a855f7">
              <p>The UI uses <strong style={{color:'#f1f5f9'}}>CSS Custom Properties</strong> for all tokens — no external CSS framework.</p>
              <Code label="Key CSS Variables">{`--bg-primary:       #070a13
--accent-cyan:      #00f2fe
--accent-indigo:    #6366f1
--accent-purple:    #a855f7
--gradient-accent:  linear-gradient(135deg, #00f2fe, #4facfe)
--gradient-user:    linear-gradient(135deg, #6366f1, #a855f7)
--font-sans:        'Plus Jakarta Sans'
--font-mono:        'Fira Code'`}</Code>
              <Row label="Glassmorphism" value="backdrop-filter: blur(24px) on .glass-panel elements" />
              <Row label="Animations" value="slide-in (messages), typing-bounce (loading dots), pulse-glow (icon)" />
              <Row label="Responsive" value="@media (max-width: 640px) — compact header, wider bubbles" />
            </Card>
          </div>
        )}

        {/* API REFERENCE */}
        {active === 'api' && (
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 24 }}>API Reference</h1>

            <Card title="GET /api/status" icon="💚" accent="#10b981">
              <p>Returns the server online status and which LLM providers have valid API keys configured.</p>
              <Code label="Response">{`{
  "status": "online",
  "providers": {
    "groq": true,
    "anthropic": true
  }
}`}</Code>
            </Card>

            <Card title="POST /api/chat" icon="💬" accent="#00f2fe">
              <p>Sends a conversation history to the specified LLM provider and returns the AI response.</p>
              <Code label="Request Body">{`{
  "messages": [
    { "role": "user", "content": "Hello!" },
    { "role": "assistant", "content": "Hi there!" },
    { "role": "user", "content": "Tell me a joke." }
  ],
  "provider": "groq",      // "groq" | "anthropic"
  "model": "llama-3.3-70b-versatile"
}`}</Code>
              <Code label="Success Response (200)">{`{
  "text": "Why don't scientists trust atoms? ...",
  "provider": "groq",
  "model": "llama-3.3-70b-versatile"
}`}</Code>
              <Code label="Error Response (500)">{`{
  "error": "Groq API Error: ..."
}`}</Code>
            </Card>

            <Card title="GET /" icon="🟢" accent="#22c55e">
              <p>Simple health check — returns a plain text string.</p>
              <Code label="Response">{`AI Chatbot Backend Service is Running!`}</Code>
            </Card>

            <Card title="Available Models" icon="🤖" accent="#a855f7">
              <Row label="llama-3.3-70b-versatile" value="Groq — Best quality, 128k context" />
              <Row label="llama-3.1-8b-instant" value="Groq — Fastest, cost-effective, 128k context" />
              <Row label="claude-3-5-sonnet-20240620" value="Anthropic — Advanced reasoning, 200k context" />
            </Card>
          </div>
        )}

        {/* HOW TO RUN */}
        {active === 'run' && (
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 24 }}>How to Run</h1>

            <Card title="Prerequisites" icon="📋" accent="#f59e0b">
              <Row label="Node.js" value="v18 or higher" />
              <Row label="npm" value="v9 or higher" />
              <Row label="Groq API Key" value="https://console.groq.com/ (free tier available)" />
              <Row label="Anthropic API Key" value="https://console.anthropic.com/ (optional)" />
            </Card>

            <Card title="Step 1 — Clone & Install" icon="📦" accent="#6366f1">
              <Code label="Install Backend Dependencies">{`cd A:/projects/AIchat/backend
npm install`}</Code>
              <Code label="Install Frontend Dependencies">{`cd A:/projects/AIchat/frontend
npm install`}</Code>
            </Card>

            <Card title="Step 2 — Configure API Keys" icon="🔑" accent="#f97316">
              <p>Edit <strong style={{color:'#f1f5f9'}}>backend/.env</strong> and add your keys:</p>
              <Code label="backend/.env">{`PORT=5000
GROQ_API_KEY=gsk_your_actual_groq_key
ANTHROPIC_API_KEY=sk-ant-your_anthropic_key`}</Code>
              <p style={{fontSize:'0.82rem', color:'#f97316'}}>⚠️ At least one key is required. Both are optional but at least one must be present for chats to work.</p>
            </Card>

            <Card title="Step 3 — Run Dev Servers" icon="🚀" accent="#00f2fe">
              <p>Open <strong style={{color:'#f1f5f9'}}>two terminal windows</strong>:</p>
              <Code label="Terminal 1 — Backend (port 5000)">{`cd A:/projects/AIchat/backend
npm run dev`}</Code>
              <Code label="Terminal 2 — Frontend (port 5173)">{`cd A:/projects/AIchat/frontend
npm run dev`}</Code>
              <p style={{marginTop:10}}>Then open <strong style={{color:'#00f2fe'}}>http://localhost:5173</strong> in your browser.</p>
            </Card>

            <Card title="Step 4 — Verify" icon="✅" accent="#10b981">
              <p>Check the header — the status badge should show <strong style={{color:'#10b981'}}>● System Online</strong>. Select a model from the dropdown and start chatting!</p>
              <br/>
              <Row label="Backend health check" value="http://localhost:5000/" />
              <Row label="Provider status" value="http://localhost:5000/api/status" />
              <Row label="Frontend app" value="http://localhost:5173/" />
            </Card>

            <Card title="npm Scripts Reference" icon="📜" accent="#8b5cf6">
              <Code label="Backend (backend/package.json)">{`npm run dev    # Start with nodemon (hot-reload)
npm start      # Start with plain node`}</Code>
              <Code label="Frontend (frontend/package.json)">{`npm run dev    # Start Vite dev server (HMR)
npm run build  # Build production bundle to dist/
npm run lint   # Run ESLint
npm run preview # Preview the production build`}</Code>
            </Card>
          </div>
        )}

      </main>
    </div>
  );
}
