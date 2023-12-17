// Player class variables
let player1;
let player2; 

// Multiplayer flag
let multiStarted;

// Bot flag
let botStarted; 

// Help screen flag
let helpScreenOn; 

// Game over flag 
let gameOver; 

// Records the current keys pressed
let keysPressed = {};

// All UI buttons
let startButton; 
let helpButton; 
let botButton;
let backButton;
let homeButton; 

// Game font 
let gameFont;

// Preloaded songs and sounds 
let gameSong; 
let menuSong; 
let punchSound;
let winSound;


function preload() {
  // Load the font from the folder path
  gameFont = loadFont('VCR_OSD_MONO_1.ttf');
  // Load the ingame song 
  gameSong = loadSound("Mortal Kombat Theme Song (320 kbps).mp3");
  menuSong = loadSound("C418 - Moog City 2 (Minecraft Volume Beta) (320 kbps).mp3");
  punchSound = loadSound("Something being hit - Sound Effect (320 kbps).mp3");
  winSound = loadSound("WIN sound effect no copyright (320 kbps).mp3");

  //Create Start Screen
  startButton = createButton("Multiplayer Game");
  startButton.style('font-size', '40px');
  startButton.position(100,350);
  startButton.mousePressed(StartMulti);
  startButton.style('width', '200px');
  startButton.style('height', '100px');
  startButton.hide();

  botButton = createButton("Bot Battle");
  botButton.style('font-size', '40px');
  botButton.position(350,350);
  botButton.mousePressed(StartBot);
  botButton.style('width', '200px');
  botButton.style('height', '100px');
  botButton.hide();

  helpButton = createButton("Need Help?");
  helpButton.style('font-size', '40px');
  helpButton.position(600,350);
  helpButton.mousePressed(HelpScreen);
  helpButton.style('width', '200px');
  helpButton.style('height', '100px');
  helpButton.hide();

  backButton = createButton("Go Back");
  backButton.style('font-size', '40px');
  backButton.position(350,350);
  backButton.mousePressed(HomeScreen);
  backButton.style('width', '200px');
  backButton.style('height', '100px');
  backButton.hide();

  homeButton = createButton("Home");
  homeButton.style('font-size', '25px');
  homeButton.position(800,20);
  homeButton.mousePressed(HomeScreen);
  homeButton.style('width', '80px');
  homeButton.style('height', '40px');
  homeButton.hide();
}

function setup() {
  menuSong.loop();
  HomeScreen();
}

function draw() {
  // If flags are on run their respective actions
  if(gameOver == true){
    GameOverScreen();
  }
  if (multiStarted == true){
    MultiplayerScreen();
  }
  if (botStarted == true){
    BotScreen();
  }
}

