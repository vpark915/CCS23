let ball; 

class BounceBall{
  constructor(position,direction){
    this.position = position;
    this.direction = direction;
  }
  updatePosition(){
    this.position.add(this.direction);
  }
  detectWall(){
    if(this.position.x > width || this.position.x < 0){
      this.direction.x = this.direction.x*-1;
    }
    if(this.position.y > height || this.position.y < 0){
      this.direction.y = this.direction.y*-1; 
    }
  }
  drawCircle(){
    circle(this.position.x,this.position.y,20);
  }
}
function setup() {
  createCanvas(400, 400);
  ball = new BounceBall(createVector(random(0,400),random(0,400)),createVector(random(-10,10),random(-10,10)));
}

function draw() {
  background(220);
  ball.updatePosition();
  ball.detectWall();
  ball.drawCircle(); 
}
