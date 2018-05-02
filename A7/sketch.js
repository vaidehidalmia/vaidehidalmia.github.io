var data, thisYear;
var maxTotal = 6491860000;

var yearData = {};
var currentyear = 1947;
var colors = {
  'East Asia and Pacific': "#E6194B", //red
  'Africa': "#3CB44B", //green
  'South Asia': "#ffa500", //yellow
  'Europe and Central Asia': "#0082C8", //blue
  'Latin America and Caribbean': "#F582B4", //pink
  'Middle East and North Africa': "#911EB4", //purple
  'Other': "#46F0F0" //light blue
}

function preload(){
  data = loadJSON('data.json');
}

function setup() {
  createCanvas(2500, 4000);
  frameRate(30);
  organizeData();
  Minusbutton = createButton('Previous Year');
  Minusbutton.position(20, 50);
  Minusbutton.mousePressed(minusYear);

  Addbutton = createButton('Next Year');
  Addbutton.position(130, 50);
  Addbutton.mousePressed(addYear);
}

function minusYear() {
  currentyear--;
  if(currentyear < 1947)
	currentyear = 2018;
  organizeData();
}

function addYear() {
  currentyear++;
  if(currentyear > 2018)
	currentyear = 1947;
  organizeData();
}

function draw() {
	background(255);
	fill(0);
	textSize(50);
	text(currentyear,1000,50);

	textSize(12);
	fill("#E6194B");
	text('East Asia and Pacific',20,30);
	fill("#3CB44B");
	text('Africa',150,30);
	fill("#ffa500");
	text('South Asia',200,30);
	fill("#0082C8");
	text('Europe and Central Asia',280,30);
	fill("#F582B4");
	text('Latin America and Caribbean',430,30);
	fill("#911EB4");
	text('Middle East and North Africa',600,30);
	fill("#46F0F0");
	text('Other',780,30);

	var margin = 40;
	translate(20, 90);
	textSize(12);

	var i = 0;
	var rectheight = 10;
	var lineheight = 20;
	Object.keys(thisYear).forEach(function(key) {

		region = thisYear[key]['region'];
		total = thisYear[key]['total'];
		ibrd = thisYear[key]['ibrd'];
		idac = thisYear[key]['idac'];
		idag = thisYear[key]['idag'];
		var rectwidth = map(total,0, maxTotal, 0, 2000);
		var ibrdwidth = ibrd/total * rectwidth;
		var idacwidth = idac/total * rectwidth;
		var idagwidth = idag/total * rectwidth;
		// if (mouseX > margin && mouseX < margin+rectwidth && mouseY < margin+i*lineheight && mouseY > margin+i*lineheight+(-1*rectheight)) 
		//   fill(0);
		stroke(colors[region]);
		strokeWeight(8);
		fill(colors[region]);
		rect(0, i*lineheight, rectwidth, -1*rectheight);
		noStroke();
		rect(0, i*lineheight, idagwidth, -1*rectheight);
		rect(idagwidth, i*lineheight, idacwidth, -1*rectheight);
		fill(230);
		rect(idagwidth + idacwidth, i*lineheight, ibrdwidth, -1*rectheight);
		fill(0);
		text(key, rectwidth + 10, i*lineheight);
		i++;
	});

}

function organizeData() {
  thisYear = data[currentyear];
 //  Object.keys(thisYear).forEach(function(key) {
	// total = thisYear[key]['total']
	// if(total > maxTotal)
	//   maxTotal = total;
	// if (!minTotal) {
	// 	minTotal = total;
	// } 
	// else if (total < minTotal) {
	// 	minTotal = total;
	// }
 //  });
}