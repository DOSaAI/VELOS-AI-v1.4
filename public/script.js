document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("user-input");
    inputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});

async function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    const chatBox = document.getElementById("chat-box");
    
    // Display user message
    chatBox.innerHTML += `<p class="user-message"><strong>You:</strong> ${userInput}</p>`;
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

        // Display AI response
        chatBox.innerHTML += `<p class="ai-message"><strong>VELOS AI:</strong> ${result.answer}</p>`;

        // Scroll chat box to the bottom
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        console.error("Error fetching AI response:", error);
        chatBox.innerHTML += `<p class="error-message"><strong>VELOS AI:</strong> Oops! Something went wrong.</p>`;
    }
}
