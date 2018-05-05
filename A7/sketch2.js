countries = {
	'Republic of Albania': 'graduated from the IDA in 2008.',
	'Nepal': 'graduated from the IDA in 2014.',
	'Republic of Armenia': 'graduated from the IDA in 2014.',
	'Republic of Azerbaijan': 'graduated from the IDA in 2011.',
	'Republica Bolivariana de Venezuela': 'graduated from the IDA in 2017.',
	'Bosnia and Herzegovina': 'graduated from the IDA in 2014.',
	'Republic of Botswana': 'graduated from the IDA in 1974.',
	'Republic of Cameroon': 'graduated from the IDA in 1981 and reentered in 1994.',
	'Republic of Chile': 'graduated from the IDA in 1961.',
	'People\'s Republic of China': 'graduated from the IDA in 1999.',
	'Republic of Colombia': 'graduated from the IDA in 1962.',
	'Democratic Republic of the Congo': 'graduated from the IDA in 1982 and reentered in 1994.',
	'Republic of Costa Rica': 'graduated from the IDA in 1962.',
	'Republic of Cote d\'Ivoire': 'graduated from the IDA in 1973 and reentered in 1992.',
	'Dominican Republic': 'graduated from the IDA in 1973.',
	'Republic of Ecuador': 'graduated from the IDA in 1974.',
	'Republic of Equatorial Guinea': 'graduated from the IDA in 1999.',
	'Arab Republic of Egypt': 'graduated from the IDA in 1981, reentered in 1991, and graduated again in 1999.',
	'Republic of El Salvador': 'graduated from the IDA in 1977.',
	'Southern Africa': 'graduated from the IDA in 2014.',
	'Republic of Honduras': 'graduated from the IDA in 1980 and reentered in 1991.',
	'Republic of India': 'graduated from the IDA in 2014.',
	'Republic of Indonesia': 'graduated from the IDA in 1980, reentered in 1999, and graduated again in 2008 .',
	'Hashemite Kingdom of Jordan': 'graduated from the IDA in 1978.',
	'Republic of Korea': 'graduated from the IDA in 1973.',
	'Republic of Mauritius': 'graduated from the IDA in 1975.',
	'Macedonia': 'graduated from the IDA in 2002.',
	'Republic of Senegal': 'graduated from the IDA in 2008.',
	'Kingdom of Morocco': 'graduated from the IDA in 1975.',
	'Republic of Nicaragua': 'graduated from the IDA in 1981 and reentered in 1991.',
	'Federal Republic of Nigeria': 'graduated from the IDA in 1965 and reentered in 1989.',
	'The Independent State of Papua New Guine': 'graduated from the IDA in 1983 and reentered in 2003.',
	'Republic of Paraguay': 'graduated from the IDA in 1977.',
	'Republic of the Philippines': 'graduated from the IDA in 1979, reentered in 1991, and graduated again in 1993.',
	'Republic of Serbia': 'graduated from the IDA in 2008.',
	'Democratic Socialist Republic of Sri Lan': 'graduated from the IDA in 2017.',
	'St. Kitts and Nevis': 'graduated from the IDA in 1994.',
	'Kingdom of Swaziland': 'graduated from the IDA in 1995.',
	'Syrian Arab Republic': 'graduated from the IDA in 1974 and reentered in 2017.',
	'Kingdom of Thailand': 'graduated from the IDA in 1979.',
	'Republic of Tunisia': 'graduated from the IDA in 1979.',
	'Republic of Turkey': 'graduated from the IDA in 1973.',
	'Socialist Republic of Vietnam': 'graduated from the IDA in 2017.',
	'Republic of Turkey': 'graduated from the IDA in 1973.',
	'Republic of Zimbabwe': 'graduated from the IDA in 1983 and reentered in 1992.'

}
var colors = {
  'East Asia and Pacific': "#E6194B", //red
  'Africa': "#3CB44B", //green
  'South Asia': "#ffa500", //yellow
  'Europe and Central Asia': "#0082C8", //blue
  'Latin America and Caribbean': "#F582B4", //pink
  'Middle East and North Africa': "#911EB4", //purple
  'Other': "#46F0F0" //light blue
}

var sel;
var country = 'Republic of Albania';

function preload(){
  data = loadJSON('data.json');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  sel = createSelect();
  sel.position(20, 140);
  Object.keys(countries).forEach(function(key) {
    sel.option(key);
  });
  sel.changed(mySelectEvent);
}

function draw() {
	background(255);
	var margin = 20;
  	noStroke();
  	textSize(15);
  	fill(0);
  	text('To be eligible for support from the IDA, countries are assessed by their poverty and their lack of creditworthiness for commercial and IBRD borrowing.', 20, 30);
  	text('The association assesses countries based on their per capita income, lack of access to private capital markets, and policy performance in implementing pro-growth', 20,50);
  	text('and anti-poverty economic or social reforms.', 20, 70);
  	text('As of 2012, to borrow from the IDA\'s concessional lending programs, a country\'s gross national income (GNI) per capita must not exceed $1,175 (in 2010 dollars).', 20, 90);
  	text('Since IDA\'s founding, 44 countries have graduated and nine of these graduates have since reentered ("reverse graduated") IDA.', 20, 110);

  	text(country + ' ' + countries[country], 20,180);
  	for(var j = 1947; j < 2019; j++){
  		fill(0);
  		textSize(10);
  		if(j%2==0) 
    			text(j,map(j, 1947, 2018, margin, width-margin*2),height-margin);
    	if(country in data[j]) {
    		var point = data[j][country];
			var x = map(j, 1947, 2018, margin, width-margin*2);
		    var yibrd = map(point['ibrd'], 0, 1000000000, height-margin*2, margin);
		    fill(230);
		    ellipse(x,yibrd,5,5);
		    fill(colors[point['region']]);
		    var yida = map(point['idac']+point['idag'], 0, 1000000000, height-margin*2, margin);
		    ellipse(x,yida,5,5);
      	}
  	}
}

function mySelectEvent() {
  country = sel.value();
}