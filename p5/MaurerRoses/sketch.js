let n = 2;
let d = 2; 

let dn = 0.001;
let dd = 0.005;

let angle = 5;
function setup() { 
  angleMode(DEGREES);
} 
function draw() { 
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-div');
  
  stroke(255);
  fill(250);
  noStroke();
  textFont('monospace');
  textSize(25);
  text("Maurer Rose", 80, 80);
  
  translate(width/2, height/2);
  noFill();
  strokeWeight(1);
  beginShape();
  for(let i = 0;i<361;i++)
  {
	  let k = i*d;
	  let r = 150*sin(n*k);
	  let x = r * cos(k);
	  let y = r * sin(k);
	  vertex(x, y);
	  //console.log(k);
  }
  endShape();
  stroke(255,0,0);
  strokeWeight(2);
  beginShape();
  for(let i = 0;i<361;i++)
  {
	  let k = i;
	  let r = 150*sin(n*k);
	  let x = r * cos(k);
	  let y = r * sin(k);
	  vertex(x, y);
	  //console.log(k);
  }
  endShape();
  
  rotate(angle);
  angle+=0.01;
  if(n > 4 || n < 2)
  {
	  dn *= -1; dd *= -1;
  }
  n += dn;
  d += dd;

}