class ErrorHandler {
    constructor() {
        this.errorH2 = document.getElementById("errorMsg");
        
        this.errorList = [
            { route: "/login",
                errors: [
                    { code: 1, msg: "Du musst ein Username und ein Passwort eingeben!", errorHighligher: ["username", "password"] }, 
                    { code: 2, msg: "Username oder Passwort falsch!", errorHighligher: ["username", "password"] }
                ] 
            },
            { route: "/register",
                errors: [
                    { code: 1, msg: "Du musst zumindest Username und  Passwort angeben!", errorHighligher: ["username", "password"] }, 
                    { code: 2, msg: "Username ist schon vergeben!", errorHighligher: ["username"] }
                ] 
            },
            { route: "/dashboard/account",
                errors: [
                    { code: 1, msg: "Dieser Username ist schon vergeben!", errorHighligher: ["username"] }, 
                ] 
            }
        ];

        this.showPossibleError();
    }

    showPossibleError() {
        const route = this.getCurrentRoute();
        const error = this.checkError();
        
        if(!error) return;

        const errorJSON= this.errorList.find(x => x.route === route).errors.find(x => x.code === error);

        this.errorH2.innerText = errorJSON.msg;
        this.errorH2.style.display = "block";

        errorJSON.errorHighligher.forEach(element => {
            document.getElementsByName(element)[0].classList.add("important");
        });
    }

    getCurrentRoute() {
        return window.location.pathname.slice(0, -1);
    }

    checkError() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get("error"));
    }
}

new ErrorHandler();