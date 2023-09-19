let xPos = 100 
let yPos = 100 
let percent = 0.1

function setup() {
  createCanvas(400, 400);
}

function draw() {
  //BACKGROUND CREATION
  background(220);
  //UPDATE POSITION 
  xPos += percent*(mouseX - xPos)
  yPos += percent*(mouseY - yPos)
  //RENDER CIRCLE
  circle(xPos,yPos,20)
}
