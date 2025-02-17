const fs = require("fs");

// Load Q&A dataset
let qaDataset = [];
try {
    const qaData = fs.readFileSync("qa.json", "utf8");
    qaDataset = JSON.parse(qaData);
    console.log("Q&A dataset loaded.");
} catch (err) {
    console.error("Could not read qa.json. Ensure the file exists.");
}

// ----------------------------
// AI Response Generation Logic
// ----------------------------

function generateResponse(userQuestion) {
    const lowerCaseQuestion = userQuestion.toLowerCase();
    let matchingAnswers = [];

    // Step 1: Collect all answers for similar questions
    for (const entry of qaDataset) {
        if (lowerCaseQuestion.includes(entry.question.toLowerCase())) {
            matchingAnswers.push(entry.answer);
        }
    }

    // Step 2: If no match, return default response
    if (matchingAnswers.length === 0) {
        return "I'm not sure. Can you rephrase your question?";
    }

    // Step 3: Use word prediction model to generate a response
    return predictResponse(matchingAnswers);
}

// ----------------------------
// Word Prediction Model (Markov-like)
// ----------------------------

function predictResponse(answers) {
    let words = [];
    
    // Collect words from all possible answers
    answers.forEach(answer => {
        words = words.concat(answer.split(/\s+/));
    });

    // If no words are collected, return a random fallback answer
    if (words.length === 0) return "I don't have enough information.";

    // Generate a response by predicting words dynamically
    let response = [];
    let currentWord = words[Math.floor(Math.random() * words.length)]; // Pick a random start word

    for (let i = 0; i < 20; i++) { // Limit to 20 words max
        response.push(currentWord);
        let nextWords = words.filter((word, index) => words[index - 1] === currentWord); // Find possible next words
        if (nextWords.length === 0) break; // Stop if no next words are found
        currentWord = nextWords[Math.floor(Math.random() * nextWords.length)]; // Pick a random next word
    }

    return response.join(" ") + "."; // Format the response
}

// Export AI function
module.exports = { generateResponse };
