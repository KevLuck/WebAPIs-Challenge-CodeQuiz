var quizStatus = true;
var answerNumber = 0;
var questionNumber = 0;
var highScore = 50;
var score = 0;
var timeLeft = 60;
var viewHighScoresBtnEl = document.getElementById('view-high-scores');
var startQuizBtnEl = document.getElementById('start-quiz');
var answer1BtnEl = document.getElementById('answer1');
var answer2BtnEl = document.getElementById('answer2');
var answer3BtnEl = document.getElementById('answer3');
var answer4BtnEl = document.getElementById('answer4');
var submitScoreEl = document.getElementById('submitScore');
var questionsEl = document.getElementById('questions');
var mainDivEl = document.getElementById('mainDiv');
var htmlTimeLeft = document.getElementById('timeLeft');
var answer1BtnEl = document.getElementById('answer1');
var answer2BtnEl = document.getElementById('answer2');
var answer3BtnEl = document.getElementById('answer3');
var answer4BtnEl = document.getElementById('answer4');
var answerCorrectWrong = document.getElementById('answerCorrectWrong');
var questionDisplayEl = document.createElement("questionDisplay");
var finalScoreDisplayEl = document.createElement("finalScoreDisplay");
var enterInitialsEl = document.createElement("enterInitials");
var enterInitialsTextAreaEl = document.createElement("enterInitialsTextArea");
var button1234 = document.createElement("button");

answer1BtnEl.style.display = 'none';
answer2BtnEl.style.display = 'none';
answer3BtnEl.style.display = 'none';
answer4BtnEl.style.display = 'none';
submitScoreEl.style.display = 'none';
answerCorrectWrong.style.display = 'none';
enterInitialsTextArea.style.display = 'none';

var questionsObject = {
    correct: {
        0: "Commonly used datatypes DO NOT include?",
        1: "The condition statement if/else is enclosed with the following:",
        2: "Arrays can be used to store the following",
        3: "A very useful tool to debug arrays is:",
        4: "Strings must be enclosed with:"
    }
};

var answersObject = {
    answers: {
        0: {
            0: "Strings",
            1: "Boolean",
            2: "Alerts",
            3: "Numbers"
        },
        1: {
            0: "Parentheses",
            1: "Curly Brackets",
            2: "Quotes",
            3: "Square Brackets"
        },
        2: {
            0: "Javascript",
            1: "Terminal/bash",
            2: "For loops",
            3: "Console.log"
        },
        3: {
            0: "Commas",
            1: "Curly brackets",
            2: "Quotes",
            3: "Parentheses"
        },
        4: {
            0: "Number of strings",
            1: "Other arrays",
            2: "Booleans",
            3: "All of the above"
        }
    }
};

htmlTimeLeft.textContent = timeLeft;

viewHighScoresBtnEl.addEventListener("click", function () {

    var quizUsers = "";
    var substringTest = "";
    var highScores = "";

    for (var i = 0; i < localStorage.length; i++) {
        var checkUserValue = [];

        quizUsers = localStorage.getItem(localStorage.key(i));
        substringTest = quizUsers.substring(0, 4)
        if (substringTest == "quiz") {
            checkUserValue = quizUsers.split(",");
            var userName = checkUserValue[0]
            highScores += "User " + userName.substring(4) + " high score is: " +
                    checkUserValue[1] + "\n";
        }
    }
    window.alert(highScores);

});

submitScoreEl.addEventListener("click", function () {

    var quizLocalStorage = "quiz";
    var quizUserDetails = "";
    var value = [];

    quizUserDetails = quizLocalStorage + enterInitialsTextArea.value
    value = [quizUserDetails, highScore]

    if (!localStorage.length) {
        localStorage.setItem("test", "test");
    }

    for (var i = 0; i < localStorage.length; i++) {

        var checkUser = "";
        var checkUserValue = [];

        quizUserDetails = quizLocalStorage + enterInitialsTextArea.value;

        checkUser = localStorage.getItem(quizUserDetails);

        if (checkUser == null) {
            localStorage.setItem(quizUserDetails, value);
            window.alert(
                "Your score is" + highScore + " has been submitted!"
            )
            break;
        } else if (checkUser != null) {
            checkUserValue = checkUser.split(",");

        }

        if (quizUserDetails == checkUserValue[0] && highScore == checkUserValue[1]) {

            localStorage.setItem(quizUserDetails, value);
            window.alert(
                highScore + " is the most recent entry for user initial " +
                enterInitialsTextArea.value + ". The entry will not be included."
            )
            break;
        } else if (enterInitialsTextArea.value == "") {
            window.alert("Enter your initials.");
            break;
        } else if (quizUserDetails == checkUserValue[0] && highScore > checkUserValue[1]) {

            localStorage.setItem(quizUserDetails, value);
            window.alert(
                "New high score of " + highScore + " has been submitted!.\nYour previous score " +
                "was " + checkUserValue[1]
            )
            break;
        } else if (quizUserDetails == checkUserValue[0] && highScore < checkUserValue[1]) {

            localStorage.setItem(quizUserDetails, value);
            window.alert(
                "Your previous code of " + checkUserValue[1] + " was higher. Entry will not be " +
                "added."
            );
            break;

        } else {
            localStorage.setItem(quizUserDetails, value);
            window.alert(
                "Your score of " + highScore + " has been submitted!"
            )
            break;
        }

    }

});

