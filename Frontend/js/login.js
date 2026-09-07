// ======================= FORM =======================

const loginForm = document.getElementById("loginForm");


// ======================= INPUTS =======================

const email = document.getElementById("email");
const password = document.getElementById("password");
const rememberMe = document.getElementById("rememberMe");


// ======================= ERROR ELEMENTS =======================

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");


// ======================= PASSWORD TOGGLE =======================

const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";
        togglePassword.textContent = "🙈";

    } else {

        password.type = "password";
        togglePassword.textContent = "👁";

    }

});


// ======================= LOGIN FORM SUBMIT =======================

loginForm.addEventListener("submit", async function (event) {

    // Stop page refresh
    event.preventDefault();

    // Remove old errors
    clearErrors();

    // Form validation status
    let isValid = true;


    // ======================= EMAIL VALIDATION =======================

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {

        showError(
            email,
            emailError,
            "Email is required."
        );

        isValid = false;

    } else if (!emailPattern.test(email.value.trim())) {

        showError(
            email,
            emailError,
            "Enter a valid email address."
        );

        isValid = false;

    } else {

        showSuccess(email);

    }


    // ======================= PASSWORD VALIDATION =======================

    if (password.value === "") {

        showError(
            password,
            passwordError,
            "Password is required."
        );

        isValid = false;

    } else {

        showSuccess(password);

    }


    // ======================= STOP IF INVALID =======================

    if (!isValid) {
        return;
    }


    // ======================= LOGIN API =======================

    try {

        const response = await fetch(
            "http://localhost:8080/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email.value.trim(),
                    password: password.value
                })
            }
        );


        // ======================= LOGIN FAILED =======================

        if (!response.ok) {

            if (response.status === 401) {

                showError(
                    password,
                    passwordError,
                    "Invalid email or password."
                );

            } else {

                alert("Login failed. Please try again.");

            }

            return;
        }


        // ======================= LOGIN SUCCESS =======================

        const data = await response.json();

        console.log("Login successful!");
        console.log("User:", data);
        console.log("Token:", data.token);


        // ======================= SAVE JWT =======================

        if (rememberMe.checked) {

            localStorage.setItem("token", data.token);

        } else {

            sessionStorage.setItem("token", data.token);

        }


        // ======================= SAVE USER INFO =======================

        localStorage.setItem(
            "userId",
            data.id
        );

        localStorage.setItem(
            "userName",
            data.name
        );

        localStorage.setItem(
            "userEmail",
            data.email
        );


        // ======================= GO TO DASHBOARD =======================

        window.location.href = "index.html";

    } catch (error) {

        console.error("Login error:", error);

        alert(
            "Cannot connect to the server. Make sure the Spring Boot backend is running."
        );

    }

});


// ======================= SHOW ERROR FUNCTION =======================

function showError(input, errorElement, message) {

    input.classList.remove("input-success");

    input.classList.add("input-error");

    errorElement.textContent = message;

}


// ======================= SHOW SUCCESS FUNCTION =======================

function showSuccess(input) {

    input.classList.remove("input-error");

    input.classList.add("input-success");

}


// ======================= CLEAR ERRORS FUNCTION =======================

function clearErrors() {

    emailError.textContent = "";

    passwordError.textContent = "";

    email.classList.remove(
        "input-error",
        "input-success"
    );

    password.classList.remove(
        "input-error",
        "input-success"
    );

}