
var nytResponse;
var sectionCounts = {};
var maxValue = 0;

var maxTextSize = 250;
var defaultTextSize = 24;

function preload() {
  // myFont = loadFont('SourceCodePro-Regular.ttf');

  // Assemble url for API call
  var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
  var apikey = "62e5545e1bbe4abc9ddb2af50a964a91"; // see: https://developer.nytimes.com
  url += "?api-key=" + apikey;

  nytResponse = loadJSON(url);
  // loadJSON() is asynchronous, but calling it inside preload() guarantees
  // we'll have a response before setup() and draw() is run.
}

function setup() {

  createCanvas(850, 2100);
  background(0);

  textSize(defaultTextSize);
  // textFont(myFont);
  textAlign(CENTER, CENTER);
  noLoop(); // since we're not animating, one frame is sufficient: run draw() just once

  setupSectionsCountData();
}

function draw() {
  background(0);

  // Set the left and top margin
  var margin = 10;
  translate(margin*20, margin*5);

  var gap = 46; // in pixels
  var counter = 0;
  var size; 

  Object.keys(sectionCounts).forEach(function(key) {
    fill('red')
    size = setTextSizeByLetterCount(key);
    textSize(size);
    counter += size*0.5;
    text(key, 200, counter);
    counter += size*0.5;
  });
}

function setupSectionsCountData() {

  for (var i = 0; i < nytResponse.results.length; i++) {
    var section = nytResponse.results[i].section;

    if (section in sectionCounts) {
      sectionCounts[section] += 1;
      if (sectionCounts[section] > maxValue) { 
        maxValue = sectionCounts[section];
      }
    }
    else {
      sectionCounts[section] = 1;
    }
  }
}

function setTextSizeByLetterCount(section) {
  // map letter count values to our desired min / max text sizes
  return map(sectionCounts[section],
                0, maxValue,
                defaultTextSize, maxTextSize);
  
}