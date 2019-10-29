var widthX = 0;
function setup() { 
  var canvas = createCanvas(1300, 600);
  canvas.parent('sketch-div');
} 
function draw() { 
  var maxIter = 100, inf = 16;
  pixelDensity(1);
  loadPixels();
  widthX+=100;
  if (widthX > width)
	  widthX = width;
  for (var x = 0;x<widthX;x++){
	  for (var y = 0;y<height;y++){
		  var a = map(x, 0, width, -2.5, 1.5);
		  var b = map(y, 0, height, -1, 1);
		  
		  var n = 0;
		  var za = 0, zb = 0;
		  var ca = a, cb = b;
		  while (n < maxIter){
			  var aa = za*za-zb*zb;
			  var bb = 2*za*zb;
			  za = aa+ca;
			  zb = bb+cb;
			  if (abs(za+zb) > inf){
				  break;
			  }
			  n++;
		  }
		  var valuer = map(n*abs(a+b), 0, maxIter*0.5, 0, 255);
		  var valueg = map(n*abs(b), 0, maxIter*1.5, 0, 255);
		  var valueb = map(n*abs(a), 0, maxIter*1, 0, 255);
		  if (n === maxIter){
			  valuer = valueg = valueb = 0;
		  }
		 
		  
		  var pix = (x+y*width)*4;
		  pixels[pix+0] = valuer;
		  pixels[pix+1] = valueg;
		  pixels[pix+2] = valueb;
		  pixels[pix+3] = 255;
		}
	}
	updatePixels();	  
	fill(250);
    noStroke();
    textFont('monospace');
    textSize(25);
    text("Mendelbrot Set", 80, 80);
}