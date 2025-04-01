const SocketUser = require("../Classes/SocketUser");
const LobbyManager = require("../LobbyManager/LobbyManager");
const Game = require("./Game/Game");

class GameManager {
    /** @param {socketIO.Server} io @param {LobbyManager} lobbyManager */
    constructor(io, lobbyManager) {
        this.io = io;
        this.lobbyManager = lobbyManager;

        /** @type {Map<string, Game>}*/
        this.games = new Map();
    }

    /** @param {SocketUser} user */
    joinGame(user){
        const wasInLobby = false;
        const oldLobbySave = undefined;
        this.lobbyManager.oldLobbys.forEach(oldLobby => {
            oldLobby.users.forEach(lobbyUser => {
                if(lobbyUser.id === user.id){
                    wasInLobby = true;
                    oldLobbySave = oldLobby;
                }
            });
        });

        if(!wasInLobby) user.socket.disconnect();

        const code = this.generateNonExistingCode();
        const game = new Game(this.io, this, code);
        this.games.set(code, game);
    }

    generateNonExistingCode() {
        let code;
        do {
            code = Math.random().toString(36).substring(2, 8).toUpperCase();
        } while (this.games.has(code));
        return code;
    }
}

module.exports = GameManager;