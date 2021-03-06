var canvas = document.getElementById("game-screen");
var ctx = canvas.getContext("2d");
var first = document.getElementById("first-screen");
var list=document.getElementById("list");

var intro=document.getElementById("intro");
var GAME_OVER=false;
var rad=25;
var end=document.getElementById("gameover");
var lose=document.getElementById("youlose");
var won=document.getElementById("won-img");

var paddle_width= 190;
var PADDLE_MARGIN_BOTTOM = 20;
var paddle_height = 25;
var leftArrow = false;
var rightArrow = false;
ctx.lineWidth = 3;
var booster=false,booster1=false,booster2=false;
var y=30,x=90,x1=200,y1=30,x2=250, y2=30;

//Image and Audio object declaration
var bg= new Image();
bg.src= "images/bgsi.png";

var score=new Image();
score.src="images/score.jpg";

var level= new Image();
level.src= "images/level.png";

var size= new Image();
size.src= "images/bomb.png";

var life= new Image();
life.src= "images/life.png";

var speed = new Image();
speed.src = "images/speed.png";

var sound = new Image();
sound.src="images/soundon.png";

var gamewin = new Audio();
gamewin.src="audio/gamewin.mp3";

var gameover = new Audio();
gameover.src="audio/gameover.mp3";

var paddlehit=new Audio();
paddlehit.src= "audio/paddlehit.mp3";

var boostertaken=new Audio();
boostertaken.src= "audio/booster.mp3";

var brickhit=new Audio();
brickhit.src= "audio/brick.mp3";

var levup=new Audio();
levup.src= "audio/levup.mp3";


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

function clearintro()
{
    first.style.display="none";
    canvas.style.display="block";
    loop();
}
//game stats
function stats(){
    ctx.fillStyle="black";
    ctx.font= "30px Georgia";
    ctx.fillText("Score: "+SCORE, 58,40);
    ctx.drawImage(score,12, 7, width= 42, height= 45); //To display score icon
     
    
    ctx.fillStyle="black";
    ctx.font= "30px Georgia";
    ctx.fillText("Level: "+LEVEL, 420,40);
    ctx.drawImage(level,360, 2, width= 57, height= 57); //To display level icon

    ctx.fillStyle="black";
    ctx.font= "30px Georgia";
    ctx.fillText("Life: "+LIFE, 830,40);
    ctx.drawImage(life,777, 2, width= 50, height= 55); //To display life icon


}



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

// CREATE THE PADDLE
var paddle = {

    x : canvas.width/2 - paddle_width/2,
    y : canvas.height - PADDLE_MARGIN_BOTTOM - paddle_height,
    width : paddle_width,
    height : paddle_height,
    dx :8
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
    if(ball.y - ball.radius < 70){
        ball.dy = 0-ball.dy;
    }
    if(ball.y + ball.radius> canvas.height)
    {
        LIFE--;
        reset();
    }
}

