const mySql = require("mysql2");
const Score = require("./Score");

class ScoreManager{
    /**@param {() => mySql.Connection} connectionFactory*/
    constructor(connectionFactory) {
        this.connectionFactory = connectionFactory;

        this.splitLimit = 25;
    }

    async withConnection(callback) {
        const connection = this.connectionFactory();

        try {
            return await callback(connection);
        }
        finally {
            connection.end();
        }
    }

    async getAllScores(){
        return await this.withConnection(async (connection) => {
            const response = await connection.promise().query("SELECT * FROM scores ORDER BY score DESC");
            const sortedScores = response[0].map((scoreData, index) => new Score(scoreData, index + 1));

            return sortedScores;
        });
    }

    async createScore(newScoreJson){
        return await this.withConnection(async (connection) => {
            const sql = "INSERT INTO scores (user1, user2, score) VALUES (?, ?, ?)";

            const insertResult = await connection
                .promise()
                .query(sql, [newScoreJson.user1, newScoreJson.user2, newScoreJson.score]);
            const insertId = insertResult[0].insertId;

            const selectSql = "SELECT * FROM scores WHERE id = ?";
            const selectResult = await connection.promise().query(selectSql, [insertId]);

            const rank = await this.getRankById(insertId);

            return new Score(selectResult[0][0], rank);
        });
    }

    async getScoreById(id){
        return await this.withConnection(async (connection) => {
            const response = await connection.promise().query("SELECT * FROM scores WHERE id = ?", [id]);

            const rank = await this.getRankById(id);

            return new Score(response[0][0], rank);
        });
    }

    async getSplitedScoreCount(){
        const allSortetScores = await this.getAllScores();

        const count = Math.ceil(allSortetScores.length / 25);

        return count;
    }

    async getSpiltedScore(count){
        const offset = (count - 1) * this.splitLimit;

        return await this.withConnection(async (connection) => {
            const response = await connection.promise().query(
                `SELECT * FROM scores ORDER BY score DESC LIMIT ${this.splitLimit} OFFSET ${offset}`,
            );

            const sortedScoreSplit = response[0].map((scoreData, index) => {
                const rank = offset + index + 1;
                return new Score(scoreData, rank);
            });

            return sortedScoreSplit;
        });
    }

    async getRankById(id){
        return await this.withConnection(async (connection) => {
            const rankSql =
                "SELECT COUNT(*) + 1 AS rank_position FROM scores WHERE score > (SELECT score FROM scores WHERE id = ?)";
            const rankResult = await connection.promise().query(rankSql, [id]);

            const rank = rankResult[0][0]?.rank_position ?? null;

            return rank;
        });
    }
}

module.exports = ScoreManager;
