class Score{
    /** @param {UserManager} usermanager */
    constructor(scoreJson, rank = 0){
        this.id = scoreJson.id;
        this.rank = rank;
        this.user1ID = scoreJson.user1;
        this.user2ID = scoreJson.user2;
        this.score = scoreJson.score;
        this.time = new Date(scoreJson.time);
    }
}

module.exports = Score;