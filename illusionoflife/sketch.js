let boxHeight = 20; //height var 
let boxWidth = 20; //Width var 
let xPos = 200; //X Positioning
let yPos = 400; //Y Positioning 
let isSquishing = false; //Flag for compressing box
let isUnsquish = false; //Flag for decompressing box 
let isJumping = false; //Flag for while jumping 
let isEnding = false; //Flag for landing

//JUMPING PHYSICS DEPENDENCIES
let dy = 0; 
let dx = 0; 

function setup() {
  createCanvas(400, 400);
  rectMode(CORNERS);
}

function draw() {
  background(220);
  rect(xPos-(boxWidth/2),yPos-boxHeight,xPos+(boxWidth/2),yPos);
  if(isSquishing){ //While squishing change height and width 
    dy = 10; 
    if(boxHeight > 6){
      boxHeight -= 2; 
    }
    if(boxWidth < 34){
      boxWidth += 2; 
    }
    else{ //When process ends set off a new flag
      isSquishing = false; 
      isUnsquish = true; 
      isJumping = false; 
      isEnding = false;
    }
  }
  if(isUnsquish){ //Undo the actions in squish and elongate the box
    if(boxHeight < 36){
      boxHeight += 10; 
    }
    if(boxWidth > 20){
      boxWidth -= 5; 
    }
    else{ //Move to the jumping stage 
      isSquishing = false; 
      isUnsquish = false; 
      isJumping = true; 
      isEnding = false;
    }
  }
  if(isJumping){ //Use physics to move box up like a jump and simulate gravity
    console.log(yPos);
    yPos -= dy; 
    xPos += dx; 
    dy -= 0.2;
    if(round(yPos) == 400){ //If the box hits ground move to next step 
      isEnding = true; 
      isSquishing = false;
      isUnsquish = false; 
      isJumping = false;
    }
  }
  if(isEnding){ //Unelongate the box so it moves back to its natural square shape 
    if(boxHeight != 20){
      boxHeight -= 4;
    }
    else{ //End the flag loop and wait until mouse is pressed
      isEnding = false; 
      isSquishing = false;
      isUnsquish = false; 
      isJumping = false;
    }
  }
}

function mousePressed(){
  if(isEnding == false && isSquishing == false && isUnsquish == false && isJumping == false){ //If box is not in process start the loop
    isSquishing = true; 
    dx = (mouseX-xPos)/100; //How far the box will move to the left or right 
  }
}
