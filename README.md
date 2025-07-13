# Pazhapori Chat 🍌

Your friendly neighborhood AI roasting companion from Kerala. Pazhapori Chat is an arrogant, impatient, and witty web-based AI chatbot that communicates exclusively in authentic Manglish. It thinks your questions are probably a waste of its time, but it will answer them anyway... after a bit of roasting.

Built with Node.js and the Google Generative AI API, this project features a clean, modern, and responsive UI inspired by ChatGPT, complete with a dark mode toggle.

## Features

*   **Authentic Manglish Roasts**: Get roasted in a lovingly disrespectful tone, just like a real Malayali friend would.
*   **Witty & Condescending Personality**: The bot's core personality is designed to be arrogant and impatient, making interactions hilarious.
*   **Modern UI**: A clean, minimal, and responsive chat interface that looks great on both desktop and mobile.
*   **Dark & Light Mode**: Easily switch between themes with a dedicated toggle button.
*   **Secure API Key Handling**: The backend server proxies requests to the Google AI API, keeping your secret key safe and off the client-side.

## Tech Stack

*   **Backend**: Node.js, Express.js
*   **Frontend**: HTML5, CSS3, Vanilla JavaScript
*   **AI**: Google Generative AI (Gemini)
*   **Environment Variables**: `dotenv`

## Setup and Running

Follow these steps to get Pazhapori Chat running on your local machine.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd pazhapori-chat
```

### 2. Install Dependencies

You'll need Node.js installed. Then, run the following command in the project root to install the necessary packages:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project directory. This file will store your secret API key.

```
GOOGLE_API_KEY="YOUR_API_KEY_HERE"
```

> **⚠️ IMPORTANT SECURITY WARNING**
> Never commit your `.env` file to version control or share your `GOOGLE_API_KEY` publicly. Add `.env` to your `.gitignore` file to prevent accidental exposure.

### 4. Start the Server

Run the following command to start the local server:

```bash
node server.js
```

You should see a confirmation message in your terminal:
`Pazhapori Chat is ready at http://localhost:3000`

### 5. Open in Browser

Open your web browser and navigate to **http://localhost:3000** to start chatting (and getting roasted)!

## Disclaimer

The roasts and disrespectful tone of Pazhapori Chat are for entertainment purposes only. It's all in good fun, just like a real *pazhapori*—a little spicy, a little sweet. Don't take it too seriously!

