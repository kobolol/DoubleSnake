const socketIO = require("socket.io");
const GameManager = require("../GameManager");
const Playground = require("./Classes/Playground/Playground");

class GameLoop{
    /** @param {socketIO.Server} io @param {GameManager} game */
    constructor(io, game) {
        this.io = io;
        this.game = game;

        this.playground = new Playground();
    }

    
}

module.exports = GameLoop;