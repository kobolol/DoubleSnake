const mySql = require("mysql2");
const UserManager = require("./UserManager/UserManager");

class DataBaseManager {
    constructor(host, database) {
        this.connection = mySql.createConnection({
            host: host,
            port: 3210,
            user: "root",
            password: "Jonas2007",
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