function setup() {
	createCanvas(1500, 800);
}

function draw() {
	background(200);
	noFill();
	beginShape();
	vertex(500, 50);
	vertex(500, 700);
	vertex(1000, 700);
	vertex(1000, 50);
	endShape();

	s = second();
	m = minute();
	h = hour();

	height_s = s * 10;
	height_m = m * 10;

	if (h>=12) {
    	h=h-12
  	}
	height_h = h * 50; 
	
	push();
	noStroke();

	fill(70,130,180, 100);
	rect(500,700 - height_s,500,height_s);

	fill(0, 102, 153, 100);
	rect(500,700 - height_m,500,height_m);

	fill(0, 102, 153, 150);
	rect(500,700 - height_h,500,height_h);
	pop();

	fill(0, 102, 153);
	textSize(20);
	label = 1;
	
	for (var i = 650; i > 50; i-=50) {
		line(500, i, 510, i);
		text(label,475, i + 8);
		label++;
	};

	textSize(10);
	label = 1;
	for (var i = 690; i > 90; i-=10) {
		line(1000, i, 990, i);
		text(label,1005, i + 2);
		label++;
	};

}