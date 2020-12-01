// starting variables
let question = document.getElementById('question');
let answerInputs = document.querySelectorAll('.quiz-input');
let addQuestionBtn = document.getElementById('add-button');
let showCurrentQuizBtn = document.getElementById('save-quiz');
let currentQuestionsCount = document.getElementById('current-questions');
let ourQuizQuestions = document.getElementById('my-quiz');
let resultQuestion = document.getElementById('result-question');
let nextBtnDiv = document.getElementById('next-btn');
let correctInput = document.getElementById('answer');
let mainQuizDiv = document.getElementById('result-box');
let quizSettings = document.getElementById('quiz-box');
let userData = document.getElementById('user-quizes');
let postBtn = document.getElementById('save');
let wrnText = document.getElementById('warning-text');
let correctAnswers = [];
let emptyInputs = [];
let usersAnswers = [];
let radioButtons = 0;
let quizLabels = 0;
let correctAnswersCount = 0;
let nextButton = 0;
let questions = [];
let answers = [];
let count = 0;
let mainQuestions = [];
let mainAnswers = [];
// function to show current quiz
const showQuiz = () => {
    if(count > 0) {
        quizSettings.style.display="none";
        mainQuizDiv.className="result-box-after"
        mainAnswers[0].sort(() => Math.random() - 0.5);
        for(let  i = 0; i < answers.length; i++) {
            let radioBtn = document.createElement("input");
            let labels = document.createElement("label");
            let inputDiv = document.createElement("div");
            inputDiv.className="flexInput";
            radioBtn.type="radio";
            radioBtn.name="quiz";
            radioBtn.className="label-input";
            radioBtn.value=mainAnswers[0][i];
            labels.innerHTML = mainAnswers[0][i];
            labels.className="quiz-lab";
            ourQuizQuestions.append(inputDiv)
            inputDiv.append(radioBtn)
            inputDiv.append(labels)
            resultQuestion.innerHTML = mainQuestions[0];
        };
        radioButtons = document.getElementsByName('quiz');
        quizLabels = document.querySelectorAll(".quiz-lab");
        nextButton = document.createElement('button');
        nextButton.innerHTML = "Next";
        nextButton.id="next-button";
        nextBtnDiv.append(nextButton);
        nextButton.addEventListener("click", switchNextCard);
        postBtn.innerHTML="Save and back to menu"
    }
    else {
        wrnText.innerHTML="Your quiz should have at least 1 question";
    }
}

// function to add question in quiz
const addQuestion = () => {
        answerInputs.forEach(item => {
            if(item.value === '') {
                emptyInputs.push(item.value);
            }
            else {
                emptyInputs.shift()
            }
        })
        if(count < 5 && question.value !== '' && emptyInputs.length < 1) {
            wrnText.innerHTML='';
            questions = []
            questions.push(question.value);
            answers=[];
            answerInputs.forEach(item => answers.push(item.value))
            mainQuestions.push(questions);
            mainAnswers.push(answers);
            count++;
            currentQuestionsCount.innerHTML = "Your quiz has " + `${count}` + "/5" + " questions";
            question.value = '';
            correctAnswers.push(correctInput.value);
            answerInputs.forEach(item => {
                item.value = '';
            });
            ourQuizQuestions.innerHTML = '';
            resultQuestion.innerHTML = ''
            question.value = '';
        }
        else if(emptyInputs.length > 1 || question.value === '') {
            wrnText.innerHTML="Please fill in all the fields"
        }
        else if(count >= 5) {
            wrnText.innerHTML="You have too much questions"
        }
}

// switch card in quiz 
const switchNextCard = () => {
    mainAnswers.shift();
    mainQuestions.shift();
    if(mainAnswers.length > 0) {
        resultQuestion.innerHTML = mainQuestions[0];
        mainAnswers[0].sort(() => Math.random() - 0.5);
        for(let i = 0; i < answers.length; i++) {
            if(radioButtons[i].checked) {
                usersAnswers.push(radioButtons[i].value)
                radioButtons[i].checked = false;
            }
                radioButtons[i].value = mainAnswers[0][i];
                quizLabels[i].innerHTML = mainAnswers[0][i];
        }
    }
    else {
        for(let i = 0; i < answers.length; i++) {
            if(radioButtons[i].checked) {
                usersAnswers.push(radioButtons[i].value)
                radioButtons[i].checked = false;
            };
        };
        for(let  i = 0; i < usersAnswers.length; i++) {
            if(usersAnswers[i] === correctAnswers[i]) {
                correctAnswersCount++
            }
        };
        mainQuizDiv.classList.add("end-result-box")
        let endMessage = document.createElement('h3');
        endMessage.id="end-M";
        endMessage.innerHTML="Your score: " + correctAnswersCount + "/" + count;
        mainQuizDiv.innerHTML='';
        mainQuizDiv.append(endMessage);
    }
    console.log(usersAnswers, correctAnswers)
};

// add event listeners
addQuestionBtn.addEventListener('click', addQuestion);
showCurrentQuizBtn.addEventListener('click', showQuiz);

// count of your questions in quiz 
const countQuest = () => {
    currentQuestionsCount.innerHTML = "Your quiz has " + `${count}` + " questions";
}
window.addEventListener("storage", () => {
    localStorage.setItem('quiz', )
})