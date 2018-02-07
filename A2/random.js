var hour_xs = [], hour_ys = [];
var minute_xs = [], minute_ys = [];
var second_xs = [], second_ys = [];

function setup() {
	createCanvas(1500, 800);
	circle_y = [75,135,195,255];
	circle_x = [450,510,570,630,690,780,840,900,960,1020,1110,1170,1230,1290,1350];
	for (var k = 0; k < 3; k++) {
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 5; j++) {
				append(minute_xs, circle_x[j + 5 * k]);
	  			append(minute_ys, circle_y[i]);
	  		}
	  	}
	}

	rect_y = [350,350,410,470,470,550,550,610,670,670];
	rect_x = [425,485,455,425,485,575,635,605,575,635,725,785,755,725,785,875,935,905,875,935,1025,1085,1055,1025,1085,1175,1235,1205,1175,1235];
	
	for (var k = 0; k < 2; k++) {
		for (var i = 0; i < 6; i++) {
			for (var j = 0; j < 5; j++) {
				append(second_ys, rect_y[j + 5 * k]);
				append(second_xs, rect_x[j + 5 * i]);
			}
		}
	}

}

function draw() {
    var h=hour();
    var m=minute();
	var s=second();

	if(h>12) {
		h = h - 12;
	}

	background(200);
	
	fill(0,191,255);
	for (var i = 0; i < m; i++) {
		noStroke();
		ellipse(minute_xs[i], minute_ys[i], 50, 50);
	}
	
	fill(50,205,50);
	for (var i = 0; i < s; i++) {
		rect(second_xs[i], second_ys[i], 50, 50);
	}

	
	fill(204, 101, 192, 127);
	stroke(127, 63, 120);
	

	push();
	if (h > 0) {
		translate(120, 100);
		create_flower();
	}

	if (h > 1) {
		translate(150, 0);
		create_flower();
	}
	
	if (h > 2) {
		translate(0, 150);
		create_flower();
	}

	if (h > 3) {
		translate(-150, 0);
		create_flower();
	}

	
	if (h > 4) {
		translate(80, -80);
		create_flower();
	}
	pop();


	push();
	if (h > 5) {
		translate(0,300);
		translate(120, 100);
		create_flower();
	}

	if (h > 6) {
		translate(150, 0);
		create_flower();
	}

	if (h > 7) {
		translate(0, 150);
		create_flower();
	}

	if (h > 8) {
		translate(-150, 0);
		create_flower();
	}

	if (h > 9) {
		translate(80, -80);
		create_flower();
	}
	pop();

	push();
	if (h > 10) {
		translate(0,600);
		translate(120, 100);
		create_flower();
	}

	if (h > 9) {
		translate(150, 0);
		create_flower();
	}
	pop();
	
}

function create_flower () {
	noStroke();
	for (var i = 0; i < 10; i ++) {
		ellipse(0, 30, 20, 80);
	    rotate(PI/5);
	}
}