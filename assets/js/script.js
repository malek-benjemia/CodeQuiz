// create a variable to hold the time
var timer = 0;

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

// variable to hold the main sections of the html

var timerParentZoneEl = document.querySelector(".timer-parent-zone");
var pageContentEl = document.querySelector(".page-content");


// display the timer
var timerDisplay = function() {
    var myobj = document.getElementById("timer-zone");
    myobj.remove(); 
    console.log(timer.toString());
    console.log(timer);
    var pageTimerEl = document.createElement("span");
    pageTimerEl.id = "timer-zone";
    pageTimerEl.textContent = timer.toString();
    timerParentZoneEl.appendChild(pageTimerEl);
};

// upon clicking Start Quiz
var startQuizButtonHandler = function(event) {
    // get target element from event -> var targetEl = event.target;
    var myobj = document.getElementById("begin-section");
    myobj.remove(); 
  
    timer = 75;

    timerDisplay();
    quizzQuestionDisplay();
};


var quizzQuestionDisplay = function() {
    
};

var quizzAnswerDisplay = function(event) {
    event.preventDefault();
};


// for Quiz Start button
pageContentEl.addEventListener("click", startQuizButtonHandler);