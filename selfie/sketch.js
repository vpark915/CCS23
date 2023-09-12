function setup() {
  //BACKGROUND//
  createCanvas(400, 400)
  background(98, 105, 133)
  //BODY//
  strokeWeight(4)
  rectMode(CORNERS)
  fill(224, 194, 110)
  rect(180,290,
    220,320)
  fill(56, 1, 7)
  bezier(120,400,
    130,280,
    270,280,
    280,400
  )
  //HEAD//
  fill(224, 194, 110)
  strokeWeight(4)
  bezier(100,170,
    102,340,
    298,340,
    300,170)
  bezier(100,170,
    102,110,
    298,110,
    300,170)
  //EYES//
  fill(0,0,0)
  ellipse(165,200,10,20)
  ellipse(235,200,10,20)
  //MOUTH//
  noFill();
  strokeWeight(2)
  bezier(170,250,
    180,255,
    220,255,
    230,250)
  //HAIR//
  fill(0,0,0)
  beginShape()
  vertex(100,170)
  bezierVertex(
    95,150,
    85,150,
    80,150)
  bezierVertex(
    77,118,
    132,91,
    150,100)
  bezierVertex(
    145,95,
    125,90,
    120,95
  )
  bezierVertex(
    125,80,
    191,87,
    200,95
  )
  bezierVertex(
    217,85,
    260,80,
    267,84
  )
  bezierVertex(
    255,85,
    241,91,
    243,97
  )
  bezierVertex(
    273,93,
    343,130,
    330,146
  )
  bezierVertex(
    319,145,
    300,153,
    300,170
  )
  bezierVertex(
    298,110,
    102,110,
    100,170
  )
  endShape()
  //HAND//
  fill(224, 194, 110)
  strokeWeight(3)
  circle(
    80,344,30
  )
  bezier(70,332,
    60,300,
    67,300,
    81,331)
  bezier(83,332,
    100,300,
    105,310,
    95,338)
}

function draw() {
  console.log(mouseX, mouseY)
}
