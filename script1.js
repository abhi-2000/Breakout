var canvas = document.getElementById("game-screen");
var ctx = canvas.getContext("2d");

const rad=28;
var paddle_width= 190;
var PADDLE_MARGIN_BOTTOM = 20;
var paddle_height = 25;
var leftArrow = false;
var rightArrow = false;
ctx.lineWidth = 3;

const bg= new Image();
bg.src= "bgsi.png";

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
//Defining ball's dimensions
var ball={
     x: canvas.width/2,
     y: paddle.y-rad,
     radius: rad,
     vel: 5,
     dx: 5*(Math.random()*2 -1),
     dy: -5

}
//Drawing ball
function drawball(){
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.radius, 0, Math.PI*2, false);
    ctx.fillStyle= "yellow";
    ctx.fill();
    ctx.strokeStyle= "black";
    ctx.stroke();
    ctx.closePath();
}
//Movement of ball
function moveball(){
    ball.x += ball.dx;
    ball.y += ball.dy;
}
//Condition for collision of ball with canvas edges
function edges(){
    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
        ball.dx = 0-ball.dx;
    }
    if(ball.y - ball.radius < 0){
        ball.dy = 0-ball.dy;
    }
    if(ball.y + ball.radius> canvas.height)
    {
         ball.x = canvas.width/2,
         ball.y= paddle.y-rad,
         ball.dx= 3*(Math.random()*2 -1),
         ball.dy= -3 
    }
}
//Loop to call all functions and execute the game
function loop() {
    ctx.drawImage(bg, 0, 0); 
    //To clear frame for new animation frame
  drawPaddle();
  drawball();
  movePaddle();
  moveball();
  edges();
  requestAnimationFrame(loop); //To request new animation frame at every function call
 
}
loop();