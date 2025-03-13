const bcrypt = require("bcrypt");

class User {
    constructor(userJSON) {
        this.id = userJSON.id;
        this.username = userJSON.username;
        this.email = userJSON.email;
        this.password = userJSON.password;
        this.fullName = userJSON.fullName;
        this.createdAt = userJSON.createdAt;
    }

    async doesPassMatch(passwordPlain) {
        return await bcrypt.compare(passwordPlain, this.password);
    }

    toUserJSON(){
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            fullName: this.fullName,
        }
    }
}

module.exports = User;