const frame = new Frame();
frame.on("ready", ()=>{ // ES6 Arrow Function - similar to function(){}
    zog("ready from ZIM Frame"); // logs in console (F12 - choose console)

    // often need below - so consider it part of the template
    let stage = frame.stage;
    let stageW = frame.width;
    let stageH = frame.height;
    frame.outerColor = "#000";
    frame.color = "#f3cf3f";

    // REFERENCES for ZIM at http://zimjs.com
    // see http://zimjs.com/learn.html for video and code tutorials
    // see http://zimjs.com/docs.html for documentation
    // see https://www.youtube.com/watch?v=pUjHFptXspM for INTRO to ZIM
    // see https://www.youtube.com/watch?v=v7OT0YrDWiY for INTRO to CODE

    // CODE HERE
    // a Blob with Bezier points centered on the stage
    new Blob().center();
  
    new Label("Try Drag and Double click controls...").pos(50,50,stage).alp(.5);

    stage.update(); // this is needed to show any changes
  
    // DOCS FOR ITEMS USED
    // http://zimjs.com/docs.html?item=blob
    // http://zimjs.com/docs.html?item=center
    // http://zimjs.com/docs.html?item=label
    // http://zimjs.com/docs.html?item=pos
    // http://zimjs.com/docs.html?item=alp
    // http://zimjs.com/docs.html?item=frame
  
    // FOOTER
    // call remote script to make ZIM Foundation for Creative Coding icon
    createIcon(frame); 

}); // end of ready