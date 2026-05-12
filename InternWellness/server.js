const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("."));

// ── Chatbot ──────────────────────────────────────────
app.post("/chat", async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.GROQ_API_KEY
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 200,
        messages: messages
      })
    });

    const data = await response.json();
    console.log("Groq response:", JSON.stringify(data));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Message Wall ──────────────────────────────────────
app.get("/api/messages", (req, res) => {
  const data = fs.existsSync("messages.json")
    ? JSON.parse(fs.readFileSync("messages.json"))
    : [];
  res.json(data.slice(-10).reverse());
});

app.post("/api/messages", (req, res) => {
  const { message } = req.body;
  if (!message || message.trim() === "") 
    return res.status(400).json({ error: "Empty message" });

  const data = fs.existsSync("messages.json")
    ? JSON.parse(fs.readFileSync("messages.json"))
    : [];

  const newMsg = {
    id: Date.now(),
    message: message.slice(0, 100),
    name: `Intern #${Math.floor(Math.random() * 99) + 1}`,
    time: new Date().toISOString()
  };

  data.push(newMsg);
  fs.writeFileSync("messages.json", JSON.stringify(data));
  res.json(newMsg);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

// ── Clear all messages ──
app.delete('/api/messages', (req, res) => {
  fs.writeFileSync('messages.json', '[]');
  res.json({ success: true });
});