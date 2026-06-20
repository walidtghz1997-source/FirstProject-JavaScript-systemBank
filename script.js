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

// this is login
function login() {
    let foundUser = null;

    while (true) {
        let email = prompt("Email:");
        if (!email) continue;

        email = email.trim().toLowerCase();

        foundUser = users.find(u => u.email === email);

        if (foundUser) break;

        alert("Not found");
    }

    let attempts = 3;

    while (attempts > 0) {
        let pass = prompt("Password:");

        if (foundUser.password === pass) {
            currentUser = foundUser;

            currentUser.history.push("Login");
            saveUsers();

            alert("Welcome " + currentUser.fullname);

            let result = bankMenu();

            if (result === "exit") {
                isRunning = false;
                return;
            }

            return;
        }

        attempts--;
        alert("Wrong password. Left: " + attempts);
    }

    alert("Account blocked");
}


// this is bank menu
function bankMenu() {
    let choice = "";

    while (choice !== "7" && isRunning) {
        choice = prompt(
            "Welcome " + currentUser.fullname +
            "\nBalance: " + currentUser.balance +
            "\n\n1 Withdraw" +
            "\n2 Deposit" +
            "\n3 Loan" +
            "\n4 Invest" +
            "\n5 History" +
            "\n6 Logout" +
            "\n7 Exit" +
            "\n8 Investment Profit" +
            "\n9 Repay Loan"
        );

        if (choice === "1") withdraw();
        else if (choice === "2") deposit();
        else if (choice === "3") loan();
        else if (choice === "4") invest();
        else if (choice === "5") showHistory();

        else if (choice === "6") {
            currentUser.history.push("Logout");
            saveUsers();
            currentUser = null;
            alert("Logged out");
            return;
        }

        else if (choice === "7") {
            currentUser.history.push("Exit");
            saveUsers();

            currentUser = null;
            isRunning = false;

            alert("Goodbye");
            return "exit";
        }
        else if (choice === "8") investmentProfit();
        else if (choice === "9") repayLoan();

        else {
            alert("Invalid choice");
        }
    }
}
// this is withdraw
function withdraw() {
    let amount = Number(prompt("Amount:"));

    if (isNaN(amount) || amount <= 0) return alert("Invalid");
    if (amount > currentUser.balance) return alert("No balance");

    currentUser.balance -= amount;
    currentUser.history.push("Withdraw " + amount);

    saveUsers();
}

