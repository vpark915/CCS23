let player1;
let player2; 
let gameStarted;
let gameOver; 
let keysPressed = {};
let keysTimeStamps = {}; 

function setup() {
  player1 = new Player1(300,300); 
  player2 = new Player2(600,300);
  createCanvas(900,500);
}

function draw() {
  if(gameOver == true){
    textSize(500);
    text("GAME OVER",450,250);
    if(player1.stock == 0){
      text("PLAYER 2 WINS",450,300);
    }
    else if(player2.stock == 0){
      text("PLAYER 1 WINS",450,400);
    }
  }
  else{
    if(player1.stock == 0 || player2.stock == 0){
      gameOver = true;
    }
    noStroke();
    background(0);
    rectMode(CORNERS);
    fill(255);
    //Draw Stage
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
    text("Stocks Left: " + player1.stock, 350, 80)
    text("Player 2", 550,20);
    text(player2.percentage,550,50);
    text("Stocks Left: " + player2.stock, 550, 80)
  }
}

class Player1{
  constructor(xpos,ypos){
    this.xpos = xpos;
    this.ypos = ypos; 
    this.xvelocity = 0;
    this.yvelocity = 0; 
    this.resetVelocity = false; 
    this.touchingGround = false; 
    this.hitStunned = false; 
    this.xPrevPos; 
    this.yPrevPos;
    this.percentage = 0; 
    this.hasDoubleJump = true; 
    this.doubleJumpCheck = false; 
    this.respawnTimerBegin; 
    this.respawnTimerEnd; 
    this.stock = 3; 
  }
  renderPlayer(){
    console.log(this.hasDoubleJump);
    fill(133, 255, 117);
    circle(this.xpos,this.ypos,30);
  }
  movePlayer(){
    // Kill condition
    if(this.ypos > 500 || this.xpos < -100 || this.xpos > 1000 || this.ypos < -100){
      this.stock -= 1; 
      this.xpos = 300;
      this.ypos = 300;
      this.xvelocity = 0;
      this.yveloctiy = 0;
      this.percentage = 0;
    }
    if(this.xpos < 200 && this.xPrevPos >= 200 && this.yPrevPos <= 410){
      this.yvelocity = 0; 
    }
    if(this.xpos > 700 && this.xPrevPos <= 700 && this.yPrevPos <= 410){
      this.yvelocity = 0; 
    }
    if(this.ypos >= 410 && this.xpos < 700 && this.xpos > 200 && this.yPrevPos <= 410){
      this.ypos = 405; 
      this.touchingGround = true; 
      this.hasDoubleJump = false; 
      this.doubleJumpCheck = false;
    }
    else{
      this.touchingGround = false;
      if (this.doubleJumpCheck == false){
        this.doubleJumpCheck = true;
        this.hasDoubleJump = true;
      }
    }
    if(keysPressed['d'] && keysPressed['e']){
      fill(255)
      rect(this.xpos - 15,this.ypos + 5, this.xpos, this.ypos - 5);
      triangle(this.xpos,this.ypos - 15,this.xpos + 15, this.ypos, this.xpos,this.ypos + 15);
      if (dist(this.xpos,this.ypos,player2.xpos,player2.ypos) <= 30){
        player2.hitStunned = true; 
        player2.xvelocity = 5 * (0.1 + player2.percentage/100); 
        player2.percentage += floor(random(1,3));
      }
    }
    else if(keysPressed['d']){
      this.xvelocity = 5; 
    }
    if(keysPressed['a'] && keysPressed['e']){
      fill(255)
      rect(this.xpos + 15,this.ypos - 5, this.xpos, this.ypos + 5);
      triangle(this.xpos,this.ypos + 15,this.xpos - 15, this.ypos, this.xpos,this.ypos - 15);
      if (dist(this.xpos,this.ypos,player2.xpos,player2.ypos) <= 30){
        player2.hitStunned = true; 
        player2.xvelocity = -5 * (0.1 + player2.percentage/100); 
        player2.percentage += floor(random(1,3));
      }
    }
    else if(keysPressed['a']){
      this.xvelocity = -5; 
    }
    if(keysPressed['w'] && this.hasDoubleJump == true && this.yvelocity > 0){
      this.yvelocity = -10;
      this.hasDoubleJump = false;
    }
    if(keysPressed['w'] && keysPressed['e']){
      fill(255)
      rect(this.xpos - 5,this.ypos + 15, this.xpos + 5, this.ypos);
      triangle(this.xpos - 15,this.ypos,this.xpos, this.ypos - 15, this.xpos + 15,this.ypos);
      if (dist(this.xpos,this.ypos,player2.xpos,player2.ypos) <= 30){
        player2.hitStunned = true; 
        player2.yvelocity = -10 * (0.1 + player2.percentage/100); 
        player2.percentage += floor(random(1,3));
      }
    }
    else if(keysPressed['w'] && this.touchingGround == true){
      this.yvelocity = -10;
      this.touchingGround = false; 
      this.hasDoubleJump = true;
    }
    if(keysPressed['s'] && keysPressed['e']){
      fill(255)
      rect(this.xpos + 5,this.ypos - 15, this.xpos - 5, this.ypos);
      triangle(this.xpos + 15,this.ypos,this.xpos, this.ypos + 15, this.xpos - 15,this.ypos);
      if (dist(this.xpos,this.ypos,player2.xpos,player2.ypos) <= 30){
        player2.hitStunned = true; 
        if (player2.touchingGround == false){
          player2.yvelocity = 10 * (0.1 + player2.percentage/100); 
        }
        player2.percentage += floor(random(1,3));
      }
    }
    else if(keysPressed['s'] && this.touchingGround == false){
      this.yvelocity = 10; 
    }
    if(this.touchingGround == false){
      this.yvelocity += 0.5; 
    }
    if(this.touchingGround == true && this.xvelocity > 0){
      this.xvelocity -= 0.1; 
    }
    if(this.touchingGround == true && this.xvelocity < 0){
      this.xvelocity += 0.1; 
    }
    this.xPrevPos = this.xpos;
    this.yPrevPos = this.ypos; 
    this.xpos += this.xvelocity;
    this.ypos += this.yvelocity; 
  }
}

