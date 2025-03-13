/** @type {import("../backend/node_modules/socket.io-client").Socket} */
const socket = io("http://localhost:3000");

const gameScreen = document.getElementById("game");
const ctx = gameScreen.getContext("2d")

ctx.fillStyle = "red";

socket.on("connect", () => {
  console.log(`Connected as ${socket.id}`);
});

let keysPressed = new Set();

document.addEventListener("keydown", (e) => {
  keysPressed.add(e.key);
});

document.addEventListener("keyup", (e) => {
  keysPressed.delete(e.key);
});

setInterval(() => {
  if (keysPressed.has("ArrowUp")) socket.emit("moveUp");
  if (keysPressed.has("ArrowDown")) socket.emit("moveDown");
  if (keysPressed.has("ArrowRight")) socket.emit("moveRight");
  if (keysPressed.has("ArrowLeft")) socket.emit("moveLeft");
}, 50);

socket.on("updatePos", (map) => {
  ctx.clearRect(0, 0, gameScreen.width, gameScreen.height);
  map.forEach(e => {
    ctx.beginPath();
    ctx.arc(e.x, e.y, 10, 0, Math.PI * 2, false);
    ctx.fill();
  });
})