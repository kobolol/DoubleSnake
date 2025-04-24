const Fruit = require("./Classes/Fruit");
const socketIO = require("socket.io");
const Game = require("../../Game");
const Playground = require("../Playground/Playground");

class FruitManager{
    /** @param {socketIO.Server} io @param {Game} game @param {Playground} playground */
    constructor(io, game, playground){
        this.io = io;
        this.game = game;
        this.playground = playground;

        this.fruitAmount = 5;

        /** @type {Array<Fruit>} */
        this.fruits = [];

        this.setupFruits();
    }

    setupFruits(){
        for(let i = 0; i < this.fruitAmount; i++){
            this.createFruit();
        }
    }

    createFruit(){
        const pos = this.randomUnusedTile();
        const type = Math.random() < 0.5 ? "Apfel" : "Blaubeere";
        const newFruit = new Fruit(
            this,
            this.playground,
            pos.x,
            pos.y,
            type
        );
        this.fruits.push(newFruit);

        this.fruits.forEach((fruit, i) => { fruit.index = i });
    }


    randomUnusedTile(){
        let isUnused = false;
        let x = 0;
        let y = 0;

        do{
            x = Math.floor(Math.random() * this.playground.height);
            y = Math.floor(Math.random() * this.playground.width);

            const tile = this.playground.getTile(x, y);

            if(tile === null) isUnused = true;
        } while(!isUnused);

        return {x, y};
    }
    updateFruits(){
        this.fruits.forEach(fruit => fruit.update());
    }

    scored(fruitIndex){
        this.game.score += 1;

        this.fruits.splice(fruitIndex, 1);

        this.createFruit();
    }
}

module.exports = FruitManager;