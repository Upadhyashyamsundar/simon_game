var buttonColors=["red","green","yellow","blue"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

$(document).keypress(function(){
  if(!started){


  nextSequence();
  started=true;
}
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatepress(userChosenColour);

    checkans(userClickedPattern.length-1);
});

function nextSequence(){
  userClickedPattern = [];
  level++;
  var random=Math.floor(Math.random() * 4);
  var randomChoosenColor=buttonColors[random];
  gamePattern.push(randomChoosenColor);

  $("h1").text("Level "+ level);

  $("#"+randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChoosenColor);



}


function checkans(currentLevel){

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}


function animatepress(currentColor){

  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
     $("#" + currentColor).removeClass("pressed");
   },100);
}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play()
}

function startOver(){

  started=false;
  level=0;
  gamePattern=[];
}
