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

loginForm.addEventListener("submit", function (event) {

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


    // ======================= LOGIN SUCCESS =======================

    if (isValid) {

        alert("Login validation successful!");

        console.log("Email:", email.value);

        console.log(
            "Remember Me:",
            rememberMe.checked
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