function setup() {
  let white = color(255,255,255)
  let black = color(0,0,0)
  createCanvas(500, 500);
  background(220);
  //BOTTOM
  let bottomhalf = color(203, 255, 135)
  noStroke()
  fill(bottomhalf)
  beginShape()
  vertex(0,289)
  vertex(500,297)
  vertex(500,500)
  vertex(0,500)
  endShape()
  //TOP 
  let tophalf = color(86, 4, 102)
  fill(tophalf)
  beginShape()
  vertex(0,289)
  vertex(0,0)
  vertex(500,0)
  vertex(500,297)
  endShape()
  //LINES
  noFill()
  let lineY = 10
  stroke(white)
  strokeWeight(1)
  bezier(0,lineY,
    40,lineY-10,
    450,lineY+10,
    500,lineY)
  lineY = 20
  stroke(white)
  strokeWeight(1)
  bezier(0,lineY,
    40,lineY-10,
    450,lineY+10,
    500,lineY)
  lineY = 30
  stroke(white)
  strokeWeight(1)
  bezier(0,lineY,
    40,lineY-10,
    450,lineY+10,
    500,lineY)
  lineY = 40
  stroke(white)
  strokeWeight(1)
  bezier(0,lineY,
    40,lineY-10,
    450,lineY+10,
    500,lineY)
  lineY = 70
  stroke(white)
  strokeWeight(1)
  bezier(0,lineY,
    40,lineY-10,
    450,lineY+10,
    500,lineY)
  lineY = 120
  stroke(white)
  strokeWeight(1)
  bezier(0,lineY,
    40,lineY-10,
    450,lineY+10,
    500,lineY)
  lineY = 150
  stroke(white)
  strokeWeight(1)
  bezier(0,lineY,
    40,lineY-10,
    450,lineY+10,
    500,lineY)
  lineY = 200
  stroke(white)
  strokeWeight(1)
  bezier(0,lineY,
    40,lineY-10,
    450,lineY+10,
    500,lineY)
  stroke(black)
  let lineX = 20
  stroke(white)
  strokeWeight(1)
  bezier(lineX,0,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 50
  stroke(white)
  strokeWeight(1)
  bezier(lineX,0,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 80
  stroke(white)
  strokeWeight(1)
  bezier(lineX,0,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 110
  stroke(white)
  strokeWeight(1)
  bezier(lineX,0,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 150
  stroke(white)
  strokeWeight(1)
  bezier(lineX,0,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 180
  stroke(white)
  strokeWeight(1)
  bezier(lineX,0,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 220
  stroke(white)
  strokeWeight(1)
  bezier(lineX,0,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 250
  stroke(white)
  strokeWeight(1)
  bezier(lineX,0,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 290
  stroke(white)
  strokeWeight(1)
  bezier(lineX,0,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 300
  stroke(white)
  strokeWeight(1)
  bezier(lineX,0,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 350
  stroke(white)
  strokeWeight(1)
  bezier(lineX,0,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 380
  stroke(white)
  strokeWeight(1)
  bezier(lineX,0,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 410
  stroke(white)
  strokeWeight(1)
  bezier(lineX,0,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 440
  stroke(white)
  strokeWeight(1)
  bezier(lineX,0,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 450
  stroke(white)
  strokeWeight(1)
  bezier(lineX,0,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  //LOW HALF LINES 
  lineX = 20
  stroke(black)
  strokeWeight(1)
  bezier(lineX,295,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 50
  stroke(black)
  strokeWeight(1)
  bezier(lineX,295,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 80
  stroke(black)
  strokeWeight(1)
  bezier(lineX,295,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 110
  stroke(black)
  strokeWeight(1)
  bezier(lineX,295,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 150
  stroke(black)
  strokeWeight(1)
  bezier(lineX,295,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 180
  stroke(black)
  strokeWeight(1)
  bezier(lineX,295,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 220
  stroke(black)
  strokeWeight(1)
  bezier(lineX,295,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 250
  stroke(black)
  strokeWeight(1)
  bezier(lineX,295,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 290
  stroke(black)
  strokeWeight(1)
  bezier(lineX,295,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 300
  stroke(black)
  strokeWeight(1)
  bezier(lineX,295,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 350
  stroke(black)
  strokeWeight(1)
  bezier(lineX,295,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 380
  stroke(black)
  strokeWeight(1)
  bezier(lineX,295,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 410
  stroke(black)
  strokeWeight(1)
  bezier(lineX,295,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 440
  stroke(black)
  strokeWeight(1)
  bezier(lineX,295,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineX = 450
  stroke(black)
  strokeWeight(1)
  bezier(lineX,295,
    lineX-10,40,
    lineX+10,450,
    lineX,500)
  lineY = 292
  stroke(black)
  strokeWeight(1)
  bezier(0,lineY,
    40,lineY-10,
    450,lineY+10,
    500,lineY)
  lineY += 20
  stroke(black)
  strokeWeight(1)
  bezier(0,lineY,
    40,lineY-10,
    450,lineY+10,
    500,lineY)
  lineY += 20
  stroke(black)
  strokeWeight(1)
  bezier(0,lineY,
    40,lineY-10,
    450,lineY+10,
    500,lineY)
  lineY += 20
  stroke(black)
  strokeWeight(1)
  bezier(0,lineY,
    40,lineY-10,
    450,lineY+10,
    500,lineY)
  lineY += 20
  stroke(black)
  strokeWeight(1)
  bezier(0,lineY,
    40,lineY-10,
    450,lineY+10,
    500,lineY)
  lineY += 20
  stroke(black)
  strokeWeight(1)
  bezier(0,lineY,
    40,lineY-10,
    450,lineY+10,
    500,lineY)
  lineY += 20
  stroke(black)
  strokeWeight(1)
  bezier(0,lineY,
    40,lineY-10,
    450,lineY+10,
    500,lineY)
  lineY += 20
  stroke(black)
  strokeWeight(1)
  bezier(0,lineY,
    40,lineY-10,
    450,lineY+10,
    500,lineY)
  lineY += 20
  stroke(black)
  strokeWeight(1)
  bezier(0,lineY,
    40,lineY-10,
    450,lineY+10,
    500,lineY)
  lineY += 20
  stroke(black)
  strokeWeight(1)
  bezier(0,lineY,
    40,lineY-10,
    450,lineY+10,
    500,lineY)
  lineY += 20
  //ICECREAM
  let chocolate = color(79, 59, 21)
  stroke(chocolate)
  strokeWeight(80)
  point(210,200)
  point(260,200)
  point(310,200)
  //SKY
  let icecreamSky = color(117, 188, 235)
  fill(icecreamSky)
  noStroke()
  beginShape()
  vertex(171,185)
  vertex(350,207)
  vertex(341,295)
  vertex(176,293)
  endShape()
  //GRASS
  let icecreamGrass = color(79, 189, 112)
  fill(icecreamGrass)
  beginShape()
  vertex(340,285)
  vertex(174,273)
  vertex(176,293)
  vertex(341,295)
  endShape()
  //GRASSINVERTED
  let icecreamGrassInv = color(176,66,143)
  fill(icecreamGrassInv) 
  beginShape()
  vertex(176,293)
  vertex(341,295)
  vertex(333,351)
  vertex(180,348)
  endShape()
  //COW
  //EARS
  stroke(black)
  strokeWeight(7)
  line(263,263,255,270)
  strokeWeight(7)
  line(281,263,287,271)
  //HEAD
  noStroke()
  fill(white)
  ellipse(273,270,30,20)
  fill(black)
  ellipse(273,273,15,15)
  stroke(black)
  strokeWeight(5)
  point(262,267)
  strokeWeight(5)
  point(285,267)
  //LEGS
  stroke(white)
  line(284,305,274,315)
  line(302,304,304,320)
  //BODY
  noStroke()
  fill(black)
  bezier(272,296,
    274,270,
    310,275,
    318,295)
  fill(white)
  bezier(272,296,
    274,310,
    310,320,
    318,295)
  //CLOUDS 
  fill(white)
  circle(207,221,30)
  circle(220,221,30)
  circle(215,230,30)
  circle(300,221,30)
  circle(320,221,30)
  circle(310,230,30)
  //EXTRAICECREAMSTUFF
  stroke(white)
  strokeWeight(6)
  line(171,185,350,207)
  //-----------------------//
  //SCOOPER
  let metal = color(93,93,93)
  stroke(white)
  strokeWeight(40)
  line(84,379,206,430)
  noStroke()
  fill(metal)
  circle(48,357,89)
  //SPRINKLES 
  stroke(random(0,255),random(0,255),random(0,255))
  strokeWeight(5)
  point(366,401)
  stroke(random(0,255),random(0,255),random(0,255))
  strokeWeight(5)
  point(340,444)
  stroke(random(0,255),random(0,255),random(0,255))
  strokeWeight(5)
  point(431,470)
  stroke(random(0,255),random(0,255),random(0,255))
  strokeWeight(5)
  point(462,364)
  stroke(random(0,255),random(0,255),random(0,255))
  strokeWeight(5)
  point(396,342)
  stroke(random(0,255),random(0,255),random(0,255))
  strokeWeight(5)
  point(424,377)
  stroke(random(0,255),random(0,255),random(0,255))
  strokeWeight(5)
  point(468,438)
}

function draw() {
  console.log(mouseX,mouseY)
}
