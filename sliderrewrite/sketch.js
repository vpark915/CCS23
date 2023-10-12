let backgroundFactor = 0;
let transparency = 255; 
let thiscolor
let ball = 0

//RGB STUFF TO CHANGE COLOR 
let redColorSlider 
let rcLabel 
let blueColorSlider 
let bcLabel
let greenColorSlider 
let gcLabel

//X and Y direction before creating the ball 
let xDirSlider
let xdLabel
let yDirSlider
let ydLabel

//BALL BUTTON
let ballbutton

class Ball{
  constructor(diameter,xpos,ypos,color,dirX,dirY){
    this.diameter = diameter 
    this.xpos = xpos 
    this.ypos = ypos 
    this.color = color 
    this.dirX = dirX 
    this.dirY = dirY
  }
  render(){
    //If the ball hits the wall then have it bounce 
    background(220)
    if(width - this.xpos < this.diameter/2 || this.xpos - 0 < this.diameter/2){
      this.dirX = this.dirX*-1;
    }
    if(width - this.ypos < this.diameter/2 || this.ypos - 0 < this.diameter/2){
      this.dirY = this.dirY*-1;
  
    }
    //Update the ball's direction 
    this.xpos += this.dirX 
    this.ypos += this.dirY
    stroke(this.color)
    fill(this.color)
    circle(this.xpos,this.ypos,this.diameter)
  }
}

function setup() {
  createCanvas(400, 400); 
  //COLOR SLIDERS
  rcLabel = createDiv("Red")
  redColorSlider = createSlider(0,255,0)
  bcLabel = createDiv("Blue")
  blueColorSlider = createSlider(0,255,0)
  gcLabel = createDiv("Green")
  greenColorSlider = createSlider(0,255,0)
  
  //DIRECTION SLIDERS
  xdLabel = createDiv("X Direction")
  xDirSlider = createSlider(0,10,0)
  ydLabel = createDiv("Y Direction")
  yDirSlider = createSlider(0,10,0)

  //BALL CREATION BUTTON
  ballbutton = createButton("CreateBall")
  ballbutton.mousePressed(createBall)
}

function draw() {
  background(220);
  if(ball != 0){ //WHEN WE STARTUP WE DON'T NEED A BALL 
    ball.render()
  }
}

function createBall(){ //FUNCTION TO EXECTUE WHEN THE BUTTON IS PRESSED 
  console.log("Hello")
  ball = new Ball(random(10,50),random(30,170),random(30,170),color(redColorSlider.value(),blueColorSlider.value(),greenColorSlider.value()),xDirSlider.value(),yDirSlider.value())
}
