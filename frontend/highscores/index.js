class HighScoreLoader{
    constructor(){
        this.table = document.getElementById("highscoreTable");
        this.data = undefined;

        // Jetzigen Count finden
        const urlParams = new URLSearchParams(window.location.search);
        this.count = parseInt(urlParams.get("count")) || 1;

        this.countSelector = document.getElementById("count");

        this.setup();
    }

    async setup(){
        // Load all Data
        const response = await fetch(`/api/highscore/split/${this.count}`);
        this.data = await response.json();

        for(const score of this.data.scores){
            this.table.innerHTML += `
                <tr>
                   <td>${score.rang}</td>
                   <td>${score.user1.username}</td>
                   <td>${score.user2.username}</td>
                   <td>${score.score}</td>
                </tr>
            `;
        }

        // Lade alle options
        const response2 = await fetch("/api/highscore/count");
        const data2 = await response2.json();

        for(let i = 1; i <= data2.count; i++){
            this.countSelector.innerHTML += `
                <option>${i}</option>
            `
        }

        this.countSelector.addEventListener("change", (e) => {
            const targetCount = e.target.value;

            window.location.href = `/highscores/?count=${targetCount}`;
        })

        this.countSelector.value = this.count;
    }
}

new HighScoreLoader();