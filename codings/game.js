const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "Madrid", "Rome"],
        correctAnswer: "Paris"
    },
    // add more questions here
];

let questionIndex = 0;
let score = 0;
let correctAnswers = 0;

const startQuiz = () => {
    displayQuestion();
    startTimer(15);
};

const displayQuestion = () => {
    const questionElement = document.querySelector(".question");
    const optionsElement = document.querySelector(".options");
    const optionElements = optionsElement.children;

    questionElement.textContent = questions[questionIndex].question;

    for (let i = 0; i < optionElements.length; i++) {
        optionElements[i].textContent = questions[questionIndex].options[i];
    }
};

const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
        questionIndex++;
        displayQuestion();
    } else {
        finishQuiz();
    }
};

const checkAnswer = (optionIndex) => {
    if (optionIndex === questions[questionIndex].options.indexOf(questions[questionIndex].correctAnswer)) {
        score += 10;
        correctAnswers++;
    }
    nextQuestion();
};

const startTimer = (duration) => {
    const timerElement = document.querySelector(".timer");
    let timer = duration;
    let timerInterval = setInterval(() => {
        timer--;
        timerElement.textContent = "Timer: " + timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            nextQuestion();
        }
    }, 1000);
};

const finishQuiz = () => {
    const resultsElement = document.querySelector(".results");
    const finalScoreElement = document.querySelector(".final-score");
    const correctAnswersElement = document.querySelector(".correct-answers");

    resultsElement.style.display = "block";
    finalScoreElement.textContent = "Final Score: " + score;
    correctAnswersElement.textContent = "Correct Answers: " + correctAnswers + " / " + questions.length;
};

document.querySelector(".start-btn").addEventListener("click", startQuiz);
document.querySelector(".next-btn").addEventListener("click", nextQuestion);

document.querySelector(".options").addEventListener("click", (event) => {
    if (event.target.classList.contains("option")) {
        checkAnswer(parseInt(event.target.dataset.index));
    }
});