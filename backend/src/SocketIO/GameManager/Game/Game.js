const GameManager = require("../GameManager");

class Game{
    /** @param {socketIO.Server} io @param {GameManager} gameManager @param {number} code */
    constructor(io, gameManager, code) {
        this.io = io;
        this.gameManager = gameManager;
        this.code = code;
    }
}

module.exports = Game;