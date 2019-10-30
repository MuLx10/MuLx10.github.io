// noprotect




function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 4;

function setup() {
  var canvas = createCanvas(600, 400);
  canvas.parent("sketch-div");
  cols = width / resolution;
  rows = height / resolution;

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(0);
  fill(250);
  noStroke();
  textFont('monospace');
  textSize(25);
  text("Cellular Automata", 80, 80);
  translate(0, height/4);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }

  let next = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      let sum = 0;
      let neighbors = countNeighbors(grid, i, j);

      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }
  grid = next;
}


function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}






/*var d=1, q = 4;
function setup() { 
  var canvas = createCanvas(400, 400);
  canvas.parent("sketch-div");
  d = pixelDensity();
  
  loadPixels();
  for (var x = q;x<width-q;x+=q){
	  for (var y = q;y<height-q;y+=q){
        var pix = (x*d+y*d*width)*4;
        var val = random(0,2)*255;
		  pixels[pix+0] = val;
		  pixels[pix+1] = val;
		  pixels[pix+2] = val;
		  pixels[pix+3] = val;
      }
    }
    updatePixels();
}

function draw() { 
  var newGen = [];
  loadPixels();
  for (var x = 1;x<width-1;x++){
	  for (var y = 1;y<height-1;y++){
		  var state = pixels[(x*d+y*d*width)*4]/255;
        
          var liveNeighbour = 0 ;
          for (var i =-1;i<=1;i++){
            for (var j = -1;j<=1;j++){
              var pix = 4 * ((y * d + j) * width * d + (x * d + i));
              liveNeighbour+=pixels[pix];
            }
          }
          liveNeighbour/=255;
          liveNeighbour -= state;
          var newstate;
          if (state == 1 && liveNeighbour > 3) newstate = 0;
          else if (state == 1 && liveNeighbour < 2) newstate = 0;
          else if (state == 0 && liveNeighbour == 3) newstate = 1;
          else newstate = state;
          newGen.push(newstate);
		}
	}
    for (var x = 1;x<width-1;x++){
	  for (var y = 1;y<height-1;y++){
        var pix = (x+y*width)*4;
        var val = newGen[pix/4]*255;
		  pixels[pix+0] = val;
		  pixels[pix+1] = val;
		  pixels[pix+2] = val;
		  pixels[pix+3] = val;
      }
    }
	updatePixels();	  
	fill(250);
    noStroke();
}*/