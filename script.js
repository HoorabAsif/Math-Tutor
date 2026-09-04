let aiRequestRunning = false;

function startAIRequest() {
  if (aiRequestRunning) {
    return false;
  }

  aiRequestRunning = true;

  conceptButton.disabled = true;
  hintButton.disabled = true;
  checkAnswerButton.disabled = true;
  fullSolutionButton.disabled = true;
  practiceButton.disabled = true;
  sendButton.disabled = true;

  return true;
}

function endAIRequest() {
  aiRequestRunning = false;

  conceptButton.disabled = false;
  hintButton.disabled = false;
  checkAnswerButton.disabled = false;
  fullSolutionButton.disabled = false;
  practiceButton.disabled = false;
  sendButton.disabled = false;
}

const questionInput = document.getElementById("questionInput");
const uploadButton = document.getElementById("uploadButton");
const uploadMenu = document.getElementById("uploadMenu");

const cameraButton = document.getElementById("cameraButton");
const photoButton = document.getElementById("photoButton");
const fileButton = document.getElementById("fileButton");
const fileInput = document.getElementById("fileInput");

const calculatorButton = document.getElementById("calculatorButton");
const calculator = document.getElementById("calculator");
const calculatorDisplay = document.getElementById("calculatorDisplay");

const symbolsButton = document.getElementById("symbolsButton");
const symbolsMenu = document.getElementById("symbolsMenu");

const microphoneButton = document.getElementById("microphoneButton");
const sendButton = document.getElementById("sendButton");
const conceptButton = document.getElementById("conceptButton");
const hintButton = document.getElementById("hintButton");
const checkAnswerButton = document.getElementById("checkAnswerButton");
const fullSolutionButton = document.getElementById("fullSolutionButton");
const practiceButton = document.getElementById("practiceButton");

const aiLoading = document.getElementById("aiLoading");
const aiLoadingText = document.getElementById("aiLoadingText");

function showAILoading(message) {
  aiLoadingText.textContent = message;

  aiLoading.style.display = "flex";
}

function hideAILoading() {
  aiLoading.style.display = "none";
}

/* =========================
   UPLOAD MENU
   ========================= */

uploadButton.addEventListener("click", function (event) {
  event.stopPropagation();

  if (uploadMenu.style.display === "block") {
    uploadMenu.style.display = "none";
  } else {
    uploadMenu.style.display = "block";
  }

  calculator.style.display = "none";
  symbolsMenu.style.display = "none";
});

/* =========================
   CALCULATOR MENU
   ========================= */

calculatorButton.addEventListener("click", function (event) {
  event.stopPropagation();

  if (calculator.style.display === "block") {
    calculator.style.display = "none";
  } else {
    calculator.style.display = "block";
  }

  uploadMenu.style.display = "none";
  symbolsMenu.style.display = "none";
});

/* =========================
   SYMBOLS MENU
   ========================= */

symbolsButton.addEventListener("click", function (event) {
  event.stopPropagation();

  if (symbolsMenu.style.display === "block") {
    symbolsMenu.style.display = "none";
  } else {
    symbolsMenu.style.display = "block";
  }

  uploadMenu.style.display = "none";
  calculator.style.display = "none";
});

/* =========================
   CLOSE MENUS
   ========================= */

document.addEventListener("click", function (event) {
  if (!uploadMenu.contains(event.target) && event.target !== uploadButton) {
    uploadMenu.style.display = "none";
  }

  if (!calculator.contains(event.target) && event.target !== calculatorButton) {
    calculator.style.display = "none";
  }

  if (!symbolsMenu.contains(event.target) && event.target !== symbolsButton) {
    symbolsMenu.style.display = "none";
  }
});

/* =========================
   UPLOAD BUTTONS
   ========================= */

cameraButton.addEventListener("click", function () {
  fileInput.accept = "image/*";
  fileInput.capture = "environment";
  fileInput.click();

  uploadMenu.style.display = "none";
});

photoButton.addEventListener("click", function () {
  fileInput.removeAttribute("capture");
  fileInput.accept = "image/*";
  fileInput.click();

  uploadMenu.style.display = "none";
});

fileButton.addEventListener("click", function () {
  fileInput.removeAttribute("capture");
  fileInput.accept = ".pdf,.doc,.docx,.txt,image/*";
  fileInput.click();

  uploadMenu.style.display = "none";
});

