var canvas = document.getElementById("game-screen");
var first = document.getElementById("first-screen");
var ctx = canvas.getContext("2d");
var intro=document.getElementById("intro");
var paddle_width= 190;
var PADDLE_MARGIN_BOTTOM = 20;
var paddle_height = 25;
var leftArrow = false;
var rightArrow = false;


//animation in progress bar
function pointer() {
  var elem = document.getElementById("progress-bar");   
  var width = 1;
  var id = setInterval(frame, 50);
  function frame() {
    if (width >= 75) {
      clearInterval(id);
      alert("Starting Game!!")
      intro.style.display='none';

      first.style.display='block';
    } else {
      elem.style.display="block";
      width++; 
      elem.style.width = width + '%'; 
    }
  }
}
  


// CREATE THE PADDLE
var paddle = {

    x : canvas.width/2 - paddle_width/2,
    y : canvas.height - PADDLE_MARGIN_BOTTOM - paddle_height,
    width : paddle_width,
    height : paddle_height,
    dx :5
}
function drawPaddle(){
  ctx.fillStyle = "#2e3548";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  
  ctx.strokeStyle = "blue";
  ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);

}
// CONTROL THE PADDLE
document.addEventListener("keydown", function(event){
  if(event.keyCode == 37){
      leftArrow = true;
  }else if(event.keyCode == 39){
      rightArrow = true;
  }
});
document.addEventListener("keyup", function(event){
  if(event.keyCode == 37){
      leftArrow = false;
  }else if(event.keyCode == 39){
      rightArrow = false;
  }
});

// MOVE PADDLE
function movePaddle(){

   if(rightArrow && paddle.x + paddle.width < canvas.width){
       paddle.x += paddle.dx;
   }else if(leftArrow && paddle.x>0){
       paddle.x -= paddle.dx;
   }
} 

function loop() {
  drawPaddle();
  movePaddle();
  requestAnimationFrame(loop);
  
}
loop();

// new game screen
var play_mg=document.getElementById("play");
var pause_mg=document.getElementById("pause");
function play(){
    play_mg.style.display="none";
    pause_mg.style.display="block";
    var s = document.getElementById('intro-sound');
            s.play();
}

function pause(){
    play_mg.style.display="block";
    pause_mg.style.display="none";
    var s = document.getElementById('intro-sound');
    s.pause();
}