const SocketUser = require("../../../../Classes/SocketUser");
const Playground = require("../Playground/Playground");

class Snake{
    /** @param {SocketUser} player @param {Playground} playground */
    constructor(player, playground, color, startTiles, startMovement) {
        this.player = player;
        this.playground = playground;
        this.color = color;
        
        /** @type {Array<Object>} */
        this.tiles = [];
        this.nextMovement = startMovement;
        this.currentMovement = null;

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
    }

    movementToAxes(movement){
        let num = null;
        let axes = null;
        switch (movement) {
            case "up": num = -1; axes = "y"; break;
            case "down": num = 1; axes = "y"; break;
            case "left": num = -1; axes = "x"; break;
            case "right": num = 1; axes = "x"; break;
        }

        return {num, axes};
    }

    move(){
        // Aktuelles Movement Klonen nicht das es zwischendurch geändert wird
        if(
            this.movementToAxes(this.nextMovement).axes
             !== 
            this.movementToAxes(this.currentMovement).axes
        ){
            this.currentMovement = this.nextMovement;
        }
        // Eine Kopie der aktuellen Tiles erstellen
        const tileClone = this.tiles.map(tile => ({ ...tile }));
        this.tiles = []

        // alle tiles nach vorne bewegen
        tileClone.forEach((tile, i) => {
            const currentTile = { ...tile };
            if(i === 0){
                const axes = this.movementToAxes(this.currentMovement);
                if(axes.axes === "x") currentTile.x += axes.num;
                if(axes.axes === "y") currentTile.y += axes.num;
                currentTile.deg = this.directionDegree.get(this.currentMovement);
                return this.tiles.push(currentTile);
            }

            let tileBefore = { ...tileClone[i - 1] };
            currentTile.deg = tileBefore.deg;
            currentTile.x = tileBefore.x;
            currentTile.y = tileBefore.y;

            this.tiles.push(currentTile);
        })

        // Ändere nun geraden zu Kurven wenn nötig
        this.tiles.forEach((tile, i) => {
            if(i === 0 || i === (this.tiles.length - 1)) return;
            const before = this.tiles[i - 1];
            const after = this.tiles[i + 1];

            const dxBefore = tile.x - before.x;
            const dyBefore = tile.y - before.y;
            const dxAfter = tile.x - after.x;
            const dyAfter = tile.y - after.y;

            if (dxBefore !== dxAfter && dyBefore !== dyAfter) {
                tile.type = "Turn";
            
                if (dxBefore === -1 && dyAfter === -1 || dxAfter === -1 && dyBefore === -1) {
                    tile.deg = 0;
                } else if (dxBefore === 1 && dyAfter === -1 || dxAfter === 1 && dyBefore === -1) {
                    tile.deg = 90;
                } else if (dxBefore === 1 && dyAfter === 1 || dxAfter === 1 && dyBefore === 1) {
                    tile.deg = 180;
                } else if (dxBefore === -1 && dyAfter === 1 || dxAfter === -1 && dyBefore === 1) {
                    tile.deg = 270;
                }
            
            } else {
                tile.type = "Straight";
            }

        })

        this.drawTiles();
    }

    drawTiles(){
        this.tiles.forEach(tile => {
            this.playground.setTile(tile.x, tile.y, tile);
        })
    }

    updateNextMovement(data){
        this.nextMovement = data;
    }
}

module.exports = Snake;