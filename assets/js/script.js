// will later hold the scores
var currentHighScores= [];

// create a variable to hold the time
var timer = 0;
var myTimerVar = null;

// create array to hold questions, possible answers and correct answer
var questionsBank = [];

var questionDataObj0 = {
    question: "Q0",
    answer1: "A00",
    answer2: "A01",
    answer3: "A02", 
    answer4: "A03",
    correctAnswerIndex: 1
  };
var questionDataObj1 = {
    question: "Q1",
    answer1: "A10",
    answer2: "A11",
    answer3: "A12", 
    answer4: "A13",
    correctAnswerIndex: 3
};

questionsBank.push(questionDataObj0);
questionsBank.push(questionDataObj1);

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

// display high scores
var highScoresDisplay = function() {
    var scoreZoneEl= document.getElementById("high-scores-zone");
    if (localStorage.getItem("initials-score"))
    { 
        var currentHighScoresD = JSON.parse(localStorage.getItem("initials-score"));
        for (var i = 0; i < currentHighScoresD.length; i++) {
                j=i+1;
                var scoreEl = document.createElement("li");
                scoreEl.textContent= j +". "+ currentHighScoresD[i].initials +" "+currentHighScoresD[i].score ;
                scoreZoneEl.appendChild(scoreEl);
        };       
                
    };
};

// display All Done Page
var allDoneDisplay = function() {
    var questionZoneEl= document.getElementById("question-zone");
    questionZoneEl.remove();

    var sectionEl = document.createElement("section");
    sectionEl.id = "all-done";
    sectionEl.innerHTML = "<h2>All Done!</h2><p>Your final score is <span id='score'></span>.</p><p>Enter initials: </p>";
    pageContentEl.appendChild(sectionEl);

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
    var questionZoneEl= document.getElementById("question-zone");
    var correctAnswerEl = document.createElement("p");
    correctAnswerEl.id = "correct-answer";
    if (event.target.getAttribute("answer-id") == questionsBank[event.target.getAttribute("question-id")].correctAnswerIndex)
        {//display correct 
        correctAnswerEl.textContent = "Correct";
        questionZoneEl.appendChild(correctAnswerEl);
     
        setTimeout(timerDisplay,3000);

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
        questionZoneEl.appendChild(correctAnswerEl);
 
        setTimeout(timerDisplay,3000);

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
    questionZoneEl.remove();
    var sectionEl = document.createElement("section");
    sectionEl.id = "question-zone";
    sectionEl.textContent = "";
    pageContentEl.appendChild(sectionEl);
    var questionZoneEl= document.getElementById("question-zone");

        // display question
        var questionEl = document.createElement("h2");
        questionEl.id = "question";
        questionEl.textContent = questionsBank[i].question;
        questionZoneEl.appendChild(questionEl);
        
        // display answers
        var answerChoices = [questionsBank[i].answer1, questionsBank[i].answer2,questionsBank[i].answer3,questionsBank[i].answer4];
        for (var j = 0; j < answerChoices.length; j++) {
            var answersSelectEl = document.createElement("button");
            answersSelectEl.setAttribute("question-id", i);
            answersSelectEl.setAttribute("answer-id", j);
            answersSelectEl.textContent = answerChoices[j];
            questionZoneEl.appendChild(answersSelectEl);
        }

        // listen to choice selection => display correct answer and clear question i
        questionZoneEl.addEventListener("click", selectAnswerHandler);

};

// upon clicking Start Quiz
var startQuizButtonHandler = function() {
    // get target element from event -> var targetEl = event.target;
    var myobj = document.getElementById("begin-section");
    if (myobj) {myobj.remove(); };
    var sectionEl = document.createElement("section");
    sectionEl.id = "question-zone";
    sectionEl.textContent = "";
    pageContentEl.appendChild(sectionEl);
  
    timer = 75;

    timerDisplay();
    quizzQuestionDisplay(0);
    myTimerVar = setInterval(myTimer, 1000)
};

// for Quiz Start button
begSectionEl.addEventListener("click", startQuizButtonHandler);

// display high scores in a secondary page
highScoresDisplay();