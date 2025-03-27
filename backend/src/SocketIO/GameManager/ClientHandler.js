const socketIO = require("socket.io");
const SocketUser = require("../Classes/SocketUser");
const LobbyManager = require("../LobbyManager/LobbyManager");

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

        this.socket.on("disconnect", () => { this.defaultDisconnect() })

        this.checkForLobby();
    }

    checkForLobby(){
        const isUserInLobby = this.lobbyManager.oldLobbys.some((lobby) =>
            lobby.users.some((user) => user.id === this.user.id)
        );
    
        if (!isUserInLobby) {
            this.socket.disconnect();
        }
    }

    defaultDisconnect(){
        
    }
}

module.exports = ClientHandler;