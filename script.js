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


/* =========================
   UPLOAD MENU
   ========================= */

uploadButton.addEventListener("click", function(event) {

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

calculatorButton.addEventListener("click", function(event) {

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

symbolsButton.addEventListener("click", function(event) {

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

document.addEventListener("click", function(event) {

    if (
        !uploadMenu.contains(event.target) &&
        event.target !== uploadButton
    ) {
        uploadMenu.style.display = "none";
    }

    if (
        !calculator.contains(event.target) &&
        event.target !== calculatorButton
    ) {
        calculator.style.display = "none";
    }

    if (
        !symbolsMenu.contains(event.target) &&
        event.target !== symbolsButton
    ) {
        symbolsMenu.style.display = "none";
    }
});


/* =========================
   UPLOAD BUTTONS
   ========================= */

cameraButton.addEventListener("click", function() {

    fileInput.accept = "image/*";
    fileInput.capture = "environment";
    fileInput.click();

    uploadMenu.style.display = "none";
});


photoButton.addEventListener("click", function() {

    fileInput.removeAttribute("capture");
    fileInput.accept = "image/*";
    fileInput.click();

    uploadMenu.style.display = "none";
});


fileButton.addEventListener("click", function() {

    fileInput.removeAttribute("capture");
    fileInput.accept = ".pdf,.doc,.docx,.txt,image/*";
    fileInput.click();

    uploadMenu.style.display = "none";
});


fileInput.addEventListener("change", function() {

    if (fileInput.files.length > 0) {

        questionInput.value +=
            "\n📎 " + fileInput.files[0].name;
    }
});


/* =========================
   SYMBOL BUTTONS
   ========================= */

const symbolButtons =
    document.querySelectorAll(".symbol-button");


symbolButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const symbol =
            button.textContent.trim();

        const start =
            questionInput.selectionStart;

        const end =
            questionInput.selectionEnd;

        questionInput.value =
            questionInput.value.substring(0, start) +
            symbol +
            questionInput.value.substring(end);

        questionInput.focus();

        const newPosition =
            start + symbol.length;

        questionInput.selectionStart =
            newPosition;

        questionInput.selectionEnd =
            newPosition;
    });
});


/* ==================================================
   SCIENTIFIC CALCULATOR
   ================================================== */

let calculatorValue = "";


const calculatorButtons =
    document.querySelectorAll(".calc-button");


calculatorButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const value =
            button.dataset.value;


        /* CLEAR */

        if (value === "AC") {

            calculatorValue = "";

            calculatorDisplay.textContent = "0";

            return;
        }


        /* DELETE */

        if (value === "DEL") {

            calculatorValue =
                calculatorValue.slice(0, -1);

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

        }


        /* SQUARE ROOT */

        else if (value === "sqrt") {

            calculatorValue += "√(";

        }


        /* SQUARE */

        else if (value === "square") {

            calculatorValue += "²";

        }


        /* POWER */

        else if (value === "power") {

            calculatorValue += "^";

        }


        /* SINE */

        else if (value === "sin") {

            calculatorValue += "sin(";

        }


        /* COSINE */

        else if (value === "cos") {

            calculatorValue += "cos(";

        }


        /* TANGENT */

        else if (value === "tan") {

            calculatorValue += "tan(";

        }


        /* LOG */

        else if (value === "log") {

            calculatorValue += "log(";

        }


        /* NATURAL LOG */

        else if (value === "ln") {

            calculatorValue += "ln(";

        }


        /* E POWER X */

        else if (value === "exp") {

            calculatorValue += "e^(";

        }


        /* ABSOLUTE VALUE */

        else if (value === "abs") {

            calculatorValue += "abs(";

        }


        /* PERCENT */

        else if (value === "%") {

            calculatorValue += "%";

        }


        /* EVERYTHING ELSE */

        else {

            calculatorValue += value;
        }


        showCalculator();
    });
});


/* =========================
   SHOW CALCULATOR DISPLAY
   ========================= */

function showCalculator() {

    calculatorDisplay.textContent =
        calculatorValue || "0";
}


/* ==================================================
   CALCULATE SCIENTIFIC EXPRESSION
   ================================================== */

