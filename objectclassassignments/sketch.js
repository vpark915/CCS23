let backgroundFactor = 0;
let transparency = 255; 
let r,g,b,a;
let thiscolor
let ball 

class Ball{
  constructor(diameter,xpos,ypos,color,dirX,dirY,width,height){
    this.diameter = diameter 
    this.xpos = xpos 
    this.ypos = ypos 
    this.color = color 
    this.dirX = dirX 
    this.dirY = dirY
    this.width = width
    this.height = height
  }
  render(){
    background(220)
    if(this.width - this.xpos < this.diameter || this.xpos - 0 < this.diameter){
      this.dirX = this.dirX*-1;
    }
    if(this.width - this.ypos < this.diameter || this.ypos - 0 < this.diameter){
      this.dirY = this.dirY*-1;
  
    }
    this.xpos += this.dirX 
    this.ypos += this.dirY
    stroke(this.color)
    fill(this.color)
    circle(this.xpos,this.ypos,this.diameter)
  }
}

function setup() {
  createCanvas(400, 400);
  r = random(255);
  g = random(255);
  b = random(255);
  thiscolor = color(r,g,b)
  ball = new Ball(random(10,50),random(30,170),random(30,170),thiscolor,random(0,10),random(0,10),width,height)
}

function draw() {
  background(220);
  ball.render()
}
