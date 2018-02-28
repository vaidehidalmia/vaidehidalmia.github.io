var table;
var secondsData, maxHrs, minHrs;

// Display "Loading..." on the screen so we see something's happening
function preload(){
	table = loadTable('relevant_data.csv', 'csv', 'header');
}

function setup() {
	createCanvas(1200, 600);
  loadData();
  noLoop();
}

function loadData() {
    secondsData = table.getColumn("DiffSeconds");
    categoryData = table.getColumn("Category");
    maxHrs = round(max(secondsData)/3600);
    minHrs = round(min(secondsData)/3600);
}

function draw() {

  fill(0);
  textSize(25);
  text('I have visualized Film Permit Data.',10,30);
  text('The bigger the size of the circle the longer the duration of the permit.',10,60);
  text('The color indicates the category of the permit.',10,90);
  translate(10, 120);
  for (var i = 0; i < secondsData.length; i++) {
    var hrs = secondsData[i]/3600;
    var radius = map(hrs,minHrs, maxHrs, 0, 500);
    var category = categoryData[i];
    if (category == 'Television')
      fill(230, 25, 75,190);
    else if (category == 'Film')
      fill(60, 180, 75,190);
    else if (category == 'Theater')
      fill(255, 225, 25,190);
    else if (category == 'Commercial')
      fill(0, 130, 200,190);
    else if (category == 'Still Photography')
      fill(245, 130, 48,190);
    else if (category == 'WEB')
      fill(145, 30, 180,190);
    else if (category == 'Student')
      fill(70, 240, 240,190);
    else if (category == 'Documentary')
      fill(240, 50, 230,190);
    else if (category == 'Music Video')
      fill(2210, 245, 60,190);
    else 
      fill(0, 128, 128,190);

    drawBall(random(1200), random(600), radius);
  }
}

function drawBall(x, y, dia) {
  ellipse(x, y, dia, dia);
}

