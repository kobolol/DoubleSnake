const socketIO = require("socket.io");
const SocketUser = require("../../Classes/SocketUser");
const GameManager = require("../GameManager");

class Game{
    /** @param {socketIO.Server} io @param {GameManager} gameManager @param {number} code */
    constructor(io, gameManager, code) {
        this.io = io;
        this.gameManager = gameManager;
        this.code = code;

        /**@type {Array<SocketUser>} */
        this.players = []

        // TODO: 5 Seconds after initialization, check if game has 2 players. if not stop game

        setInterval(() => {
            this.io.to(`game-${this.code}`).emit("waitForStart", this.players.length);
            this.io.to(`game-${this.code}`).emit("randomTest", Math.floor(Math.random() * 1000) + 1);
        }, 100);
    }

    addUser(user){
        if(this.players.length >= 2) return 1;

        this.players.push(user);
    }
}

module.exports = Game;