fileInput.addEventListener("change", function () {
  function showFileChip(file) {
    const fileChip = document.getElementById("fileChip");

    const fileChipName = document.getElementById("fileChipName");

    fileChipName.textContent = "📎 " + file.name;

    fileChip.style.display = "flex";
  }

  if (fileInput.files.length > 0) {
    const selectedFile = fileInput.files[0];

    window.selectedMathFile = selectedFile;

    showFileChip(selectedFile);
  }
});

const removeFileButton = document.getElementById("removeFileButton");

removeFileButton.addEventListener("click", function () {
  window.selectedMathFile = null;

  fileInput.value = "";

  document.getElementById("fileChip").style.display = "none";
});

function resetAttachedFile() {
  window.selectedMathFile = null;

  fileInput.value = "";

  document.getElementById("fileChip").style.display = "none";

  document.getElementById("fileChipName").textContent = "📎 Mathematics file";
}

/* =========================
   SYMBOL BUTTONS
   ========================= */

const symbolButtons = document.querySelectorAll(".symbol-button");

symbolButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const symbol = button.textContent.trim();

    const start = questionInput.selectionStart;

    const end = questionInput.selectionEnd;

    questionInput.value =
      questionInput.value.substring(0, start) +
      symbol +
      questionInput.value.substring(end);

    questionInput.focus();

    const newPosition = start + symbol.length;

    questionInput.selectionStart = newPosition;

    questionInput.selectionEnd = newPosition;
  });
});

/* ==================================================
   SCIENTIFIC CALCULATOR
   ================================================== */

let calculatorValue = "";

const calculatorButtons = document.querySelectorAll(".calc-button");

calculatorButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const value = button.dataset.value;

    /* CLEAR */

    if (value === "AC") {
      calculatorValue = "";

      calculatorDisplay.textContent = "0";

      return;
    }

    /* DELETE */

    if (value === "DEL") {
      calculatorValue = calculatorValue.slice(0, -1);

      showCalculator();

      return;
    }

    /* EQUALS */

    if (value === "=") {
      calculateCalculator();

      return;
    }

    /* PI */

    if (value === "pi") {
      calculatorValue += "π";
    } else if (value === "sqrt") {

    /* SQUARE ROOT */
      calculatorValue += "√(";
    } else if (value === "square") {

    /* SQUARE */
      calculatorValue += "²";
    } else if (value === "power") {

    /* POWER */
      calculatorValue += "^";
    } else if (value === "sin") {

    /* SINE */
      calculatorValue += "sin(";
    } else if (value === "cos") {

    /* COSINE */
      calculatorValue += "cos(";
    } else if (value === "tan") {

    /* TANGENT */
      calculatorValue += "tan(";
    } else if (value === "log") {

    /* LOG */
      calculatorValue += "log(";
    } else if (value === "ln") {

    /* NATURAL LOG */
      calculatorValue += "ln(";
    } else if (value === "exp") {

    /* E POWER X */
      calculatorValue += "e^(";
    } else if (value === "abs") {

    /* ABSOLUTE VALUE */
      calculatorValue += "abs(";
    } else if (value === "%") {

    /* PERCENT */
      calculatorValue += "%";
    } else {

    /* EVERYTHING ELSE */
      calculatorValue += value;
    }

    showCalculator();
  });
});

/* =========================
   SHOW CALCULATOR DISPLAY
   ========================= */

function showCalculator() {
  calculatorDisplay.textContent = calculatorValue || "0";
}

/* ==================================================
   CALCULATE SCIENTIFIC EXPRESSION
   ================================================== */

