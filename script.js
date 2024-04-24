const questions = [
    {
        question: "which is the largest animal in the world ?",
        answers: [
            { Text: "shark", correct: false },
            { Text: "Blue whale", correct: true },
            { Text: "Elephant", correct: false },
            { Text: "Giraffe", correct: false },
        ]
    },
    {
        question: "which is the smallest city in the world ?",
        answers: [
            { Text: "vatican city", correct: true },
            { Text: "Bhutan", correct: false },
            { Text: "Nepal", correct: false },
            { Text: "Sri Lanka", correct: false },
        ]
    },
    {
        question: "which is the largest desert in the world  ?",
        answers: [
            { Text: "kalahari", correct: false },
            { Text: "Gobi", correct: false },
            { Text: "Sahara", correct: false },
            { Text: "Antartica", correct: true },
        ]
    },
    {
        question: "which is the smallest desert in the world ?",
        answers: [
            { Text: "Asia", correct: false },
            { Text: "Australia", correct: true },
            { Text: "Artic", correct: false },
            { Text: "Africa", correct: false },
        ]
    },
    {
        question: "which city is the most crowded in the world ?",
        answers: [
            { Text: "Russia", correct: false },
            { Text: "England", correct: false },
            { Text: "India", correct: true },
            { Text: "Africa", correct: false },
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;



function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.
        question;

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.Text;
        button.classList.add("btn")
        answerButtons.appendChild(button);
        if (answers.correct) {
            button.dataset.correct = answers.correct;
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
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;

    })
    nextButton.style.display = "block";
}
function showscore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}


function handleNextButton() {
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showscore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();
