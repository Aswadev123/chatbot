# Building an AI Chatbot (React + Express + Claude/groq)

This plan outlines the steps we will take to build a highly premium, modern AI Chatbot from scratch. We will organize the project into a mono-repository style with two subfolders: `backend/` (Express) and `frontend/` (React + Vite).

---

## User Review Required

We need your input on a few configuration choices before starting:
> [!IMPORTANT]
> 1. **LLM Provider**: Which API do you want to configure first—**Claude (Anthropic)** or **OpenAI**? (You can use both, but we will start with one). Make sure you have your API key ready.
> 2. **Styling**: We will use **Vanilla CSS** with CSS variables for a premium, sleek dark-themed glassmorphism UI. If you prefer Tailwind CSS, please specify which version.
> 3. **Co-Development Style**: As your instructor, would you like me to:
>    - **Option A**: Build the foundational code step-by-step and explain the code block-by-block.
>    - **Option B**: Provide tasks for you to complete, guiding you through writing the code yourself.

---

## Proposed Project Structure

We will create the following layout:
```text
a:/projects/AIchat/
├── backend/
│   ├── .env
│   ├── index.js
│   ├── package.json
│   └── services/
│       └── llm.js
└── frontend/
    ├── index.html
    ├── package.json
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   └── components/
    │       ├── ChatWindow.jsx
    │       ├── MessageItem.jsx
    │       └── InputArea.jsx
```

---

## Proposed Phase-by-Phase Plan

### Phase 1: Environment & Project Scaffolding
- **Backend**: Initialize Node.js app, install `express`, `cors`, `dotenv`, and API SDKs (`groq` / `@anthropic-ai/sdk`).
- **Frontend**: Initialize React + Vite project using `npx -y create-vite@latest frontend --template react`.
- Configure scripts and verify the basic hello-world setups can communicate.

### Phase 2: Backend Development (Node.js & Express)
- **Environment**: Set up `.env` file for port configuration and API keys.
- **LLM Integration Service**: Create a service layer to communicate with Anthropic or OpenAI.
- **Chat Endpoint**: Set up a POST `/api/chat` endpoint to handle conversation history and call the LLM API.
- **Error Handling**: Add robust logging and error management for API rate limits/errors.

### Phase 3: Frontend Development (React + Vite)
- **Component Architecture**:
  - `Header`: App title, model selector status, connection status.
  - `ChatWindow`: Handles message list rendering, auto-scrolling, and the typing indicator.
  - `MessageItem`: Distinguishes user vs. assistant messages, styled differently.
  - `InputArea`: Text area with auto-grow, enter-to-submit, and loading states.
- **State Management**: Manage conversation history in React state and synchronize with browser `localStorage` to keep chats on reload.

### Phase 4: Premium UI/UX & Polish
- **Color Palette**: Sleek neon-accented dark mode with glowing border highlights.
- **Glassmorphism**: Backdrop blur effects for containers, headers, and inputs.
- **Micro-Animations**: Transitions for new messages appearing, pulse animations for the thinking indicator, and smooth button hovers.
- **Markdown & Code Rendering**: Use basic code parsing to format assistant responses cleanly.

---

## Verification Plan

### Automated/Local Testing
- Use browser preview to run and test the frontend.
- Send mock messages to the Express API using `curl` or PowerShell `Invoke-RestMethod` to verify backend connectivity.
- Verify API keys are loaded and that error responses are clearly presented to the user.

### Manual Verification
- Test key features: multi-turn conversation memory, chat clearing, message typing state, responsiveness on mobile sizes.