function calculateCalculator() {
  try {
    let expression = calculatorValue;

    if (expression.trim() === "") {
      return;
    }

    /* PI */

    expression = expression.replaceAll("π", "Math.PI");

    /* Square root */

    expression = expression.replaceAll("√(", "Math.sqrt(");

    /* Sine */

    expression = expression.replaceAll("sin(", "Math.sin(");

    /* Cosine */

    expression = expression.replaceAll("cos(", "Math.cos(");

    /* Tangent */

    expression = expression.replaceAll("tan(", "Math.tan(");

    /* Log base 10 */

    expression = expression.replaceAll("log(", "Math.log10(");

    /* Natural log */

    expression = expression.replaceAll("ln(", "Math.log(");

    /* e power */

    expression = expression.replaceAll("e^(", "Math.exp(");

    /* Absolute value */

    expression = expression.replaceAll("abs(", "Math.abs(");

    /* Percentage */

    expression = expression.replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");

    /* Power */

    expression = expression.replaceAll("^", "**");

    /* Square */

    expression = expression.replaceAll("²", "**2");

    /* Automatically close brackets */

    let openBrackets = (expression.match(/\(/g) || []).length;

    let closeBrackets = (expression.match(/\)/g) || []).length;

    while (closeBrackets < openBrackets) {
      expression += ")";

      closeBrackets++;
    }

    /* Calculate */

    const result = Function('"use strict"; return (' + expression + ")")();

    if (typeof result !== "number" || !Number.isFinite(result)) {
      throw new Error("Invalid calculation");
    }

    const finalAnswer = Number(result.toPrecision(12));

    calculatorValue = String(finalAnswer);

    calculatorDisplay.textContent = finalAnswer;
  } catch (error) {
    calculatorDisplay.textContent = "Error";

    calculatorValue = "";
  }
}

/* =========================
   MICROPHONE
   ========================= */

microphoneButton.addEventListener("click", function () {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice input is not supported in this browser.");

    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";

  recognition.continuous = false;

  recognition.interimResults = false;

  recognition.start();

  recognition.onresult = function (event) {
    const spokenText = event.results[0][0].transcript;

    questionInput.value += spokenText;

    questionInput.focus();
  };

  recognition.onerror = function () {
    alert("Microphone input could not be completed.");
  };
});

/* =========================
   SEND BUTTON
   ========================= */

sendButton.addEventListener("click", async function () {
  if (!startAIRequest()) return;

  const question = questionInput.value.trim();

  if (question === "" && !window.selectedMathFile) {
    alert("Please type a mathematics question first.");

    endAIRequest();

    return;
  }

  const tutorResponse = document.getElementById("tutorResponse");

  const tutorResponseText = document.getElementById("tutor-response-text");

  tutorResponse.style.display = "block";

  /*
   * =========================================
   * RESET FOR A NEW QUESTION
   * =========================================
   *
   * Clear the previous tutor response and
   * previous attachment before showing the
   * new question.
   */

  resetTutorResponse();

  /*
   * =========================================
   * IMAGE / PDF MODE
   * =========================================
   *
   * If a file is attached, keep using Gemini.
   */

  if (window.selectedMathFile) {
    showAILoading("Tutor is preparing your structured answer");

    try {
      const formData = new FormData();

      formData.append("question", question);

      formData.append("image", window.selectedMathFile);

      const response = await fetch("https://math-tutor-production-3a05.up.railway.app/ask", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("AI request failed: " + response.status);
      }

      if (!response.body) {
        throw new Error("Streaming is not supported by this browser.");
      }

      const reader = response.body.getReader();

      const decoder = new TextDecoder();

      let fullAnswer = "";

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        const chunk = decoder.decode(value, { stream: true });

        fullAnswer += chunk;

        tutorResponseText.innerHTML = formatMathAnswer(fullAnswer);
      }

      const remainingText = decoder.decode();

      if (remainingText) {
        fullAnswer += remainingText;

        tutorResponseText.innerHTML = formatMathAnswer(fullAnswer);
      }
    } catch (error) {
      console.error("File AI request error:", error);

      tutorResponseText.textContent =
        "Sorry, the AI Tutor could not analyze the file right now.";
    } finally {
      hideAILoading();

      endAIRequest();
    }

    return;
  }

  /*
   * =========================================
   * TEXT MODE
   * =========================================
   *
   * No direct AI request here.
   *
   * The tutor acknowledges the question and
   * tells the student to choose a learning
   * option.
   */

  tutorResponseText.innerHTML =
    "Got it! You're asking about:<br><br>" +
    "<strong>" +
    question.replace(/</g, "&lt;").replace(/>/g, "&gt;") +
    "</strong>" +
    "<br><br>" +
    "Choose one of the options below to get the type of help you need.";

  endAIRequest();
});

/* ==================================================
   FORMAT MATH ANSWER
   ================================================== */