function calculateCalculator() {

    try {

        let expression =
            calculatorValue;


        if (expression.trim() === "") {
            return;
        }


        /*
         * Convert calculator symbols
         * into JavaScript mathematics.
         */


        /* PI */

        expression =
            expression.replaceAll(
                "π",
                "Math.PI"
            );


        /* Square root */

        expression =
            expression.replaceAll(
                "√(",
                "Math.sqrt("
            );


        /* Sine */

        expression =
            expression.replaceAll(
                "sin(",
                "Math.sin("
            );


        /* Cosine */

        expression =
            expression.replaceAll(
                "cos(",
                "Math.cos("
            );


        /* Tangent */

        expression =
            expression.replaceAll(
                "tan(",
                "Math.tan("
            );


        /* Log base 10 */

        expression =
            expression.replaceAll(
                "log(",
                "Math.log10("
            );


        /* Natural log */

        expression =
            expression.replaceAll(
                "ln(",
                "Math.log("
            );


        /* e power */

        expression =
            expression.replaceAll(
                "e^(",
                "Math.exp("
            );


        /* Absolute value */

        expression =
            expression.replaceAll(
                "abs(",
                "Math.abs("
            );


        /* Percentage */

        expression =
            expression.replace(
                /(\d+(?:\.\d+)?)%/g,
                "($1/100)"
            );


        /* Power */

        expression =
            expression.replaceAll(
                "^",
                "**"
            );


        /* Square */

        expression =
            expression.replaceAll(
                "²",
                "**2"
            );


        /*
         * Automatically close brackets.
         */

        let openBrackets =
            (expression.match(/\(/g) || []).length;

        let closeBrackets =
            (expression.match(/\)/g) || []).length;


        while (closeBrackets < openBrackets) {

            expression += ")";

            closeBrackets++;
        }


        /*
         * Calculate.
         */

        const result =
            Function(
                '"use strict"; return (' +
                expression +
                ')'
            )();


        if (
            typeof result !== "number" ||
            !Number.isFinite(result)
        ) {

            throw new Error("Invalid calculation");
        }


        /*
         * Keep the answer neat.
         */

        const finalAnswer =
            Number(
                result.toPrecision(12)
            );


        calculatorValue =
            String(finalAnswer);

        calculatorDisplay.textContent =
            finalAnswer;

    }

    catch(error) {

        calculatorDisplay.textContent =
            "Error";

        calculatorValue = "";
    }
}


/* =========================
   MICROPHONE
   ========================= */

microphoneButton.addEventListener(
    "click",
    function() {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;


        if (!SpeechRecognition) {

            alert(
                "Voice input is not supported in this browser."
            );

            return;
        }


        const recognition =
            new SpeechRecognition();


        recognition.lang =
            "en-US";

        recognition.continuous =
            false;

        recognition.interimResults =
            false;


        recognition.start();


        recognition.onresult =
            function(event) {

                const spokenText =
                    event.results[0][0].transcript;

                questionInput.value +=
                    spokenText;

                questionInput.focus();
            };


        recognition.onerror =
            function() {

                alert(
                    "Microphone input could not be completed."
                );
            };
    }
);

/* =========================
   SEND BUTTON
   ========================= */

sendButton.addEventListener(
    "click",
    function() {

        const question =
            questionInput.value.trim();


        if (question === "") {

            alert(
                "Please type a mathematics question first."
            );

            return;
        }


        const tutorResponse =
            document.getElementById("tutorResponse");

        const tutorResponseText =
            document.getElementById("tutor-response-text");


        tutorResponse.style.display =
            "block";


        /*
         * Split the student's input into
         * separate lines.
         */

        const questions =
            question
                .split("\n")
                .map(function(line) {
                    return line.trim();
                })
                .filter(function(line) {
                    return line !== "";
                });


        const responses = [];


        /*
         * Solve every line separately.
         */

        questions.forEach(function(singleQuestion, index) {

    /*
     * First, check whether the question
     * is an algebra equation.
     */

    const algebraResult =
        solveLinearEquation(singleQuestion);


    if (algebraResult !== null) {

        responses.push(
            (index + 1) +
            ". " +
            createAlgebraResponse(
                singleQuestion,
                algebraResult
            )
        );

        return;
    }


    /*
     * If it isn't algebra, try basic math.
     */

    const result =
        solveBasicMath(singleQuestion);


    if (result !== null) {

        responses.push(
            (index + 1) +
            ". " +
            createMathResponse(
                singleQuestion,
                result
            )
        );

    }

    else {

        responses.push(
            (index + 1) +
            ". " +
            "I received your question: " +
            singleQuestion +
            ". I can't solve this type of mathematics yet."
        );
    }
});

        /*
         * Show all answers.
         */

        tutorResponseText.textContent =
            responses.join("\n\n");
    }
);


