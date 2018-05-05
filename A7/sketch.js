var data, thisYear;
var maxTotal = 6491860000;

var yearData = {};
var currentyear = 1947;
var oldValue = 1947;

var colors = {
  'East Asia and Pacific': "#E6194B", //red
  'Africa': "#3CB44B", //green
  'South Asia': "#ffa500", //yellow
  'Europe and Central Asia': "#0082C8", //blue
  'Latin America and Caribbean': "#F582B4", //pink
  'Middle East and North Africa': "#911EB4", //purple
  'Other': "#46F0F0" //light blue
}

var slider;

function preload(){
  data = loadJSON('data.json');
}

function setup() {
  createCanvas(2500, 4000);
  frameRate(30);
  organizeData();

  slider = createSlider(1947, 2018, 1947, 1);
  slider.position(20, 70);
  slider.style('width', '900px');
}

function draw() {
	currentyear = slider.value();
	if (currentyear!= oldValue) {
		organizeData();
		oldValue = currentyear;
	}
	
	background(255);

	fill(0);
	textSize(30);
	text('World Bank Lendings over Time', 20, 40);

	translate(0,30);

	fill(0);
	textSize(50);
	text(currentyear,1000,50);

	textSize(10);
	text('1947',17,60);
	text('2018',913,60);

	textSize(15);
	text('International Bank for Reconstruction and Development (IBRD) - grey',500,420);
	textSize(12);
	text('A global development cooperative that primarily provides loans, guarantees, risk management products,',500,435);
	text(' and expertise on development-related disciplines, as well as coordinates responses to regional and global challenges.',500,450)
	textSize(15);
	text('The International Development Association (IDA) - color',500,490);
	textSize(12);
	text('The largest multilateral source of concessional financing and the main instrument for pursuing',500,505);
	text('the World Bank Group\'s goals of ending extreme poverty in the world\'s poorest countries',500,520);


	fill(0);
	textSize(12);
	fill("#E6194B");
	text('East Asia and Pacific',20,33);
	fill("#3CB44B");
	text('Africa',150,33);
	fill("#ffa500");
	text('South Asia',200,33);
	fill("#0082C8");
	text('Europe and Central Asia',280,33);
	fill("#F582B4");
	text('Latin America and Caribbean',430,33);
	fill("#911EB4");
	text('Middle East and North Africa',600,33);
	fill("#46F0F0");
	text('Other',780,33);

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
}