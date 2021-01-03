// will later hold the scores
var currentHighScores= [];

// create a variable to hold the time
var timer = 0;
var myTimerVar = null;

// create array to hold questions, possible answers and correct answer
var questionsBank = [];

var questionDataObj0 = {
    question: "Commonly used data types DO NOT include",
    answer1: "strings",
    answer2: "booleans",
    answer3: "alerts", 
    answer4: "numbers",
    correctAnswerIndex: 2
  };
var questionDataObj1 = {
    question: "The condition in an if/else statement is enclosed with ___",
    answer1: "quotes",
    answer2: "curly brackets",
    answer3: "parenthesis", 
    answer4: "square brackets",
    correctAnswerIndex: 2
};
var questionDataObj2 = {
    question: "Arrays in JavaScript can be used to store",
    answer1: "numbers and strings",
    answer2: "other arrays",
    answer3: "booleans", 
    answer4: "all of the above",
    correctAnswerIndex: 3
};
var questionDataObj3= {
    question: "String values must be enclosed within ____ when being asigned to variables.",
    answer1: "commas",
    answer2: "curly brackets",
    answer3: "quotes", 
    answer4: "parenthesis",
    correctAnswerIndex: 2
};
var questionDataObj4= {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answer1: "JavaScript",
    answer2: "terminal/bash",
    answer3: "for loops", 
    answer4: "console.log",
    correctAnswerIndex: 3
};


questionsBank.push(questionDataObj0);
questionsBank.push(questionDataObj1);
questionsBank.push(questionDataObj2);
questionsBank.push(questionDataObj3);
questionsBank.push(questionDataObj4);

// variable to hold the main sections of the html
var timerParentZoneEl = document.getElementById("timer-parent-zone");
var pageContentEl = document.getElementById("page-content");
var begSectionEl = document.getElementById("begin-section");

// display the timer
var timerDisplay = function() {
    var myobj = document.getElementById("timer-zone");
    myobj.remove(); 
    
    var pageTimerEl = document.createElement("span");
    pageTimerEl.id = "timer-zone";
    pageTimerEl.textContent = timer.toString();
    timerParentZoneEl.appendChild(pageTimerEl);
};

// remove 1 unit to the timer each 1000 milliseconds = 1 second
var myTimer = function(){
    timer--;
    if (timer == 70 || timer == 60 || timer == 30 || timer == 5) {timerDisplay()};
    if (timer <=0 ) {clearInterval(myTimerVar);};
};

// save initials and score
var saveInitialsScoreHandler = function(event) {
    var scoreEl= document.getElementById("score");
    if (localStorage.getItem("initials-score")) { currentHighScores = JSON.parse(localStorage.getItem("initials-score"));};
    var myScore = {
        initials: event.target.value, 
        score: scoreEl.textContent
    };
    currentHighScores.push(myScore);
    console.log(currentHighScores);
    localStorage.setItem("initials-score", JSON.stringify(currentHighScores));
};

// display All Done Page
var allDoneDisplay = function() {
    var questionZoneEl= document.getElementById("question-zone");
    var questionEEl= document.getElementById("question-element");
    questionEEl.remove();

    var sectionEl = document.createElement("section");
    sectionEl.id = "all-done";
    sectionEl.innerHTML = "<h2>All Done!</h2><p>Your final score is <span id='score'></span>.</p><p>Enter initials: </p>";
    questionZoneEl.appendChild(sectionEl);

    var scoreEl= document.getElementById("score");
    scoreEl.textContent = timer.toString() ;
    
    var inputInitials = document.createElement("input");
    inputInitials.type = "text";
    inputInitials.id = "initials";
    inputInitials.textContent ="";
    sectionEl.appendChild(inputInitials);

    inputInitials.addEventListener("change", saveInitialsScoreHandler);
};

// display if the answer is correct or wrong
var selectAnswerHandler = function(event) {
    event.preventDefault();
    var correctAnswerEl= document.getElementById("answer-zone");
    if (event.target.getAttribute("answer-id") == questionsBank[event.target.getAttribute("question-id")].correctAnswerIndex)
        {//display correct 
        correctAnswerEl.textContent = "Correct";
        
        timerDisplay();

            if (parseInt(event.target.getAttribute("question-id"))< questionsBank.length-1 && timer>0)
            {
            quizzQuestionDisplay(parseInt(event.target.getAttribute("question-id"))+1);
            }
            else 
            {clearInterval(myTimerVar);
            timerDisplay();
            allDoneDisplay();
            };
        }
    else
        {//display wrong
        timer = timer -10; 
        correctAnswerEl.textContent = "Wrong";
        
        timerDisplay();

            if (parseInt(event.target.getAttribute("question-id"))< questionsBank.length-1 && timer>0)
            {
            quizzQuestionDisplay(parseInt(event.target.getAttribute("question-id"))+1);
            }
            else 
            {clearInterval(myTimerVar);
            timerDisplay();
            allDoneDisplay();
            };
        };
};

// display the questions
var quizzQuestionDisplay = function(i) {
    var questionZoneEl= document.getElementById("question-zone");
    var questionEEl= document.getElementById("question-element");
    questionEEl.remove();
    var sectionEEl = document.createElement("section");
    sectionEEl.id = "question-element";
    sectionEEl.textContent = "";
    questionZoneEl.appendChild(sectionEEl);
    

        // display question
        var questionEl = document.createElement("h2");
        questionEl.id = "question";
        questionEl.textContent = questionsBank[i].question;
        sectionEEl.appendChild(questionEl);
        
        // display answers
        var answerChoices = [questionsBank[i].answer1, questionsBank[i].answer2,questionsBank[i].answer3,questionsBank[i].answer4];
        for (var j = 0; j < answerChoices.length; j++) {
            var answersSelectEl = document.createElement("button");
            answersSelectEl.setAttribute("question-id", i);
            answersSelectEl.setAttribute("answer-id", j);
            answersSelectEl.textContent = answerChoices[j];
            sectionEEl.appendChild(answersSelectEl);
        }

        // listen to choice selection => display correct answer and clear question i
        sectionEEl.addEventListener("click", selectAnswerHandler);

};

// upon clicking Start Quiz
var startQuizButtonHandler = function() {
    // get target element from event -> var targetEl = event.target;
    var myobj = document.getElementById("begin-section");
    if (myobj) {myobj.remove(); };

    var sectionQEl = document.createElement("section");
    sectionQEl.id = "question-zone";
    sectionQEl.textContent = "";
    pageContentEl.appendChild(sectionQEl);

    var sectionEEl = document.createElement("section");
    sectionEEl.id = "question-element";
    sectionEEl.textContent = "";
    sectionQEl.appendChild(sectionEEl);

    var sectionAEl = document.createElement("section");
    sectionAEl.id = "answer-zone";
    sectionAEl.textContent = "";
    pageContentEl.appendChild(sectionAEl);
  
    timer = 75;

    timerDisplay();
    quizzQuestionDisplay(0);
    myTimerVar = setInterval(myTimer, 1000)
};

// for Quiz Start button
begSectionEl.addEventListener("click", startQuizButtonHandler);