class Player2{
  constructor(xpos,ypos){
    this.xpos = xpos;
    this.ypos = ypos; 
    this.xvelocity = 0;
    this.yvelocity = 0; 
    this.touchingGround = false; 
    this.hitStunned = false; 
    this.xPrevPos; 
    this.yPrevPos;
    this.percentage = 0; 
    this.hasDoubleJump = true; 
    this.doubleJumpCheck = false; 
    this.respawnTimerBegin; 
    this.respawnTimerEnd; 
    this.stock = 3; 
  }
  renderPlayer(){
    fill(102, 255, 247);
    circle(this.xpos,this.ypos,30);
  }
  movePlayer(){
    if(this.ypos > 500 || this.xpos < -100 || this.xpos > 1000 || this.ypos < -100){
      this.stock -= 1; 
      this.xpos = 300;
      this.ypos = 300;
      this.xvelocity = 0;
      this.yveloctiy = 0;
      this.percentage = 0;
    }
    if(this.xpos < 200 && this.xPrevPos >= 200 && this.yPrevPos <= 410){
      this.yvelocity = 0; 
    }
    if(this.xpos > 700 && this.xPrevPos <= 700 && this.yPrevPos <= 410){
      this.yvelocity = 0; 
    }
    if(this.ypos >= 410 && this.xpos < 700 && this.xpos > 200 && this.yPrevPos <= 410){
      this.ypos = 405; 
      this.touchingGround = true; 
      this.hasDoubleJump = false; 
      this.doubleJumpCheck = false;
    }
    else{
      this.touchingGround = false;
      if (this.doubleJumpCheck == false){
        this.doubleJumpCheck = true;
        this.hasDoubleJump = true;
      }
    }
    if(keysPressed['/'] && keysPressed[']']){
      fill(255)
      rect(this.xpos - 15,this.ypos + 5, this.xpos, this.ypos - 5);
      triangle(this.xpos,this.ypos - 15,this.xpos + 15, this.ypos, this.xpos,this.ypos + 15);
      if (dist(this.xpos,this.ypos,player1.xpos,player1.ypos) <= 30){
        player1.hitStunned = true; 
        player1.xvelocity = 5 * (0.1 + player1.percentage/100); 
        player1.percentage += floor(random(1,3));
      }
    }
    else if(keysPressed['/']){
      this.xvelocity = 5; 
    }
    if(keysPressed[','] && keysPressed[']']){
      fill(255)
      rect(this.xpos + 15,this.ypos - 5, this.xpos, this.ypos + 5);
      triangle(this.xpos,this.ypos + 15,this.xpos - 15, this.ypos, this.xpos,this.ypos - 15);
      if (dist(this.xpos,this.ypos,player1.xpos,player1.ypos) <= 30){
        player1.hitStunned = true; 
        player1.xvelocity = -5 * (0.1 + player1.percentage/100); 
        player1.percentage += floor(random(1,3));
      }
    }
    else if(keysPressed[',']){
      this.xvelocity = -5; 
    }
    if(keysPressed[';'] && this.hasDoubleJump == true && this.yvelocity > 0){
      this.yvelocity = -10;
      this.hasDoubleJump = false;
    }
    if(keysPressed[';'] && keysPressed[']']){
      fill(255)
      rect(this.xpos - 5,this.ypos + 15, this.xpos + 5, this.ypos);
      triangle(this.xpos - 15,this.ypos,this.xpos, this.ypos - 15, this.xpos + 15,this.ypos);
      if (dist(this.xpos,this.ypos,player1.xpos,player1.ypos) <= 30){
        player1.hitStunned = true; 
        player1.yvelocity = -10 * (0.1 + player1.percentage/100); 
        player1.percentage += floor(random(1,3));
      }
    }
    else if(keysPressed[';'] && this.touchingGround == true){
      this.yvelocity = -10;
      this.touchingGround = false; 
      this.hasDoubleJump = true;
    }
    if(keysPressed['.'] && keysPressed[']']){
      fill(255)
      rect(this.xpos + 5,this.ypos - 15, this.xpos - 5, this.ypos);
      triangle(this.xpos + 15,this.ypos,this.xpos, this.ypos + 15, this.xpos - 15,this.ypos);
      if (dist(this.xpos,this.ypos,player1.xpos,player1.ypos) <= 30){
        player1.hitStunned = true; 
        if (player1.touchingGround == false){
          player1.yvelocity = 10 * (0.1 + player1.percentage/100); 
        }
        player1.percentage += floor(random(1,3));
      }
    }
    else if(keysPressed['.'] && this.touchingGround == false){
      this.yvelocity = 10; 
    }
    if(this.touchingGround == false){
      this.yvelocity += 0.5; 
    }
    if(this.touchingGround == true && this.xvelocity > 0){
      this.xvelocity -= 0.1; 
    }
    if(this.touchingGround == true && this.xvelocity < 0){
      this.xvelocity += 0.1; 
    }
    this.xPrevPos = this.xpos;
    this.yPrevPos = this.ypos; 
    this.xpos += this.xvelocity;
    this.ypos += this.yvelocity; 
  }
}

function keyPressed(){
  keysPressed[key] = true; 
}

function keyReleased(){
  keysPressed[key] = false; 
}