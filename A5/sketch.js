var num = 2000;
var range = 20;

var ax = [];
var ay = [];

var rx = [0];
var ry = [0];

var coords = {
  0: [0,0],
  1: [177.5,0],
  2: [355,0],
  3: [532.5,0],
  4: [0,133.33333333333334],
  5: [177.5,133.33333333333334],
  6: [355,133.33333333333334],
  7: [532.5,133.33333333333334],
  8: [0,266.6666666666667],
  9: [177.5,266.6666666666667],
  10: [355,266.6666666666667],
  11: [532.5,266.6666666666667]
};

function setup() {
  createCanvas(710, 400);
  for ( var i = 0; i < num; i++ ) {
    ax[i] = width / 2;
    ay[i] = height / 2;
  }
  frameRate(60);
}

function draw() {
  background(51);


  stroke(255);
  fill(51);
  for (var i = 0; i < 12; i++) {
    rect(coords[i][0],coords[i][1],177.5,133.33333333333334);
  }

  var m = minute();
  var h = hour();
  var num = m * 5;


  if (h>=12) {
      h=h-12
  }

  // Shift all elements 1 place to the left
  for ( var i = 1; i < num; i++ ) {
    ax[i - 1] = ax[i];
    ay[i - 1] = ay[i];
  }

  // Put a new value at the end of the array
  ax[num - 1] += random(-range, range);
  ay[num - 1] += random(-range, range);

  // Constrain all points to the screen
  var nextx = (h+1)%4  != 0? coords[h+1][0]:710;
  var nexty = h%4 != 0 || h==0? (floor(h/4)+1) * 133.33333333333334:400;
  ax[num - 1] = constrain(ax[num - 1], coords[h][0], nextx);
  ay[num - 1] = constrain(ay[num - 1], coords[h][1], nexty);

  // Draw a line connecting the points
  for ( var j = 1; j < num; j++ ) {
    var val = j / num * 204.0 + 51;
    stroke(val);
    line(ax[j - 1], ay[j - 1], ax[j], ay[j]);
  }
}