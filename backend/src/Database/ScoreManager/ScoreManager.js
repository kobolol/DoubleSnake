const mySql = require("mysql2");
const Score = require("./Score");

class ScoreManager{
    /**@param {mySql.Connection} connection*/
    constructor(connection) {
        this.connection = connection;

        this.splitLimit = 25;
    }

    async getAllScores(){
        const response = await this.connection.promise().query("SELECT * FROM scores ORDER BY score DESC");
        const sortedScores = response[0].map((scoreData, index) => new Score(scoreData, index + 1));

        return sortedScores;
    }

    async createScore(newScoreJson){
        const sql = `INSERT INTO scores (user1, user2, score) VALUES (
            ${newScoreJson.user1}, ${newScoreJson.user2}, ${newScoreJson.score})`;
        
        const insertResult = await this.connection.promise().query(sql);
        const insertId = insertResult[0].insertId;
        
        const selectSql = `SELECT * FROM scores WHERE id = ${insertId}`;
        const selectResult = await this.connection.promise().query(selectSql);
        
        return new Score(selectResult[0][0]);
    }

    async getScoreById(id){
        const response = await this.connection.promise().query(`SELECT * FROM scores WHERE id = ${id}`);
        return new Score(response.rows[0][0]);
    }

    async getSplitedScoreCount(){
        const allSortetScores = await this.getAllScores();

        const count = Math.ceil(allSortetScores.length / 25);

        return count;
    }

    async getSpiltedScore(count){
        const offset = (count - 1) * this.splitLimit;

        const response = await this.connection.promise().query(
            `SELECT * FROM scores ORDER BY score DESC LIMIT ${this.splitLimit} OFFSET ${offset}`,
        );

        const sortedScoreSplit = response[0].map((scoreData, index) => {
            const rank = offset + index + 1;
            return new Score(scoreData, rank);
        });

        return sortedScoreSplit;
    }
}

module.exports = ScoreManager;