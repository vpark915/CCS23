let ball; 
let port; 
let directionadd; 

class BounceBall{
  constructor(position,direction){
    this.position = position;
    this.direction = direction;
  }
  updatePos(dadd){
    dadd = 1; 
    if (this.position.x > 400 || this.position.x < 0){
      this.direction.x = this.direction.x * -1; 
    }
    if (this.position.y > 400 || this.position.y < 0){
      this.direction.y = this.direction.y * -1;
    }
    this.direction.x = this.direction.x * this.dadd; 
    this.direction.y = this.direction.y * this.dadd; 
    this.position.x += this.direction.x;
    this.position.y += this.direction.y; 
    circle(this.position.x,this.position.y,20)
  }
}
function setup() {
  createCanvas(400, 400);
  ball = new BounceBall(createVector(random(0,400),random(0,400)),createVector(5,5));
  port = createSerial();

  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 9600);
  }
}

function draw() {
  
  // Read the port 
  let str = port.readUntil("\n");
  //console.log(int(str));
  console.log(ball.direction);
  if (int(str) > 0 || int(str) < 255){
    //background(int(str));
    background(220)
    directionadd = str/127.5
  }
  /*
  if (str.trim()){
    directionadd = int(str)/10;
  }*/

  // Change ball speed 
  ball.updatePos(directionadd); 
}
