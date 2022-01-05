let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let line_width = document.getElementById("line_width");
let line_color = document.getElementById("line_color");
let btn_save = document.getElementById("btn_save");
let btn_replay = document.getElementById("btn_replay");
let btn_clear = document.getElementById("btn_clear");

let spead_replay = document.getElementById("spead_replay");

let isMouseDown = false;
let coordinates = [];
let coordinateX = 0;
let coordinateY = 0;

canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight - 150;

function draw(e) {
  coordinateX = e.layerX;
  coordinateY = e.layerY;

  ctx.fillStyle = String(line_color.value);
  ctx.strokeStyle = String(line_color.value);

  coordinates.push([coordinateX, coordinateY]);

  ctx.lineWidth = line_width.value * 2;

  ctx.lineTo(coordinateX, coordinateY);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(coordinateX, coordinateY, line_width.value, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(coordinateX, coordinateY);
}

canvas.addEventListener("mousedown", function (e) {
  isMouseDown = true;
  draw(e);
});

canvas.addEventListener("mouseup", function () {
  isMouseDown = false;
  ctx.beginPath();
  coordinates.push("mouseup");
});

canvas.addEventListener("mousemove", function (e) {
  if (isMouseDown) {
    draw(e);
  }
});

function save() {
  localStorage.setItem("coordinates", JSON.stringify(coordinates));
  console.log("btn_save");
}

function replay() {
  coordinates = JSON.parse(localStorage.getItem("coordinates"));
  let timer = setInterval(function () {
    if (!coordinates) {
      clearInterval(timer);
      ctx.beginPath();
      return;
    }

    let crd = coordinates.shift();
    if (!coordinates.length) {
      clearInterval(timer);
    }
    e = {
      layerX: crd["0"],
      layerY: crd["1"],
    };

    coordinateX = e.layerX;
    coordinateY = e.layerY;

    ctx.lineWidth = line_width.value * 2;

    ctx.lineTo(coordinateX, coordinateY);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(coordinateX, coordinateY, line_width.value, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(coordinateX, coordinateY);
  }, 101 - spead_replay.value);
  console.log("btn_replay");
}

function clear() {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.fillStyle = "black";

  console.log("btn_clear");
}

btn_save.addEventListener("click", () => {
  save();
});
btn_replay.addEventListener("click", () => {
  clear();
  replay();
});
btn_clear.addEventListener("click", () => {
  clear();
});
