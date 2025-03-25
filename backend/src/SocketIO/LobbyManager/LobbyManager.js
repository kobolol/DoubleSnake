const socketIO = require("socket.io");
const Lobby = require("./Classes/Lobby");
const SocketUser = require("./Classes/SocketUser");
const TemporaryLobby = require("./Classes/TemporaryLobby");

class LobbyManager {
    /** @param {socketIO.Server} io */
    constructor(io) {
        this.io = io;

        /** @type {Map<string, Lobby>}*/
        this.lobbys = new Map();

        /** @type {Array<TemporaryLobby>}*/
        this.oldLobbys = [];

        // Zeigt die Anzahl der Lobbys an | Für Testing
        // setInterval(() => {
        //     console.log(this.oldLobbys.length);
        // }, 1000);

    }

    /** @param {SocketUser} user */
    createLobby(user){
        const code = this.generateNonExistingCode();
        const lobby = new Lobby(this.io, this ,code);
        lobby.addUser(user);
        this.lobbys.set(code, lobby);
        return code;
    }

    /** @param {string} code @param {SocketUser} user */
    joinLobby(code, user){
        if (!this.lobbys.has(code)) return 1;

        const lobby = this.lobbys.get(code);
        const response = lobby.addUser(user);
        if(response === 1) return 2;
        
        return lobby.code;
    }

    generateNonExistingCode() {
        let code;
        do {
            code = Math.random().toString(36).substring(2, 8).toUpperCase();
        } while (this.lobbys.has(code));
        return code;
    }

    /** @param {SocketUser} user */
    removeFromLobby(code, user){
        if(!this.lobbys.has(code)) return;
        const lobby = this.lobbys.get(code);

        const reponse = lobby.removeUser(user);

        if (reponse === 2) this.lobbys.delete(code);
    }

    refreshLobby(code){
        if(!this.lobbys.has(code)) return;
        const lobby = this.lobbys.get(code);
        lobby.sendLobbyUserUpdate();
    }
}

module.exports = LobbyManager;