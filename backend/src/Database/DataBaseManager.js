const mySql = require("mysql2");
const UserManager = require("./UserManager/UserManager");
const ScoreManager = require("./ScoreManager/ScoreManager");
require("dotenv").config();

class DataBaseManager {
    constructor(host, database) {
        this.connectionConfig = {
            host: host,
            port: process.env.DB_PORT || 3306,
            user: "root",
            password: process.env.DB_PASSWORD || undefined,
            database: database
        };

        const connectionFactory = () => this.createConnection();

        this.usermanager = new UserManager(connectionFactory);
        this.scoremanager = new ScoreManager(connectionFactory);
    }

    createConnection() {
        const connection = mySql.createConnection(this.connectionConfig);

        connection.on("error", (error) => {
            console.error("Database connection error:", error);
        });

        return connection;
    }
}

module.exports = DataBaseManager;