// create a variable to hold the time
var timer = 0;
var myTimerVar = null;

// create array to hold questions, possible answers and correct answer
var questionsBank = [];

var questionDataObj1 = {
    question: "Q1",
    answer1: "A11",
    answer2: "A12",
    answer3: "A13", 
    answer4: "A14",
    correctAnswerIndex: 4
  };
var questionDataObj2 = {
    question: "Q2",
    answer1: "A21",
    answer2: "A22",
    answer3: "A23", 
    answer4: "A24",
    correctAnswerIndex: 3
};

questionsBank.push(questionDataObj1);
questionsBank.push(questionDataObj2);

// variable to hold the main sections of the html

var timerParentZoneEl = document.getElementById("timer-parent-zone");
var pageContentEl = document.getElementById("page-content");

// display the timer
var timerDisplay = function() {
    var myobj = document.getElementById("timer-zone");
    myobj.remove(); 
    
    var pageTimerEl = document.createElement("span");
    pageTimerEl.id = "timer-zone";
    pageTimerEl.textContent = timer.toString();
    timerParentZoneEl.appendChild(pageTimerEl);
};

// remove 1 unit to the timer each 3600 milliseconds = 1 minute
var myTimer = function(){
    timer--;
    if (timer == 70 || timer == 60 || timer == 30 || timer == 5) {timerDisplay()};
    if (timer <=0 ) {clearInterval(myTimerVar);};
};

// display the questions
var quizzQuestionDisplay = function() {
    var questionZoneEl= document.getElementById("question-zone");
    for (var i = 0; i < questionsBank.length; i++) {
        // display question
        var questionEl = document.createElement("h2");
        questionEl.id = "question";
        questionEl.textContent = questionsBank[i].question;
        questionZoneEl.appendChild(questionEl);
        // display answers


        var answersSelectEl = document.createElement("select");
        answersSelectEl.setAttribute("question-id", i);
        answersSelectEl.id = "select-answers";
        questionZoneEl.appendChild(answersSelectEl);
            var answerChoices = [questionsBank[i].answer1, questionsBank[i].answer2,questionsBank[i].answer3,questionsBank[i].answer4];
            for (var i = 0; i < answerChoices.length; i++) {
                // create option element
                var answerOptionEl = document.createElement("option");
                answerOptionEl.textContent = answerChoices[i];
                // append to select
                answersSelectEl.appendChild(answerOptionEl);
            }
        // listen to choice selection => display correct answer and clear question i
        
    }
};

// upon clicking Start Quiz
var startQuizButtonHandler = function(event) {
    // get target element from event -> var targetEl = event.target;
    var myobj = document.getElementById("begin-section");
    myobj.remove(); 
    var sectionEl = document.createElement("section");
    sectionEl.id = "question-zone";
    sectionEl.textContent = "";
    pageContentEl.appendChild(sectionEl);
  
    timer = 75;

    timerDisplay();
    quizzQuestionDisplay();
    myTimerVar = setInterval(myTimer, 3600)
};




var quizzAnswerDisplay = function(event) {
    event.preventDefault();
};


// for Quiz Start button
pageContentEl.addEventListener("click", startQuizButtonHandler);