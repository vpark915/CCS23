let ball; 
let port; 
let directionadd; 

class BounceBall{
  constructor(position,direction){
    this.position = position;
    this.direction = direction;
  }
  updatePosition(multiplier){
    this.position.add(createVector(this.direction.x*multiplier,this.direction.y*multiplier));
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
  port = createSerial();

  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 9600);
  }
}

function draw() {
  // PORT STUFF
  let str = port.readUntil("\n");
  console.log(int(str));
  if (int(str) > 0 || int(str) < 255){
    //background(int(str));
    directionadd = str/127.5
  }
  background(220);
  ball.updatePosition(directionadd);
  ball.detectWall();
  ball.drawCircle(); 
}