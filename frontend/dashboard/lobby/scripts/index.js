import LobbyHandler from "./Handler/LobbyHandler.js";

class ServerConnectionManager {
    constructor() {
        /**@type {import("../../../../backend/node_modules/socket.io-client".Socket} für Autocompletions VSC*/
        this.socket = io(`${window.location.protocol}//${window.location.hostname}:${window.location.port}`);

        this.lobbyContainer = document.getElementById("mainDiv");
        this.createBtn = document.getElementById("createBtn");
        this.joinOverlayBtn = document.getElementById("joinOverlayBtn");
        this.leaveBtn = document.getElementById("leaveBtn");

        this.lobbyHandler = new LobbyHandler(this.socket);

        this.basicSetup();
        this.addButtonHandler();
    }

    basicSetup() {
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

    addButtonHandler() {
        this.createBtn.addEventListener("click", () => {
            this.lobbyHandler.handleCreateClick();
        });

        this.joinOverlayBtn.addEventListener("click", () => {
            this.lobbyContainer.innerHTML = `
                <div class="screen container">
                    <div class="formSection">
                        <h2>Der Spiel-Code:</h2>
                        <input type="text" id="codeInp" placeholder="1A2B3C">
                    </div>
                    <button id="joinBtn">
                        <div class="buttonIcon">
                            <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px"
                                fill="#FFFFFF">
                                <path
                                    d="M220-520 80-600v-160l140-80 140 80v160l-140 80Zm0-92 60-34v-68l-60-34-60 34v68l60 34Zm440 123v-93l140 82v280L560-80
                                 320-220v-280l140-82v93l-60 35v188l160 93 160-93v-188l-60-35Zm-140 89v-480h360l-80 120 80 120H600v240h-80Zm40 69ZM220-680Z" />
                            </svg>
                        </div>
                        <div class="buttonText">
                            Beitreten
                        </div>
                    </button>
                </div>
            `

            document.getElementById("joinBtn").addEventListener("click", () => {
                const code = document.getElementById("codeInp").value;
                this.lobbyHandler.handleJoinClick(code);
            })
        })

        this.leaveBtn.addEventListener("click", () => {
            this.socket.disconnect();
            window.location.pathname = "/dashboard";
        });
    }
}

new ServerConnectionManager();