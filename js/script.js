let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let isMouseDown = false;

canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight - 150;

canvas.addEventListener("mousedown", function () {
  isMouseDown = true;
});

canvas.addEventListener("mouseup", function () {
  isMouseDown = false;
  ctx.beginPath();
});

canvas.addEventListener("mousemove", function (e) {
  if (isMouseDown) {
    let line_width = document.getElementById("line_width").value;
    let line_color = document.getElementById("line_color").value;
    
    ctx.fillStyle = String(line_color);
    ctx.strokeStyle = String(line_color);

    ctx.lineWidth = document.getElementById("line_width").value * 2;
    console.log(ctx.lineWidth);

    ctx.lineTo(e.clientX - 7.5, e.clientY - 126);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(e.clientX - 7.5, e.clientY - 126, line_width, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(e.clientX - 7.5, e.clientY - 126);
  }
});
