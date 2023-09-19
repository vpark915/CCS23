let diameter = 10; 
let dirX = 1; 
let dirY = 1; 
let Xpos = 200; 
let Ypos = 200; 
let backgroundFactor = 0;
let transparency = 255; 
let r,g,b,a;
function setup() {
  createCanvas(400, 400);
  dirX = random(0,10); 
  dirY = random(0,10); 
  Xpos = random(30,170);
  Ypos = random(30,170);
  diameter = random(10,50);
  r = random(255);
  g = random(255);
  b = random(255);
  a = random(255);
}

function draw() {
  background(r,g,b,a);
  //IF HITS EDGE 
  if(width - Xpos < diameter/2 || Xpos - 0 < diameter/2){
    dirX = dirX*-1;
    fill(random(0,255),random(0,255),random(0,255));
    a = random(255);
  }
  if(height - Ypos < diameter/2 || Ypos - 0 < diameter/2){
    dirY = dirY*-1; 
    fill(random(0,255),random(0,255),random(0,255));
    a = random(255);
  }
  //UPDATE POSITIONAL DATA
  Xpos += dirX; 
  Ypos += dirY;
  circle(Xpos,Ypos,diameter);
  console.log(dirX,dirY);
}
