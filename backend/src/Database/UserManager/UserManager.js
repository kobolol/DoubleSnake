const mySql = require("mysql2")
const bcrypt = require("bcrypt")
const User = require("./User")

class UserManager {
    /**@param {() => mySql.Connection} connectionFactory*/
    constructor(connectionFactory) {
        this.connectionFactory = connectionFactory;
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

    // Gebe zumindest {username: "x", password: "x"} mit!
    // 0: Fehler (User Existiert schon oder Fehler) | 1: Funktioniert (User Erstellt!)
    async createUser(userJson) {
        if (!userJson.username || !userJson.password) return 0;

        const user = await this.getUser({username: userJson.username});
        if(user) return 0;

        return await this.withConnection(async (connection) => {
            try {
                const passHash = await bcrypt.hash(userJson.password, 10);
                await connection
                    .promise()
                    .query(
                        `INSERT INTO users (username, email, password, fullName) VALUES ("${userJson.username}",` +
                        ` ${userJson.email ? `"${userJson.email}"` : "NULL"}, "${passHash}", ${userJson.fullName ? `"${userJson.fullName}"` : "NULL"})`
                    );
                return 1;
            } catch (error) {
                console.log(error);
            }
        });
    }

    // Gebe nichts mit um alle user zu bekommen oder {id: 1} oder {username: "x"} um darauf einen bestimmten zu bekommen;
    async getUser(userData) {
        let selectionString = "SELECT * FROM users";

        if(userData?.id){
            selectionString = `SELECT * FROM users WHERE id=${userData.id}`;
        }
        else if(userData?.username){
            selectionString = `SELECT * FROM users WHERE username="${userData.username}"`;
        }

        return await this.withConnection(async (connection) => {
            try {
                const response = await connection.promise().query(selectionString);

                if(response[0].length === 0){
                    return null;
                }
                else if(response[0].length === 1){
                    const x = response[0][0];
                    return new User(x);
                }
                else{
                    let userArray = [];

                    response[0].forEach(x => {
                        const user = new User(x);

                        userArray.push(user);
                    });

                    return userArray;
                }
            } catch (error) {
                console.log(error);
            }
        });
    }

    // 0: User Existiert nicht | 1: Funktioniert
    // id = 1 | newUserData = {email: "x", password: "xx", "fullName": "xxx"} <-- BRaucht alle Argeumente sonst null, username nicht änderbar
    async updateUser(id, newUserData){
        const user = await this.getUser({id});
        if(!user) return 0;
        if(!newUserData.password) return 0;

        return await this.withConnection(async (connection) => {
            try {
                await connection
                    .promise()
                    .query(
                        `UPDATE users SET
                username="${newUserData.username}",
                email=${newUserData.email ? `"${newUserData.email}"` : "NULL"},
                fullName=${newUserData.fullName ? `"${newUserData.fullName}"` : "NULL"},
                password="${newUserData.password}"
                WHERE id = ${id}`
                    );
                return 1;
            } catch (error) {
                console.log(error)
            }
        });
    }

    // 0: Es gibt den User nicht | 1: Funktioniert
    async delteUser(id){
        const user = await this.getUser({id});
        if(!user) return 0;

        return await this.withConnection(async (connection) => {
            try {
                await connection.promise().query(`DELETE FROM users where id=${id}`);
                return 1;
            } catch (error) {
                console.log(error)
            }
        });
    }
}

module.exports = UserManager;