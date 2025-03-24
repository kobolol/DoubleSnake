class TemporaryLobby{
    /** @param { string } code  @param {Array<SocketUser>} users */
    constructor(code, users){
        this.code = code;
        this.users = users;
    }
}

module.exports = TemporaryLobby;