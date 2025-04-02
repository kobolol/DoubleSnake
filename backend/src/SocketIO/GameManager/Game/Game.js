const socketIO = require("socket.io");
const SocketUser = require("../../Classes/SocketUser");
const GameManager = require("../GameManager");

class Game{
    /** @param {socketIO.Server} io @param {GameManager} gameManager @param {number} code */
    constructor(io, gameManager, code) {
        this.io = io;
        this.gameManager = gameManager;
        this.code = code;

        this.gameStart = false;

        /**@type {Array<SocketUser>} */
        this.players = []

        // TODO: 5 Seconds after initialization, check if game has 2 players. if not stop game

        setInterval(() => {
            this.io.to(`game-${this.code}`).emit("waitForStart", this.players.length);
            this.io.to(`game-${this.code}`).emit("randomTest", Math.floor(Math.random() * 1000) + 1);
        }, 100);
    }

    

    /** @param {SocketUser} user */
    addUser(user){
        if(this.players.length >= 2) return 1;

        this.players.push(user);
    }

    /** @param {SocketUser} user */
    leaveUser(user){
        this.players.forEach((player, index) => {
            if(player.id === user.id){
                this.players.splice(index, 1);
                return;
            }
        });

        if(this.players.length != 2){
            this.io.to(`game-${this.code}`).emit("gameEnd", "Das Spiel ist zu Ende, da ein Spieler verlassen hat!");
            return 1;
        }
    }
}

module.exports = Game;