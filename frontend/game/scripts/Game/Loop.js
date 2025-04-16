import Overlay from "./Elements/Overlay.js";
import Game from "./Game.js"

class Loop{
    /**@param {import("../../../../backend/node_modules/socket.io-client".Socket} socket  @param {Game} game  Autocompletions VSC*/
    constructor(socket, game){
        this.socket = socket;
        this.game = game;

        this.socket.on("loop", (data) => { this.loop(data) });
    }

    loop(data){
        this.game.playGround.resetOverlay();
        const tiles = data.playground.tiles;

        tiles.forEach((row, x) => {
            row.forEach((tile, y) => {
                if(!tile) return;
                if(tile.class === "Snake"){
                    const overlay = new Overlay(
                        `./assets/Snakes/${tile.color}/${tile.type}.png`,
                        tile.deg
                    )

                    this.game.playGround.setOverlay(x, y, overlay);
                }
            })
        });

        this.game.playGround.draw();
    }
}

export default Loop;