function formatMathAnswer(answer) {
  if (!answer) {
    return "";
  }

  let text = answer;

  /* Remove dollar signs */

  text = text.replace(/\$\$/g, "");
  text = text.replace(/\$/g, "");

  /* Convert fractions */

  text = text.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, "($1)/($2)");

  /* Convert square roots */

  text = text.replace(/\\sqrt\{([^{}]+)\}/g, "√($1)");

  /* Common mathematical symbols */

  text = text.replace(/\\times/g, "×");
  text = text.replace(/\\div/g, "÷");
  text = text.replace(/\\cdot/g, "·");
  text = text.replace(/\\pi/g, "π");
  text = text.replace(/\\rightarrow/g, "→");

  /* Derivative notation */

  text = text.replace(/\(d\)\s*\/\s*\(dx\)/g, "d/dx");

  text = text.replace(/\bd\s*\/\s*dx\b/g, "d/dx");

  /* Powers */

  text = text.replace(/\^2/g, "²");
  text = text.replace(/\^3/g, "³");

  /* Convert bold LaTeX */

  text = text.replace(/\\mathbf\{([^{}]+)\}/g, "<strong>$1</strong>");

  text = text.replace(/mathbf\{([^{}]+)\}/g, "<strong>$1</strong>");

  /* Remove horizontal Markdown lines */

  text = text.replace(/^---+$/gm, "");

  /* Convert bullet points */

  text = text.replace(/^\*\s+/gm, "• ");

  /* Remove remaining LaTeX backslashes */

  text = text.replace(/\\/g, "");

  /* Headings */

  text = text.replace(/^###\s*(.+)$/gm, "<h4>$1</h4>");

  text = text.replace(/^##\s*(.+)$/gm, "<h4>$1</h4>");

  /* Bold text */

  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  /* Numbered steps */

  text = text.replace(/^(\d+)\.\s+/gm, "<br><strong>Step $1:</strong> ");

  /* Line breaks */

  text = text.replace(/\n/g, "<br>");

  return text;
}

/* ==================================================
   TUTOR BRAIN
   ================================================== */

function analyzeQuestion(question) {
  const cleanQuestion = question.trim();

  const algebraResult = solveLinearEquation(cleanQuestion);

  if (algebraResult !== null) {
    return "algebra";
  }

  const mathResult = solveBasicMath(cleanQuestion);

  if (mathResult !== null) {
    return "basic-math";
  }

  return "ai";
}

/* ==================================================
   BASIC MATH SOLVER
   ================================================== */

function solveBasicMath(question) {
  try {
    let expression = question.trim();

    expression = expression
      .replaceAll("×", "*")
      .replaceAll("÷", "/")
      .replaceAll("−", "-")
      .replaceAll("–", "-")
      .replaceAll("^", "**");

    expression = expression.replace(/\s+/g, "");

    if (!/^[0-9+\-*/().]+$/.test(expression)) {
      return null;
    }

    if (!/[+\-*/]/.test(expression)) {
      return null;
    }

    const result = Function('"use strict"; return (' + expression + ")")();

    if (typeof result !== "number" || !Number.isFinite(result)) {
      return null;
    }

    const cleanResult = Number(result.toPrecision(12));

    const divisionMatch = expression.match(
      /^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/,
    );

    if (divisionMatch) {
      const numerator = Number(divisionMatch[1]);

      const denominator = Number(divisionMatch[2]);

      if (denominator === 0) {
        return null;
      }

      const fraction = simplifyFraction(numerator, denominator);

      return {
        decimal: cleanResult,
        fraction: fraction,
      };
    }

    return {
      decimal: cleanResult,
      fraction: null,
    };
  } catch (error) {
    return null;
  } finally {
    hideAILoading();
  }
}

/* ==================================================
   SIMPLIFY FRACTION
   ================================================== */

function simplifyFraction(numerator, denominator) {
  const numeratorString = String(numerator);

  const denominatorString = String(denominator);

  const numeratorDecimals = numeratorString.includes(".")
    ? numeratorString.split(".")[1].length
    : 0;

  const denominatorDecimals = denominatorString.includes(".")
    ? denominatorString.split(".")[1].length
    : 0;

  const decimalPlaces = Math.max(numeratorDecimals, denominatorDecimals);

  const multiplier = Math.pow(10, decimalPlaces);

  let top = Math.round(numerator * multiplier);

  let bottom = Math.round(denominator * multiplier);

  if (bottom < 0) {
    top *= -1;
    bottom *= -1;
  }

  const divisor = greatestCommonDivisor(Math.abs(top), Math.abs(bottom));

  top = top / divisor;

  bottom = bottom / divisor;

  if (bottom === 1) {
    return String(top);
  }

  return top + "/" + bottom;
}

/* ==================================================
   GREATEST COMMON DIVISOR
   ================================================== */

function greatestCommonDivisor(a, b) {
  while (b !== 0) {
    const remainder = a % b;

    a = b;
    b = remainder;
  }

  return a;
}

/* ==================================================
   CREATE TUTOR RESPONSE
   ================================================== */

function createMathResponse(question, result) {
  let displayQuestion = question
    .replaceAll("*", " × ")
    .replaceAll("/", " ÷ ")
    .replaceAll("+", " + ")
    .replaceAll("-", " - ");

  displayQuestion = displayQuestion.replace(/\s+/g, " ").trim();

  if (result.fraction !== null && result.fraction !== String(result.decimal)) {
    return (
      "Let's solve it step by step. " +
      displayQuestion +
      " = " +
      result.fraction +
      " = " +
      result.decimal +
      "."
    );
  }

  return (
    "Let's solve it step by step. " +
    displayQuestion +
    " = " +
    result.decimal +
    "."
  );
}

/* ==================================================
   LINEAR ALGEBRA EQUATION SOLVER
   ================================================== */

function solveLinearEquation(question) {
  try {
    const equation = question.replace(/\s+/g, "").replaceAll("−", "-");

    const equalSigns = (equation.match(/=/g) || []).length;

    if (equalSigns !== 1) {
      return null;
    }

    const sides = equation.split("=");

    const leftSide = sides[0];

    const rightSide = sides[1];

    if (leftSide === "" || rightSide === "") {
      return null;
    }

    const left = parseLinearSide(leftSide);

    const right = parseLinearSide(rightSide);

    if (left === null || right === null) {
      return null;
    }

    const xCoefficient = left.x - right.x;

    const constant = right.constant - left.constant;

    if (xCoefficient === 0) {
      return null;
    }

    const x = constant / xCoefficient;

    if (!Number.isFinite(x)) {
      return null;
    }

    return {
      x: Number(x.toPrecision(12)),
      left: left,
      right: right,
      xCoefficient: xCoefficient,
      constant: constant,
    };
  } catch (error) {
    return null;
  }
}

/* ==================================================
   PARSE ONE SIDE OF A LINEAR EQUATION
   ================================================== */

function parseLinearSide(side) {
  if (!side.startsWith("+") && !side.startsWith("-")) {
    side = "+" + side;
  }

  const terms = side.match(/[+-][^+-]+/g);

  if (!terms) {
    return null;
  }

  let xCoefficient = 0;

  let constant = 0;

  for (const term of terms) {
    if (term.includes("x") || term.includes("X")) {
      const variableTerm = term.replace("X", "x");

      if (!/^[+-](?:\d+(?:\.\d+)?)?x$/.test(variableTerm)) {
        return null;
      }

      let coefficient = variableTerm.replace("x", "");

      if (coefficient === "+" || coefficient === "") {
        coefficient = 1;
      } else if (coefficient === "-") {
        coefficient = -1;
      } else {
        coefficient = Number(coefficient);
      }

      xCoefficient += coefficient;
    } else {
      if (!/^[+-]\d+(?:\.\d+)?$/.test(term)) {
        return null;
      }

      constant += Number(term);
    }
  }

  return {
    x: xCoefficient,
    constant: constant,
  };
}

/* ==================================================
   CREATE ALGEBRA RESPONSE
   ================================================== */

function createAlgebraResponse(question, result) {
  const equation = question.replace(/\s+/g, " ").trim();

  const formattedEquation = equation.replace(/\s*=\s*/g, " = ");

  const left = result.left;

  const right = result.right;

  const xStep = formatAlgebraExpression(result.xCoefficient, 0);

  const constantStep = formatAlgebraExpression(0, result.constant);

  const finalX = formatNumber(result.x);

  return (
    "Let's solve it step by step.\n\n" +
    formattedEquation +
    "\n\n" +
    "Move the x terms to the left and the constants to the right.\n\n" +
    xStep +
    " = " +
    formatNumber(result.constant) +
    "\n\n" +
    "Divide both sides by " +
    formatNumber(result.xCoefficient) +
    ".\n\n" +
    "x = " +
    formatNumber(result.constant) +
    " / " +
    formatNumber(result.xCoefficient) +
    "\n\n" +
    "x = " +
    finalX +
    "."
  );
}

/* ==================================================
   FORMAT ALGEBRA EXPRESSION
   ================================================== */

function formatAlgebraExpression(xCoefficient, constant) {
  let result = "";

  if (xCoefficient !== 0) {
    if (xCoefficient === 1) {
      result += "x";
    } else if (xCoefficient === -1) {
      result += "-x";
    } else {
      result += formatNumber(xCoefficient) + "x";
    }
  }

  if (constant !== 0) {
    if (result !== "") {
      if (constant > 0) {
        result += " + " + formatNumber(constant);
      } else {
        result += " - " + formatNumber(Math.abs(constant));
      }
    } else {
      result = formatNumber(constant);
    }
  }

  return result || "0";
}

/* ==================================================
   FORMAT NUMBER
   ================================================== */

function formatNumber(number) {
  return String(Number(Number(number).toPrecision(12)));
}

/* ==================================================
   READ AI STREAM
   ================================================== */

async function readAIStream(response, tutorResponseText) {
  const reader = response.body.getReader();

  const decoder = new TextDecoder();

  let fullAnswer = "";

  while (true) {
    const { value, done } = await reader.read();

    if (done) {
      break;
    }

    const chunk = decoder.decode(value, { stream: true });

    fullAnswer += chunk;

    tutorResponseText.innerHTML = formatMathAnswer(fullAnswer);
  }

  const remainingText = decoder.decode();

  if (remainingText) {
    fullAnswer += remainingText;

    tutorResponseText.innerHTML = formatMathAnswer(fullAnswer);
  }

  return fullAnswer;
}

/* ==================================================
   RESET TUTOR RESPONSE
   ================================================== */

function resetTutorResponse() {
  const tutorResponseText = document.getElementById("tutor-response-text");

  if (tutorResponseText) {
    tutorResponseText.innerHTML = "";
  }
}

/* =========================
   UNDERSTAND THE CONCEPT
   ========================= */

conceptButton.addEventListener("click", async function () {
  const question = questionInput.value.trim();

  if (question === "") {
    alert("Please enter a mathematics question first.");

    return;
  }

  if (!startAIRequest()) return;

  const tutorResponse = document.getElementById("tutorResponse");

  const tutorResponseText = document.getElementById("tutor-response-text");

  tutorResponse.style.display = "block";
  tutorResponseText.textContent = "";

  try {
    showAILoading("Tutor is analyzing your question");

    console.log("SENDING CONCEPT REQUEST");

    const response = await fetch("https://math-tutor-production-3a05.up.railway.app/ask", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        question:
          "Give only a SHORT explanation of the main mathematical concept needed for this question. Include only: Concept, Rule, Steps to follow, and Key idea. Do not solve the question. Do not give a long lesson. Keep it concise and student-friendly.\n\nQuestion:\n" +
          question,
      }),
    });

    console.log("BACKEND RESPONSE RECEIVED");

    if (!response.ok) {
      throw new Error("AI request failed: " + response.status);
    }

    await readAIStream(response, tutorResponseText);
  } catch (error) {
    console.error("Concept request error:", error);

    tutorResponseText.textContent =
      "Sorry, I couldn't explain the concept right now.";
  } finally {
    hideAILoading();

    endAIRequest();
  }
});

