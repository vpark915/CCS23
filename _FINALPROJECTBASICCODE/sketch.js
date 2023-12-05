let backingSong;
let startButton; 
let restartButton; 
let camCapture;
let progress; 
let gameBeingPlayed;

function preload() {
  soundFormats('mp3', 'ogg');
  backingSong = loadSound('assets/Rasputin');
}

function setup() {
  // Create Canvas
  createCanvas(600, 600);
  // Button Set Up 
  startButton = createButton("Play Level");
  startButton.position(250,250);
  startButton.mousePressed(PlaySong);

  restartButton = createButton("Restart Level");
  restartButton.position(500,20);
  restartButton.mousePressed(RestartSong);
  restartButton.hide();
  // Webcam
  camCapture = createCapture(VIDEO);
  camCapture.hide(); 
  background(0);
  gameBeingPlayed = false; 
  // add second to progress
  setInterval(IncrementProgress,4000);
}

function draw() {
  if (gameBeingPlayed){
    // Doing what you gotta do
    background(0);
    // Draw webcam
    image(camCapture,0,0);
    // Draw 5 empty stars in top corner 
    noFill();
    strokeWeight(4);
    stroke(color(252, 186, 3));
    circle(30,70,40);
    circle(80,70,40);
    circle(130,70,40);
    circle(180,70,40);
    circle(230,70,40);
    strokeWeight(1);
    textSize(30);
    text("Score",20,35);
    // Draw Progress Bar
    strokeWeight(10);
    stroke(color(87, 167, 207))
    line(0,480,progress,480);
    // Draw Spotlight
    noStroke();
    fill(255, 238, 168)
    beginShape();
    vertex(250,600);
    vertex(350,600);
    vertex(325,480);
    vertex(275,480);
    endShape(CLOSE);
    strokeWeight(15);
    stroke(255);
    line(250,600,350,600);
  }
  else {
    background(0);
    image(camCapture,0,0)
  }
}

function PlaySong() {
  backingSong.play();
  gameBeingPlayed = true; 
  progress = 0; 
  startButton.hide();
  restartButton.show();
}

function RestartSong() {
  backingSong.stop();
  backingSong.play();
  progress = 0; 
}

function IncrementProgress() {
  progress++; 
}