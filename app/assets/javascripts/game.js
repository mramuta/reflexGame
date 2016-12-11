$(function() {
  var canvas = document.getElementById("canvasView");
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 20;
  var ctx = canvas.getContext("2d");
  var pointerRadius = 5;
  var posX = canvas.width/2;
  var posY = canvas.height/2;
  var time = new Date();

  document.addEventListener("mousemove", mouseMoveHandler, false);

  function mouseMoveHandler(e) {
      var relativeX = e.clientX - canvas.offsetLeft;
      var relativeY = e.clientY - canvas.offsetTop;
      if(relativeX > 0 && relativeX < canvas.width) {
          posX = relativeX;
      }
      if(relativeY > 0 && relativeY < canvas.height) {
          posY = relativeY;
      }
  }


  function drawPointer() {
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, pointerRadius, 0, Math.PI*2);
    ctx.stroke();
    ctx.closePath();
  }

  function drawGrid() {
    var spacing = 200;
    var speed = 1.5;
    for(i=-1; i<canvas.width/spacing; i++){
      ctx.beginPath();
      ctx.rect(posX % spacing + i * spacing, 0, 1, canvas.height);
      ctx.rect(0, posY % spacing + i * spacing, canvas.width, 1);
      ctx.fillStyle = "lightgray";
      ctx.fill();
      ctx.closePath();
    }
  }


  function drawTimer() {
      ctx.font = "16px Arial";
      ctx.fillStyle = "black";
      var seconds = parseInt(new Date() - time).toString().slice(0,-1);
      ctx.fillText("Time: "+ seconds.slice(0,-2), canvas.width-100, 20);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPointer();
    drawTimer();
    drawGrid();
    requestAnimationFrame(draw);
  }
  draw();
});
