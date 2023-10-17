//Create all of the button variables 
let buttonbutton
let grubutton
let unobutton
let winniebutton

//FLAGS 
let buttonflag = false
let gruflag = false
let unoflag = false 
let winnieflag = false 

//Text Boxes Array 
let textboxarray = [] 

//Array of templates
let templatesarray = [] 

function preload(){
  //Preload all of the meme templates 
  templatesarray.push(loadImage('memetemplates/button.jpg'))
  templatesarray.push(loadImage('memetemplates/gru.jpg'))
  templatesarray.push(loadImage('memetemplates/uno.png'))
  templatesarray.push(loadImage('memetemplates/winniethepooh.jpg'))
}
function setup() {
  //Create All Of The Buttons 
  buttonbutton = createButton("2 Buttons Meme Template")
  buttonbutton.mousePressed(buttonbackground)
  grubutton = createButton("Gru Meme Template")
  grubutton.mousePressed(grubackground)
  unobutton = createButton("Draw 25 Template")
  unobutton.mousePressed(unobackground)
  winniebutton = createButton("Winnie The Pooh Template")
  winniebutton.mousePressed(winniebackground) 

  //Create A Standard Canvas 
  createCanvas(400, 400);
}

function draw() {
  //Set Font Size 
  textSize(50)
  console.log(mouseX,mouseY)
  if(buttonflag){
    image(templatesarray[0], 0, 0, width, height);
    text(textboxarray[0].value(),157,144)
    text(textboxarray[1].value(),332,128)
    text(textboxarray[2].value(),291,541)
  }
  if(gruflag){
    image(templatesarray[1], 0, 0, width, height);
    text(textboxarray[0].value(),368,185)
    text(textboxarray[1].value(),864,207)
    text(textboxarray[2].value(),318,559)
    text(textboxarray[3].value(),818,560)
  }
  if(unoflag){
    image(templatesarray[1], 0, 0, width, height);
    text(textboxarray[0].value(),130,216)
    text(textboxarray[1].value(),478,84)
  }
  if(winnieflag){
    image(templatesarray[1], 0, 0, width, height);
    text(textboxarray[0].value(),481,112)
    text(textboxarray[1].value(),373,455)
    text(textboxarray[1].value(),413,673)
  }
}

//FUNCTIONS FOR CHANGING THE BACKGROUND 
function buttonbackground(){
  createCanvas(600,908)

  //Remove All Text Boxes 
  while(textboxarray.length > 0){
    textboxarray[textboxarray.length - 1].remove()
    textboxarray.pop()
  }
  let div = createDiv()
  //Create Text Boxes 
  for(let i = 0; i < 3;i++){
    textboxarray.push(createInput())
  }

  //FLAGS
  buttonflag = true
  gruflag = false 
  unoflag = false 
  winnieflag = false 
}

function grubackground(){ 
  createCanvas(1000,640)
  image(templatesarray[1], 0, 0, width, height);

  //Remove All Text Boxes 
  while(textboxarray.length > 0){
    textboxarray[textboxarray.length - 1].remove()
    textboxarray.pop()
  }
  let div = createDiv()
  //Create Text Boxes 
  for(let i = 0; i < 4;i++){
    textboxarray.push(createInput())
  }

  //FLAGS
  buttonflag = false 
  gruflag = true
  unoflag = false 
  winnieflag = false
}

function unobackground(){
  createCanvas(680,455)
  image(templatesarray[2], 0, 0, width, height);

  //Remove All Text Boxes 
  while(textboxarray.length > 0){
    textboxarray[textboxarray.length - 1].remove()
    textboxarray.pop()
  }
  let div = createDiv()
  //Create Text Boxes 
  for(let i = 0; i < 2;i++){
    textboxarray.push(createInput())
  }

  //FLAGS
  buttonflag = false
  gruflag = false 
  unoflag = true 
  winnieflag = false 
}

function winniebackground(){ 
  createCanvas(654,750)
  image(templatesarray[3], 0, 0, width, height);

  //Remove All Text Boxes 
  while(textboxarray.length > 0){
    textboxarray[textboxarray.length - 1].remove()
    textboxarray.pop()
  }
  let div = createDiv()
  //Create Text Boxes 
  for(let i = 0; i < 3;i++){
    textboxarray.push(createInput())
  }

  //FLAGS
  buttonflag = false
  gruflag = false 
  unoflag = false 
  winnieflag = true
}