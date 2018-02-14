
var nytResponse;
var headlines = [];
var wordCounts = {};
var maxValue = 0;

var maxTextSize = 90;
var defaultTextSize = 6;

var stopwords = ["a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any","are","aren't","as","at","be","because","been","before","being","below","between","both","but","by","can't","cannot","could","couldn't","did","didn't","do","does","doesn't","doing","don't","down","during","each","few","for","from","further","had","hadn't","has","hasn't","have","haven't","having","he","he'd","he'll","he's","her","here","here's","hers","herself","him","himself","his","how","how's","i","i'd","i'll","i'm","i've","if","in","into","is","isn't","it","it's","its","itself","let's","me","more","most","mustn't","my","myself","no","nor","not","of","off","on","once","only","or","other","ought","our","ours","ourselves","out","over","own","same","shan't","she","she'd","she'll","she's","should","shouldn't","so","some","such","than","that","that's","the","their","theirs","them","themselves","then","there","there's","these","they","they'd","they'll","they're","they've","this","those","through","to","too","under","until","up","very","was","wasn't","we","we'd","we'll","we're","we've","were","weren't","what","what's","when","when's","where","where's","which","while","who","who's","whom","why","why's","with","won't","would","wouldn't","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves"];


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

  createCanvas(850, 5500);
  // background(0);

  textSize(defaultTextSize);
  // textFont(myFont);
  textAlign(CENTER, CENTER);
  noLoop(); // since we're not animating, one frame is sufficient: run draw() just once

  extractHeadlines();
  setupwordsCountData();
}

function draw() {
  // background(0);

  // Set the left and top margin
  var margin = 10;
  translate(margin*20, margin*5);

  var gap = 46; // in pixels
  var counter = 0;
  var size; 

  Object.keys(wordCounts).forEach(function(key) {
    size = setTextSizeByLetterCount(key);
    textSize(size);
    if (wordCounts[key] > 1) {
      fill('red');
    }
    else {
      fill('gray');
    }
    counter += size*0.5;
    text(key, 200, counter);
    counter += size*0.5;
  });
}

function setupwordsCountData() {

  for (var i = 0; i < headlines.length; i++) {
    var words = split(headlines[i], ' ');
    for (var j = 0; j < words.length; j++) {
      word = words[j].replace(/[.,\/#!%\^&\*;:{}=\-_`~()]/g,"").toLowerCase();
      // console.log(word);
      if (stopwords.indexOf(word) > -1) {
        console.log(word);
        break;
      }
      if (word in wordCounts) {
        wordCounts[word] += 1;
        if (wordCounts[word] > maxValue) { 
          maxValue = wordCounts[word];
        }
      }
      else {
        wordCounts[word] = 1;
      }
    }  
  } 
  console.log(wordCounts);   
}

function setTextSizeByLetterCount(word) {
  // map letter count values to our desired min / max text sizes
  return map(wordCounts[word],
                0, maxValue,
                defaultTextSize, maxTextSize);
  
}

function extractHeadlines() {

  for (var i = 0; i < nytResponse.results.length; i++) {
    var h = nytResponse.results[i].title;
    append(headlines, h);
  }

}