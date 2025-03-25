class ServerConnectionManager {
    constructor() {
        /**@type {import("../../../backend/node_modules/socket.io-client".Socket} für Autocompletions VSC*/
        this.socket = io(`${window.location.protocol}//${window.location.hostname}:${window.location.port}`);

        this.basicSetup();
    }

    basicSetup() {
        this.socket.emit("hereForGame");

        this.socket.on("connect", () => {
            console.log("Verbindung zum Server hergestellt!");
        });

        this.socket.on("connect_error", (error) => {
            console.log(error);
            window.location.pathname = "/dashboard";
        });

        this.socket.on("disconnect", () => {
            console.log("Die verbindung wurde unterbrochen!");
            window.location.pathname = "/dashboard";
        });
    }
}

new ServerConnectionManager();