class Player1{
  constructor(xpos,ypos){
    // Positional variables
    this.xpos = xpos;
    this.ypos = ypos;
    this.xPrevPos; 
    this.yPrevPos; 
    // velocity variables
    this.xvelocity = 0;
    this.yvelocity = 0; 
    // gravity and jump flags
    this.resetVelocity = false; 
    this.touchingGround = false; 
    this.hasDoubleJump = true; 
    this.doubleJumpCheck = false; 
    //hitstun variables
    this.hitStunned = false; 
    this.hitStunTimerStart = false; 
    this.hitStunTimerCurr = false; 
    //percentage
    this.percentage = 0; 
    // stock
    this.stock = 3; 
  }
  renderPlayer(){
    fill(133, 255, 117);
    circle(this.xpos,this.ypos,30);
  }
  movePlayer(){
    // Kill Condition
    if(this.ypos > 500 || this.xpos < -100 || this.xpos > 1000 || this.ypos < -100){
      this.stock -= 1; 
      this.xpos = 300;
      this.ypos = 300;
      this.xvelocity = 0;
      this.yveloctiy = 0;
      this.percentage = 0;
    }
    //Stage Hitbox
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
    //Manual movement
    if(this.hitStunned == true){
      this.hitStunTimerCurr = millis();
      console.log(this.hitStunTimerCurr - this.hitStunTimerStart);
      // Checking hitstun, if no hitstun allow normal movement
      if(this.hitStunTimerStart == false){
        this.hitStunTimerStart = millis();
      }
      if(abs(this.hitStunTimerCurr - this.hitStunTimerStart) >= this.percentage*10){
        this.hitStunTimerStart = false;
        this.hitStunned = false; 
      }
    }
    else{
      if(keysPressed['d'] && keysPressed['e']){
        fill(255)
        rect(this.xpos - 15,this.ypos + 5, this.xpos, this.ypos - 5);
        triangle(this.xpos,this.ypos - 15,this.xpos + 15, this.ypos, this.xpos,this.ypos + 15);
        // DAMAGE the other player 
        if (dist(this.xpos,this.ypos,player2.xpos,player2.ypos) <= 30){
          punchSound.play();
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
          punchSound.play();
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
          punchSound.play();
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
          punchSound.play();
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
    }

    //Gravity and Friction rules
    if(this.touchingGround == false){
      this.yvelocity += 0.5; 
    }
    if(this.touchingGround == true && this.xvelocity > 0){
      this.xvelocity -= 0.1; 
    }
    if(this.touchingGround == true && this.xvelocity < 0){
      this.xvelocity += 0.1; 
    }
    // Velocity and positional rules
    this.xPrevPos = this.xpos;
    this.yPrevPos = this.ypos; 
    this.xpos += this.xvelocity;
    this.ypos += this.yvelocity; 
  }
}

// Code in player 2 is the exact same as player 1 except for input differences and attacking player 1 
class Player2{
  constructor(xpos,ypos){
    this.xpos = xpos;
    this.ypos = ypos; 
    this.xvelocity = 0;
    this.yvelocity = 0; 
    this.touchingGround = false; 
    this.hitStunned = false; 
    this.hitStunTimerCurr = false;
    this.hitStunTimerStart = false; 
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
      this.xpos = 600;
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
    // hitstun conditiona
    if(this.hitStunned == true){
      this.hitStunTimerCurr = millis();
      console.log(this.hitStunTimerCurr - this.hitStunTimerStart);
      if(this.hitStunTimerStart == false){
        this.hitStunTimerStart = millis();
      }
      if(abs(this.hitStunTimerCurr - this.hitStunTimerStart) >= this.percentage*10){
        this.hitStunTimerStart = false;
        this.hitStunned = false; 
      }
    }
    else{
      if(keysPressed['/'] && keysPressed[']']){
        fill(255)
        rect(this.xpos - 15,this.ypos + 5, this.xpos, this.ypos - 5);
        triangle(this.xpos,this.ypos - 15,this.xpos + 15, this.ypos, this.xpos,this.ypos + 15);
        if (dist(this.xpos,this.ypos,player1.xpos,player1.ypos) <= 30){
          punchSound.play();
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
          punchSound.play();
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
          punchSound.play();
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
          punchSound.play();
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

// Also uses a lot of the same code from player 1 and player 2 
class Bot{
  constructor(xpos,ypos){
    this.xpos = xpos;
    this.ypos = ypos; 
    this.xvelocity = 0;
    this.yvelocity = 0; 
    this.resetVelocity = false; 
    this.touchingGround = false; 
    this.hitStunned = false; 
    this.hitStunTimerCurr = false;
    this.hitStunTimerStart = false; 
    this.xPrevPos; 
    this.yPrevPos;
    this.percentage = 0; 
    this.hasDoubleJump = true; 
    this.doubleJumpCheck = false; 
    this.respawnTimerBegin; 
    this.respawnTimerEnd; 
    this.stock = 3; 
    // attack cooldown 
    this.attackTimer = false;
    this.attackTimerStart = false;
  }
  renderPlayer(){
    fill(102, 255, 247);
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
    //Stage Logic
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
    // attack timer cooldown 
    if(this.attackTimer == true){
      if(this.attackTimerStart == false){
        this.attackTimerStart = millis();
      }
      if(abs(millis() - this.attackTimerStart) > 100){
        this.attackTimer = false;
        this.attackTimerStart = false; 
      }
    }
    // Hitstun conditional
    if(this.hitStunned == true){
      this.hitStunTimerCurr = millis();
      console.log(this.hitStunTimerCurr - this.hitStunTimerStart);
      if(this.hitStunTimerStart == false){
        this.hitStunTimerStart = millis();
      }
      if(abs(this.hitStunTimerCurr - this.hitStunTimerStart) >= this.percentage*10){
        punchSound.play();
        this.hitStunTimerStart = false;
        this.hitStunned = false; 
      }
    }
    else{
      // Movement calculation
      if(dist(this.xpos,this.ypos,player1.xpos,player1.ypos) < 34){
        let randomInt = floor(random(0,3));
        if(randomInt == 0 && this.attackTimer == false){
          this.attackTimer = true;
          fill(255)
          rect(this.xpos - 15,this.ypos + 5, this.xpos, this.ypos - 5);
          triangle(this.xpos,this.ypos - 15,this.xpos + 15, this.ypos, this.xpos,this.ypos + 15);
          if (dist(this.xpos,this.ypos,player1.xpos,player1.ypos) <= 30){
            punchSound.play();
            player1.hitStunned = true; 
            player1.xvelocity = 5 * (0.1 + player1.percentage/100); 
            player1.percentage += floor(random(1,3));
          }
        }
        else if(randomInt == 1 && this.attackTimer == false){
          this.attackTimer = true;
          fill(255)
          rect(this.xpos + 15,this.ypos - 5, this.xpos, this.ypos + 5);
          triangle(this.xpos,this.ypos + 15,this.xpos - 15, this.ypos, this.xpos,this.ypos - 15);
          if (dist(this.xpos,this.ypos,player1.xpos,player1.ypos) <= 30){
            punchSound.play();
            player1.hitStunned = true; 
            player1.xvelocity = -5 * (0.1 + player1.percentage/100); 
            player1.percentage += floor(random(1,3));
          }
        }
        else if(randomInt == 2 && this.attackTimer == false){
          this.attackTimer = true;
          fill(255)
          rect(this.xpos - 5,this.ypos + 15, this.xpos + 5, this.ypos);
          triangle(this.xpos - 15,this.ypos,this.xpos, this.ypos - 15, this.xpos + 15,this.ypos);
          if (dist(this.xpos,this.ypos,player1.xpos,player1.ypos) <= 30){
            punchSound.play();
            player1.hitStunned = true; 
            player1.yvelocity = -10 * (0.1 + player1.percentage/100); 
            player1.percentage += floor(random(1,3));
          }
        }
        else if(randomInt == 3 && this.attackTimer == false){
          this.attackTimer = true;
          fill(255)
          rect(this.xpos + 5,this.ypos - 15, this.xpos - 5, this.ypos);
          triangle(this.xpos + 15,this.ypos,this.xpos, this.ypos + 15, this.xpos - 15,this.ypos);
          if (dist(this.xpos,this.ypos,player1.xpos,player1.ypos) <= 30){
            punchSound.play();
            player1.hitStunned = true; 
            if (player1.touchingGround == false){
              player1.yvelocity = 10 * (0.1 + player1.percentage/100); 
            }
            player1.percentage += floor(random(1,3));
          }
        }
      }
      // Do the correct action 4/5s of the time or whatever the probabilities are 
      if(player1.xpos - this.xpos > 0 && player1.xpos > 220 && player1.xpos < 680){
        let randomInt = floor(random(0,2));
        if(randomInt != 0){
          this.xvelocity = 5; 
        }
      }
      if(player1.xpos - this.xpos < 0 && player1.xpos > 220 && player1.xpos < 680){
        let randomInt = floor(random(0,2));
        if(randomInt != 0){
          this.xvelocity = -5; 
        }
      }
      if(player1.ypos > this.xpos && this.hasDoubleJump == true && this.yvelocity > 0){
        let randomInt = floor(random(0,2));
        if(randomInt != 0){
          this.yvelocity = -10;
          this.hasDoubleJump = false;
        }
      }
      if(player1.ypos > this.xpos && this.touchingGround == true){
        let randomInt = floor(random(0,3));
        if(randomInt != 0){
          this.yvelocity = -10;
          this.touchingGround = false; 
          this.hasDoubleJump = true;
        }
      }
      else if(player1.ypos < this.ypos && this.touchingGround == false){
        let randomInt = floor(random(0,6));
        if(randomInt == 0){
          this.yvelocity = 10; 
        }
      }
      //If nearing or at edge get back
      if(this.xpos <= 200){
        if(this.hasDoubleJump == true){
          this.yvelocity = -10;
        }
        this.xvelocity = 5; 
      }
      if(this.xpos >= 700){
        if(this.hasDoubleJump == true){
          this.yvelocity = -10;
        }
        this.xvelocity = -5; 
      }
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

// Start gamemode functions when button clicked 
function StartMulti(){
  menuSong.stop();
  gameSong.loop();
  multiStarted = true; 
  player1 = new Player1(300,300); 
  player2 = new Player2(600,300);
}

function StartBot(){
  menuSong.stop();
  gameSong.setVolume(0.3);
  gameSong.loop();
  botStarted = true; 
  player1 = new Player1(300,300); 
  player2 = new Bot(600,300);
}

// Create help screen
function HelpScreen(){
  helpScreenOn = true;
  background(0);
  textSize(50);
  textAlign(CENTER);
  text("Player 1 Directions: ", 450, 100);
  textSize(20);
  text("W is Jump, S is Strafe Down, A is Left, D is Right", 450,120);
  text("Press E with any of these and it's an attack in that direction", 450, 140);
  textSize(50);
  textAlign(CENTER);
  text("Player 2 Directions: ", 450, 200);
  textSize(20);
  text("; is Jump, . is Strafe Down, , is Left, / is Right", 450,220);
  text("Press ] with any of these and it's an attack in that direction", 450, 240);
  textSize(50);
  textAlign(CENTER);
  text("HITSTUN", 450, 300);
  textSize(20);
  text("If you get hit with an attack, you will be put under \n hitstun based on your percentage", 450,320);
  backButton.show();
  helpButton.hide();
  startButton.hide();
  botButton.hide();
  homeButton.hide();
}

// Create home screen
function HomeScreen(){
  menuSong.loop();
  gameSong.stop();
  multiStarted = false;
  gameOver = false;
  botStarted = false;
  
  textFont(gameFont);
  createCanvas(900,500);
  background(0);
  //Create Start Screen
  startButton.show();
  botButton.show();
  helpButton.show();
  backButton.hide();
  homeButton.hide();
  textAlign(CENTER);
  fill(255);
  textSize(100);
  text("Sumo Balls",450,250)
}

// Constantly update and render the multiplayer screen
function MultiplayerScreen(){
  homeButton.show();
  helpButton.hide();
  startButton.hide();
  botButton.hide();
  if(player1.stock <= 0 || player2.stock <= 0){
    gameOver = true;
    multiStarted = false;
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
  textSize(20);
  textAlign(CENTER);
  text("Stocks Left: " + player1.stock, 300, 150)
  textSize(40);
  text("Player 1", 300,50);
  textSize(100);
  text(player1.percentage + "%",300,130);
  textSize(20);
  text("Stocks Left: " + player2.stock, 550, 150)
  textSize(40);
  text("Player 2", 550,50);
  textSize(100);
  text(player2.percentage + "%",550,130);
}

// Same as multiplayer screen but just made for the bot gamemode 
function BotScreen(){
  homeButton.show();
  helpButton.hide();
  startButton.hide();
  botButton.hide();
  if(player1.stock <= 0 || player2.stock <= 0){
    gameOver = true;
    multiStarted = false;
    botStarted = false;
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
  textSize(20);
  textAlign(CENTER);
  text("Stocks Left: " + player1.stock, 300, 150)
  textSize(40);
  text("Player 1", 300,50);
  textSize(100);
  text(player1.percentage + "%",300,130);
  textSize(20);
  text("Stocks Left: " + player2.stock, 550, 150)
  textSize(40);
  text("Bot", 550,50);
  textSize(100);
  text(player2.percentage + "%",550,130);
}

// When the gameover flag is on 
function GameOverScreen(){
  textSize(100);
  text("GAME OVER",450,250);
  if(player1.stock == 0){
    text("PLAYER 2 WINS",450,330);
  }
  else if(player2.stock == 0){
    text("PLAYER 1 WINS",450,400);
  }
}
