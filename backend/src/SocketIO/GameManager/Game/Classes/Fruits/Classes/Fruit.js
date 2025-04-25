const Playground = require("../../Playground/Playground");
const FruitManager = require("../FruitManager");

class Fruit{
    /** @param {FruitManager} fruitManager @param {Playground} playground */
    constructor(fruitManager, playground, startX, startY, type, index = 0) {
        this.fruitManager = fruitManager;
        this.playground = playground;
        this.index = index;

        this.x = startX;
        this.y = startY;

        this.type = type;
    }

    update(){
        const tile = this.playground.getTile(this.x, this.y);

        if(tile === undefined) return;

        if(tile?.class === "Snake"){
            this.fruitManager.scored(this.index, tile.color);

            return;
        }
        
        this.playground.setTile(this.x, this.y, {
            class: "Fruit",
            type: this.type,
            x: this.x,
            y: this.y
        });
    }
}

module.exports = Fruit;