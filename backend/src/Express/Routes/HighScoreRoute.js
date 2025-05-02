const express = require("express");
const DataBaseManager = require("../../Database/DataBaseManager");
const Score = require("../../Database/ScoreManager/Score");

class HighScoreRoute {
    /**@param {DataBaseManager} dbManager*/
    constructor(dbManager) {
        this.router = express.Router();

        this.db = dbManager;

        this.router.get("/", async (req, res) => await this.getHighscores(req, res));
        this.router.get("/split/:count", async (req, res) => await this.getSplitedHighScores(req, res));
        this.router.get("/count", async (req, res) => await this.getSplitedHighScoreCount(req, res));
    }

    /**@param {express.Request} req @param {express.Response} res*/
    async getHighscores(req, res){
        /** @type {Array<Score>} */
        const highscores = await this.db.scoremanager.getAllScores();

        let returnJSON = {
            scores: []
        }

        for(const highscore of highscores){
            const highscoreJSON = await this.formatHighScore(highscore);
            returnJSON.scores.push(highscoreJSON);
        }

        res.json(returnJSON);
    }

    /**@param {express.Request} req @param {express.Response} res*/
    async getSplitedHighScores(req, res){
        const count = req.params.count;

        /** @type {Array<Score>} */
        const highscores = await this.db.scoremanager.getSpiltedScore(count);

        let returnJSON = {
            scores: []
        }

        for(const highscore of highscores){
            const highscoreJSON = await this.formatHighScore(highscore);
            returnJSON.scores.push(highscoreJSON);
        }

        res.json(returnJSON);
    }

    /**@param {express.Request} req @param {express.Response} res*/
    async getSplitedHighScoreCount(req, res){
        const count = await this.db.scoremanager.getSplitedScoreCount();

        res.json({
            count: count
        });
    }

    /** @param {Score} highscore */
    async formatHighScore(highscore){
        const user1 = await this.db.usermanager.getUser({id: highscore.user1ID});
        const user2 = await this.db.usermanager.getUser({id: highscore.user2ID});
        const rang = highscore.rank;
        const returnJSON = {
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
        }

        return returnJSON;
    }
}

module.exports = HighScoreRoute;