const socketIO = require("socket.io");
const SocketUser = require("./SocketUser");

class Lobby {
    /** @param {socketIO.Server} io @param {Map<number, SocketUser>} users*/
    constructor(io, code) {
        this.io = io;
        this.code = code;
        /** @type {Array<SocketUser>} */
        this.users = [];
    }

    addUser(user) {
        if (this.users.length >= 2) return 1;

        this.users.push(user);

        this.sendLobbyUserUpdate();

        return 0;
    }

    removeUser(user) {
        const index = this.users.findIndex(u => u.id === user.id);
        
        if (index === -1) return 1;

        this.users.splice(index, 1);

        this.sendLobbyUserUpdate();

        if (this.users.length === 0) return 2;

        return 0;
    }

    sendLobbyUserUpdate() {
        const data = {
            code: this.code,
            users: this.users.map(user => ({
                id: user.id,
                username: user.username
            }))
        }

        this.io.to(`lobby-${this.code}`).emit("lobbyUserUpdate", data);
    }
}

module.exports = Lobby;