class LobbyHandler {
    /**@param {import("../../../../../backend/node_modules/socket.io-client".Socket} socket Autocompletions VSC*/
    constructor(socket) {
        this.socket = socket;

        this.errorMsg = document.getElementById("errorMsg");

        this.code = null;
        this.playerList = [];

        this.user = null;

        this.socket.emit("requestIdentification");
        this.socket.on("identification", (user) => { this.user = user });

        // Für das Erstellen
        this.socket.on("lobbyCreated", (code) => { this.joinedLobby(code) });

        // Für das Beitreten
        this.socket.on("lobbyJoinError", (msg) => { this.showJoinError(msg) });
        this.socket.on("lobbyJoined", (code) => { this.joinedLobby(code) });

        // Für das Aktualisieren
        this.socket.on("lobbyUserUpdate", (data) => { this.lobbyUserUpdate(data) });
    }

    handleCreateClick() {
        this.socket.emit("createLobby");
    }

    handleJoinClick(code){
        this.socket.emit("joinLobby", code);
    }

    showJoinError(msg){
        this.errorMsg.innerText = msg;
        this.errorMsg.style.display = "block";
    }

    joinedLobby(code) {
        this.code = code;

        this.updateUI();

        console.log(`Lobby beigerteten mit Code: ${code}`);
    }

    updateUI() {
        const lobbyContainer = document.getElementById("mainDiv");

        let playerHTML = "";
        this.playerList.forEach((player, index) => {
            const amI = player.id === this.user.id ? " (Ich)" : "";
            playerHTML += `
                <div class="player" id="player${index + 1}">
                    <h1>Spieler ${index + 1}${amI}</h1>
                    <h1>${player.username}</h1>
                </div>
                `;

            lobbyContainer.innerHTML = `
                <div class="screen">
                    <nav>
                        <h1>Spiel-Code:</h1>
                        <h1 class="message" id="code">
                            ${this.code}
                        </h1>
                    </nav>
                    <div id="playerList">
                        ${playerHTML}
                    </div>
                </div>
                `;
        });

        const codeText = document.getElementById("code");
        codeText.addEventListener("click", () => {
            codeText.innerText = "Kopiert!"

            setTimeout(() => {
                codeText.innerText = this.code;
            }, 1500);

            navigator.clipboard.writeText(this.code);
        })

        this.errorMsg.style.display = "none";
    }


    lobbyUserUpdate(data) {
        this.playerList = data.users;

        this.updateUI();
    }
}

export default LobbyHandler;