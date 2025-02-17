const fs = require("fs");

// -------------------------
// Load Q&A Dataset (qa.json)
// -------------------------

let qaDataset = [];
try {
    const qaData = fs.readFileSync("qa.json", "utf8");
    qaDataset = JSON.parse(qaData);
    console.log("Q&A dataset loaded successfully.");
} catch (err) {
    console.error("Error: Could not load qa.json. Ensure the file exists.");
}

// -------------------------
// Levenshtein Distance (Fuzzy Matching)
// -------------------------

function levenshteinDistance(a, b) {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    matrix[i][j - 1] + 1, // insertion
                    matrix[i - 1][j] + 1 // deletion
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

// -------------------------
// Markov-Based Prediction Model for Dynamic Responses
// -------------------------

function normalizeText(text) {
    return text.toLowerCase().replace(/[^\w\s]/g, "").trim();
}

/**
 * Builds a Markov chain model from the given text.
 * Maps each word to possible next words.
 */
function buildMarkovModel(text) {
    const words = text.split(/\s+/);
    const model = {};

    for (let i = 0; i < words.length - 1; i++) {
        const word = words[i].toLowerCase();
        const nextWord = words[i + 1].toLowerCase();

        if (!model[word]) {
            model[word] = [];
        }
        model[word].push(nextWord);
    }

    return model;
}

/**
 * Generates a dynamic response using the Markov model.
 */
function generateDynamicResponse(baseResponse) {
    const model = buildMarkovModel(baseResponse);
    let words = baseResponse.split(/\s+/);
    let response = [words[0]];

    for (let i = 1; i < words.length; i++) {
        const lastWord = response[response.length - 1].toLowerCase();
        if (model[lastWord]) {
            const nextWords = model[lastWord];
            response.push(nextWords[Math.floor(Math.random() * nextWords.length)]);
        } else {
            break;
        }
    }

    return response.join(" ") + ".";
}

// -------------------------
// Find Best Answer with Dynamic Variation
// -------------------------

function findBestMatch(userInput) {
    const normalizedInput = normalizeText(userInput);
    let bestMatch = null;
    let bestScore = Infinity;

    for (const pair of qaDataset) {
        const normalizedQuestion = normalizeText(pair.question);
        const distance = levenshteinDistance(normalizedInput, normalizedQuestion);

        if (distance < bestScore) {
            bestScore = distance;
            bestMatch = pair.answer;
        }
    }

    if (!bestMatch || bestScore > 3) {
        return "I'm sorry, but I don't have enough data to answer that question.";
    }

    return generateDynamicResponse(bestMatch);
}

// -------------------------
// Export AI Function
// -------------------------

module.exports = { findBestMatch };
