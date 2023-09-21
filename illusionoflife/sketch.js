let boxHeight = 20; 
let boxWidth = 20; 
let xPos = 200; 
let yPos = 400; 
let isSquishing = false; 
let isUnsquish = false; 
let isJumping = false; 
let isEnding = false; 

//JUMPING PHYSICS DEPENDENCIES
let dy = 0; 
let dx = 0; 

function setup() {
  createCanvas(400, 400);
  rectMode(CORNERS);
  //ddx = random(5);
  //ddy = 2;
}

function draw() {
  background(220);
  rect(xPos-(boxWidth/2),yPos-boxHeight,xPos+(boxWidth/2),yPos);
  if(isSquishing){
    dy = 10; 
    //dx = 1.5; 
    if(boxHeight > 6){
      boxHeight -= 2; 
    }
    if(boxWidth < 34){
      boxWidth += 2; 
    }
    else{
      isSquishing = false; 
      isUnsquish = true; 
      isJumping = false; 
      isEnding = false;
    }
  }
  if(isUnsquish){
    if(boxHeight < 36){
      boxHeight += 10; 
    }
    if(boxWidth > 20){
      boxWidth -= 5; 
    }
    else{
      isSquishing = false; 
      isUnsquish = false; 
      isJumping = true; 
      isEnding = false;
    }
  }
  if(isJumping){
    console.log(yPos);
    yPos -= dy; 
    xPos += dx; 
    dy -= 0.2;
    if(round(yPos) == 400){
      isEnding = true; 
      isSquishing = false;
      isUnsquish = false; 
      isJumping = false;
    }
  }
  if(isEnding){
    if(boxHeight != 20){
      boxHeight -= 4;
    }
    else{
      isEnding = false; 
      isSquishing = false;
      isUnsquish = false; 
      isJumping = false;
    }
  }
}

function mousePressed(){
  if(isEnding == false && isSquishing == false && isUnsquish == false && isJumping == false){
    isSquishing = true; 
    dx = (mouseX-xPos)/100;
  }
}
