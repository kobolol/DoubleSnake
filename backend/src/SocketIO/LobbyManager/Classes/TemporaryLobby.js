const { Socket } = require("socket.io");
const LobbyManager = require("../LobbyManager");
const SocketUser = require("../../Classes/SocketUser");

class TemporaryLobby{
    /** @param { string } code  @param {Array<SocketUser>} users @param {LobbyManager} lobbyManager*/
    constructor(code, users, lobbyManager){
        this.code = code;
        this.users = users;
        this.lobbyManager = lobbyManager;

        setTimeout(this.selfDestroy.bind(this), 5000);
    }

    selfDestroy(){
        const i = this.lobbyManager.oldLobbys.findIndex(x => x.code == this.code);
        this.lobbyManager.oldLobbys.splice(i, 1);
    }
}

module.exports = TemporaryLobby;