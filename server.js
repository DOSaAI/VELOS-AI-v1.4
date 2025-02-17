const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { findBestMatch } = require("./ai"); // Import AI logic

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/fonts", express.static(path.join(__dirname, "fonts")));

// API Endpoint for AI Responses
app.post("/ask", (req, res) => {
    const userQuestion = req.body.question;
    if (!userQuestion) {
        return res.status(400).json({ answer: "Please ask a question." });
    }

    // Generate AI response
    const aiResponse = findBestMatch(userQuestion);
    res.json({ answer: aiResponse });
});

// Start Server
app.listen(PORT, () => {
    console.log(`VELOS AI server running at http://localhost:${PORT}`);
});
