const socketIO = require("socket.io");
const LobbyManager = require("./LobbyManager");
const SocketUser = require("../Classes/SocketUser");

class ClientHandler {
    /** @param {socketIO.Socket} socket @param {LobbyManager} lobbyManager */
    constructor(socket, lobbyManager) {
        this.socket = socket;
        this.lobbyManager = lobbyManager;

        this.user = new SocketUser(
            this.socket.request.session.user.id,
            this.socket.request.session.user.username,
            this.socket
        );


        this.currentLobbyCode = null;

        this.socket.on("createLobby", () => { this.createLobby() })
        this.socket.on("joinLobby", (code) => { this.joinLobby(code) })
        this.socket.on("refreshLobby", () => { this.refreshLobby() })
        this.socket.on("disconnect", () => { this.defaultDisconnect() })
    }

    createLobby(){
        if(this.currentLobbyCode) return;

        const lobbyCode = this.lobbyManager.createLobby(this.user);
        this.currentLobbyCode = lobbyCode;
        this.socket.join(`lobby-${lobbyCode}`);
        this.socket.emit("lobbyCreated", lobbyCode);
        this.refreshLobby();
    }

    joinLobby(code){
        if(this.currentLobbyCode) return;

        const response = this.lobbyManager.joinLobby(code, this.user);

        if(response === 1) return this.socket.emit("lobbyJoinError", "Diese Lobby existiert nicht");
        if(response === 2) return this.socket.emit("lobbyJoinError", "Die Lobby ist schon voll");

        this.currentLobbyCode = response;

        this.socket.join(`lobby-${response}`);
        this.socket.emit("lobbyJoined", response);
        this.refreshLobby();
    }

    refreshLobby(){
        this.lobbyManager.refreshLobby(this.currentLobbyCode);
    }

    defaultDisconnect(){
        this.lobbyManager.removeFromLobby(this.currentLobbyCode, this.user);
    }
}

module.exports = ClientHandler;