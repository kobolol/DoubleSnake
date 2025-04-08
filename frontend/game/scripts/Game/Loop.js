import Game from "./Game.js"

class Loop{
    /**@param {import("../../../../backend/node_modules/socket.io-client".Socket} socket  @param {Game} game  Autocompletions VSC*/
    constructor(socket, game){
        this.socket = socket;
        this.game = game;

        this.socket.on("loop", (data) => { this.loop(data) });
    }

    loop(data){
         
    }
}

export default Loop;