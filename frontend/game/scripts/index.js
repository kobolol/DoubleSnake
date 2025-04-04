class ServerConnectionManager {
    constructor() {
        /**@type {import("../../../backend/node_modules/socket.io-client".Socket} für Autocompletions VSC*/
        this.socket = io(`${window.location.protocol}//${window.location.hostname}:${window.location.port}`);

        this.body = document.getElementsByTagName("body")[0];

        // Socket.on Handler und Routen
        this.socket.on("waitingForPlayers", (msg) => {
            const { msg: message, waitingSeconds } = msg;
            document.getElementById("wM").innerText = message;
            document.getElementById("wS").innerText = waitingSeconds;
        });
        
        this.socket.on("gameEnd", (msg) => { this.gameEnd(msg) });
        this.socket.on("startGame", () => { this.startGame() });

        this.basicSetup();
    }

    startGame(){
        this.body.innerHTML = "<h1>Spielfeld</h1>";
    }

    gameEnd(msg){
        this.socket.disconnect();
        confirm(msg)
        window.location.pathname = "/dashboard";
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