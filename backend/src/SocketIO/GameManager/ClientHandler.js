const socketIO = require("socket.io");
const SocketUser = require("../Classes/SocketUser");
const LobbyManager = require("../LobbyManager/LobbyManager");
const GameManager = require("./GameManager");

class ClientHandler {
    /** @param {socketIO.Socket} socket @param {GameManager} gameManager */
    constructor(socket, gameManager) {
        this.socket = socket;
        this.gameManager = gameManager;

        this.currentGameCode = null;

        this.user = new SocketUser(
            this.socket.request.session.user.id,
            this.socket.request.session.user.username,
            this.socket
        );

        this.socket.on("disconnect", () => { this.defaultDisconnect() });

        this.joinGame();
    }

    joinGame(){
        const response = this.gameManager.joinGame(this.user);

        if(response === 1) return this.socket.disconnect();
        this.currentGameCode = response;

        this.socket.join(`game-${this.currentGameCode}`);
    }

    defaultDisconnect(){
        
    }
}

module.exports = ClientHandler;