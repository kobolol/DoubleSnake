const socketIO = require("socket.io");
const Playground = require("./Classes/Playground/Playground");
const Game = require("./Game");
const Snake = require("./Classes/Snake/Snake");

class GameLoop{
    /** @param {socketIO.Server} io @param {Game} game */
    constructor(io, game) {
        this.io = io;
        this.game = game;

        this.playground = new Playground();
        
        /** @type {Array<Snake>} */
        this.snakes = [];
    }

    loop(){
        this.playground.resetPlayground();
        
        this.snakes.forEach(snake => { snake.move() });

        this.sendUpdate();

        setTimeout(() => {
            this.loop();
        }, 125);
    }

    sendUpdate(){
        this.io.to(`game-${this.game.code}`).emit("loop", {
            code: this.game.code,
            playground: {
                tiles: this.playground.tiles,
            }
        });
    }
}

module.exports = GameLoop;