var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})
function nextSequence() {
    level++;
    userClickedPattern=[];
    $("#level-title").text("Level " + level);
    var randNum = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randNum];
    gamePattern.push(randomChosenColor);
    playsound(randomChosenColor);
}


$(".btn").click(function () {
    var buttonid = this.id;
    animatePress(buttonid);
    playsound(buttonid);
    userClickedPattern.push(buttonid);
    checkAnswer(userClickedPattern.lastIndexOf(buttonid));
});


function playsound(name) {
    $("#" + name).fadeOut(100).fadeIn(100).fadeIn(100);
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => { $("#" + currentColor).removeClass("pressed"); }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        var count=0;
        for(var i=0;i<userClickedPattern.length;i++){
            if(userClickedPattern[i]===gamePattern[i]){
                count++;
            }
        }
        if(count === gamePattern.length){
            console.log("success");
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(()=> {$("body").removeClass("game-over");},200);
        $("h1").text("Game Over\n Press any Key to Restart");
        startOver();
    }

    function startOver(){
        level=0;
        gamePattern=[];
        started = false;
    }

}