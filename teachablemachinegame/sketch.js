// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/WORiB1dFf/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// GAME SCORE 
let gameScore = 0; 

// CHARACTER VARIABLE 
let xpos = 250;
let ypos = 250;  

// LIST OF OBSTACLES 
let obstaclesList = []; 
let timeLeft; 
let timerDuration = 5; 

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(820, 500);
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
  startTime = millis();
}

function draw() {
  for(let i = 0; i < obstaclesList.length; i++){
    if(dist(xpos,ypos,obstaclesList[i].x, obstaclesList[i].y) < 40){
      noLoop();
    }
  }
  background(0);
  timeLeft = timerDuration - floor((millis() - startTime) / 1000);
  // Draw the video
  image(flippedVideo, 500, 0);
  //LOGIC 
  if(label == "Right" && xpos + 5 < 500){
    xpos += 5;
  }
  else if(label == "Left" && xpos - 5 > 0){
    xpos -= 5; 
  }
  else if(label == "Brake" && ypos + 5 < 500){
    ypos += 5; 
  }
  else if(label == "Energy" && ypos - 5 > 0){
    ypos -= 5; 
  }

  //ALL THE TIMER STUFF
  timeLeft = timerDuration - floor((millis() - startTime) / 1000);
  console.log(timeLeft)
  if (timeLeft <= 0) {
    timerDuration = 1;
    startTime = millis();
    obstaclesList.push(new Obstacle(random(0,500),0));
  }
  for(let i = 0; i < obstaclesList.length; i++){
    if(obstaclesList[i].y >= 500){
      obstaclesList.splice(i, 1)
    } 
    else{
      obstaclesList[i].updateAndDraw(); 
    }
  }
  // DRAW CHARACTER 
  fill(255,255,255)
  circle(xpos,ypos,30);
  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, 500 / 2, 500 - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();

}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}

class Obstacle{
  constructor(x,y){
    this.x = x;
    this.y = y; 
  }
  updateAndDraw(){ 
    fill(255,0,0)
    this.y += random(0,10);
    circle(this.x,this.y,50);
  }
}

