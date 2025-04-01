class StartGameHandler {
    /**@param {import("../../../../../backend/node_modules/socket.io-client".Socket} socket Autocompletions VSC*/
    constructor(socket) {
        this.socket = socket;

        this.countDownText = document.getElementById("countdown");

        this.socket.on("startGame", (data) => { this.startGame(data) });
        this.socket.on("interruptStart", () => { this.interruptStart() });
    }

    startGame(data) {
        document.getElementById("gameStartCountdown").style.display = "block";
        this.countDownText.innerText = data.currentSecond;

        if(data.needRedirect){
            this.socket.disconnect();
            window.location.pathname = `/game`;
        }
    }

    interruptStart() {
        document.getElementById("gameStartCountdown").style.display = "none";
    }
}

export default StartGameHandler;