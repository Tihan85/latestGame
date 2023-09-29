/* All the variables to store before hand */
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
let keyPressed = false;
var level = 0;
count = 0;

/* Random number generating (Step2) */
function nextSequence() {
   var randomNumber = Math.floor(Math.random() * 3);
   var randomChosenColor = buttonColors[randomNumber];
   gamePattern.push(randomChosenColor);
   animations(randomChosenColor);
   level++;
   $("#level-title").html("Level " + level);
 }

/* Animations for when buttons are clicked */
function animations(color){
   var aud = new Audio("./sounds/" + color + ".mp3"); 
   aud.play();
   $("#" + color).animate({opacity: 0.1}, 100).animate({opacity: 1});
};
 
/* Audio for when buttons are pressed: */
$(".btn").click(function () {
   var userChosenColor = $(this).attr("class").split(" ")[1];
   userClickPattern.push(userChosenColor);
   animations(userChosenColor);
   checkAnswer(level);
});

/* Step 6 Starting the game: */
$(document).keypress(function(event) {
   if (!keyPressed) {
      keyPressed = true;
      nextSequence();
      // $("#level-title").html("Level " + level);
   }
});

/* Checking the answers Step 8 */ 
function checkAnswer(currentLevel) {
   var cont = false;
   if (gamePattern[count] == userClickPattern[count]){
      count++;
      if (count == currentLevel) {
         cont = true;
      }
   } else {
      console.log("wrong");
      var wrong = new Audio("./sounds/wrong.mp3");
      wrong.play();
      $("#level-title").html("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      setTimeout(() => {
         $("body").removeClass("game-over");
      }, 200);
      document.body.style.backgroundImage = "url('./sounds/IMG_8558.jpg')"
      setTimeout(() => {
         document.body.style.backgroundImage = "none";
      }, 2000);
      restart();
   }
   if (cont){
      setTimeout(() => {
         nextSequence();
      }, 500);
      userClickPattern = [];
      count = 0;
   }
}

function restart() {
   level = 0;
   count = 0;
   gamePattern = [];
   userClickPattern = [];
   keyPressed = false;
}