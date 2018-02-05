function setup() {
  createCanvas(1500, 800);
}

function draw() {

  var h=hour();
  var m=minute();
  var s=second();

  background(150,100,0);
  if(s%2==0) {
    fill(255,0,0);
  }
  else {
    fill(255,90,0);
  }
  
  rect(400,150,640,380);

  fill(255,255,255);
  ellipse(560,340,300,300);
  ellipse(880,340,300,300);

  text('The time right now is:\n' + h + ':'+ m +':'+ s,20, 50);

  var angle1=map(s,0,60,0,2*PI)
  var angle2=map(m,0,60,0,2*PI)

  if (h>=12) {
    h=h-12
  }

  var angle3=map(h,0,12,0,2*PI)

  translate(560,340)

  push();
  rotate(angle3-(PI/1.31))
  fill(0)
  ellipse(70, 70, 100, 100)
  pop();

  translate(320,0)

  push();
  rotate(angle2-(PI/1.31))
  fill(0)
  ellipse(70, 70, 100, 100)
  pop();

}