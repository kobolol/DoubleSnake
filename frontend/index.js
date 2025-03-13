class ButtonLoginChecker{
    constructor(){
        this.loggedOutButtons = [
            { id: "loginBtn", route: "/login" },
            { id: "registerBtn", route: "/register" }
        ];

        this.loggedInButtons = [
            { id: "dashboardBtn", route: "/dashboard" },
        ];

        this.init();
    }

    async init(){
        const isLoggedIn = await this.checkIsLoggedIn();

        this.showButton(isLoggedIn);
    }

    showButton(isLoggedIn){
        const buttons = isLoggedIn ? this.loggedOutButtons : this.loggedInButtons;

        buttons.forEach(button => {
            document.getElementById(button.id).style.display = "none";
        })
    }

    async checkIsLoggedIn(){
        try{
            const response = await fetch("/api/dashboard");

            return !response.redirected;
        }
        catch(error){
            console.error(error);

            return false;
        }
    }
}

new ButtonLoginChecker();