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

        if(pos === null) return;

        const type = Math.random() < 0.5 ? "Apfel" : "Blaubeere";
        const newFruit = new Fruit(
            this,
            this.playground,
            pos.x,
            pos.y,
            type
        );
        this.fruits.push(newFruit);

        newFruit.update();
    }


    randomUnusedTile(){
        let isUnused = false;
        let x = 0;
        let y = 0;
        let attempts = 0;
        const maxAttempts = this.playground.width * this.playground.height;

        do{
            x = Math.floor(Math.random() * this.playground.height);
            y = Math.floor(Math.random() * this.playground.width);

            const tile = this.playground.getTile(x, y);

            if(tile === null) isUnused = true;
            attempts++;
        } while(!isUnused && attempts < maxAttempts);

        if(!isUnused){
            return null;
        }

        return {x, y};
    }
    updateFruits(){
        const fruitsCopy = [...this.fruits];
        fruitsCopy.forEach(fruit => {
            if (this.fruits.includes(fruit)) {
                fruit.update();
            }
        });
    }

    scored(fruitToDelete, snakeColor){
        const fruitIndexInArray = this.fruits.indexOf(fruitToDelete);

        if (fruitIndexInArray === -1) return;
        this.fruits.splice(fruitIndexInArray, 1);
        this.game.score += 1;

        this.game.gameLoop.snakes.forEach(snake => {
            if(snake.color == snakeColor) snake.getBigger();
        })


        this.createFruit();
    }
}

module.exports = FruitManager;