/* =========================
   GIVE ME A HINT
   ========================= */

hintButton.addEventListener("click", async function () {
  const question = questionInput.value.trim();

  if (question === "") {
    alert("Please enter a mathematics question first.");

    return;
  }

  if (!startAIRequest()) return;

  const tutorResponse = document.getElementById("tutorResponse");

  const tutorResponseText = document.getElementById("tutor-response-text");

  tutorResponse.style.display = "block";
  tutorResponseText.textContent = "";

  try {
    showAILoading("Tutor is preparing a helpful hint");

    const response = await fetch("https://math-tutor-production-3a05.up.railway.app/ask", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        question:
          "Give ONE very short hint that helps the student take the next step toward solving this question. Do not give the final answer. Do not give the full solution. Keep it to one or two sentences.\n\nQuestion:\n" +
          question,
      }),
    });

    if (!response.ok) {
      throw new Error("AI request failed: " + response.status);
    }

    await readAIStream(response, tutorResponseText);
  } catch (error) {
    console.error("Hint request error:", error);

    tutorResponseText.textContent =
      "Sorry, I couldn't generate a hint right now.";
  } finally {
    hideAILoading();

    endAIRequest();
  }
});

/* =========================
   CHECK MY ANSWER
   ========================= */

checkAnswerButton.addEventListener("click", async function () {
  const question = questionInput.value.trim();

  if (question === "") {
    alert("Please enter the question and your answer.");

    return;
  }

  if (!startAIRequest()) return;

  const tutorResponse = document.getElementById("tutorResponse");

  const tutorResponseText = document.getElementById("tutor-response-text");

  tutorResponse.style.display = "block";
  tutorResponseText.textContent = "";

  try {
    showAILoading("Tutor is checking your answer");

    const response = await fetch("https://math-tutor-production-3a05.up.railway.app/ask", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        question:
          "Check the student's answer or work for this mathematics question.\n\n" +
          "IMPORTANT:\n" +
          'If the student has NOT provided an answer or attempted work, simply say: "No answer or attempt is provided to check. Please write your solution or answer first."\n\n' +
          "If an answer or attempt IS provided:\n" +
          "- If correct, say it is correct and briefly explain why.\n" +
          "- If incorrect, identify the specific mistake briefly and tell the student what to reconsider.\n" +
          "- Do not give the complete solution unless it is necessary.\n" +
          "- Keep the response concise.\n\n" +
          "Student's question and work:\n" +
          question,
      }),
    });

    if (!response.ok) {
      throw new Error("AI request failed: " + response.status);
    }

    await readAIStream(response, tutorResponseText);
  } catch (error) {
    console.error("Check answer error:", error);

    tutorResponseText.textContent =
      "Sorry, I couldn't check the answer right now.";
  } finally {
    hideAILoading();

    endAIRequest();
  }
});

