let car_array = []
let building_array = []
//BUILDING CLASS FOR RENDERING BUILDINGS OFF OF XPOSITION AND WIDTH 
class Building{
  constructor(xPos,build_width){
    this.xPos = xPos 
    this.height = floor(random(100,150)) 
    this.build_width = build_width 
    this.color = color(random(0,255),random(0,255),random(0,255))
  }
  createBuilding(){
    rectMode(CORNERS)
    fill(this.color)
    rect(this.xPos-(this.build_width/2),150,this.xPos+(this.build_width/2),150-this.height)
  }
}
//CAR CLASS FOR RENDERING CARS OFF X AND Y POSITIONS 
class Car{
  constructor(xPos, yPos){
    this.xPos = xPos 
    this.yPos = yPos 
  }
  moveCar(){
    if(this.xPos < 0){
      this.xPos = 600 
    }
    this.xPos -= 3
  }
  moveIndicatorCar(){
    this.xPos = 600-(seconds*(width/(60)))
  }
  createIndicatorCar(){
    //BODY
    fill(16, 166, 5)
    noStroke()
    rectMode(CORNERS)
    rect(this.xPos-10,this.yPos+8,this.xPos+10,this.yPos)
    triangle(this.xPos-6,this.yPos,
      this.xPos-2,this.yPos-6,
      this.xPos-2,this.yPos)
    triangle(this.xPos+6,this.yPos-6,
      this.xPos+10,this.yPos,
      this.xPos+6,this.yPos)
    fill(176, 255, 252)
    rect(this.xPos-2,this.yPos-6,this.xPos+6,this.yPos)
    //WHEELS
    fill(0,0,0)
    circle(this.xPos-4,this.yPos+6,6)
    circle(this.xPos+4,this.yPos+6,6)
  }
  createCar(){
    //BODY
    fill(120, 0, 0)
    noStroke()
    rectMode(CORNERS)
    rect(this.xPos-10,this.yPos+8,this.xPos+10,this.yPos)
    triangle(this.xPos-6,this.yPos,
      this.xPos-2,this.yPos-6,
      this.xPos-2,this.yPos)
    triangle(this.xPos+6,this.yPos-6,
      this.xPos+10,this.yPos,
      this.xPos+6,this.yPos)
    fill(176, 255, 252)
    rect(this.xPos-2,this.yPos-6,this.xPos+6,this.yPos)
    //WHEELS
    fill(0,0,0)
    circle(this.xPos-4,this.yPos+6,6)
    circle(this.xPos+4,this.yPos+6,6)
  }
}
function setup() {
  createCanvas(600, 200);
  //GET ALL THE TIME AT THE VERY START 
  let time = new Date() 
  let hours = time.getHours()
  let minutes = time.getMinutes()
  let seconds = time.getSeconds()
  //CREATE FIRST CARS ON START
  if(minutes == 0 && seconds == 0){ //CHECK FOR NEW THE 0 CASE
    car_array[0] = new Car(600-floor(seconds*(width/60)),random(150,190)) 
  }
  else{ //CREATE CAR ARRAYS BASED ON CURRENT TIME 
    for(let i = 0; i < minutes; i++){
      if(i == 0){
        car_array[0] = new Car(600-floor(seconds*(width/60)),random(150,190))
      } 
      else{
        car_array[i] = new Car(random(0,600),random(150,200))
      }
    }
  }
  //CREATE FIRST BUILDINGS 
  if(hours == 12 || hours == 0){ //CHECKS FOR 12 AM OR PM AND WILL ADJUST CODE FOR THAT
    for(let i = 0; i < 12; i++){
      building_array[i] = new Building(i*(width/12)+(width/24),random((width/12)-5,(width/12)+5))
    }
  }
  else{ //IF AM OR PM MAKE BUILDINGS OFF OF 1-12 TIME INSTEAD OF 24 HOUR TIME 
    if(hours > 12){
      for(let i = 0; i < hours - 12; i++){
        building_array[i] = new Building(i*(width/12)+(width/24),random((width/12)-5,(width/12)+5))
      }
    }
    else{
      for(let i = 0; i < hours; i++){
        building_array[i] = new Building(i*(width/12)+(width/24),random((width/12)-5,(width/12)+5))
      }
    }
  }
}

function draw() {
  time = new Date() 
  hours = time.getHours()
  minutes = time.getMinutes()
  seconds = time.getSeconds()
  if(hours > 12 && hours < 23){
    background(0, 0, 0)
  }
  else{
    background(104, 152, 158)
  }
  //CREATE ROAD
  fill(77, 77, 77)
  rect(0,150,600,200)
  //CHECK FOR A RESET 
  if(minutes == 0 && seconds == 0){ //THIS IS THE NEW HOUR CASE 
    //CREATE ONLY AN INDICATOR CAR FOR THE NEW MINUTE
    car_array[0] = new Car(600-floor(seconds*(width/60)),random(150,190)) 
    //UPDATE THE BUILDINGS 
    building_array = []
    if(hours == 12 || hours == 0){ //CHECKS FOR 12 AM OR PM 
      for(let i = 0; i < 12; i++){
        building_array[i] = new Building(i*(width/12)+(width/24),random((width/12)-5,(width/12)+5))
      }
    }
    else{
      if(hours > 12){ //CREATE NEW BUILDINGS EVERY NEW HOUR 
        for(let i = 0; i < hours - 12; i++){
          building_array[i] = new Building(i*(width/12)+(width/24),random((width/12)-5,(width/12)+5))
        }
      }
      else{
        for(let i = 0; i < hours; i++){
          building_array[i] = new Building(i*(width/12)+(width/24),random((width/12)-5,(width/12)+5))
        }
      }
    }
  }
  else{
    if(seconds == 0){ //CREATE NEW CARS EVERY MINUTE 
      car_array = []
      for(let i = 0; i < minutes; i++){
        if(i == 0){
          car_array[0] = new Car(600-floor(seconds*(width/60)),random(150,190))
        } 
        else{
          car_array[i] = new Car(random(0,600),random(150,200))
        }
      }
    }
  }
  //READ THE BUILDING ARRAY 
  for(let i = 0; i < building_array.length; i++){
    building_array[i].createBuilding()
  }
  //READ THE CAR ARRAY
  for(let i = 0; i < car_array.length; i++){
    if(i == 0){
      car_array[i].createIndicatorCar()
      car_array[i].moveIndicatorCar()
    }
    else{
      car_array[i].createCar()
      car_array[i].moveCar()
    }
  }
  //DEBUGGING LINES 
  //console.log(seconds)
  //console.log(building_array.length)
}
