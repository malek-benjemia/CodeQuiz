// create array to hold questions, possible answers and correct answer
var questionsBank = [];

var questionDataObj1 = {
    question: "Q1",
    answers : ["A11", "A12", "A13", "A14"],
    correctAnswerIndex: 4
  };
var questionDataObj2 = {
    question: "Q2",
    answers : ["A21", "A22", "A23", "A24"],
    correctAnswerIndex: 3
};

questionsBank.push(questionDataObj1);
questionsBank.push(questionDataObj2);

// variable to hold the main section of the html
var pageContentEl = document.querySelector("#page-content");

// display the quizz initial message
var quizzBegin = function() {
    var quizzBegTextEl = document.createElement("h1");
    quizzBegTextEl.textContent = "Code Quiz Challenge";
    pageContentEl.appendChild(quizzBegTextEl);

    var quizzCoreTextEl = document.createElement("p");
    //quizzCoreTextEl.className = "";
    quizzCoreTextEl.innerHTML = "Try to answer the following code related questions within the time limit.</br>Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    pageContentEl.appendChild(quizzCoreTextEl);

    var quizzButtonEl = document.createElement("button");
    //quizzButtonEl.className = "";
    quizzButtonEl.textContent = "Start Quiz";
    pageContentEl.appendChild(quizzButtonEl);
    
};

var quizzQuestionDisplay = function(event) {
    event.preventDefault();
};

var quizzAnswerDisplay = function(event) {
    event.preventDefault();
};

quizzBegin();