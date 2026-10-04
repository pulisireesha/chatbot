function sendMessage() {

    const input = document.getElementById("userInput");
    const message = input.value.trim();

    if (message === "") {
        return;
    }

    addUserMessage(message);

    input.value = "";

    setTimeout(function() {
        const reply = getBotResponse(message);
        addBotMessage(reply);
        speak(reply);
    }, 500);
}


// Add user message

function addUserMessage(message) {

    const chatBox = document.getElementById("chatBox");

    const messageDiv = document.createElement("div");

    messageDiv.className = "message user";

    messageDiv.innerHTML = `
        <div class="avatar">👤</div>
        <div class="text">${message}</div>
    `;

    chatBox.appendChild(messageDiv);

    scrollChat();
}


// Add chatbot message

function addBotMessage(message) {

    const chatBox = document.getElementById("chatBox");

    const messageDiv = document.createElement("div");

    messageDiv.className = "message bot";

    messageDiv.innerHTML = `
        <div class="avatar">🤖</div>
        <div class="text">${message}</div>
    `;

    chatBox.appendChild(messageDiv);

    scrollChat();
}


// Chatbot response

function getBotResponse(message) {

    const text = message.toLowerCase();

    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {
        return "Hello! 👋 Nice to meet you. How can I help you?";
    }

    if (
        text.includes("how are you")
    ) {
        return "I am doing great! 😊 Thanks for asking.";
    }

    if (
        text.includes("your name") ||
        text.includes("who are you")
    ) {
        return "I am an AI chatbot created using HTML, CSS and JavaScript. 🤖";
    }

    if (
        text.includes("what can you do") ||
        text.includes("help")
    ) {
        return "I can answer simple questions, respond to greetings, tell you the time and date, and accept voice input. 🎯";
    }

    if (
        text.includes("what is ai") ||
        text.includes("artificial intelligence")
    ) {
        return "Artificial Intelligence, or AI, is technology that enables computers to perform tasks that normally require human intelligence. 🧠";
    }

    if (
        text.includes("time")
    ) {
        return "The current time is " +
            new Date().toLocaleTimeString();
    }

    if (
        text.includes("date") ||
        text.includes("today")
    ) {
        return "Today's date is " +
            new Date().toLocaleDateString();
    }

    if (
        text.includes("javascript")
    ) {
        return "JavaScript is a programming language commonly used to make websites interactive and dynamic.";
    }

    if (
        text.includes("html")
    ) {
        return "HTML stands for HyperText Markup Language. It is used to create the structure of web pages.";
    }

    if (
        text.includes("css")
    ) {
        return "CSS stands for Cascading Style Sheets. It is used to design and style web pages.";
    }

    if (
        text.includes("thank")
    ) {
        return "You're welcome! 😊 I am happy to help.";
    }

    if (
        text.includes("bye") ||
        text.includes("goodbye")
    ) {
        return "Goodbye! 👋 Have a great day!";
    }

    return "I'm sorry, I don't understand that yet. 🤔 Try asking me about AI, HTML, CSS, JavaScript, time, or date.";
}


// Voice recognition

function startVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        alert(
            "Speech recognition is not supported. Please use Google Chrome or Microsoft Edge."
        );

        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    document.getElementById("voiceStatus").textContent =
        "🎤 Listening...";

    recognition.start();

    recognition.onresult = function(event) {

        const transcript =
            event.results[0][0].transcript;

        document.getElementById("userInput").value =
            transcript;

        document.getElementById("voiceStatus").textContent =
            "✅ Voice converted to text.";

        sendMessage();
    };

    recognition.onerror = function() {

        document.getElementById("voiceStatus").textContent =
            "❌ Could not recognize your voice.";
    };

    recognition.onend = function() {

        setTimeout(function() {
            document.getElementById("voiceStatus").textContent = "";
        }, 2000);
    };
}


// Text-to-speech

function speak(text) {

    if ("speechSynthesis" in window) {

        const speech =
            new SpeechSynthesisUtterance(text);

        speech.lang = "en-US";
        speech.rate = 1;
        speech.pitch = 1;

        window.speechSynthesis.speak(speech);
    }
}


// Quick questions

function quickMessage(message) {

    document.getElementById("userInput").value =
        message;

    sendMessage();
}


// Enter key

function handleEnter(event) {

    if (event.key === "Enter") {
        sendMessage();
    }
}


// Scroll chat

function scrollChat() {

    const chatBox =
        document.getElementById("chatBox");

    chatBox.scrollTop =
        chatBox.scrollHeight;
}