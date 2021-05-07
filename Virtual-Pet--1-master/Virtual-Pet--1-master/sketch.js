var database, dog, happyDogImg, foodStock, dogImg, foods, fedTime, lastFed, foodObj, feed, addFood, bathroomImg, gardenImg, bedroomImg, currentTime, gamestate;

function preload(){
    dogImg = loadImage("images/Dog.png")
    happyDogImg= loadImage("images/happydog.png")
    bathroomImg = loadImage("images/Wash Room.png")
    GardenImg = loadImage("images/Garden.png")
    bedroomImg = loadImage("images/Bed Room.png")

}
function setup(){
    database = firebase.database()
    console.log(database)
    createCanvas(500,500);
    dog = createSprite(250,250,10,10);
    dog.addImage("dog", dogImg)
    dog.scale=0.2
    foodStock= database.ref('food');
    foodStock.on("value",readStock)
    foodObj= new Food()
    feed=createButton("Press to Feed")
    feed.position(700,95)
    feed.mousePressed(feedDog)
    addFood=createButton("Add Food")
    addFood.position(800,95)
    addFood.mousePressed(addFoods)    
    fedTime=database.ref('feedTime')
    fedTime.on("value",function(data){
      lastFed=data.val()
    })
}

function draw(){
  currentTime= hour()
  if (currentTime == (lastFed+1)){
    update("playing")
    foodObj.garden()
  }
  else if (currentTime == (lastFed+2)){
    update("sleeping")
    foodObj.bedroom()
  }
  else if (currentTime > (lastFed+2)&& currentTime<=(lastFed+4)){
    update("bathing")
    foodObj.bathroom()
  }
  else{
    update("hungry")
    foodObj.display()
  }
    drawSprites();
}



function readStock(data){
    foods=data.val()
    foodObj.updateFoodStock(foods)
}
function feedDog(){
  dog.addImage(happyDogImg);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gamestate:"hungry"
    
  })
}
function addFoods(){
  foods++
  database.ref('/').update({
    Food:foods
  })
}

function update(state){
  database.ref('/').update({
   gamestate:state
  })
}