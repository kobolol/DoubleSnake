const SocketUser = require("../../../../Classes/SocketUser");
const Playground = require("../Playground/Playground");

class Snake{
    /** @param {SocketUser} player @param {Playground} playground */
    constructor(player, playground, color, startTiles) {
        this.player = player;
        this.playground = playground;
        this.color = color;
        
        this.tiles = [];
        this.nextMovement = null;

        this.player.socket.on("movement", (data) => { this.updateNextMovement(data) })
    }

    updateNextMovement(data){

    }
}

module.exports = Snake;