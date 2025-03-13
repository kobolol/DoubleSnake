class AccountManager{
    constructor(){
        this.username = document.getElementById("username");
        this.email = document.getElementById("email");
        this.fullName = document.getElementById("fullName");

        this.setUserData();
    }

    async setUserData(){
        const respone = await fetch("/api/dashboard");
        this.data = await respone.json();

        this.username.value = this.data.username;
        this.email.value = this.data.email;
        this.fullName.value = this.data.fullName;
    }
}

new AccountManager();