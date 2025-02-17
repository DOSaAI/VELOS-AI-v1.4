# **VELOS AI v1.4** - Intelligent Chatbot with Dynamic AI Responses 🌐🤖  

[![Version](https://img.shields.io/badge/Version-1.4-blue)](https://github.com/DOSaAI/VELOS-AI-v1.-4)  
🚀 **Web-Based AI Chatbot** | ⚡ **Node.js Backend** | 🔥 **Dynamic AI Word Prediction**  

---

## **📌 About VELOS AI v1.4**
VELOS AI v1.4 is an **advanced AI chatbot** designed to **predict and generate answers dynamically** rather than relying on static responses.  
It is built using **Node.js, Express, and a JSON-based Q&A system**, making it **fast, efficient, and lightweight**.  

Unlike traditional chatbots, **VELOS AI** uses:  
✔ **Fuzzy Matching (Levenshtein Distance)** – To find the best-matching questions in the dataset.  
✔ **Markov Chain AI Model** – To **predict** and generate words dynamically.  
✔ **JSON-based AI** – Making it **easy to update and customize** responses.  

### **What Can VELOS AI Do?**
- **Respond dynamically** based on similar questions from the dataset.  
- **Predict the most likely words** to generate natural-sounding replies.  
- **Provide real-time AI-powered answers** via a modern chat interface.  
- **Run on low-resource devices** like Termux on mobile.  

⚠️ **VELOS AI Does NOT Remember Conversations**  
- It does **not track chat history** or past messages.  
- Each response is **generated independently** from previous messages.  
- Conversations **do not have memory**, making it lightweight but lacking deep context.  

---

## **🚀 New Features in VELOS AI v1.4**
✔ **AI Responses Appear Directly Below Each User Message**  
✔ **Typing Effect at 100 Words/Sec (Chunked for Better Readability)**  
✔ **Smooth Auto-Scrolling & Better UI Structure**  
✔ **Optimized Markov AI Model for Better Word Predictions**  
✔ **Faster AI Processing & Response Generation**  

---

## **📦 Installation**
### **1️⃣ Install Node.js**
For **Termux/Linux/macOS**:
```bash
pkg install nodejs -y
```
For **Windows**:  
[Download Node.js](https://nodejs.org/)

---

### **2️⃣ Clone the Repository**
```bash
git clone https://github.com/DOSaAI/VELOS-AI-v1.4.git
cd VELOS-AI-v1.4
```

---

### **3️⃣ Install Dependencies**
```bash
npm install
```

---

### **4️⃣ Run the Server**
```bash
node server.js
```

---

### **5️⃣ Open the Chat**
- **Go to:** `http://localhost:3000/` in your browser.  
- Start chatting with **VELOS AI**! 💬  

---

## **📖 How VELOS AI Works**
1. **User asks a question** via the web chat.  
2. **Server searches for similar questions** in `qa.json`.  
3. **AI collects all relevant answers** from the dataset.  
4. **AI predicts the response dynamically** by choosing words from multiple answers.  
5. **A unique, natural-sounding reply** is generated.  

---

### **⚠️ Reminder: No Conversation Memory**
- Each message is processed **individually** – **VELOS AI does not remember** previous conversations.  
- Every answer is **computed dynamically** using **Markov chain word prediction**.  

---

## **💻 File Structure**
```
📂 VELOS-AI-1.4
 ├── 📂 public          # Frontend (HTML, CSS, JS)
 │   ├── index.html     # Chat interface
 │   ├── styles.css     # UI styling
 │   ├── script.js      # Handles user interactions
 │   ├── 1498877-200.png  # Custom send button icon
 ├── 📂 fonts
 │   ├── poppins-regular-webfont.woff2  # Local font for better UI
 ├── server.js          # Backend server (Node.js + Express)
 ├── ai.js              # AI logic (Dynamic response prediction)
 ├── qa.json            # Predefined questions & answers
 ├── package.json       # Dependencies & metadata
 └── README.md          # Documentation
```

---

## **🛠️ Customizing the AI**
Want to add more responses? Just **edit `qa.json`**:
```json
[
  {
    "question": "What is AI?",
    "answer": "AI stands for Artificial Intelligence, enabling machines to learn and make decisions."
  },
  {
    "question": "Who created you?",
    "answer": "I was developed as an open-source AI assistant using Node.js."
  }
]
```
- **Add new Q&A pairs** to improve AI responses.  
- **Save & restart the server** to apply changes.  

---

## **💬 Example Chat Usage**
```plaintext
> User: What is AI?
VELOS AI: AI stands for Artificial Intelligence, enabling machines to learn and process data efficiently.

> User: How does AI work?
VELOS AI: AI uses data to analyze, predict, and improve learning models.

> User: What is artificial intelligence?
VELOS AI: Intelligence is the ability of AI to process information and make decisions.

> User: Do you remember our previous conversation?
VELOS AI: I'm not sure. Can you rephrase your question?
```
🔥 **Each response is generated uniquely, and VELOS AI does not recall previous messages.**  

---

## **🚀 Technologies Used**
- **Node.js** – Handles the backend and Express server.  
- **Express.js** – Manages HTTP requests and API routes.  
- **JSON-based AI** – Stores predefined questions and answers.  
- **Levenshtein Distance** – Fuzzy string matching for better question detection.  
- **Markov Chain AI** – Dynamically predicts responses word by word.  
- **JavaScript (Frontend)** – Manages the user interface and interaction.  
- **Custom UI Elements** – Uses local **Poppins font** and custom **send button icon**.  

---

## **🚀 Future Enhancements**
- 🔹 **Improved Word Prediction** – Make responses even more context-aware.  
- 🔹 **User Data Storage (Optional)** – Add conversation memory for long-term context.  
- 🔹 **API Integration** – Connect with external knowledge sources.  

---

## **🛠️ Contributing**
VELOS AI is **open-source**! Contributions are welcome.  
1. **Fork** the repo.  
2. **Improve the AI model, UI, or dataset**.  
3. **Submit a Pull Request**.  

---

## **📄 License**
**MIT License** – Free to use, modify, and distribute!  

---

## **📩 Contact & Support**
💡 **GitHub:** [https://github.com/DOSaAI](https://github.com/DOSaAI)  

🚀 **VELOS AI v1.4 – Smarter, Dynamic, and Private!** 🔥
