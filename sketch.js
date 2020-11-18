var monkey, monkey_running, monkey_Image
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_Image = loadImage("obstacle.png");


}



function setup() {
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 20);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  //console.log(ground.x)
  FoodGroup = new Group();
  obstaclesGroup = new Group();

}


function draw() {
  background(255);
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  if (keyDown("space")) {
    // to give velocity to Monkey so that it will jump
    monkey.velocityY = -10;
  }
  // reduce the velocity so it will come down
  monkey.velocityY = monkey.velocityY + 0.8;
  // so that it wont go below ground
  monkey.collide(ground);
  createFood();
  createObstacle();
  if (monkey.isTouching(FoodGroup)) 
  {
      FoodGroup.destroyEach();
      score=score+1;
  }

  drawSprites();

  stroke("black");
  textSize(20);
  fill("red");
  text("Score: " + score, 50, 50);
}

function createFood() {
  if (frameCount % 80 === 0) {
    banana = createSprite(350, 220, 10, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.y = random(150, 250);
    banana.velocityX = -6;
    banana.lifetime = 300;
    FoodGroup.add(banana);
  }
}

function createObstacle() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(160, 310, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}