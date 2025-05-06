const socketIO = require("socket.io");
const SocketUser = require("../../Classes/SocketUser");
const TemporaryLobby = require("../../LobbyManager/Classes/TemporaryLobby");
const GameManager = require("../GameManager");
const GameLoop = require("./GameLoop");
const Snake = require("./Classes/Snake/Snake");

class Game{
    /** @param {socketIO.Server} io @param {GameManager} gameManager @param {number} code */
    constructor(io, gameManager, code) {
        this.io = io;
        this.gameManager = gameManager;
        this.code = code;

        this.score = 0;

        this.waitingSeconds = 5;
        this.gameStarted = false;

        this.snakeColors = ["red", "blue"];

        /**@type {Array<SocketUser>} */
        this.players = [];

        /**@type {Array<SocketUser>} */
        this.playerIds = [];

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
            // id pushen um nachher das Endgame zu beenden
            this.playerIds.push(player.id);

            const start = (10 * i + 5) - 1;
            const snake = new Snake(
                player,
                this.gameLoop.playground,
                this,
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

    async endGame(msg){
        let scoreDb = undefined;
        if(this.gameStarted){
            scoreDb = await this.gameManager.db.scoremanager.createScore({
                user1: this.playerIds[0],
                user2: this.playerIds[1],
                score: this.score
            });
        }

        this.gameStarted = false;

        /*
            Hinzufügen der Funktion zum erneuten Spielen
            Nur wenn noch beide Spieler da sind
        */

        if(this.players.length === 2){
            const lobbyManager = this.gameManager.lobbyManager;

            const newUserList = [];

            this.players.forEach(x => {
                const user = new SocketUser(x.id, x.username);
                newUserList.push(user);
            })

            const tempLobby = new TemporaryLobby(
                0,
                newUserList,
                lobbyManager,
                10000
            );

            lobbyManager.oldLobbys.push(tempLobby);
        }

        this.io.to(`game-${this.code}`).emit("gameEnd", {
            msg: msg,
            score: this.score,
            rang: scoreDb?.rank || "-"
        });
    }

    async waitingForPlayers(changeTime = false){
        if(this.waitingSeconds <= 0){
            if(this.players.length < 2) {
                await this.endGame("Das Spiel ist zu Ende, da nicht genug Spieler beigetreten sind!");
                this.gameManager.games.delete(this.code);
                return;
            }
    
            return this.startGame();
        }

        let msg = "";
        this.players.forEach(player => {
            if(msg === ""){
                msg = `Schon beigetreten: ${player.username}`;
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
    async leaveUser(user){
        this.players.forEach((player, index) => {
            if(player.id === user.id){
                this.players.splice(index, 1);
            }
        });

        if(this.players.length != 2){
            if(this.gameStarted) await this.endGame("Das Spiel ist zu Ende, da ein Spieler verlassen hat!");
            return 1;
        }
    }
}

module.exports = Game;