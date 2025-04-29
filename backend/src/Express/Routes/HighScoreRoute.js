const express = require("express");
const DataBaseManager = require("../../Database/DataBaseManager");
const Score = require("../../Database/ScoreManager/Score");

class HighScoreRoute {
    /**@param {DataBaseManager} dbManager*/
    constructor(dbManager) {
        this.router = express.Router();

        this.db = dbManager;

        this.router.get("/", async (req, res) => await this.getHighscores(req, res));
    }

    /**@param {express.Request} req @param {express.Response} res*/
    async getHighscores(req, res){
        /** @type {Array<Score>} */
        const highscores = await this.db.scoremanager.getAllScores();

        let returnJSON = {
            scores: []
        }

        for(const highscore of highscores){
            const user1 = await this.db.usermanager.getUser({id: highscore.user1ID});
            const user2 = await this.db.usermanager.getUser({id: highscore.user2ID});
            const rang = highscores.indexOf(highscore) + 1;

            returnJSON.scores.push({
                id: highscore.id,
                score: highscore.score,
                rang: rang,
                user1: {
                    id: user1.id,
                    username: user1.username,
                    fullName: user1.fullName
                },
                user2: {
                    id: user2.id,
                    username: user2.username,
                    fullName: user2.fullName
                },
            });
        }

        res.json(returnJSON);
    }
}

module.exports = HighScoreRoute;