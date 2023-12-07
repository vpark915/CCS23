let player1;
let player2; 
let keysPressed = {};
let keysTimeStamps = {}; 

function setup() {
  player1 = new Player1(300,300); 
  player2 = new BingBing(500,300);
  createCanvas(900,500);
}

function draw() {
  noStroke();
  background(0);
  rectMode(CORNERS);
  fill(255);
  rect(200,425,700,440);
  player1.renderPlayer();
  player2.renderPlayer();
  player1.movePlayer(); 
  player2.movePlayer();
  textFont("assets/Roboto-Regular.ttf");
  textSize(100);
  textAlign(CENTER);
  text("Player 1", 350,20);
  text(player1.percentage,350,50);
  text("Player 2", 550,20);
  text(player2.percentage,550,50);
}

class Player1{
  constructor(xpos,ypos){
    this.xpos = xpos;
    this.ypos = ypos; 
    this.xvelocity = 0;
    this.yvelocity = 0; 
    this.touchingGround = false; 
    this.xPrevPos; 
    this.yPrevPos;
    this.percentage = 0; 
  }
  renderPlayer(){
    console.log(this.ypos)
    fill(133, 255, 117);
    circle(this.xpos,this.ypos,30);
  }
  movePlayer(){
    if(this.ypos >= 400 && this.xpos < 700 && this.xpos > 200 && this.yPrevPos <= 400){
      this.ypos = 400; 
      this.touchingGround = true; 
    }
    if(keysPressed['d'] && keysPressed['e']){
      fill(255)
      rect(this.xpos - 15,this.ypos + 5, this.xpos, this.ypos - 5);
      triangle(this.xpos,this.ypos - 15,this.xpos + 15, this.ypos, this.xpos,this.ypos + 15);
      if (dist(this.xpos,this.ypos,player2.xpos,player2.ypos) <= 30){
        player2.xvelocity = 5 * (0.1 + player2.percentage/100); 
        player2.percentage += floor(random(1,3));
      }
    }
    else if(keysPressed['d']){
      console.log(this.xvelocity);
      this.xvelocity = 5; 
    }
    if(keysPressed['a'] && keysPressed['e']){
      fill(255)
      rect(this.xpos + 15,this.ypos - 5, this.xpos, this.ypos + 5);
      triangle(this.xpos,this.ypos + 15,this.xpos - 15, this.ypos, this.xpos,this.ypos - 15);
      if (dist(this.xpos,this.ypos,player2.xpos,player2.ypos) <= 30){
        player2.xvelocity = -5 * (0.1 + player2.percentage/100); 
        player2.percentage += floor(random(1,3));
      }
    }
    else if(keysPressed['a']){
      this.xvelocity = -5; 
    }
    if (!keysPressed['a'] && !keysPressed['d']){
      this.xvelocity = 0;
    }
    if(keysPressed['w'] && keysPressed['e']){
      fill(255)
      rect(this.xpos - 5,this.ypos + 15, this.xpos + 5, this.ypos);
      triangle(this.xpos - 15,this.ypos,this.xpos, this.ypos - 15, this.xpos + 15,this.ypos);
      if (dist(this.xpos,this.ypos,player2.xpos,player2.ypos) <= 30){
        player2.yvelocity = -10 * (0.1 + player2.percentage/100); 
        player2.percentage += floor(random(1,3));
      }
    }
    else if(keysPressed['w'] && this.touchingGround == true){
      this.yvelocity = -10;
      this.touchingGround = false; 
    }
    if(keysPressed['s'] && keysPressed['e']){
      fill(255)
      rect(this.xpos + 5,this.ypos - 15, this.xpos - 5, this.ypos);
      triangle(this.xpos + 15,this.ypos,this.xpos, this.ypos + 15, this.xpos - 15,this.ypos);
      if (dist(this.xpos,this.ypos,player2.xpos,player2.ypos) <= 30){
        player2.yvelocity = 10 * (0.1 + player2.percentage/100); 
        player2.percentage += floor(random(1,3));
      }
    }
    else if(keysPressed['s'] && this.touchingGround == false){
      this.yvelocity = 10; 
    }
    if(this.ypos > 400) {
      this.touchingGround = false; 
    }
    if(this.touchingGround == false){
      this.yvelocity += 0.5; 
    }
    this.xPrevPos = this.xpos;
    this.yPrevPos = this.ypos; 
    this.xpos += this.xvelocity;
    this.ypos += this.yvelocity; 
  }
}

class BingBing{
  constructor(xpos,ypos){
    this.xpos = xpos;
    this.ypos = ypos; 
    this.xvelocity = 0;
    this.yvelocity = 0; 
    this.touchingGround = false; 
    this.xPrevPos; 
    this.yPrevPos;
    this.percentage = 0; 
  }
  renderPlayer(){
    console.log(this.ypos)
    fill(102, 255, 247);
    circle(this.xpos,this.ypos,30);
  }
  movePlayer(){
    if(this.ypos >= 400 && this.xpos < 700 && this.xpos > 200 && this.yPrevPos <= 400){
      if (this.yPrevPos < 400){
        this.ypos = 410;
        this.xvelocity = 0;
        this.yvelocity = 0; 
      } 
      this.ypos = 410; 
      this.touchingGround = true; 
    }
    if(this.ypos < 400) {
      this.touchingGround = false; 
    }
    if(this.touchingGround == false){
      this.yvelocity += 0.5; 
    }
    this.xPrevPos = this.xpos;
    this.yPrevPos = this.ypos; 
    this.xpos += this.xvelocity;
    this.ypos += this.yvelocity; 
  }
}

function keyPressed(){
  keysPressed[key] = true; 
  console.log(key)
}

function keyReleased(){
  keysPressed[key] = false; 
}