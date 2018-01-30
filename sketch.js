function setup() {
  createCanvas(640, 480);
}

function draw() {
	

  fill(255,204,0);
  rect(300,70,80,map(second(), 0, 60, 0, 80));
  
  textSize(50);
  fill(0,0,255);
  text('Hi This is Vaidehi',40,280);

  // First change the mode to degrees (default is radians)
  angleMode(DEGREES);
  // Map the function minute() to values from 0~360
  rotate(map(second(), 60, 90, 80, 360));
  fill(255,0,0);
  ellipse(200, 200, 80, 80);
}