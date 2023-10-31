let link = 'http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?calendar=blacklist&dates=20231021'
let input 
let hometeamcolor
let awayteamcolor 
let weather
let homescore
let awayscore
let working = false 
let globaldata
let homename
let awayname 
let attendance
let date 

function setup() {
  //CANVAS AND JSON SETUP
  noCanvas();
  loadJSON(link, getData);
  // Create input box and set its position
  input = createInput();
  input.position(20, 20);

  createCanvas(800,400);
  let button = createButton('Submit');
  button.position(input.x + input.width, 20);
  button.mousePressed(updateVariables);  // When button is pressed, call logText function
}

function draw() {
  if(working == true){
    console.log(mouseX,mouseY)
    background("#000099");
    rectMode(CORNERS)
    noStroke()

    //DRAWING THE STADIUM
    fill(hometeamcolor)
    rect(665,328,800-665,100)
    quad(0,300,800-665,100,800-665,300,77,400)
    quad(800,300,665,100,665,300,800-77,400)

    //FIELD
    fill("#00ff00")
    quad(77,400,800-77,400,665,250,800-665,250)

    //PLAYERS 
    fill(hometeamcolor)
    noStroke()
    triangle(192,300,290,300,240,375)
    stroke(0)
    strokeWeight(3)
    circle(240,250,100)
    fill("#ffff00")
    noStroke()
    circle(187,342,10)
    circle(285,342,10)
    rectMode(CORNERS)
    rect(220,247,
      281,270)

    fill(awayteamcolor)
    noStroke()
    triangle(800-192,300,800-290,300,800-240,375)
    stroke(0)
    strokeWeight(3)
    circle(800-240,250,100)
    fill("#ffff00")
    noStroke()
    circle(800-187,342,10)
    circle(800-285,342,10)
    rectMode(CORNERS)
    rect(800-220,247,
      800-281,270)

    //TEXT
    textAlign(CENTER,CENTER)
    textSize(20)
    stroke(0)
    text(awayname + ": " + awayscore,240,200)
    text(homename + ": " + homescore,800-240,200)
    text(awayrecord,240,300)
    text(homerecord,800-240,300)
    text(attendance + " people watching",400,380)
    text("Date: " + date,200,100)
    text(240,350)
  }
  ///LOGIC///
  if(input.value() != 0){
    try {
      updateVariables();
      working = true
    } catch (error) {
    }
  }
}
function logText() {
  console.log(input.value());  //CONSOLE
  print(working)
}

function getData(data) {
  console.log(data.events)
  globaldata = data
}

//UPDATE THE VARIABLES 
function updateVariables(){
  for(let i = 0; i < globaldata.events.length; i++){
    if(globaldata.events[i].name == input.value()){
      hometeamcolor = '#' + globaldata.events[i].competitions[0].competitors[0].team.color
      awayteamcolor = '#' + globaldata.events[i].competitions[0].competitors[1].team.color
      homescore = globaldata.events[i].competitions[0].competitors[0].score
      awayscore = globaldata.events[i].competitions[0].competitors[1].score
      homename = globaldata.events[i].competitions[0].competitors[0].team.displayName
      awayname = globaldata.events[i].competitions[0].competitors[1].team.displayName
      attendance = globaldata.events[i].competitions[0].attendance
      homerecord = globaldata.events[i].competitions[0].competitors[0].records[0].summary
      awayrecord = globaldata.events[i].competitions[0].competitors[1].records[0].summary
      date = globaldata.events[i].date
    }
  }
}