/* =========================
   SHOW FULL SOLUTION
   ========================= */

fullSolutionButton.addEventListener("click", async function () {
  const question = questionInput.value.trim();

  if (question === "") {
    alert("Please enter a mathematics question first.");

    return;
  }

  if (!startAIRequest()) return;

  const tutorResponse = document.getElementById("tutorResponse");

  const tutorResponseText = document.getElementById("tutor-response-text");

  tutorResponse.style.display = "block";
  tutorResponseText.textContent = "";
  try {
    showAILoading("Tutor is preparing the full solution");

    const response = await fetch("https://math-tutor-production-3a05.up.railway.app/ask", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        question:
          "Give the complete solution to this mathematics question. Show the necessary steps clearly and concisely. State the final answer clearly. Do not add unrelated explanations.\n\nQuestion:\n" +
          question,
      }),
    });

    if (!response.ok) {
      throw new Error("AI request failed: " + response.status);
    }

    await readAIStream(response, tutorResponseText);
  } catch (error) {
    console.error("Full solution error:", error);

    tutorResponseText.textContent =
      "Sorry, I couldn't generate the solution right now.";
  } finally {
    hideAILoading();

    endAIRequest();
  }
});

/* =========================
   MORE PRACTICE
   ========================= */

practiceButton.addEventListener("click", async function () {
  const question = questionInput.value.trim();

  if (question === "") {
    alert("Please enter a mathematics question first.");

    return;
  }

  if (!startAIRequest()) return;

  const tutorResponse = document.getElementById("tutorResponse");

  const tutorResponseText = document.getElementById("tutor-response-text");

  tutorResponse.style.display = "block";
  tutorResponseText.textContent = "";
  try {
    showAILoading("Tutor is creating practice questions");

    const response = await fetch("https://math-tutor-production-3a05.up.railway.app/ask", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        question:
          "Create THREE short new practice questions based on the same mathematical concept as this question. Do not solve them. Do not repeat the original question. Keep them concise and organize them as Basic, Moderate, and Hard.\n\nOriginal question:\n" +
          question,
      }),
    });

    if (!response.ok) {
      throw new Error("AI request failed: " + response.status);
    }

    await readAIStream(response, tutorResponseText);
  } catch (error) {
    console.error("Practice request error:", error);

    tutorResponseText.textContent =
      "Sorry, I couldn't create practice questions right now.";
  } finally {
    hideAILoading();

    endAIRequest();
  }
});
