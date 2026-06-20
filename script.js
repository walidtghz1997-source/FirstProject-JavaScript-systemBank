// project system bank
let users = JSON.parse(localStorage.getItem("bankUsers")) || [];
let currentUser = null;
let isRunning = true;

mainMenu();

function saveUsers() {
    localStorage.setItem("bankUsers", JSON.stringify(users));
}

// this is main menu
function mainMenu() {
    let choice = "";

    while (choice !== "4" && isRunning) {
        choice = prompt(
            "Bank Menu:\n" +
            "1 - Sign Up\n" +
            "2 - Login\n" +
            "3 - Change Password\n" +
            "4 - Exit"
        );

        if (choice === "1") {
            signUp();
        } else if (choice === "2") {
            login();
        } else if (choice === "3") {
            changePassword();
        } else if (choice === "4") {
            isRunning = false;
            alert("Goodbye");
        } else {
            alert("Invalid choice");
        }
    }
}
