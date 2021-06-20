var PLAY = 1;
var END = 0;
var gameState = "wait";
var harry;
var Background;
var play;
var restart;

function preload(){
 harryImg = loadImage("harry.png");
 bg = loadImage("Quidditch1.jpeg");
 bludgerImg = loadImage("bludger.png");
 quaffleImg = loadImage("quaffle.png");
 snitchImg = loadImage("snitch.png");
 dementorImg = loadImage("dementor.png");
 playImg = loadImage("play.png");
 restartImg = loadImage("restart.png");
}

function setup() {
 createCanvas(displayWidth, 590);
  
 Background = createSprite(700,300,30,30);
 Background.addImage(bg);
 Background.scale = 1;
  
 harry = createSprite(700,50,20,20);
 harry.addImage(harryImg);
 harry.scale = 0.3;
 //harry.debug = true;
 harry.setCollider("circle",0,10,120);
  
 play = createSprite(700,300,20,20);
 play.addImage(playImg);
 play.scale = 0.1;
 play.visible = true;
  
 restart = createSprite(700,300,20,20);
 restart.addImage(restartImg);
 restart.scale = 0.4;
 restart.visible = false;
  
 invisibleGround = createSprite(600,600,1200,10);
 invisibleGround.visible = false;
  
 invisibleSky = createSprite(250,-2,500,10);
 invisibleSky.visible = false;
  
 obstacleGroup = new Group();
}
var gravity = 0.5;
var score = 0;
   
function draw() {
  background("white")
  //harry.y = 150;
  if(gameState === "wait") {
    harry.y = 150;
    harry.collide(invisibleGround)
  }
   if(touches.length>0 || mousePressedOver(play)) {
     gameState = PLAY;
     touches = [];
     play.visible = false;
   }
    if(gameState === PLAY) {
      //harry.bounceOff(invisibleGround);
      //harry.bounceOff(invisibleSky);
      console.log("PLAY")
      restart.visible = false
      spawnObstacles();
      harry.visible = true
      harry.collide(invisibleGround)
      
      if(keyDown("space") || touches.length>0 ){
        harry.velocityY = -5;
        touches = [];
       // harry.velocityY = harry.velocityY + gravity;
       
    }
      harry.velocityY = harry.velocityY + gravity;
      if(harry.isTouching(obstacleGroup)) {
         gameState = END;
         harry.visible = false
         restart.visible = true;

         if(frameCount%250 === 0) {
           textSize(15)
           textFont("Comic Sans MS")
           text("Score: " + score+1, 900, 50)
           
         }
    
      }
  }
  
  if(gameState === END) {
    harry.velocityY = 0;
    console.log('END')
    //obstacleGroup.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setVisibleEach(false);
    obstacleGroup.setLifetimeEach(-1);
    //gravity = 0;
    if(touches.length>0 || mousePressedOver(restart)) {
      obstacleGroup.setLifetimeEach(0);
      gameState = PLAY;
      console.log("Button pressed")
    }
  }
  if(touches.length>0 || keyDown("R")) {
    gameState = PLAY;
    touches = [];
  }
  harry.velocityY = harry.velocityY + gravity;
 drawSprites();
 
 
}
function spawnObstacles() {
  if(frameCount%35 === 0){
  var obstacle = createSprite(1230,100,20,20);
  obstacle.y = Math.round(random(85, 600))
  obstacle.velocityX = -(6+score/65);
  obstacle.lifetime = 185;
  harry.depth = obstacle.depth;
  harry.depth = harry.depth+1;
  var rand = Math.round(random(1,3));
    if(rand === 1) {
      obstacle.addImage(bludgerImg);
      obstacle.scale = 0.3;
      //obstacle.debug = true;
      obstacle.setCollider("circle",-2,20,100)
    }
   if(rand === 2) {
    obstacle.addImage(quaffleImg)
    obstacle.scale = 0.3;
    //obstacle.debug = true;
    obstacle.setCollider("circle",-2,20,100)
    }
  if(rand === 3) {
    obstacle.addImage(dementorImg)
    obstacle.scale = 0.9;
    //obstacle.debug = true;
    obstacle.setCollider("circle",-2,20,100)
  }
    
    obstacleGroup.add(obstacle)
    
  }
}
