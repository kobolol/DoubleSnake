import Game from "./Game/Game.js";

class ServerConnectionManager {
    constructor() {
        /**@type {import("../../../backend/node_modules/socket.io-client".Socket} für Autocompletions VSC*/
        this.socket = io(`${window.location.protocol}//${window.location.hostname}:${window.location.port}`);

        this.body = document.getElementsByTagName("body")[0];

        this.game = new Game(this.socket);

        // Socket.on Handler und Routen
        this.socket.on("waitingForPlayers", (data) => { this.waitingForPlayers(data) });
        this.socket.on("gameEnd", (data) => { this.gameEnd(data) });

        this.basicSetup();
    }

    waitingForPlayers(data){
        document.getElementById("wM").innerText = data.msg;
        document.getElementById("wS").innerText = data.waitingSeconds;
    }

    gameEnd(data){
        // Sonst passiert das unten bei basicSetup und wir werden weitergeleitet
        this.socket.off("disconnect");
        this.socket.disconnect();
        this.game.uiManager.showEndScreen(data);
    }
    
    basicSetup() {
        this.socket.emit("hereForGame");

        this.socket.on("connect", () => {
            console.log("Verbindung zum Server hergestellt!");
        });

        this.socket.on("connect_error", (error) => {
            console.log(error);
            window.location.pathname = "/dashboard/lobby";
        });

        this.socket.on("disconnect", () => {
            console.log("Die verbindung wurde unterbrochen!");
            window.location.pathname = "/dashboard/lobby";
        });
    }
}

new ServerConnectionManager();