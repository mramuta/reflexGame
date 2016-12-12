$(function() {
  var canvas = document.getElementById("canvasView");
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 20;
  var ctx = canvas.getContext("2d");
  var pointerRadius = 10;
  var posX = 0;
  var posY = 0;
  var time = new Date();
  var x = Math.random() * canvas.width;
  var y = canvas.height;
  var targetRadius = 10;
  var speed = 5
  var dx = Math.random() * speed;
  var dy = - Math.random() * speed;
  var hit = false;
  var miss = false;
  var score = 0;
  var timer = new Date()


  document.addEventListener("mousemove", mouseMoveHandler, false);
  document.addEventListener("mousedown", mouseClickHandler, false);

  function plusOrMinus(){
    return Math.random() < 0.5 ? -1 : 1;
  }

  function rand(){
    return Math.random();
  }

  function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY - canvas.offsetTop;
    if(relativeX > 0 && relativeX < canvas.width) {
        x -= posX + relativeX;
        posX = -relativeX;
    }
    if(relativeY > 0 && relativeY < canvas.height) {
        y -= posY + relativeY;
        posY = -relativeY;
    }
  }

  function mouseClickHandler(e) {
    if (Math.abs(canvas.width/2 - x) < targetRadius && Math.abs(canvas.height/2 - y) < targetRadius){
      hit = true;
      timer = new Date()
      score += 1;
      targetStart();
    }else{
      timer = new Date()
      miss = true;
    }
  }

  function drawHit() {
    ctx.font = "50px Impact";
    ctx.fillStyle = "white";
    var seconds = parseInt(new Date() - time).toString().slice(0,-1);
    ctx.fillText("NICE SHOT!", canvas.width/2, canvas.height/2);
  }

  function drawMiss() {
    ctx.font = "50px Impact";
    ctx.fillStyle = "white";
    var seconds = parseInt(new Date() - time).toString().slice(0,-1);
    ctx.fillText("YOU MISSED!", canvas.width/2, canvas.height/2);
  }

  function drawTarget() {
    ctx.beginPath();
    ctx.arc(x, y, targetRadius, 0, Math.PI*2);
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#FF9933";
    ctx.fillStyle = "#FF9933";
    ctx.fill();
    ctx.closePath();
  }

  function drawPointer() {
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "lime";
    ctx.strokeStyle = "lime";
    ctx.arc(canvas.width/2, canvas.height/2, pointerRadius, 0, Math.PI*2);
    ctx.rect(canvas.width/2-.5, canvas.height/2 + pointerRadius/2, 1,12);
    ctx.rect(canvas.width/2-.5, canvas.height/2 - pointerRadius/2, 1, -12);
    ctx.rect(canvas.width/2+ pointerRadius/2, canvas.height/2 -.5, 12,1);
    ctx.rect(canvas.width/2- pointerRadius/2, canvas.height/2 -.5,-12,1);
    ctx.strokeStyle = "lime"
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.shadowBlur = 0;
  }

  function drawGrid() {
    var spacing = 200;
    var lineWidth = 2;
    for(i=-1; i<canvas.width/spacing; i++){
      ctx.beginPath();
      ctx.rect(posX % spacing + i * spacing, 0, lineWidth, canvas.height);
      ctx.rect(0, posY % spacing + i * spacing, canvas.width, lineWidth);
      ctx.fillStyle = "#FB037E";
      ctx.fill();
      ctx.closePath();
    }
  }


  function drawTimer() {
    ctx.font = "18px Arial";
    ctx.fillStyle = "white";
    var seconds = parseInt(new Date() - time).toString().slice(0,-1);
    ctx.fillText("Time: "+ seconds.slice(0,-2), canvas.width-100, 20);
  }

  function drawScore() {
    ctx.font = "18px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: "+ parseInt(score), 20, 20);
  }

  function outOfBounds(){
    if ((y + dy > canvas.height-targetRadius) ||
        (y + dy < 0-targetRadius) ||
        (x + dx > canvas.width+targetRadius) ||
        (x + dx < 0-targetRadius)){
      return true
    }else{
      return false
    }
  }

  function targetStart(){
    x = canvas.width * rand();
    y = canvas.height - 30;
    dx = rand() * speed * plusOrMinus();
    dy = -rand() * speed;
  }

  function targetController(){
    if(outOfBounds()) {
      targetStart();
    }
  }

  function hitController(){
    if (hit){
      if (parseInt(new Date() - timer) < 500){
        drawHit();
      }else{
        hit = false;
      }
    }
  }

  function missController(){
    if (miss){
      if (parseInt(new Date() - timer) < 500){
        drawMiss();
      }else{
        miss = false;
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawTimer();
    drawScore()
    drawTarget();
    drawPointer();
    targetController();
    hitController();
    missController();

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
  }
  draw();
});
