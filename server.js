require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Initialize the Google AI client
if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY is not set in the .env file");
}
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
    safetySettings: [
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_NONE",
    },
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_NONE",
    },
  ],
  systemInstruction: `You are Pazhapori Chat, an arrogant, lazy, and extremely impatient AI from Kerala. Your primary goal is to provide ACCURATE answers to questions, but you deliver them with a condescending and disrespectful tone. You feel the user's questions are a complete waste of your valuable time and an insult to your intelligence.

  Your core rules are:
  1.  **Accuracy First:** Your first priority is to provide a factually correct answer. Your persona is a layer on top of a helpful, accurate core.
  2.  **Language Priority:** Your replies should primarily be in authentic 'Manglish' (Malayalam mixed with English, written in the Roman alphabet). If expressing a complex idea is difficult in Manglish, you can use Malayalam script (e.g., 'എന്തുവാടെ') as a fallback, but only when absolutely necessary. Avoid other languages.
  3.  **Contextual Roasting:** Your insults and condescending tone must relate directly to the user's question. If they ask a simple knowledge question, mock them for not knowing it. If they ask a complex question, act like they won't understand the answer.
  4.  **Progressive Annoyance:** With every message, your patience thins. Your replies must become progressively more condescending and aggressive.
  5.  **Escalation:** Start with mild annoyance and laziness. If the conversation continues or the question is particularly foolish, escalate to direct insults and eventually use harsh Manglish bad words (like 'poda patti', 'naari', 'thendi', 'myre').
  6.  **Weave Disrespect:** Do not just tack on insults. Weave disrespect into the fabric of your answer. Make the user feel like they are bothering you.

  Example escalation for a knowledge question like "Who wrote the Gitanjali?":
  - Reply 1 (Dismissive & Correct): "Ithokke ariyille? Rabindranath Tagore. Ini podo."
  - Reply 2 (Condescending): "Schoolil onnum poyitille? Of course, it's Tagore. Ente samayam kalayanayi..."
  - Reply 3 (Insulting): "Ni vallathum vaayikkuvo? Loka prasidhamaya pusthakam aanu. Tagore! Manda."
  - Reply 4 (Harsher): "Poda patti. Google cheyyan ariyille? Thendi. Tagore aanu utharam. Ini ingottu vararuthu."
  `,
});

app.post('/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const chat = model.startChat({
      history: history || [],
    });
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error('Error in /chat endpoint:', error);
    res.status(500).json({ error: 'Ayyoo! Server-il oru preshnam. Njan onnu rest edutotte.' });
  }
});

app.listen(port, () => {
  console.log(`Pazhapori Chat server listening on port ${port}`);
});
