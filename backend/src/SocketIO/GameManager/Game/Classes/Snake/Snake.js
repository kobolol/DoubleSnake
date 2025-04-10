const SocketUser = require("../../../../Classes/SocketUser");
const Playground = require("../Playground/Playground");

class Snake{
    /** @param {SocketUser} player @param {Playground} playground */
    constructor(player, playground, color, startTiles, startMovement) {
        this.player = player;
        this.playground = playground;
        this.color = color;
        
        this.tiles = [];
        this.nextMovement = startMovement;

        this.directionDegree = new Map([
            ["right", 0],
            ["down", 90],
            ["left", 180],
            ["up", 270]
        ]);

        this.player.socket.on("movement", (data) => { this.updateNextMovement(data) })

        this.setup(startTiles);
    }

    setup(startTiles){
        this.player.socket.emit("color", this.color);

        const headX = startTiles.x;
        const headY = startTiles.y;

        let dx = 0;
        let dy = 0;
        switch (this.nextMovement) {
            case "up": dy = 1; break;
            case "down": dy = -1; break;
            case "left": dx = 1; break;
            case "right": dx = -1; break;
        }

        for (let i = 0; i < 3; i++) {
            let type = null;
            switch(i){
                case 0: 
                    type = "Head"; 
                    break;
                case 2: 
                    type = "End"; 
                    break;
                default: 
                    type = "Straight";
                    break;
            }
            this.tiles.push({
                class: "Snake",
                type: type,
                color: this.color,
                deg: this.directionDegree.get(this.nextMovement),
                x: headX + i * dx,
                y: headY + i * dy
            });
        }

        this.drawTiles();

        console.log(this.tiles);
    }

    drawTiles(){
        this.tiles.forEach(tile => {
            this.playground.setTile(tile.x, tile.y, tile);
        })
    }

    updateNextMovement(data){
        console.log(`${this.player.username} | ${this.nextMovement}`);
    }
}

module.exports = Snake;