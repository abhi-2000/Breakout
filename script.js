var canvas = document.getElementById("game-screen");
var ctx = canvas.getContext("2d");

const rad=22;
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

//To draw paddle
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
//To define ball dimensions
var ball={
     x: canvas.width/2,
     y: paddle.y-rad,
     radius: rad,
     vel: 5,
     dx: 5*(Math.random()*2 -1),
     dy: -5

}

//TO DRAW BALL
function drawball(){
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.radius, 0, Math.PI*2, false);
    ctx.fillStyle= "yellow";
    ctx.fill();
    ctx.strokeStyle= "black";
    ctx.stroke();
    ctx.closePath();
}
//TO MOVE BALL
function moveball(){
    ball.x += ball.dx;
    ball.y += ball.dy;
}
//CONDITION FOR COLLISION AT EDGES
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
         ball.dx= 5*(Math.random()*2 -1),
         ball.dy= -5
    }
}

//collision of ball and paddle
function paddlecollision(){
    if(ball.x < paddle.x +paddle.width && ball.x >paddle.x && ball.y+ball.radius >paddle.y )
    {
        //To find the colllision point
        var pt= ball.x-(paddle.x+ paddle.width/2);

  //To get values between 1 &-1
        pt= pt/ (paddle.width/2);

       //To calculate angle
      var angle= pt* Math.PI/3;

       //Defining speed after collision
       ball.dx= ball.vel * Math.sin(angle);
      ball.dy= -ball.vel *Math.cos(angle);
    //   ball.dx=0-ball.dx;
    //   ball.dy=0-ball.dy;
    }
}
//BRICK DIMENSIONS 
var brick={
    row:6,
    col: 14,
    width: 65, height:25, left: 6, top:5,
    margintop: 60,  
    boundary: "black"
}
let bricks=[];
//Brick wall dimensions and configurations
function configbricks(){
 for(let i=0; i< brick.row; i++){
        bricks[i]=[];
        for(let j=0;j< brick.col;j++){
            bricks[i][j]={
                x: j* (brick.left + brick.width)+ brick.left,//x-COORDINATE OF BRICK
                y: i*(brick.top+ brick.height)+ brick.top+ brick.margintop,//y-COORDINATE OF BRICK
               broken: false
            }
        }
    }
}
configbricks();

//To construct colored bricks
function getcolor(start,end){
    let fraction=start/end;
    let r,g,b=0;
    //for red to yellow transition
    if(fraction<=0.67){
    r=255;
    g=255 * fraction/0.67;
}
//for yellow to green transition
else{
    r=255*(1-fraction)/0.33;
    g=255;
}
    return "rgb("+r+","+g+","+b+")"; //to return rgb value for filling brick
}

//To draw bricks
function drawbricks()
{
    for(let i=0; i< brick.row; i++)
    {
        let start,end;
        end= brick.row*0.5-1;//to give 
        for(let j=0;j< brick.col;j++){
        start=Math.floor(i*0.5);
            if(!(bricks[i][j].broken))
            {
             ctx.fillStyle = getcolor(start,end);
               ctx.fillRect(bricks[i][j].x, bricks[i][j].y,brick.width,brick.height);
                ctx.strokeStyle= brick.boundary;
               ctx.strokeRect(bricks[i][j].x,bricks[i][j].y,brick.width,brick.height);
            }
        }
    }
}

function loop() {
    ctx.drawImage(bg, 0, 0);//To clear screen and draw the bg image
  drawPaddle();
  drawball();
  movePaddle();
   moveball();
  edges();
paddlecollision();
  drawbricks();
  requestAnimationFrame(loop); //To request a new animation frame on every function call
 
}
loop();


