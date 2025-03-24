const socketIO = require("socket.io");
const SocketUser = require("./SocketUser");

class Lobby {
    /** @param {socketIO.Server} io @param {Map<number, SocketUser>} users*/
    constructor(io, code) {
        this.io = io;
        this.code = code;
        /** @type {Array<SocketUser>} */
        this.users = [];

        this.gameStart = false;
        this.currentSecond = 5;
    }

    addUser(user) {
        if (this.users.length >= 2) return 1;

        this.users.push(user);
        this.sendLobbyUserUpdate();

        if(this.users.length === 2) {
            console.log("Starte Spiel");
            setTimeout(this.startGame.bind(this), 2000);
        }

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

    startGame() {
        this.users.forEach(user => {
            user.socket.on("disconnect", this.interruptStart.bind(this));
        });

        this.gameStart = true;

        setTimeout(this.sendStartGameUpdate.bind(this), 1000);
    }

    sendStartGameUpdate() {
        if(!this.gameStart) return;

        const data = {
            code: this.code,
            needRedirect: this.currentSecond <= 0,
            currentSecond: this.currentSecond
        }

        this.io.to(`lobby-${this.code}`).emit("startGame", data);
        this.currentSecond--;
        
        if(this.currentSecond === -2) {
            this.gameStart = false;
            this.currentSecond = 5;

            return;
        }

        setTimeout(this.sendStartGameUpdate.bind(this), 1000);
    }

    interruptStart() {
        this.gameStart = false;
        this.currentSecond = 5;

        this.users.forEach(user => {
            user.socket.off("disconnect", this.interruptStart.bind(this));
        });

        this.io.to(`lobby-${this.code}`).emit("interruptStart");
    }
}

module.exports = Lobby;