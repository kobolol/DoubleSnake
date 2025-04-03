const socketIO = require("socket.io");
const SocketUser = require("../../Classes/SocketUser");
const GameManager = require("../GameManager");
const GameLoop = require("./GameLoop");

class Game{
    /** @param {socketIO.Server} io @param {GameManager} gameManager @param {number} code */
    constructor(io, gameManager, code) {
        this.io = io;
        this.gameManager = gameManager;
        this.code = code;

        this.waitingSeconds = 5;
        this.gameStarted = false;

        /**@type {Array<SocketUser>} */
        this.players = [];

        this.gameLoop = new GameLoop(io, this);

        setTimeout(() => { this.waitingForPlayers(true) }, 100);
    }

    startGame(){
        
        this.gameStarted = true;
    }

    waitingForPlayers(changeTime = false){
        if(this.waitingSeconds === 0){
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

        if (changeTime) this.waitingSeconds--;
        setTimeout(() => { this.waitingForPlayers(true) }, 1000)
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