import Loop from "./Loop.js";
import UIManager from "./UI/UIManager.js";
import Playground from "./Elements/Playground.js";

class Game{
    /**@param {import("../../../../backend/node_modules/socket.io-client".Socket} socket Autocompletions VSC*/
    constructor(socket) {
        this.socket = socket;

        this.loop = new Loop(this.socket, this);
        this.uiManager = new UIManager();
        this.playGround = undefined;

        this.gameStarted = false;

        this.socket.on("startGame", (data) => { this.start(data) });
    }

    start(playgroundSize){
        this.gameStarted = true;
        this.uiManager.loadGameContent();

        this.playGround = new Playground(this, this.uiManager, playgroundSize);
    }
}

export default Game;