var nytResponse;
var sectionCounts = {};
var sections = [
"Briefing",
"Opinion",
"World",
"National",
"Politics",
"Upshot",
"N.Y / Region",
"Business",
"Technology",
"Science",
"Health",
"Sports",
"Arts",
"Books",
"Movies",
"Theater",
"Sunday Review",
"Fashion & Style",
"T Magazine",
"Food",
"Travel",
"Magazine",
"Real Estate",
"Automobiles",
"Obituaries",
"Insider",
"U.S.",
"Business Day",
"Your Money",
"Smarter Living",
"Well",
"Reader Center"];
var maxValue = 0;
var defaultTextSize = 24;

var maxColor = 255;
var minColor = 10;

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

  createCanvas(1300, 1700);
  // background(0);

  textSize(defaultTextSize);
  // textFont(myFont);
  textAlign(CENTER, CENTER);
  noLoop(); // since we're not animating, one frame is sufficient: run draw() just once

  

  setupSectionsCountData();
}

function draw() {
  // background(0);

  // Set the left and top margin
  var margin = 30;
  var x = 0;
  var y =0;
  translate(margin*4, margin*4);

  var gap = 200; // in pixels
  var counter = 0;

  for (var y = 0; y < height-gap; y += gap) {
    for (var x = 0; x < width-gap; x += gap) {
    	console.log(sections[counter]);

    	fill(0, 0, 255, setTextSizeByLetterCount(sections[counter]));
    	text(sections[counter], x, y);
    	if(sections[counter+1]) 
    		counter++;
    	else break;
    }
    if (!sections[counter+1]) 
    	break;
  }

  
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
                minColor, maxColor);
  if (section in sectionCounts) {
    return map(sectionCounts[section],
                0, maxValue,
                minColor, maxColor);
  } 
  else {
    return minColor;
  }
  
}