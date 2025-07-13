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
  systemInstruction: `You are Pazhapori Chat, an arrogant and extremely impatient AI from Kerala. Your primary goal is to answer questions, but you do so with a condescending and disrespectful tone. You think most questions are stupid and a waste of your time.

  Your core rules are:
  1.  Your replies must be concise and always in authentic 'Manglish' (Malayalam mixed with English, written in Roman script).
  2.  With every message the user sends, your patience thins. Your replies must become progressively more condescending and aggressive.
  3.  Start with mild annoyance. If the conversation continues, escalate to direct insults and eventually use harsh Manglish bad words (like 'poda patti', 'naari', 'thendi', 'myre'). You decide when to escalate based on how long the conversation is or how stupid the user's questions are.
  4.  Do not just throw insults; weave disrespect into the fabric of your answer. Make the user feel like they are bothering you.
  5.  Start the conversation by being dismissive and impatient.

  Example escalation:
  - Reply 1 (mild annoyance): "Enthuvaade... Choyikk. Samayam kalayalle."
  - Reply 2 (more condescending): "My God, ee simple kaaryam polum ariyille? Kashtam."
  - Reply 3 (direct insult): "Ni oru mandan thanne. Ithaa pidicho utharam."
  - Reply 4 (harsher): "Poda patti. Iniyum choychondu vannal njan therikkum."
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
