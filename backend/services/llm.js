import Groq from 'groq-sdk';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

// Initialize clients if keys are available
let groq = null;
let anthropic = null;

if (process.env.GROQ_API_KEY) {
  groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  console.log('Groq service initialized successfully.');
} else {
  console.warn('Warning: GROQ_API_KEY not found in environment.');
}

if (process.env.ANTHROPIC_API_KEY) {
  anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  console.log('Anthropic (Claude) service initialized successfully.');
} else {
  console.warn('Warning: ANTHROPIC_API_KEY not found in environment.');
}

/**
 * Normalizes and sends chat requests to the appropriate LLM provider.
 * 
 * @param {Object} options
 * @param {Array} options.messages - Array of { role, content } messages
 * @param {string} options.provider - 'openai' or 'anthropic'
 * @param {string} [options.model] - Specific model to use
 * @returns {Promise<Object>} Unified response containing the text content
 */
export async function generateChatCompletion({ messages, provider, model }) {
  const selectedProvider = provider || (groq ? 'groq' : anthropic ? 'anthropic' : null);

  if (!selectedProvider) {
    throw new Error('No LLM providers are initialized. Please check that API keys are set in your backend .env file.');
  }

  if (selectedProvider === 'groq') {
    if (!groq) {
      throw new Error('Groq API key is missing. Please provide it in your backend configuration.');
    }
    
    const defaultModel = model || 'llama-3.3-70b-versatile';
    console.log(`Sending request to Groq using model: ${defaultModel}`);
    
    try {
      const response = await groq.chat.completions.create({
        model: defaultModel,
        messages: messages,
      });

      return {
        text: response.choices[0].message.content,
        provider: 'groq',
        model: defaultModel,
      };
    } catch (error) {
      console.error('Groq completion error:', error);
      throw new Error(`Groq API Error: ${error.message}`);
    }
  }

  if (selectedProvider === 'anthropic') {
    if (!anthropic) {
      throw new Error('Anthropic API key is missing. Please provide it in your backend configuration.');
    }

    const defaultModel = model || 'claude-3-5-sonnet-20240620';
    console.log(`Sending request to Anthropic using model: ${defaultModel}`);

    try {
      // Anthropic does not allow a 'system' role inside the standard message array in their chat completions SDK,
      // it must be passed in the top-level 'system' property. We will separate it out.
      const systemMessages = messages.filter(msg => msg.role === 'system');
      const filteredMessages = messages.filter(msg => msg.role !== 'system');
      
      const systemPrompt = systemMessages.map(msg => msg.content).join('\n') || undefined;

      const response = await anthropic.messages.create({
        model: defaultModel,
        max_tokens: 2000,
        system: systemPrompt,
        messages: filteredMessages,
      });

      // Anthropic responses return an array of content blocks (text, tool_use, etc.)
      const textResponse = response.content
        .filter(block => block.type === 'text')
        .map(block => block.text)
        .join('\n');

      return {
        text: textResponse,
        provider: 'anthropic',
        model: defaultModel,
      };
    } catch (error) {
      console.error('Anthropic completion error:', error);
      throw new Error(`Anthropic API Error: ${error.message}`);
    }
  }

  throw new Error(`Unsupported provider: ${selectedProvider}`);
}
