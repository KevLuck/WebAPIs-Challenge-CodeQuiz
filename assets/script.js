const choice1 = document.getElementById("choice-1");
const choice2 = document.getElementById("choice-2");
const choice3 = document.getElementById("choice-3");
const choice4 = document.getElementById("choice-4");
const highScoresLink = document.getElementById("high-scores-link");
const highScoresContainer = document.getElementById("high-scores-container");
const questionElement = document.getElementById("question");
const startButton = document.getElementById("start-button");
const startSection = document.getElementById("start-section");
const quizSection = document.getElementById("quiz-section");
const answerElement = document.getElementById("answer");
const timerElement = document.getElementById("timer");
const submitScoresSection = document.getElementById("scores-section");
const highScoresList = document.getElementById("high-scores-list");
const quizContainerElement = document.getElementById("question-container");

const questions = [
    {
        question: "Commonly used datatypes DO NOT include:",
        choices: [
            " string", " boolean", " alerts", " numbers"
        ],
        answer: 2
    }, {
        question: "The condition in an if/else statement is enclosed with ____.",
        choices: [
            "quotes", "curly brackets", "parenthesis", "square brackets"
        ],
        answer: 2
    }, {
        question: "Arrays in JavaScript can be used to store ___.",
        choices: [
            "numbers and strings", "other arrays", "booleans", "all of the above"
        ],
        answer: 3
    }, {
        question: "String values must be enclosed within ___ when being assigned to variables.",
        choices: [
            "commas", "curly brackets", "quotes", "parenthesis"
        ],
        answer: 2
    }, {
        question: "A very useful tool used during development and debugging for printing content " +
                "to the debugger is:",
        choices: [
            "Java ", "terminal/bash", "for loops", "console.log"
        ],
        answer: 3
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 75;
let timeInterval;

startButton.addEventListener("click", startQuiz);

choice1.addEventListener("click", () => {
    checkAnswer(0);
});
choice2.addEventListener("click", () => {
    checkAnswer(1);
});
choice3.addEventListener("click", () => {
    checkAnswer(2);
});
choice4.addEventListener("click", () => {
    checkAnswer(3);
});

function restartQuiz() {
    resetQuiz();
    startQuiz();
}

function startQuiz() {
    startSection
        .classList
        .add("hide");
    quizSection
        .classList
        .remove("hide");
    newQuestion();
    startTimer();
    answerElement
        .classList
        .remove("hide"); // Show the answer element
}

startButton.addEventListener("click", restartQuiz);

function newQuestion() {
    const {question, choices} = questions[currentQuestion];
    questionElement.textContent = question;
    choice1.textContent = choices[0];
    choice2.textContent = choices[1];
    choice3.textContent = choices[2];
    choice4.textContent = choices[3];
}

function startTimer() {
    timeInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time: ${timeLeft}`;

        if (timeLeft <= 0 || currentQuestion === questions.length) {
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000);
}

function checkAnswer(choiceIndex) {
    const {answer} = questions[currentQuestion];
    const isCorrect = choiceIndex === answer;

    answerElement.textContent = isCorrect
        ? "Correct!"
        : "Incorrect!";

    if (isCorrect) {
        score++;
    } else {
        timeLeft -= 10;
        if (timeLeft < 0) {
            timeLeft = 0; // Ensure the timer doesn't go below zero
        }
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        newQuestion();
    } else {
        endQuiz();
        clearInterval(timeInterval); // Stop the timer after the last question
    }

    // Hide the answer element after the last question
    if (currentQuestion === questions.length) {
        answerElement
            .classList
            .add("hide");
    }
}

function endQuiz() {
    quizSection
        .classList
        .add("hide");
    displayScore();
    highScoresLink
        .classList
        .remove("hide");
    submitScoresSection
        .classList
        .remove("hide");
    highScoresContainer
        .classList
        .remove("hide");

    // Hide the answer element after the last question
    answerElement
        .classList
        .add("hide");
}

function displayScore() {
    submitScoresSection
        .classList
        .remove("hide");
    const initialsInput = document.getElementById("initials-input");
    const finalScoreElement = document.getElementById("final-score");
    const submitScoreButton = document.getElementById("submit-score");
    finalScoreElement.textContent = `Your Score: ${timeLeft}`;

    submitScoreButton.addEventListener("click", () => {
        const initials = initialsInput
            .value
            .trim();
        if (initials !== "") {
            storeScore(initials);
            initialsInput.value = "";
        }
    });
}

function storeScore(initials) {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const newScore = {
        initials,
        score
    };
    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    displayHighScores();
    alert("Score submitted! Check Your Score Below 👇");
}

function endQuiz() {
    clearInterval(timeInterval);
    quizSection
        .classList
        .add("hide");
    displayScore();
    highScoresLink
        .classList
        .remove("hide");
    submitScoresSection
        .classList
        .remove("hide");
    highScoresContainer
        .classList
        .remove("hide"); // Show the high-scores-container
}

function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScoresList.innerHTML = "";

    for (let i = 0; i < highScores.length; i++) {
        const li = document.createElement("li");
        li.textContent = `${highScores[i]
            .initials}: ${highScores[i]
            .score}`;
        highScoresList.appendChild(li);
        alert(highScoresText);
    }
}
const goBackButton = document.getElementById("go-back-button");
const clearScoresButton = document.getElementById("clear-scores-button");
const submitScoreButton = document.getElementById("submit-score");

goBackButton.addEventListener("click", () => {
    highScoresContainer
        .classList
        .add("hide");
    startSection
        .classList
        .remove("hide");
    currentQuestion = 0;
    score = 0;
    timeLeft = 75;
    timerElement.textContent = `Time: ${timeLeft}`;
    highScoresLink
        .classList
        .remove("hide");
    submitScoresSection
        .classList
        .add("hide");
});

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 75;
    clearInterval(timeInterval);
    startSection
        .classList
        .remove("hide");
    quizSection
        .classList
        .add("hide");
    answerElement.textContent = "";
    timerElement.textContent = "Time: " + timeLeft;
}

clearScoresButton.addEventListener("click", () => {
    localStorage.removeItem("highScores");
    displayHighScores();
});

highScoresLink.addEventListener("click", function () {
    displayHighScoresAlert();
});

function displayHighScoresAlert() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    let alertMessage = "High Scores:\n\n";
    highScores.forEach(function (score, index) {
        alertMessage += `${index + 1}. ${score.initials}: ${score.score}\n`;
    });
    alert(alertMessage);
}

submitScoreButton.addEventListener("click", () => {
    const initialsInput = document.getElementById("initials-input");
    const initials = initialsInput
        .value
        .trim();
    if (initials !== "") {
        storeScore(initials);
        initialsInput.value = "";
    }
});