var PLAY = 1;
var END = 0;
var gameState=PLAY;

var tom;
var river;
var bg;
var coinGroup,coinImage;
var jerryGroup,jerryImage;
var logGroup,logImage;
var score;
var jerryCount;
var coins;
var gameOverImg,restartImg;

function preload(){
bg=loadImage("images/bg.jpeg");
tom=loadImage("images/tom.png");
coinImage=loadImage("images/coin.jpg");
jerryImage=loadImage("images/jerry.jpg");
logImage=loadImage("images/log.png");


restartImg = loadImage("images/restart.png");
gameOverImg = loadImage("images/gameOver.png");
}
function setup(){
  createCanvas(400,600);

  bg=createSprite(0,0,400,600);
  bg.y=bg.height/2;

  tom=createSprite(195,580,20,20);
  river=createSprite(0,350,400,70);
  river.shapecolor="blue";

  gameOver = createSprite(200,300);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(200,350);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
 
  coinGroup=createGroup();
  jerryGroup=createGroup();
  logGroup=createGroup();

  score=0;
  jerryCount=0;
  coins=0;
}
function draw(){

background(bg);

text("Score:"+score,330,50);
text("Jerry Caught:"+jerryCount,330,100);
text("Score:"+score,330,50);

if(gameState===PLAY){

  gameOver.visible = false;
  restart.visible = false;

bg.velocityY=-(4+3*score/100);
score=score+Math.round(getFrameRate()/60);

if(bg.y<0){
  bg.x = bg.height/2;
}
if(keyDown("rightArrow")){
  tom.x=tom.x+25;
}

if(keyDown("leftArrow")){
  tom.x=tom.x-25;
}
spawnCoin();
spawnLog();
spawnJerry();

if(log.isTouching(tom)){
  gameState=END;
}
if(jerry.isTouching(tom)){
  jerryCount=jerryCount+1;
}
if(coin.isTouching(tom)){
  jerryCount=jerryCount+1;
}
}
else if(gameState===END){

  gameOver.visible = true;
  restart.visible = true;

bg.velocityY=0;
tom.velocityY=0;

coinGroup.setLifetimeEach(-1);
logGroup.setLifetimeEach(-1);
jerry.setLifetimeEach(-1);

coinGroup.setVelocityYEach(0); 
logGroup.setVelocityYEach(0); 
jerryGroup.setVelocityYEach(0); 

} 

if(mousePressedOver(restart)) {
  reset();
}

drawSprites();
}
function reset(){
  
  gameState=PLAY;
    logGroup.destroyEach();
    jerryGroup.destroyEach();
    coinGroup.destroyEach();
   score=0;
 }
function spawnLog(){
  if(frameCount%60===0){
    var log=createSprite(200,530,40,10);
    log.y=Math.round(random(80,530));
    log.addImage("images/log.png");
    log.velocityY=-3;

    log.lifetimee=200;

    log.depth=tom.depth;
    tom.depth=tom.depth + 1;

    logGroup.add(log);
  }
}
 
  function spawnCoin(){
    if(frameCount%60===0){
      var coin=createSprite(300,530,20,20);
      coin.y=Math.round(random(40,530));
      coin.addImage("images/coin.jpg");
      coin.velocityY=-3;
  
      coin.lifetimee=200;
  
      coin.depth=tom.depth;
      tom.depth=tom.depth + 1;
  
      coinGroup.add(coin);
    }
  }
    function spawnJerry(){
      if(frameCount%60===0){
        var jerry=createSprite(200,530,40,10);
        jerry.y=Math.round(random(80,530));
        jerry.addImage("images/jerry.jpg");
        jerry.velocityY=-3;
    
        jerry.lifetimee=200;
    
        jerry.depth=jerry.depth;
        tom.depth=tom.depth + 1;
    
        jerryGroup.add(jerry);
      }
}
