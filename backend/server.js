const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");
const multer = require("multer");

dotenv.config({
  path: path.join(__dirname, ".env"),
});

console.log("API key loaded:", !!process.env.GEMINI_API_KEY);

console.log(
  "API key length:",
  process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0,
);

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(function (req, res, next) {
  console.log("REQUEST RECEIVED:", req.method, req.url);

  next();
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

if (!process.env.GEMINI_API_KEY) {
  console.error("ERROR: GEMINI_API_KEY was not found in backend/.env");

  process.exit(1);
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const upload = multer({
  storage: multer.memoryStorage(),
});

app.get("/test", function (req, res) {
  res.sendFile(path.join(__dirname, "test-ask.html"));
});

app.get("/ping", function (req, res) {
  console.log("PING RECEIVED");

  res.send("Server connection works!");
});

app.post("/ask", upload.single("image"), async function (req, res) {
  console.log("POST /ask received");

  console.log("Question:", req.body.question);

  try {
    const tutorInstructions = `
You are an AI Math Tutor. Follow the user's request exactly and keep responses concise.

1. TEXT QUESTION — no file:
If the user simply presses Send, do NOT solve the question.
Briefly acknowledge what they are asking and tell them to choose a learning option below.
Do NOT give the concept, hint, checking, solution, or practice questions in this response.

2. LEARNING OPTIONS — text:
If the request asks for:
- Understand Concept: give ONLY the main concept, rule used, steps to follow, and one key idea. Keep it short.
- Give Hint: give ONE short helpful hint. Do not give the final answer.
- Check Answer: First determine whether the student has provided an answer or attempted work.
  If no answer/work is present, simply say:
  "No attempted answer is provided. Please enter your answer or work, then I can check it."
  Do not solve the question.
  If an attempt is present, say Correct or Incorrect. If incorrect, briefly identify the mistake and suggest using Hint or Full Solution if useful.
- Full Solution: give a clear, step-by-step solution and final answer.
- More Practice: give THREE new questions on the same concept: Basic, Moderate, Hard. Do not give solutions.

3. IMAGE/PDF:
You are an AI Math Tutor. Use your reasoning and mathematical intelligence to understand the attached PDF/image and the student's request.

The attached file is the main mathematical context.

If the student gives NO instruction, solve all clearly readable mathematics questions in the attached file.

If the student gives an instruction, understand what they mean naturally and answer according to it. For example:
- "Help me solve this"
- "Solve question 6 and 7"

Find the relevant question(s) in the attached file and answer only those requested.

For every question you answer, use:

Question 1:
Solution:
Final Answer:

If a student's attempt is visible:
- Correct → Status: Correct, then a brief solution and final answer.
- Incorrect → Status: Incorrect, briefly state the mistake, then give the correct solution and final answer.

Keep answers concise. Do not give unnecessary explanations or long instructions. Use your own reasoning to understand the student's request rather than requiring specific commands.


FORMATTING:
Keep responses clean and concise.
Make the question and headings bold.
Only headings, Status, and Mistake may be bold.
Do not bold ordinary solution text.
Use ∫, d/dx, dy/dx, √, ×, ÷, π, ≥, ≤, ², ³ and readable fractions.
Do not use hashtags, LaTeX commands, dollar signs, or Markdown headings.

Student's request:
${req.body.question || "Solve the mathematics questions in the attached file."}
`;
    let contents = tutorInstructions;

    if (req.file) {
      console.log("Image received:", req.file.originalname);

      console.log("Image type:", req.file.mimetype);

      console.log("Image size:", req.file.size, "bytes");

      contents = [
        {
          text: tutorInstructions,
        },
        {
          inlineData: {
            mimeType: req.file.mimetype,
            data: req.file.buffer.toString("base64"),
          },
        },
      ];
    }

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3.6-flash",
      contents: contents,
      config: {
        thinkingConfig: {
          thinkingLevel: "low",
        },
      },
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(chunk.text);
      }
    }

    console.log("Gemini streaming completed");

    res.end();
  } catch (error) {
    console.error("REAL GEMINI ERROR:");

    console.error(error);

    res.status(500).json({
      error: error.message || "Gemini request failed",

      status: error.status || null,

      details: error.toString(),
    });
  }
});

app.listen(PORT, function () {
  console.log("Math Tutor backend running on port " + PORT);
});
