document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const darkModeButton = document.getElementById("dark-mode-toggle");
    const reloadButton = document.getElementById("reload-chat");

    inputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    darkModeButton.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });

    reloadButton.addEventListener("click", () => {
        chatBox.innerHTML = "";
    });
});

async function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    const chatBox = document.getElementById("chat-box");

    chatBox.innerHTML += `<div class="message user-message"><strong>User:</strong> <span>${userInput}</span></div>`;
    document.getElementById("user-input").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch("/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: userInput }),
        });

        const result = await response.json();

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
                setTimeout(typeWord, 100);
            }
        }

        typeWord();
    } catch (error) {
        console.error("Error fetching AI response:", error);
        chatBox.innerHTML += `<div class="message ai-message"><strong>VELOS AI:</strong> Oops! Something went wrong.</div>`;
    }
}
