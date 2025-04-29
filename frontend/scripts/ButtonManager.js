class ButtonManager {
    constructor() {
        this.buttons = [
            { id: "homeBtn", route: "/" },
            { id: "loginBtn", route: "/login" },
            { id: "registerBtn", route: "/register" },
            { id: "dashboardBtn", route: "/dashboard" },
            { id: "lobbyBtn", route: "/dashboard/lobby" },
            { id: "accountBtn", route: "/dashboard/account" },
            { id: "logoutBtn", route: "/api/account/logout" },
            { id: "tutorialBtn", route: "https://www.youtube.com/watch?v=1fkV5rB13jQ" },
            { id: "highScoreBtn", route: "/highscores"}
        ];

        this.addEventListener();
    }

    addEventListener() {
        this.buttons.forEach(button => {
            const element = document.getElementById(button.id);
            if (!element) return;

            element.addEventListener("click", () => { window.location.href = button.route });
        });
    }
}

new ButtonManager();
