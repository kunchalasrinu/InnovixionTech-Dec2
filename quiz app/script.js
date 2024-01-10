const questions = [
    {
        question: "Which is the largest continent in the world?",
        answers: [
            { text: "Africa", correct: false },
            { text: "Asia", correct: true },
            { text: "Australia", correct: false },
            { text: "America", correct: false },
        ]
    },
    {
        question: "How many colours does Rainbow contain?",
        answers: [
            { text: "4 colours", correct: false },
            { text: "9 colours", correct: false },
            { text: "7 colours", correct: true },
            { text: "5 colours", correct: false },
        ]
    },
    {
        question: "What is the National Animal of India?",
        answers: [
            { text: "Tiger", correct: true },
            { text: "Cat", correct: false },
            { text: "Rhino", correct: false },
            { text: "Hippo", correct: false },
        ]
    },
    {
        question: "How many years are there in one Millennium?",
        answers: [
            { text: "10", correct: false },
            { text: "100", correct: false },
            { text: "1000", correct: true },
            { text: "10000", correct: false },
        ]
    },
    {
        question: "What is the Festival of Lights?",
        answers: [
            { text: "Holi", correct: false },
            { text: "Dussera", correct: false },
            { text: "Sankranti", correct: false },
            { text: "Diwali", correct: true },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentquestionIndex = 0;
let score = 0;

function startQuiz() {
    currentquestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentquestion = questions[currentquestionIndex];
    let questionNo = currentquestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentquestion.question;

    currentquestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentquestionIndex++;
    if (currentquestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentquestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();