function reset()
{
     ball.x = canvas.width/2;
         ball.y= paddle.y-rad;
      ball.dx= 5*(Math.random()*2 -1);
          ball.dy= -5;
        
}
//collision of ball and paddle
function paddlecollision(){
    if(ball.x < paddle.x +paddle.width && ball.x >paddle.x && ball.y+ball.radius >paddle.y )
    {
        paddlehit.play();
        //To find the colllision point
        var pt= ball.x-(paddle.x+ paddle.width/2);

  //To get values between 1 &-1
        pt= pt/ (paddle.width/2);

       //To calculate angle
      var angle= pt* Math.PI/3;

       //Defining speed after collision
       ball.dx= ball.vel * Math.sin(angle);
      ball.dy= -ball.vel *Math.cos(angle);
    }
}
//BRICK DIMENSIONS 
var brick={
    row:5,
    col: 14,
    width: 65, height:25, left: 6, top:5,
    margintop: 70,  
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

// ball brick collision
var SCORE=0;
function ballBrickCollision(){
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.col; c++){
            let b = bricks[r][c];
            // if the brick isn't broken
            if(!(b.broken)){
                if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height){
                    ball.dy = - ball.dy;
                    brickhit.play();
                    SCORE+=10;
                    b.broken = true; // the brick is broken
                }
            }
        }
    }
}
//To add boosters
function boosters(){
    if(SCORE>200&&SCORE<700&&booster==false){
    ctx.drawImage(size,x, y, width= 70, height= 60);
    y+=2;
    if(y+55==paddle.y&& x+60>=paddle.x && x<=paddle.x+paddle.width){
        booster= true;
        ball.radius=32;
        boostertaken.play();
    } }  
    if(SCORE>1000&&SCORE<1540&&booster==false){
        ctx.drawImage(size,x, y, width= 70, height= 60);
        y+=2;
        if(y+55==paddle.y&& x+60>=paddle.x && x<=paddle.x+paddle.width){
        booster= true;
            ball.radius=32;
            boostertaken.play();
        } 
    }
    if(SCORE>1800&&booster==false){
        ctx.drawImage(size,x, y, width= 70, height= 60);
        y+=2;
        if(y+55==paddle.y&& x+60>=paddle.x && x<=paddle.x+paddle.width){
            booster=true;
            ball.radius=32;
            boostertaken.play();
        } 
    }
    if(SCORE>500&&SCORE<700&&booster1==false){
        ctx.drawImage(life,x1, y1, width= 70, height= 60);
        y1+=2;
        ball.radius=25;
        if(y1+55==paddle.y&& x1+60>=paddle.x && x1<=paddle.x+paddle.width){
            booster1=true;
            LIFE++;
            boostertaken.play();
        }      
        }
        if(SCORE>1500 &&SCORE<1540 && booster1==false){
            ctx.drawImage(life,x1, y1, width= 70, height= 60);
            y1+=2;
            ball.radius=25;
            if(y1+60==paddle.y&& x1+70>=paddle.x && x1<=paddle.x+paddle.width){
                booster1=true;
                LIFE++;
                boostertaken.play();
            }      
            }
            if(SCORE>2000 && booster1==false){
                ctx.drawImage(life,x1, y1, width= 70, height= 60);
                y1+=2;
                ball.radius=25;
                if(y1+55==paddle.y&& x1+60>=paddle.x && x1<=paddle.x+paddle.width){
                    booster1=true;
                    LIFE++;
                    boostertaken.play();
                }      
                }

        if(SCORE>400&&SCORE<700 && booster2==false){
            ctx.drawImage(speed,x2, y2, width= 80, height= 80);
            y2+=2;
            if(y2+80==paddle.y&& x2+80>=paddle.x && x2<=paddle.x+paddle.width){
                booster2=true;
                ball.vel=  ball.vel*2;
                boostertaken.play();
                
            }      
            }
            if(SCORE>1250&&SCORE<1540&&booster2==false){
                ctx.drawImage(speed,x2, y2, width= 80, height= 80);
                y2+=2;
                if(y2+80==paddle.y&& x2+80>=paddle.x && x2<=paddle.x+paddle.width){
                    booster2=true;
                    ball.vel=  ball.vel*2;
                    boostertaken.play(); 
                }      
                }
}
//Booster fn over


function loop() {

 ctx.drawImage(bg, 0, 0);//To clear screen and draw the bg image
  drawPaddle();
  drawball();
  movePaddle();
   moveball();
  edges();
 paddlecollision();
  drawbricks();
ballBrickCollision();
boosters();
stats();
levelUp();
life_loss();
if(! GAME_OVER)
requestAnimationFrame(loop); //To request a new animation frame on every function call
 
}


var LIFE=3;
function life_loss()
{

if(LIFE<0){
    GAME_OVER=true;
    end.style.display="block";
    won.style.display="none";
    gameover.play();
    
var final_score=SCORE;
var print_score=document.getElementById("score");
print_score.innerHTML="Your Score: "+final_score;
}

}


//level up function
var LEVEL=1;
var MAX_LEVEL=3;
function levelUp()
 {
     let isLevelDone = true;
    
     // check if all the bricks are broken
     for(var r = 0; r < brick.row; r++){
        for(var c = 0; c < brick.col; c++){
            isLevelDone = isLevelDone &&  bricks[r][c].broken;
            var final_score=SCORE;
            var print_score=document.getElementById("score");
            print_score.innerHTML="Your Score: "+final_score;
            
        }
     }
    
     if(isLevelDone)
     {
        booster=false;
        y=30,x=90;
        x1=200,y1=30;
        x2=250, y2=30;
        levup.play();
        if(LEVEL >= MAX_LEVEL){
            GAME_OVER = true;
            end.style.display="block";
            lose.style.display="none";
            gamewin.play();
    
            return;
        }
        reset();    
        alert("Next level on the way... Be Ready !!");
        brick.row++;
        configbricks();
        ball.vel += 1;
       reset();
        LEVEL++;
     }
    }
  function restart(){
    location.reload();
}

//how to play
function how2play(){
list.style.display="block";
first.style.display="none";
}

function back(){
    list.style.display="none";
    first.style.display="block";
    
}
const soundmute= document.getElementById("sound");
soundmute.addEventListener("click",mute);
function mute(){
    let imgsrc=soundmute.getAttribute("src");
  let sound= imgsrc=="images/soundon.png"?"images/soundoff.jpg": "images/soundon.png";

soundmute.setAttribute("src",sound);
gamewin.muted=gamewin.muted?false:true;
gameover.muted=gameover.muted?false:true;
paddlehit.muted=paddlehit.muted?false:true;
boostertaken.muted=boostertaken.muted?false:true;
brickhit.muted=brickhit.muted?false:true;
levup.muted=levup.muted?false:true;



}