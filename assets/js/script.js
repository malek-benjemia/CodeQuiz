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
var pagebeginSectionEl = document.querySelector("begin-section");

var startQuizButtonHandler = function(event) {
    // get target element from event -> var targetEl = event.target;
    var myobj = document.getElementById("begin-section");
    myobj.remove(); 
  
    quizzQuestionDisplay();
};


var quizzQuestionDisplay = function() {
    
};

var quizzAnswerDisplay = function(event) {
    event.preventDefault();
};


// for Quiz Start button
pageContentEl.addEventListener("click", startQuizButtonHandler);