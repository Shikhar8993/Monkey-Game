
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var count=0;
var invisibleground;
var bananaGroup,obstacleGroup;
var Play=1;
var End=0;
var gameState=Play;
var gameOver,gameOverImage;
var restart,restartImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_6.png","sprite_5.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  gameOverImage=loadImage("gameOver.png");
  
  restartImage=loadImage("restart.png")

}



function setup() {
  createCanvas(600,250);
  
  monkey = createSprite(50,200,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.09;
  
 
  
  ground = createSprite(300,210,1200,10);
  ground.x = ground.width /2;
  
  gameOver=createSprite(300,100);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.5;
  
  restart = createSprite(300,140);
  restart.addImage(restartImage);
  restart.scale=0.5;
  
  
 
obstacleGroup = new Group();
 bananaGroup = new Group();
  
}


function draw() {
 background(220);
  
   text("Survival Time : "+ count,300,30);
  
  if(gameState === Play){
   
   count=count + Math.round(getFrameRate()/62);
    
     gameOver.visible=false;
     restart.visible=false;
  
  if(keyDown("space")&& monkey.y >= 160){
   monkey.velocityY=-12;
 }
     monkey.velocityY = monkey.velocityY + 0.8;
    
    if(obstacleGroup.isTouching(monkey)){
      
     gameState=End;
      
    }
    
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
    }
     
    
    
    spawnBanana();
  spawnObstacle();
  
  }
  
  if(gameState===End){
    
     obstacleGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
    
    gameOver.visible=true;
    restart.visible=true;
    
    if(mousePressedOver(restart)) {
      reset();
    }
   
     
  }
   
   
  
 
  
 
  monkey.collide(ground) ;
  
  
  
 
  
  
  
  drawSprites();
  
}

function reset(){
  gameState=1;
  
  

  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  
  score=0;
}

function spawnBanana() {

  if (frameCount % 230  === 0) {
     banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,110));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(3+count/20);
    
   
    banana.lifetime = 200;
    
    
    banana.depth = monkey.depth;
    banana.depth = monkey.depth + 1;
    
    
    
    
   bananaGroup.add(banana);
  }
}

function spawnObstacle() {
  
  if (frameCount % 300  === 0) {
     obstacle = createSprite(600,130,40,10);
    obstacle.y= Math.round(random(190,190));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.08;
    obstacle.velocityX = -(5+count/10);
    
   
    obstacle.lifetime = 200;
    
    
    
    
    
    
    
   obstacleGroup.add(obstacle);
  }
}





























