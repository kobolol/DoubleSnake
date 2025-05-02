class HighScoreLoader{
    constructor(){
        this.table = document.getElementById("highscoreTable");

        this.data = undefined;

        this.setup();
    }

    async setup(){
        // const response = await fetch("/api/highscore");
        // this.data = await response.json();

        // for(const score of this.data.scores){
        //     this.table.innerHTML += `
        //         <tr>
        //            <td>${score.rang}</td>
        //            <td>${score.user1.username}</td>
        //            <td>${score.user2.username}</td>
        //            <td>${score.score}</td>
        //         </tr>
        //     `;
        // }
    }
}

new HighScoreLoader();