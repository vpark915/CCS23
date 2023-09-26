//RULES//
//If you left click anywhere on the canvas, there will be a ripple of random color and random spacing moving out
//The circles must be empty and if you left click anywhere else on the canvas it will start a new ripple 
//If you press R on your keyboard reset the canvas and you can start over
let PosX //Positional variables
let PosY
let growth = 0 //Growth and division variables
let divisionfactor

function setup() {
  createCanvas(800, 800);
  noFill() //Make sure circles are empty
}

function draw() {
  if(PosX != null && PosY != null){ //If you aren't in a reset position
    if(growth%divisionfactor == 0){ //Change the division factor every time so spacing is varied
      stroke(color(random(255),random(255),random(255))) //Randomize color
      ellipse(PosX,PosY,growth,growth) //Circles constantly growing 
    }
    growth += 1
  }
}

function mouseClicked(){
  if(mouseButton == LEFT){ //If left click then start a new growing ripple 
    divisionfactor = floor(random(1,10)) // randomize spacing 
    growth = 0
    PosX = mouseX // have it so the circle appears at clicked spot 
    PosY = mouseY
    console.log(PosX,PosY)
  }
}

function keyPressed(){
  if (key === 'r'){ // Reset the canvas when r is pressed
    console.log("R")
    background(255);
    PosX = null // Send project back to reset mode 
    PosY = null
  }
}