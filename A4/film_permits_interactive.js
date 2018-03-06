var table;
var secondsData, maxHrs, minHrs;
var state = 0;
var categoryCounts = {};
var maxValue = 0;
var x_values = [];
var y_values = [];

// Display "Loading..." on the screen so we see something's happening
function preload(){
	table = loadTable('relevant_data.csv', 'csv', 'header');
}

function setup() {
  button = createButton('Toggle');
  button.mousePressed(toggleState);
  translate(0,100);
  createCanvas(1200, 600);
  loadData();
  // noLoop();
}

function loadData() {
	secondsData = table.getColumn("DiffSeconds");
	categoryData = table.getColumn("Category");
	maxHrs = round(max(secondsData)/3600);
	minHrs = round(min(secondsData)/3600);
	setupCategoryCountData(categoryData);

	for (var i = 0; i < secondsData.length; i++) {
		append(x_values,random(1200));
		append(y_values,random(600));
	}

}

function draw() {
  var x = 0;
  background(255);
  if(state==1) {
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

	    drawBall(x_values[i], y_values[i], radius);
	  }
	  translate(-10,-120);
	  fill(0);
  	textSize(25);
	  text('I have visualized Film Permit Data.',10,30);
	  text('The bigger the size of the circle the longer the duration of the permit.',10,60);
	  text('The color indicates the category of the permit.',10,90);
  }
 
  else {
  	fill(0);
  	textSize(25);
	  text('I have visualized Film Permit Data.',10,30);
	  text('The bigger the size of the circle the more permits for that category.',10,60);
	  text('The color indicates the category of the permit.',10,90);
  	translate(0, 120);
  	Object.keys(categoryCounts).forEach(function(category) {
		var radius = map(categoryCounts[category],1, maxValue, 50, 200);
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
		
		x += radius*0.6;
		drawBall(x,100,radius);
		x += radius*0.6;
	  });
  } 
}

function setupCategoryCountData(data) {
  for (var i = 0; i < data.length; i++) {
	var category = data[i];

	if (category in categoryCounts) {
	  categoryCounts[category] += 1;
	  if (categoryCounts[category] > maxValue) { 
		maxValue = categoryCounts[category];
	  }
	}
	else {
	  categoryCounts[category] = 1;
	}
  }
}


function drawBall(x, y, dia) {
  ellipse(x, y, dia, dia);
}

function toggleState() {
  state = (state == 0) ? 1 : 0; // shorthand if-statement, aka "inline if"
}