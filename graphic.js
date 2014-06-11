function displayText(inc, iter) {

  // display the increment and iterations on the canvas

  ctx.clearRect(0,200,200,40);
  ctx.font = "15px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Increment: " + inc, 5, 215);
  ctx.fillText("Iterations: " + iter, 5, 235);
}


function getNew() {

  // set up a new figure
  // drawn only in black and white for now

  interval = 250;
  nIter = 60;

  // set an increment at random but skip the boring ones
  // most are circles.  have also skipped a line (355).
  var skip = [ 6, 12, 13, 19, 25, 31, 32, 37, 38, 44, 50, 51, 56, 57, 63, 69, 
          75, 76, 81, 82, 88, 94, 100, 101, 107, 113, 119, 120, 126, 
          132, 138, 144, 145, 151, 157, 163, 169, 170, 176, 182, 188, 
          189, 195, 201, 207, 208, 213, 214, 220, 226, 232, 233, 239,
          245, 251, 257, 258, 264, 270, 276, 277, 282, 283, 289,
          295, 301, 302, 308, 314, 320, 321, 327, 333, 339, 340, 345, 346, 
          352, 355, 358, 364, 365, 370, 371, 377, 383, 389, 390, 396, 400,
          402, 408, 409, 414, 415, 421, 427, 428, 433, 434, 439 ];
  var aIncDone = false;
  while (aIncDone === false) {
    aInc = Math.floor(Math.random() * 440) + 1;
    var matchedSkip = false;
    for (var j = 0; j < skip.length; j++) {
      if (aInc === skip[j]) {
        matchedSkip = true;
        break;
      }
    }
    if (matchedSkip !== true) {
      aIncDone = true;
    }
  } 

  displayText(aInc, nIter);
}


function startFigure() {

  // initialize the figure

  var x = radius;
  var y = 0;
  ctx.clearRect(0,0,200,200);
  ctx.beginPath();
  ctx.moveTo(x + centerX, y + centerY);
}


function drawLine() {

  // draw a line

  alpha += aInc;
  var x = Math.cos(alpha) * radius;
  var y = Math.sin(alpha) * radius;
  ctx.lineTo(x + centerX, y + centerY);
  ctx.strokeStyle = "#000000"; // black
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + centerX, y + centerY); 
}


function changeToState(toState) {

  if (toState === "finish") {

    // change button to "finish" and hide "draw one"

    b.className = "finish";
    b.textContent = "Finish Fast";
    d.className = "hide";
    d.style = "display:none";
  }
  else { // change button to "draw" and show "draw one"

    b.className = "draw";
    b.textContent = "Draw Another Image";
    d.className = "show";
    d.style = 'display:block';
  }
}


function draw() {

  // draw containing interval timer

  var i = 0;
  alpha = 0;

  startFigure();

  myVar = setInterval(function() { // this gets called every interval
          // milliseconds until all the iterations are done and it's cleared
    if (i >= nIter) {

      clearInterval(myVar);
      changeToState("draw");
      return;
 
    }
    else { // draw another line
      i++;
      drawLine();
    }

  }, interval);
}


function finishOrStart() {
  
  // callback for "finish fast / draw another" button

  // if the class is "draw," reset buttons and draw a new figure
  if (b.className === "draw") {

    changeToState("finish");
    getNew();
    draw();
    return;
  }

  // otherwise, clear the interval timer and draw the figure from
  // scratch without the interval pauses
  clearInterval(myVar);

  var i = 0;
  alpha = 0;

  startFigure();

  var done = false;
  while (done === false) {

    if (i >= nIter) {

      done = true;

      // reset buttons
      changeToState("draw");

      return;

    }
    else {
      ++i;
      drawLine();

    }
  }
}


function drawOneLine() {

  // draw one more line on the figure
  drawLine();

  // increment the iteration count on the canvas
  nIter++;
  displayText(aInc, nIter);
}
