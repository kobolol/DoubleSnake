import LobbyHandler from "./Handler/LobbyHandler.js";

class ServerConnectionManager{
    constructor(){
        /**@type {import("../../../../backend/node_modules/socket.io-client".Socket} für Autocompletions VSC*/
        this.socket = io(`http://${window.location.hostname}:${window.location.port}`);

        this.createBtn = document.getElementById("createBtn");
        this.joinBtn = document.getElementById("joinBtn");
        this.leaveBtn = document.getElementById("leaveBtn");

        this.lobbyHandler = new LobbyHandler(this.socket);

        this.basicSetup();
        this.addButtonHandler();
    }

    basicSetup(){
        this.socket.emit("hereForLobby");

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
        })
    }

    addButtonHandler(){
        this.createBtn.addEventListener("click", () => {
            this.lobbyHandler.handleCreateClick();
        });

        this.joinBtn.addEventListener("click", () => {
            this.lobbyHandler.handleJoinClick();
        });
        
        this.leaveBtn.addEventListener("click", () => {
            this.socket.disconnect();
            window.location.pathname = "/dashboard";
        });
    }
}

new ServerConnectionManager();