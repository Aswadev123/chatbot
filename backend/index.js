import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateChatCompletion } from './services/llm.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for local development
app.use(cors({
  origin: '*', // For local dev flexibility, adjust to specific URL in production if needed
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Endpoint to check active provider capabilities based on loaded keys
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    providers: {
      groq: !!process.env.GROQ_API_KEY,
      anthropic: !!process.env.ANTHROPIC_API_KEY
    }
  });
});

// Endpoint for sending chat completions
app.post('/api/chat', async (req, res) => {
  const { messages, provider, model } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({
      error: 'Invalid request: "messages" is required and must be a non-empty array.'
    });
  }

  try {
    const result = await generateChatCompletion({ messages, provider, model });
    res.json(result);
  } catch (error) {
    console.error('Error generating chat response:', error);
    res.status(500).json({
      error: error.message || 'An internal server error occurred while processing the request.'
    });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.send('AI Chatbot Backend Service is Running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`  AI Chatbot Server listening on port ${PORT}`);
  console.log(`=========================================`);
});