answer1BtnEl.addEventListener("mouseover", function () {

    answerCorrectWrong.style.display = 'none';

});

answer2BtnEl.addEventListener("mouseover", function () {

    answerCorrectWrong.style.display = 'none';

});

answer3BtnEl.addEventListener("mouseover", function () {

    answerCorrectWrong.style.display = 'none';

});

answer4BtnEl.addEventListener("mouseover", function () {

    answerCorrectWrong.style.display = 'none';

});

submitScoreEl.addEventListener("mouseover", function () {

    answerCorrectWrong.style.display = 'none';

});

startQuizBtnEl.addEventListener("click", function () {

    startQuizBtnEl.style.display = 'none';
    questionDisplay.style.display = 'none';
    finalScoreDisplay.style.display = 'none';
    enterInitials.style.display = 'none';
    score = 0;
    timeLeft = 60;
    htmlTimeLeft.textContent = timeLeft;
    finalAnswerCheck = 0;
    checkTimes = 1;

    var timeInterval = setInterval(function () {

        if (score === 1) {
            highScore -= 10;
        }

        score = 0;

        if (timeLeft >= 1 && finalAnswerCheck !== 1) {

            questionDisplay.textContent = questionsObject.correct[questionNumber];

            questionDisplay.style.display = "";
            answer1BtnEl.style.display = "";
            answer2BtnEl.style.display = "";
            answer3BtnEl.style.display = "";
            answer4BtnEl.style.display = "";

            answer1BtnEl.textContent = answersObject.answers[answerNumber][0];
            answer2BtnEl.textContent = answersObject.answers[answerNumber][1];
            answer3BtnEl.textContent = answersObject.answers[answerNumber][2];
            answer4BtnEl.textContent = answersObject.answers[answerNumber][3];

            gridContainer.appendChild(questionDisplayEl);
            gridContainer.appendChild(answer1BtnEl);
            gridContainer.appendChild(finalScoreDisplayEl);
            timeLeft -= 1;
            htmlTimeLeft.textContent = timeLeft;
            console.log("time left:" + timeLeft)

            answer1BtnEl.addEventListener("click", function () {

                if (questionDisplay.textContent === "The condition statement if/else is enclosed with the following:" && answer1BtnEl.textContent === "Parentheses") {
                    console.log("Correct");

                    questionNumber = 2;
                    answerNumber = 4;
                    answerCorrectWrong.style.display = "";
                    answerCorrectWrong.textContent = "Correct!";
                    answerCorrectWrong.style.borderTop = "solid #0892FD";
                    answerCorrectWrongGrid.appendChild(answerCorrectWrong);
                } else {

                    switch (answer1BtnEl.textContent) {
                        case "Strings":

                            answerCorrectWrong.style.display = "";
                            answerCorrectWrong.textContent = "Wrong!";
                            answerCorrectWrong.style.borderTop = "solid #0892FD";

                            score = 1;
                            questionNumber = 1;
                            answerNumber = 1;
                            break;
                        case "Number of strings":

                            answerCorrectWrong.style.display = "";
                            answerCorrectWrong.textContent = "Wrong!";
                            answerCorrectWrong.style.borderTop = "solid #0892FD";

                            score = 1;
                            questionNumber = 3;
                            answerNumber = 2;
                            break;
                        case "Javascript":

                            answerCorrectWrong.style.display = "";
                            answerCorrectWrong.textContent = "Wrong!";
                            answerCorrectWrong.style.borderTop = "solid #0892FD";

                            score = 1;
                            questionNumber = 4;
                            answerNumber = 3;
                            break;
                        case "Commas":
                            console.log("Correct");

                            answerCorrectWrong.style.display = "";
                            answerCorrectWrong.textContent = "Correct!";
                            answerCorrectWrong.style.borderTop = "solid #0892FD";
                            answerCorrectWrongGrid.appendChild(answerCorrectWrong);

                            questionNumber = 0;
                            answerNumber = 0;
                            console.log(timeInterval);
                            answer1BtnEl.style.display = 'none';
                            answer2BtnEl.style.display = 'none';
                            answer3BtnEl.style.display = 'none';
                            answer4BtnEl.style.display = 'none';
                            answerCorrectWrong.style.display = 'none';
                            startQuizBtnEl.style.display = 'none';

                            questionDisplay.textContent = "You have finished the quiz!";
                            finalScoreDisplay.style.display = "";
                            enterInitials.style.display = "";
                            enterInitialsTextArea.style.display = "";
                            finalAnswerCheck = 1;
                            lastQuestionWrong();
                            finalScoreDisplay.textContent = "Your final score is: " + highScore;
                            enterInitials.textContent = "Enter initials: "
                            submitScoreEl.style.display = "";
                            submitScoreEl.textContent = "Submit";

                            clearInterval(timeInterval);
                            break;

                    }
                }

            });

            answer2BtnEl.addEventListener("click", function () {

                if (questionDisplay.textContent === "Strings must be enclosed with:" && answer2BtnEl.textContent === "Curly brackets") {
                    console.log("Correct");

                    answerCorrectWrong.style.display = "";
                    answerCorrectWrong.textContent = "Correct!";
                    answerCorrectWrong.style.borderTop = "solid #0892FD";
                    answerCorrectWrongGrid.appendChild(answerCorrectWrong);

                    questionNumber = 0;
                    answerNumber = 0;
                    console.log(timeInterval);
                    answer1BtnEl.style.display = 'none';
                    answer2BtnEl.style.display = 'none';
                    answer3BtnEl.style.display = 'none';
                    answer4BtnEl.style.display = 'none';
                    answerCorrectWrong.style.display = 'none';
                    startQuizBtnEl.style.display = 'none';

                    questionDisplay.textContent = "You have finished the quiz!";
                    finalScoreDisplay.style.display = "";
                    enterInitials.style.display = "";
                    enterInitialsTextArea.style.display = "";
                    finalScoreDisplay.textContent = "Your final score is: " + highScore;
                    enterInitials.textContent = "Enter initials: "
                    submitScoreEl.style.display = "";
                    submitScoreEl.textContent = "Submit";

                    clearInterval(timeInterval);
                } else {

                    switch (answer2BtnEl.textContent) {
                        case "Boolean":

                            answerCorrectWrong.style.display = "";
                            answerCorrectWrong.textContent = "Wrong!";
                            answerCorrectWrong.style.borderTop = "solid #0892FD";

                            score = 1;
                            questionNumber = 1;
                            answerNumber = 1;
                            break;
                        case "Curly Brackets":

                            answerCorrectWrong.style.display = "";
                            answerCorrectWrong.textContent = "Wrong!";
                            answerCorrectWrong.style.borderTop = "solid #0892FD";

                            score = 1;
                            questionNumber = 2;
                            answerNumber = 4;
                            console.log(score);
                            break;
                        case "Other arrays":

                            answerCorrectWrong.style.display = "";
                            answerCorrectWrong.textContent = "Wrong!";
                            answerCorrectWrong.style.borderTop = "solid #0892FD";
                            score = 1;
                            questionNumber = 3;
                            answerNumber = 2;
                            break;
                        case "Terminal/bash":

                            answerCorrectWrong.style.display = "";
                            answerCorrectWrong.textContent = "Wrong!";
                            answerCorrectWrong.style.borderTop = "solid #0892FD";
                            score = 1;
                            questionNumber = 4;
                            answerNumber = 3;
                            break;

                    }
                }

            });

            answer3BtnEl.addEventListener("click", function () {

                if (questionDisplay.textContent === "Commonly used datatypes DO NOT include?" && answer3BtnEl.textContent === "Alerts") {
                    console.log("Correct");

                    questionNumber = 1;
                    answerNumber = 1;
                    answerCorrectWrong.style.display = "";
                    answerCorrectWrong.textContent = "Correct!";
                    answerCorrectWrong.style.borderTop = "solid #0892FD";
                    answerCorrectWrongGrid.appendChild(answerCorrectWrong);
                } else if (questionDisplay.textContent === "A very useful tool to debug arrays is:" && answer3BtnEl.textContent === "For loops") {
                    console.log("Correct");

                    questionNumber = 4;
                    answerNumber = 3;
                    answerCorrectWrong.style.display = "";
                    answerCorrectWrong.textContent = "Correct!";
                    answerCorrectWrong.style.borderTop = "solid #0892FD";
                    answerCorrectWrongGrid.appendChild(answerCorrectWrong);
                } else if (questionDisplay.textContent === "The condition statement if/else is enclosed with the following:" && answer3BtnEl.textContent === "Quotes") {

                    answerCorrectWrong.style.display = "";
                    answerCorrectWrong.textContent = "Wrong!";
                    answerCorrectWrong.style.borderTop = "solid #0892FD";
                    score = 1;
                    questionNumber = 2;
                    answerNumber = 4;
                } else {

                    switch (answer3BtnEl.textContent) {
                        case "Booleans":

                            answerCorrectWrong.style.display = "";
                            answerCorrectWrong.textContent = "Wrong!";
                            answerCorrectWrong.style.borderTop = "solid #0892FD";
                            score = 1;
                            questionNumber = 3;
                            answerNumber = 2;
                            break;
                        case "Quotes":

                            score = 1;
                            questionNumber = 0;
                            answerNumber = 0;
                            console.log(timeInterval);
                            answer1BtnEl.style.display = 'none';
                            answer2BtnEl.style.display = 'none';
                            answer3BtnEl.style.display = 'none';
                            answer4BtnEl.style.display = 'none';
                            answerCorrectWrong.style.display = 'none';
                            startQuizBtnEl.style.display = 'none';

                            questionDisplay.textContent = "You have finished the quiz!";
                            finalScoreDisplay.style.display = "";
                            enterInitials.style.display = "";
                            enterInitialsTextArea.style.display = "";
                            finalAnswerCheck = 1;
                            lastQuestionWrong();
                            finalScoreDisplay.textContent = "Your final score is: " + highScore;
                            enterInitials.textContent = "Enter initials: "
                            submitScoreEl.style.display = "";
                            submitScoreEl.textContent = "Submit";

                            clearInterval(timeInterval);

                            break;
                    }

                }

            });

            answer4BtnEl.addEventListener("click", function () {

                if (questionDisplay.textContent === "Arrays can be used to store the following" && answer4BtnEl.textContent === "All of the above") {
                    console.log("Correct");

                    questionNumber = 3;
                    answerNumber = 2;
                    answerCorrectWrong.style.display = "";
                    answerCorrectWrong.textContent = "Correct!"
                    answerCorrectWrong.style.borderTop = "solid #0892FD";
                    answerCorrectWrongGrid.appendChild(answerCorrectWrong);

                } else {

                    switch (answer4BtnEl.textContent) {
                        case "Numbers":

                            answerCorrectWrong.style.display = "";
                            answerCorrectWrong.textContent = "Wrong!";
                            answerCorrectWrong.style.borderTop = "solid #0892FD";
                            score = 1;
                            questionNumber = 1;
                            answerNumber = 1;
                            break;
                        case "Square Brackets":

                            answerCorrectWrong.style.display = "";
                            answerCorrectWrong.textContent = "Wrong!";
                            answerCorrectWrong.style.borderTop = "solid #0892FD";
                            score = 1;
                            questionNumber = 2;
                            answerNumber = 4;
                            break;
                        case "Console.log":

                            answerCorrectWrong.style.display = "";
                            answerCorrectWrong.textContent = "Wrong!";
                            answerCorrectWrong.style.borderTop = "solid #0892FD";
                            score = 1;
                            questionNumber = 4;
                            answerNumber = 3;
                            break;
                        case "Parentheses":

                            answerCorrectWrong.style.display = "";
                            answerCorrectWrong.textContent = "Wrong!";
                            answerCorrectWrong.style.borderTop = "solid #0892FD";
                            score = 1;

                            questionNumber = 0;
                            answerNumber = 0;
                            console.log(timeInterval);
                            answer1BtnEl.style.display = 'none';
                            answer2BtnEl.style.display = 'none';
                            answer3BtnEl.style.display = 'none';
                            answer4BtnEl.style.display = 'none';
                            answerCorrectWrong.style.display = 'none';
                            startQuizBtnEl.style.display = 'none';

                            questionDisplay.textContent = "You have finished the quiz!";
                            finalScoreDisplay.style.display = "";
                            enterInitials.style.display = "";
                            enterInitialsTextArea.style.display = "";
                            finalAnswerCheck = 1;
                            lastQuestionWrong();
                            finalScoreDisplay.textContent = "Your final score is: " + highScore;
                            enterInitials.textContent = "Enter initials: "
                            submitScoreEl.style.display = "";
                            submitScoreEl.textContent = "Submit";

                            clearInterval(timeInterval);
                            break;

                    }

                }

            });

        } else if (timeLeft === 0) {

            console.log(timeInterval);
            questionNumber = 0;
            answerNumber = 0;
            answer1BtnEl.style.display = 'none';
            answer2BtnEl.style.display = 'none';
            answer3BtnEl.style.display = 'none';
            answer4BtnEl.style.display = 'none';
            answerCorrectWrong.style.display = 'none';

            questionDisplay.textContent = "Game Over!. Try again by clicking on \"Click Start Quiz\"";
            startQuizBtnEl.style.display = "";
            clearInterval(timeInterval);

        }
    }, 1000)

});

function lastQuestionWrong() {
    if (finalAnswerCheck === 1 && checkTimes === 1) {
        highScore -= 10;
        checkTimes = 2;
        return highScore
    }

}
