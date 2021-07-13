var buttonColours = ["red", "blue", "green", "yellow"];
var started =false;
var level = 0;
  var  numSeq=0;
//step 2 -4
var gamePattern = [];
var userClickedPattern = [];

//Step 1
//alert("Hello");

//step 2

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  playSound(randomChosenColour);

  //7.updating Level
  level = level + 1;
  if (level > 0) {
    $("#level-title").text("Level " + level);
  }


}

function playSound(key) {
  var audio = new Audio("sounds/" + key + ".mp3");
  audio.play();
}



$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  //5

  playSound(userChosenColour);
  animatePress(userChosenColour);
  console.log(gamePattern);
  console.log(userClickedPattern);
  checkAnswer();
});

//6
function animatePress(currentColor) {

  //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

function startOver(){

  level=0;

  //step 2 -4
  gamePattern = [];
  userClickedPattern = [];

}


//7
$(document).on('keypress', function(e) {
 started=true;
  if (started === true &&  level===0) {
    nextSequence();
    $("#level-title").text("Level " + level);
    started = false;
  }

});

//8
function checkAnswer(currentLevel) {
  
  if (gamePattern[numSeq]!=userClickedPattern[numSeq]) {

    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
  setTimeout(function () {
    playSound("wrong");
    $("body").removeClass("game-over");
  }, 200);
  startOver()
  }else {
  numSeq++;
  }
 if (gamePattern.length>=userClickedPattern.length) {
  if (gamePattern[gamePattern.length - 1] === userClickedPattern[gamePattern.length - 1]) {

        userClickedPattern=[];
       setTimeout(function () {
         nextSequence();
         numSeq=0;
       }, 1000);

  }

  }




}
