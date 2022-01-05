let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight - 150;   

ctx.fillStyle = "red";
ctx.fillRect(10, 10, 100, 100);


