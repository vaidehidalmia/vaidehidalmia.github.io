
var nytResponse;
var headlines = [];
var wordCounts = {};
var wordHeadlines = {};
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
  frameRate(30);

  textSize(defaultTextSize);

  extractHeadlines();
  setupwordsCountData();
}

function draw() {
  background(255);

  // Set the left and top margin
  var margin = 50;
  translate(margin, margin);

  var lineheight = 2;

  var gap = 46; // in pixels
  var y_title = 0;
  var y_popup = 0;
  var size; 

  Object.keys(wordCounts).forEach(function(key) {
    size = setTextSizeByLetterCount(key);
    var rectwidth = size * key.length * 0.5;
    var rectheight = size * 0.6;
    textSize(size);
    y_title += size*0.7;
    if (mouseX > margin+50 && mouseX < margin+rectwidth+50 && mouseY < y_title + margin && mouseY > y_title-rectheight+margin) {
      if (wordCounts[key] > 1)
        fill(102, 0, 0); 
      else 
        fill (0);
    } 
    else if (wordCounts[key] > 1) {
      fill('red');
    }
    else {
      fill('gray');
    }
    
    text(key, 50, y_title);

    y_title += size*0.3;
    
    
  });

  Object.keys(wordCounts).forEach(function(key) {
    size = setTextSizeByLetterCount(key);
    var rectwidth = size * key.length * 0.5;
    var rectheight = size * 0.6;
    // show abstract on mouseover
    y_popup += size*0.7;
    if (mouseX > margin+50 && mouseX < margin+rectwidth+50 && mouseY < y_popup + margin && mouseY > y_popup-rectheight+margin) {
      if (wordCounts[key] > 1)
        fill(255, 153, 153); 
      else 
        fill ('gray');

      rect(mouseX, mouseY - 50, 400, 200);
      fill(0);
      textSize(20);
      for (var i = 0; i < wordHeadlines[key].length; i++) {
        text(wordHeadlines[key][i], mouseX+10, mouseY-5+50*i, 400-20);
      };
    }
    y_popup += size*0.3;
  });
}

function setupwordsCountData() {

  for (var i = 0; i < headlines.length; i++) {
    var words = split(headlines[i], ' ');
    for (var j = 0; j < words.length; j++) {
      word = words[j].replace(/[.,\/#!%\^&\*;:{}=\-_`~()]/g,"").toLowerCase();
      // console.log(word);
      if (stopwords.indexOf(word) > -1) {
        break;
      }
      if (word in wordCounts) {
        wordCounts[word] += 1;
        wordHeadlines[word].push(headlines[i]);
        if (wordCounts[word] > maxValue) { 
          maxValue = wordCounts[word];
        }
      }
      else {
        wordCounts[word] = 1;
        wordHeadlines[word] = [headlines[i]];
      }
    }  
  }  
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