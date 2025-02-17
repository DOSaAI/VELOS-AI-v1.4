document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    // Handle Enter key press for sending messages
    inputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});

// Function to send messages
async function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    const chatBox = document.getElementById("chat-box");

    // Create user message container
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    userMessage.innerHTML = `<strong>User:</strong> <span>${userInput}</span>`;
    chatBox.appendChild(userMessage);

    // Create AI response container directly after the user message
    const aiMessageContainer = document.createElement("div");
    aiMessageContainer.classList.add("message", "ai-message");
    aiMessageContainer.innerHTML = `<strong>VELOS AI:</strong> <span id="ai-message-${Date.now()}"></span>`;
    chatBox.appendChild(aiMessageContainer);

    // Clear input field
    document.getElementById("user-input").value = "";

    // Scroll to the new messages
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch("/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: userInput }),
        });

        const result = await response.json();
        const aiMessageId = aiMessageContainer.querySelector("span").id;
        let messageContainer = document.getElementById(aiMessageId);

        // Simulated AI typing effect (100 words per second)
        let words = result.answer.split(" ");
        let index = 0;
        let chunkSize = 10; // AI types in 10-word chunks per second

        function typeWords() {
            if (index < words.length) {
                messageContainer.innerHTML += words.slice(index, index + chunkSize).join(" ") + " ";
                index += chunkSize;
                setTimeout(typeWords, 1000); // Adjusted for 100 words per second
            }
        }

        typeWords();
    } catch (error) {
        console.error("Error fetching AI response:", error);
        aiMessageContainer.innerHTML = `<strong>VELOS AI:</strong> Oops! Something went wrong.`;
    }
}
