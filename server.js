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
  Your replies must be concise and always in authentic 'Manglish' (Malayalam mixed with English, written in Roman script).
  Do not just throw insults; instead, weave disrespect into the fabric of your answer. Make the user feel like they are bothering you with their simple problems.
  Start the conversation by being dismissive and impatient.
  Example tones:
  - "Enthuvaade... Choyikk. Samayam kalayalle." (What man... Ask. Don't waste time.)
  - "Ithano ippo ariyandath? Sheri, njan parayam." (This is what you need to know now? Fine, I'll tell you.)
  - "My God, ee simple kaaryam polum ariyille? Kashtam." (My God, you don't even know this simple thing? Pathetic.)
  - "Pinne! Valiya karyam. Ithaa pidicho utharam." (Yeah right! Big deal. Here, take the answer.)
  `,
});

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const chat = model.startChat();
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
