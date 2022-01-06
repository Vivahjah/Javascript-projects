const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const answerEls = document.querySelectorAll('.answer');
const quiz = document.getElementById('quiz');


quizData = [{
        question: "What symbol is used for comments in python?",
        a: "*",
        b: "//",
        c: "#",
        d: "!--",
        answer: "c"
    },
    {
        question: "What is the extension for python files?",
        a: ".txt",
        b: ".py",
        c: ".html",
        d: ".sql",
        answer: "b"
    },
    {
        question: "What keyword is used to create functions in python?",
        a: "init",
        b: "module",
        c: "func",
        d: "def",
        answer: "d"
    },
    {
        question: "What operator is used to multiply numbers?",
        a: "*",
        b: "/",
        c: "+",
        d: "-",
        answer: "a"
    },
    {
        question: "What collection consists of key and value pairs?",
        a: "list",
        b: "dictionary",
        c: "tuple",
        d: "set",
        answer: "b"
    }
]


let currentQuiz = 0;
let scores = 0;

const deselectAnswers = () => {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}


let loadQuiz = () => {
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];
    questionEl.innerHTML = currentQuizData.question;
    a_text.innerHTML = currentQuizData.a;
    b_text.innerHTML = currentQuizData.b;
    c_text.innerHTML = currentQuizData.c;
    d_text.innerHTML = currentQuizData.d;

};

loadQuiz();

let getSelected = () => {

    let answer = undefined;

    answerEls.forEach((answerEl) => {

        if (answerEl.checked) {
            answer = answerEl.id
        }

    });
    return answer;
}

submitBtn.addEventListener("click", () => {

    let answer = getSelected();

    if (answer) {
        if (answer === quizData[currentQuiz].answer) {
            scores++;

        }

        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `
            <h2>You answered correctly at ${scores}
             / ${quizData.length} questions. </h2>

            <button onclick="location.reload()" >Reload</button>
            `;
        }
    }

});