/* ==================================================
   BASIC MATH SOLVER
   ================================================== */

function solveBasicMath(question) {

    try {

        let expression =
            question.trim();


        /*
         * Convert common mathematical symbols.
         */

        expression =
            expression
                .replaceAll("×", "*")
                .replaceAll("÷", "/")
                .replaceAll("−", "-")
                .replaceAll("–", "-")
                .replaceAll("^", "**");


        /*
         * Remove spaces.
         */

        expression =
            expression.replace(/\s+/g, "");


        /*
         * Only allow basic mathematical characters.
         */

        if (
            !/^[0-9+\-*/().]+$/.test(expression)
        ) {

            return null;
        }


        /*
         * Make sure an operation exists.
         */

        if (
            !/[+\-*/]/.test(expression)
        ) {

            return null;
        }


        /*
         * Calculate the expression.
         */

        const result =
            Function(
                '"use strict"; return (' +
                expression +
                ')'
            )();


        /*
         * Reject invalid results.
         */

        if (
            typeof result !== "number" ||
            !Number.isFinite(result)
        ) {

            return null;
        }


        /*
         * Round very small floating-point
         * errors.
         */

        const cleanResult =
            Number(
                result.toPrecision(12)
            );


        /*
         * Check whether the original
         * question was a division.
         */

        const divisionMatch =
            expression.match(
                /^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/
            );


        if (divisionMatch) {

            const numerator =
                Number(divisionMatch[1]);

            const denominator =
                Number(divisionMatch[2]);


            if (denominator === 0) {

                return null;
            }


            const fraction =
                simplifyFraction(
                    numerator,
                    denominator
                );


            return {
                decimal: cleanResult,
                fraction: fraction
            };
        }


        /*
         * Normal arithmetic result.
         */

        return {
            decimal: cleanResult,
            fraction: null
        };

    }

    catch(error) {

        return null;
    }
}


/* ==================================================
   SIMPLIFY FRACTION
   ================================================== */

function simplifyFraction(numerator, denominator) {

    /*
     * Handle decimal numbers by converting
     * them into fractions first.
     */

    const numeratorString =
        String(numerator);

    const denominatorString =
        String(denominator);


    const numeratorDecimals =
        numeratorString.includes(".")
            ? numeratorString.split(".")[1].length
            : 0;

    const denominatorDecimals =
        denominatorString.includes(".")
            ? denominatorString.split(".")[1].length
            : 0;


    const decimalPlaces =
        Math.max(
            numeratorDecimals,
            denominatorDecimals
        );


    const multiplier =
        Math.pow(10, decimalPlaces);


    let top =
        Math.round(numerator * multiplier);

    let bottom =
        Math.round(denominator * multiplier);


    /*
     * Keep the negative sign on the numerator.
     */

    if (bottom < 0) {

        top *= -1;
        bottom *= -1;
    }


    /*
     * Find the greatest common divisor.
     */

    const divisor =
        greatestCommonDivisor(
            Math.abs(top),
            Math.abs(bottom)
        );


    top =
        top / divisor;

    bottom =
        bottom / divisor;


    /*
     * If denominator is 1,
     * just return the whole number.
     */

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

        const remainder =
            a % b;

        a = b;
        b = remainder;
    }


    return a;
}


/* ==================================================
   CREATE TUTOR RESPONSE
   ================================================== */

function createMathResponse(question, result) {

    let displayQuestion =
        question
            .replaceAll("*", " × ")
            .replaceAll("/", " ÷ ")
            .replaceAll("+", " + ")
            .replaceAll("-", " - ");


    displayQuestion =
        displayQuestion
            .replace(/\s+/g, " ")
            .trim();


    /*
     * Division with a useful fraction.
     */

    if (
        result.fraction !== null &&
        result.fraction !== String(result.decimal)
    ) {

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


    /*
     * Normal arithmetic.
     */

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

        /*
         * Remove spaces.
         */

        const equation =
            question
                .replace(/\s+/g, "")
                .replaceAll("−", "-");


        /*
         * An equation must contain
         * exactly one "=".
         */

        const equalSigns =
            (equation.match(/=/g) || []).length;


        if (equalSigns !== 1) {

            return null;
        }


        const sides =
            equation.split("=");


        const leftSide =
            sides[0];

        const rightSide =
            sides[1];


        /*
         * Both sides must contain something.
         */

        if (
            leftSide === "" ||
            rightSide === ""
        ) {

            return null;
        }


        /*
         * Parse both sides into:
         *
         * coefficient of x
         * constant
         */

        const left =
            parseLinearSide(leftSide);

        const right =
            parseLinearSide(rightSide);


        if (
            left === null ||
            right === null
        ) {

            return null;
        }


        /*
         * Move x terms to the left.
         *
         * Move constants to the right.
         */

        const xCoefficient =
            left.x - right.x;

        const constant =
            right.constant - left.constant;


        /*
         * If x coefficient is zero,
         * we cannot find a normal x value.
         */

        if (xCoefficient === 0) {

            return null;
        }


        /*
         * Calculate x.
         */

        const x =
            constant / xCoefficient;


        if (!Number.isFinite(x)) {

            return null;
        }


        return {
            x: Number(x.toPrecision(12)),
            left: left,
            right: right,
            xCoefficient: xCoefficient,
            constant: constant
        };

    }

    catch(error) {

        return null;
    }
}


