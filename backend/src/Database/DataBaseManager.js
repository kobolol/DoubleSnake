const mySql = require("mysql2");
const UserManager = require("./UserManager/UserManager");
require("dotenv").config();

class DataBaseManager {
    constructor(host, database) {
        this.connection = mySql.createConnection({
            host: host,
            port: process.env.DB_PORT || 3306,
            user: "root",
            password: process.env.DB_PASSWORD || undefined,
            database: database
        });

        this.connection.connect((err) => {
            if (err) {
                throw err;

            }
        });

        this.usermanager = new UserManager(this.connection);
    }
}

module.exports = DataBaseManager;