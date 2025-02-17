document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const darkModeButton = document.getElementById("dark-mode-toggle");
    const reloadButton = document.getElementById("reload-chat");

    // Handle Enter key press for sending messages
    inputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    // Toggle dark mode
    darkModeButton.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });

    // Reload chat (clear messages)
    reloadButton.addEventListener("click", () => {
        chatBox.innerHTML = ""; // Clears chat messages
    });
});

// Function to send messages
async function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    const chatBox = document.getElementById("chat-box");

    // Display user message
    chatBox.innerHTML += `<div class="message user-message"><strong>User:</strong> <span>${userInput}</span></div>`;
    document.getElementById("user-input").value = "";

    // Scroll chat box to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch("/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: userInput }),
        });

        const result = await response.json();

        // AI typing effect (100 words per second)
        let aiMessage = `<div class="message ai-message"><strong>VELOS AI:</strong> <span id="ai-message"></span></div>`;
        chatBox.innerHTML += aiMessage;
        chatBox.scrollTop = chatBox.scrollHeight;

        let messageContainer = document.getElementById("ai-message");
        let words = result.answer.split(" ");
        let index = 0;

        function typeWord() {
            if (index < words.length) {
                messageContainer.innerHTML += words[index] + " ";
                index++;
                setTimeout(typeWord, 100); // 100ms delay per word
            }
        }

        typeWord();
    } catch (error) {
        console.error("Error fetching AI response:", error);
        chatBox.innerHTML += `<div class="message error-message"><strong>VELOS AI:</strong> Oops! Something went wrong.</div>`;
    }
}