/* ==================================================
   PARSE ONE SIDE OF A LINEAR EQUATION
   ================================================== */

function parseLinearSide(side) {

    /*
     * Add a "+" before a leading positive term
     * so that every term has a sign.
     */

    if (
        !side.startsWith("+") &&
        !side.startsWith("-")
    ) {

        side =
            "+" + side;
    }


    /*
     * Separate terms.
     *
     * Examples:
     *
     * +3x
     * +5
     * -7x
     * -2
     */

    const terms =
        side.match(
            /[+-][^+-]+/g
        );


    if (!terms) {

        return null;
    }


    let xCoefficient = 0;

    let constant = 0;


    for (const term of terms) {

        /*
         * Variable term.
         *
         * Examples:
         *
         * x
         * -x
         * 3x
         * -5x
         */

        if (
            term.includes("x") ||
            term.includes("X")
        ) {

            const variableTerm =
                term
                    .replace("X", "x");


            /*
             * Only simple linear x terms
             * are supported right now.
             */

            if (
                !/^[+-](?:\d+(?:\.\d+)?)?x$/.test(
                    variableTerm
                )
            ) {

                return null;
            }


            let coefficient =
                variableTerm
                    .replace("x", "");


            /*
             * x means 1x.
             * -x means -1x.
             */

            if (
                coefficient === "+" ||
                coefficient === ""
            ) {

                coefficient = 1;

            }

            else if (
                coefficient === "-"
            ) {

                coefficient = -1;
            }

            else {

                coefficient =
                    Number(coefficient);
            }


            xCoefficient +=
                coefficient;
        }


        /*
         * Constant term.
         */

        else {

            if (
                !/^[+-]\d+(?:\.\d+)?$/.test(term)
            ) {

                return null;
            }


            constant +=
                Number(term);
        }
    }


    return {
        x: xCoefficient,
        constant: constant
    };
}


/* ==================================================
   CREATE ALGEBRA RESPONSE
   ================================================== */

function createAlgebraResponse(
    question,
    result
) {

    const equation =
        question
            .replace(/\s+/g, " ")
            .trim();


    /*
     * Create a readable equation.
     */

    const formattedEquation =
        equation
            .replace(/\s*=\s*/g, " = ");


    const left =
        result.left;

    const right =
        result.right;


    /*
     * Move the x terms to the left.
     */

    const xStep =
        formatAlgebraExpression(
            result.xCoefficient,
            0
        );


    /*
     * Move the constants to the right.
     */

    const constantStep =
        formatAlgebraExpression(
            0,
            result.constant
        );


    /*
     * Final x value.
     */

    const finalX =
        formatNumber(result.x);


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

function formatAlgebraExpression(
    xCoefficient,
    constant
) {

    let result = "";


    /*
     * x term.
     */

    if (xCoefficient !== 0) {

        if (xCoefficient === 1) {

            result += "x";

        }

        else if (xCoefficient === -1) {

            result += "-x";

        }

        else {

            result +=
                formatNumber(xCoefficient) +
                "x";
        }
    }


    /*
     * Constant term.
     */

    if (constant !== 0) {

        if (result !== "") {

            if (constant > 0) {

                result +=
                    " + " +
                    formatNumber(constant);

            }

            else {

                result +=
                    " - " +
                    formatNumber(
                        Math.abs(constant)
                    );
            }

        }

        else {

            result =
                formatNumber(constant);
        }
    }


    return result || "0";
}


/* ==================================================
   FORMAT NUMBER
   ================================================== */

function formatNumber(number) {

    return String(
        Number(
            Number(number).toPrecision(12)
        )
    );
}