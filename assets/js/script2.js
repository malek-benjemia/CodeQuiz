 // detect the clear button
 var clearButtonEl= document.getElementById("clear-scores");

 // display high scores
 var highScoresDisplay = function() {
     var scoreZoneEl= document.getElementById("high-scores-zone");
     var scoreUlEl = document.createElement("ul");
     scoreUlEl.id = "score-list";
     scoreZoneEl.appendChild(scoreUlEl);

     if (localStorage.getItem("initials-score"))
     { 
         var currentHighScoresD = JSON.parse(localStorage.getItem("initials-score"));
         for (var i = 0; i < currentHighScoresD.length; i++) {
                 j=i+1;
                 var scoreEl = document.createElement("li");
                 scoreEl.textContent= j +". "+ currentHighScoresD[i].initials +" "+currentHighScoresD[i].score ;
                 scoreUlEl.appendChild(scoreEl);
         };       
                 
     };
 };

 // clear high scores
 var clearScoresHandler = function() {
     if (localStorage.getItem("initials-score"))
     { 
         localStorage.setItem("initials-score",[]);

         var scoreUlEl= document.getElementById("score-list");
         scoreUlEl.remove();

         var scoreZoneEl= document.getElementById("high-scores-zone");
         var scoreUlEl = document.createElement("ul");
         scoreUlEl.id = "score-list";
         scoreZoneEl.appendChild(scoreUlEl);
     };
 };

 // display high scores 
 highScoresDisplay();

 // clear the high scores
 clearButtonEl.addEventListener("click", clearScoresHandler);