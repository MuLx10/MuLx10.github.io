var t = 0;
var wave = [];
var slider, button;

function setup() { 
  var canvas = createCanvas(800, 400);
  canvas.parent('sketch-div');
  slider = createSlider(1, 10, 3);
  slider.parent('slider-div');
  button = createSlider(0,1,0);
  button.parent('button-div');
} 	

function draw() {
  background(0);
  translate(150,200);
  let x = 0;
  let y = 0;
  for(let i = 0; i<slider.value();i++){
	  let px = x;
	  let py = y;
	  var n;
	  if (!button.value()){
		  n = i + 1;
	  }
	  else{
		  n = 2 * i + 1;
	  }
	  var r = 75 * (4/(n*PI))*pow(-1,n+1);
	  x += r*cos(n*t);
	  y += r*sin(n*t);
	  
	  fill(255, 180);
	  ellipse(x,y,5);
	  stroke(255);
	  noFill();
	  ellipse(px, py , r*2);
	  
	  line(px,py,x,y);
  }
  wave.unshift(y);
  t += 0.03;
  if (wave.length > 500)
	  wave.pop();
  
  translate(200,0);
  
  line(x-200,y, 0, wave[0]);
  beginShape();
  for (var i = 0;i<wave.length;i++)
	  vertex(i, wave[i]);
  endShape();
}