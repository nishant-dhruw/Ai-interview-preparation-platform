console.log("AI Interview Platform Started");


// =======================
// START INTERVIEW BUTTON
// =======================

const startButton =
    document.querySelector(".start-btn");

startButton.addEventListener("click", function () {

    const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");


    // =======================
    // CHECK LOGIN
    // =======================

    if (!token) {

        alert("Please login first.");

        window.location.href =
            "login.html";

        return;
    }


    // =======================
    // OPEN INTERVIEW PAGE
    // =======================

    window.location.href =
        "interview.html";

});

// =======================
// CHECK LOGIN STATUS
// =======================

const loginButton = document.querySelector(".login-btn");
const registerButton = document.querySelector(".signup-btn");

const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");


// =======================
// NOT LOGGED IN
// =======================

if (!token) {

    if (loginButton) {

        loginButton.textContent = "Login";

        loginButton.addEventListener("click", function () {

            window.location.href = "login.html";

        });

    }

    if (registerButton) {

        registerButton.textContent = "Register";

        registerButton.addEventListener("click", function () {

            window.location.href = "registration.html";

        });

    }

}


// =======================
// LOGGED IN
// =======================

else {

    if (loginButton) {

        loginButton.textContent = "Dashboard";

        loginButton.addEventListener("click", function () {

        window.location.href = "dashboard.html";

        });
    }

    if (registerButton) {

        registerButton.textContent = "Logout";

        registerButton.addEventListener("click", function () {

            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("userName");
            localStorage.removeItem("userEmail");

            sessionStorage.removeItem("token");

            window.location.href = "index.html";

        });

    }

}