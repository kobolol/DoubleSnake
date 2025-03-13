const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const bp = require("body-parser");
const path = require("path");

const _PORT = 3000;

const app = express();
const server = http.createServer(app);
/** @type {import("socket.io").Server} */
const io = socketIO(server);

app.use(bp.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../../frontend")));

app.use((req, res, next) => {
    console.log(`${req.method} | ${req.url}`);

    next();
})

const playerList = [];

io.on('connection', (socket) => {
    console.log("Es ist ein neuer Spieler beigetreten");

    const player = {
        id: socket.id,
        x: 100,
        y: 100,
        socket: socket,
    };

    playerList.push(player);
    emitPlayerMovement();

    socket.on("moveUp", () => {
        const player = playerList.find((p) => p.id === socket.id);
        if (player) {
            player.y -= 10;
        }

        emitPlayerMovement();
    });

    socket.on("moveDown", () => {
        const player = playerList.find((p) => p.id === socket.id);
        if (player) {
            player.y += 10;
        }

        emitPlayerMovement();
    });

    socket.on("moveRight", () => {
        const player = playerList.find((p) => p.id === socket.id);
        if (player) {
            player.x += 10;
        }

        emitPlayerMovement();
    });

    socket.on("moveLeft", () => {
        const player = playerList.find((p) => p.id === socket.id);
        if (player) {
            player.x -= 10;
        }

        emitPlayerMovement();
    });

    // Handle player disconnect
    socket.on("disconnect", () => {
        console.log(`Spieler ${socket.id} hat das Spiel verlassen`);
        const index = playerList.findIndex((p) => p.id === socket.id);
        if (index !== -1) {
            playerList.splice(index, 1);
        }

        emitPlayerMovement();
    });

    socket.on("disconnect", () => {
        playerList.splice(playerList.findIndex(p => p.id === socket.id), 1);
    })
});

function emitPlayerMovement() {
    const playerMap = playerList.map(x => {
        return {
            id: x.id,
            x: x.x,
            y: x.y
        }
    });
    io.emit("updatePos", playerMap);
}

server.listen(_PORT, () => {
    console.log(`Backend gestartet auf http://localhost:${_PORT}`);
})