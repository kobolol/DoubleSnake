const socketIO = require("socket.io");

class SocketUser {
    /** @param {number} id @param {string} username @param {socketIO.Socket} socket */
    constructor(id, username, socket) {
        this.id = id;
        this.username = username;
        this.socket = socket;
    }
}

module.exports = SocketUser;