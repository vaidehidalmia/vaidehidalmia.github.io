var data, thisYear;
var minTotal, maxTotal = 0;

var yearData = {};
var currentyear = 1947;

function preload(){
  data = loadJSON('data.json');
}

function setup() {
  createCanvas(1000, 4000);
  frameRate(30);
  organizeData();
  Minusbutton = createButton('Previous Year');
  Minusbutton.position(20, 20);
  Minusbutton.mousePressed(minusYear);

  Addbutton = createButton('Next Year');
  Addbutton.position(300, 20);
  Addbutton.mousePressed(addYear);
}

function minusYear() {
  console.log("clicked");
  console.log(currentyear);
  currentyear--;
  if(currentyear < 1947)
    currentyear = 2018;
  organizeData();
}

function addYear() {
  console.log("clicked");
  console.log(currentyear);
  // fill(0);
  // text(currentyear++,19,19);
  currentyear++;
  if(currentyear > 2018)
    currentyear = 1947;
  organizeData();
}

function draw() {
  background(255);

  var margin = 40;
  translate(20, 60);

  var i = 0;
  var rectheight = 15;
  var lineheight = 20;
  Object.keys(thisYear).forEach(function(key) {

    region = thisYear[key]['region'];
    var rectwidth = map(thisYear[key]['total'],minTotal, maxTotal, 0, width-margin*2);
    // if (mouseX > margin && mouseX < margin+rectwidth && mouseY < margin+i*lineheight && mouseY > margin+i*lineheight+(-1*rectheight)) 
    //   fill(0);
    if (region == 'East Asia and Pacific')
      fill(230, 25, 75,190);
    else if (region == 'Africa')
      fill(60, 180, 75,190);
    else if (region == 'South Asia')
      fill(255, 225, 25,190);
    else if (region == 'Europe and Central Asia')
      fill(0, 130, 200,190);
    else if (region == 'Latin America and Caribbean')
      fill(245, 130, 48,190);
    else if (region == 'Middle East and North Africa')
      fill(145, 30, 180,190);
    else 
      fill(70, 240, 240,190);

    
    rect(0, i*lineheight, rectwidth, -1*rectheight);
    fill(0);
    text(thisYear[key]['total'], 0, i*lineheight);
    i++;
  });

}

function organizeData() {
  thisYear = data[currentyear];
  Object.keys(thisYear).forEach(function(key) {
    total = thisYear[key]['total']
    if(total > maxTotal)
      maxTotal = total;
    if (!minTotal) {
      minTotal = total;
    } 
    else if (total < minTotal) {
      minTotal = total;
    }
  });
}