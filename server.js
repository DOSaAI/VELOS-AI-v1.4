const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ai = require("./ai");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/ask", (req, res) => {
    const question = req.body.question;
    const answer = ai.generateResponse(question);
    res.json({ answer });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`VELOS AI Server running at http://localhost:${PORT}`);
});
