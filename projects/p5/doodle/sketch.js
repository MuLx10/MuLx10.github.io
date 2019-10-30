
var database, canvas;
var drawing = [];
var undoBin = [];
var currentPath = [];
var isDrawing = false;

function saveDrawing () {
  console.log("Saving drawing");
  var currdrawing = {}
  for (var i = 0 ;i<drawing.length;i++)
	  currdrawing[i] = drawing[i];
  var data = {
	  name: select("#saveName").value(),
	  drawing: currdrawing
  }
  database.collection("drawings").add(data)
  .then(function(docRef) {
	console.log("Document written with ID: ", docRef.id);
  }).catch(function(error) {
	console.error("Error adding document: ", error);
  });
}

function loadDrawing() {
	database.collection("drawings").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
		var data = doc.data();
		var loadName =  select("#loadName").value();
		if (loadName === data.name){
			console.log("Found");
			drawing = []
			for (var i in data.drawing)
				drawing.push(data.drawing[i]); 
		}
        //console.log(data.name);
		var li = createElement('li', data.name);
		li.parent('drawingsList');
	  });
	});
}

function startPath(){
	currentPath = [];
	isDrawing = true;
	drawing.push(currentPath);
}
function endPath() {
	isDrawing = false;
}
function setup() {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  database = firebase.firestore();
 
  canvas = createCanvas(400, 400);
  canvas.parent('sketch');
  canvas.mousePressed(startPath);
  canvas.mouseReleased(endPath);
  
  var saveButton = select("#saveButton");
  saveButton.mousePressed(saveDrawing);
  
  var loadButton = select("#loadButton");
  loadButton.mousePressed(loadDrawing);
  
  var undoButton = select("#undoButton");
  undoButton.mousePressed(function(){
	  var e = drawing.pop();
	  if(e)
		undoBin.push(e);
  });
  var redoButton = select("#redoButton");
  redoButton.mousePressed(function(){
	  var e = undoBin.pop();
	  if(e)
		drawing.push(e);
  });
}
function draw() {
  background(0);
  if (isDrawing)
	currentPath.push({x:mouseX, y:mouseY});  
  
  noFill();
  stroke(255);
  strokeWeight(2);
  for (var i = 0;i<drawing.length;i++){
	var path = drawing[i];
	beginShape();
	for (var j = 0;j<path.length;j++)
		vertex(path[j].x, path[j].y);
	endShape();
  }
}
