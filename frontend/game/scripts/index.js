class ServerConnectionManager {
    constructor() {
        /**@type {import("../../../backend/node_modules/socket.io-client".Socket} für Autocompletions VSC*/
        this.socket = io(`${window.location.protocol}//${window.location.hostname}:${window.location.port}`);

        this.basicSetup();

        this.socket.on("waitForStart", (data) => { this.waitForStart(data) });
        this.socket.on("randomTest", (data) => { this.randomTest(data) });

        this.socket.on("gameEnd", (msg) => { this.gameEnd(msg) });
    }

    waitForStart(data) {
        document.getElementById("pc").innerText = data;
    }

    randomTest(data) {
        document.getElementById("rd").innerText = data;
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