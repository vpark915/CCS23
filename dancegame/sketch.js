// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/1RaNkPLjL/';
// POSE LIST 
let poseList = ["Right Arm Up","Left Arm Up","Fists Up","Right Lean","Left Lean","Normal"];

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

let poseGenList = [];
let screenText = []; 
let currentTime; 
let testObj; 
let score = 0; 
let crapscore = 0; 
let timeLimit = 6000; 
let startTime;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(320,800);
  // Create Pose Object
  poseGenList.push(new NewPose(createVector(160,0)));
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
  console.log(poseList);

  // Set Up Current Time 
  currentTime = millis(); 

  // Set Up Start Time
  startTime = millis(); 
}

function draw() {
  if(crapscore > 100){
    background(0);
    noStroke();
    fill(255,0,0,255)
    textSize(50)
    textAlign(CENTER)
    text("GAME OVER",160,400)
    noLoop();
  }
  // ELAPSED TIME LOGIC 
  if(millis() - startTime > 4000){
    if(timeLimit > 1000){
      timeLimit -= 700;
      startTime = millis()
    }
  }

  // Draw Scene
  background(0);
  noStroke();
  textSize(30);
  fill(255,255,255,255);
  textAlign(CENTER);
  text(str(score),160,650)
  strokeWeight(10);
  stroke(0,255,0);
  line(0,500,320,500);

  // Draw the video
  image(flippedVideo, 0, 0);

  //Check Timer 
  if(millis() - currentTime > timeLimit){
    poseGenList.push(new NewPose(createVector(floor(random(50,270)),0)));
    currentTime = millis();
  }

  // Go Through Pose List 
  for(let i = 0; i < poseGenList.length;i++){
    if(poseGenList[i].position.y > 480 && poseGenList[i].position.y < 520 && poseGenList[i].pose == label){
      poseGenList.splice(i,1);
      screenText.push(new ResponseText("GOOD JOB!"))
      score += 20; 
    } 
    else if(poseGenList[i].position.y > 750){
      poseGenList.splice(i,1);
      screenText.push(new ResponseText("YOU SUCK!"))
      crapscore += 20; 
    }
    else{
      poseGenList[i].update();
      poseGenList[i].render();
    }
  }

  // Go Through Text List
  for(let i = 0; i < screenText.length; i++){
    if(screenText[i].opacity < 30){
      screenText.splice(i,1);
    }
    else{
      screenText[i].update();
    }
  }
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
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

class ResponseText{
  constructor(output){
    this.text = output; 
    this.opacity = 255;
    this.position = createVector(floor(random(320)),floor(random(240)));
  }
  update(){
    textSize(30);
    noStroke();
    fill(255,255,255,this.opacity);
    this.position.y += 4; 
    this.opacity -= 10; 
    text(this.text,this.position.x,this.position.y)
  }
}
class NewPose{
  constructor(position){
    this.pose = poseList[floor(random(0,5))];
    this.position = position; 
  }
  render(){
    fill(255,255,255);
    stroke(255,255,255);
    if(this.pose == "Right Arm Up"){
      circle(this.position.x,this.position.y,10);
      strokeWeight(10);
      line(this.position.x-20,this.position.y+30,this.position.x+20,this.position.y+30);
      line(this.position.x-20,this.position.y+30,this.position.x-20,this.position.y-10);
      line(this.position.x+20,this.position.y+30,this.position.x-10,this.position.y+50);
    }
    else if(this.pose == "Left Arm Up"){
      circle(this.position.x,this.position.y,10);
      strokeWeight(10);
      line(this.position.x-20,this.position.y+30,this.position.x+20,this.position.y+30);
      line(this.position.x+20,this.position.y+30,this.position.x+20,this.position.y-10);
      line(this.position.x-20,this.position.y+30,this.position.x+10,this.position.y+50);
    }
    else if(this.pose == "Fists Up"){
      circle(this.position.x,this.position.y,10);
      strokeWeight(10);
      line(this.position.x-20,this.position.y+30,this.position.x+20,this.position.y+30);
      line(this.position.x+20,this.position.y+30,this.position.x+20,this.position.y-10);
      line(this.position.x-20,this.position.y+30,this.position.x-20,this.position.y-10);
    }
    else if(this.pose == "Right Lean"){
      circle(this.position.x,this.position.y,10);
      strokeWeight(10);
      line(this.position.x,this.position.y,this.position.x-20,this.position.y+30);
    }
    else if(this.pose == "Left Lean"){
      circle(this.position.x,this.position.y,10);
      strokeWeight(10);
      line(this.position.x,this.position.y,this.position.x+20,this.position.y+30);
    }
    else if(this.pose == "Normal"){
      circle(this.position.x,this.position.y,10);
      strokeWeight(10);
      line(this.position.x,this.position.y,this.position.x,this.position.y+30);
    }
  }
  update(){
    this.position.y += 5; 
  }
}