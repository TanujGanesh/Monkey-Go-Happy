
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 100;
var bk;
var ground;
var survivaltime = 0;
var gmst = "start";
var emky;
var gmor,gmov;
var mgh,mghi;

function preload(){
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bk = loadImage("Bkmgh.jpg"); 
  emky = loadImage("sprite_0.png");
  gmor = loadImage("gameover.png");
  mgh = loadImage("mgh.jpg");
}



function setup() {
  createCanvas(600,400);
  background = createSprite(300,50,20,20);
  background.addImage(bk);
  background.scale = 2;
  background.visible = false;
  
  ground = createSprite(300,385,600,10);
  ground.visible = false;
  
  monkey = createSprite(50,350,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  monkey.visible = false;
  
  endmonkey = createSprite(50,350,20,20);
  endmonkey.addImage(emky);
  endmonkey.scale = 0.1;
  endmonkey.rotation = 90;
  endmonkey.visible = false;
  
  gmov = createSprite(300,200,20,20);
  gmov.addImage(gmor);
  gmov.visible = false;
  
  mghi = createSprite(300,150,20,20);
  mghi.addImage(mgh);
  mghi.scale = 0.8
  
  
 FoodGroup = new Group();
 obstacleGroup = new Group(); 
  fill("white");
   textSize(20);
}


function draw() {
  if(gmst==="start"){
    fill("black");
    text("Monkey needs energy to survive, feed it properly!!",75,310);
    text("Use space to jump",200,335)
    text("Energy +/- : Banana = +5, rock = -10, jump = -3, walking = -1/sec",20,360);
    text("To feed the monkey press 's' to start",150,390);
    if(keyDown("s")){
      gmst = "play";
      mghi.visible = false;
      background.visible = true;
      monkey.visible = true;
    }
  }
   if(gmst==="play"){
   if(background.x<0){
    background.x = background.width/2;
    }
   background.velocityX = -6;
   
   monkey.collide(ground);
  
   if(keyWentUp("space")&& monkey.y>200){
     monkey.velocityY = -20
    //monkey.y = monkey.y +30
    score = score -3;
    }
    monkey.velocityY = monkey.velocityY +1;
   
    monkey.collide(ground);
    if(monkey.collide(ground)===true) {
     monkey.velocityY=0;
   }
    
   if(frameCount%175===0){
     Food();
   }
   if(frameCount%300===0){
     Obstacles();
   }
   if(monkey.isTouching(FoodGroup)){
     score = score +5;
     FoodGroup.destroyEach();
   }
   if(monkey.isTouching(obstacleGroup)){
     score = score -10;
     obstacleGroup.destroyEach();
   }
   if(frameCount%60===0){
     score = score -1; 
   }
   if(score<0){
     gmst = "end";
     score = 0;
   } 
   if(frameCount%30===0){
     survivaltime = survivaltime +1;
   }  
     
 }
   drawSprites(); 
  if(gmst==="end"){
    background.velocityX = 0;
    monkey.velocityY = 0;
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    endmonkey.visible = true;
    monkey.visible = false;
    gmov.visible = true;
    fill("white");
    text("Press r to restart",100,350);
    if(keyDown("r")){
      reset();
    }
    
  }
 
  
  text("Survival Time : "+survivaltime,400,50);
  text("Energy : "+score,50,50);
}

function Food(){
    banana = createSprite(650,Math.round(random(150,250)),20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 250;
    //banana.debug = true;
    banana.setCollider("rectangle",0,0,banana.width,banana.height/2);
    FoodGroup.add(banana);
}

function Obstacles(){
  obstacle = createSprite(650,351,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.13;
  obstacle.velocityX = -5;
  obstacle.lifetime = 250;
  //obstacle.debug = true;
  obstacle.setCollider("circle",0,0,obstacle.height/2);
  obstacleGroup.add(obstacle);
}

function reset(){
  gmst = "play";
  gmov.visible = false;
  endmonkey.visible = false;
  monkey.visible = true;
  score = 100;
  survivaltime = 0;
  setFrameCount = 0;
}
