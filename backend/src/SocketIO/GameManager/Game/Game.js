const socketIO = require("socket.io");
const SocketUser = require("../../Classes/SocketUser");
const GameManager = require("../GameManager");
const GameLoop = require("./GameLoop");
const Snake = require("./Classes/Snake/Snake");

class Game{
    /** @param {socketIO.Server} io @param {GameManager} gameManager @param {number} code */
    constructor(io, gameManager, code) {
        this.io = io;
        this.gameManager = gameManager;
        this.code = code;

        this.waitingSeconds = 5;
        this.gameStarted = false;

        this.snakeColors = ["red", "blue"];

        /**@type {Array<SocketUser>} */
        this.players = [];

        this.gameLoop = new GameLoop(io, this);

        setTimeout(() => { this.waitingForPlayers(true) }, 100);
    }

    startGame(){
        this.io.to(`game-${this.code}`).emit("startGame", {
            width: this.gameLoop.playground.width,
            height: this.gameLoop.playground.height
        });
        this.gameStarted = true;

        // 2 Schlangen für die Spieler Instazieren
        this.players.forEach((player, i) => {
            const start = (10 * i + 5) - 1;
            const snake = new Snake(
                player,
                this.gameLoop.playground,
                this.snakeColors[i],
                {
                    x: start,
                    y: start
                },
                i == 0 ? "right" : "left"
            );

            this.gameLoop.snakes.push(snake);
        });

        this.gameLoop.loop();
    }

    waitingForPlayers(changeTime = false){
        if(this.waitingSeconds <= 0){
            if(this.players.length < 2) {
                this.io.to(`game-${this.code}`).emit(
                    "gameEnd", 
                    "Das Spiel ist zu Ende, da nicht genug Spieler beigetreten sind!"
                );
                this.gameManager.games.delete(this.code);
                return;
            }
    
            return this.startGame();
        }

        let msg = "";
        this.players.forEach(player => {
            if(msg === ""){
                msg = `Schon beigetreten sind: ${player.username}`;
            }
            else{
                msg += ` und ${player.username}, es geht Sofort los!`;
            }
        });
        
        this.io.to(`game-${this.code}`).emit("waitingForPlayers", {
            msg: msg,
            waitingSeconds: this.waitingSeconds
        });

        if (changeTime){
            this.waitingSeconds--;
            setTimeout(() => { this.waitingForPlayers(true) }, 1000);
        }
    }

    

    /** @param {SocketUser} user */
    addUser(user){
        if(this.players.length >= 2) return 1;

        this.waitingForPlayers();

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