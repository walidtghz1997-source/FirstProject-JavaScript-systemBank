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


// this is sing up
function signUp() {
    let newUser = {
        fullname: "",
        age: 0,
        email: "",
        password: "",
        balance: 0,
        loan: 0,
        invest: 0,
        history: []
    };

    while (true) {
        let name = prompt("Enter full name:");
        if (!name) continue;

        name = name.trim();

        if (name.length >= 5 && /^[A-Za-z]+\s+[A-Za-z]+$/.test(name)) {
            newUser.fullname = name
                .split(" ")
                .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                .join(" ");
            break;
        }

        alert("Invalid name");
    }

    while (true) {
        let email = prompt("Enter email:");
        if (!email) continue;

        email = email.trim().toLowerCase();

        if (
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) &&
            !users.find(u => u.email === email)
        ) {
            newUser.email = email;
            break;
        }

        alert("Invalid email");
    }

    while (true) {
        let age = prompt("Enter age:");
        if (!age) continue;

        age = age.trim();

        if (!isNaN(age) && age.length <= 2) {
            newUser.age = Number(age);
            break;
        }

        alert("Invalid age");
    }

    while (true) {
        let password = prompt("Enter password:");
        if (!password) continue;

        if (!/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{7,}$/.test(password)) {
            alert("Weak password");
            continue;
        }

        let confirm = prompt("Confirm password:");
        if (password !== confirm) {
            alert("Not matching");
            continue;
        }

        newUser.password = password;
        break;
    }

    newUser.history.push("Account created");

    users.push(newUser);
    saveUsers();

    alert("Account created");
}

