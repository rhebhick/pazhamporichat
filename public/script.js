document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const themeToggle = document.getElementById('theme-toggle');
    let chatHistory = [];

    // --- Theme Toggler ---
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        let theme = 'light';
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark';
            themeToggle.textContent = '☀️';
        } else {
            themeToggle.textContent = '🌙';
        }
        localStorage.setItem('theme', theme);
    });
    // Function to add a message to the chat box
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', `${sender}-message`);
        messageElement.textContent = text;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }

    // Add a "typing..." indicator
    function showTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.classList.add('chat-message', 'bot-message', 'typing-indicator');
        typingElement.textContent = 'Pazhapori is typing...';
        chatBox.appendChild(typingElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Remove the "typing..." indicator
    function removeTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Handle form submission
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userMessage = userInput.value.trim();

        if (userMessage) {
            addMessage(userMessage, 'user');
            userInput.value = '';
            showTypingIndicator();

            try {
                const response = await fetch('/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: userMessage,
                        history: chatHistory,
                    }),
                });

                removeTypingIndicator();

                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.error || 'Network response was not ok');
                }

                const data = await response.json();
                const botReply = data.reply;
                addMessage(botReply, 'bot');

                // Update history with the user's message and the bot's reply
                chatHistory.push({ role: "user", parts: [{ text: userMessage }] });
                chatHistory.push({ role: "model", parts: [{ text: botReply }] });
            } catch (error) {
                removeTypingIndicator();
                addMessage('Ayyoo! Enikku vayya. Server-il entho kuzhappam.', 'bot');
                console.error('Error:', error);
            }
        }
    });

    addMessage('Enthuvaade... Choyikk. Samayam kalayalle.', 'bot');
});
