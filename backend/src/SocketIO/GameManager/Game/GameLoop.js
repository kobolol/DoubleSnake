const socketIO = require("socket.io");
const Playground = require("./Classes/Playground/Playground");
const Game = require("./Game");

class GameLoop{
    /** @param {socketIO.Server} io @param {Game} game */
    constructor(io, game) {
        this.io = io;
        this.game = game;

        this.playground = new Playground();
    }

    loop(){
        this.io.to(`game-${this.game.code}`).emit("loop", {
            code: this.game.code,
            playground: this.playground
        });

        setTimeout(() => {
            this.loop();
        }, 250);
    }
}

module.exports = GameLoop;