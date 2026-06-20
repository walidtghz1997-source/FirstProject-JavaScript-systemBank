// project system bank
let users = JSON.parse(localStorage.getItem("bankUsers")) || [];
let currentUser = null;
let isRunning = true;

mainMenu();

function saveUsers() {
    localStorage.setItem("bankUsers", JSON.stringify(users));
}
