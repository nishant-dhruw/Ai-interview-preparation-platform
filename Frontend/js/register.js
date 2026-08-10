// ======================= FORM =======================

const form = document.getElementById("registerForm");

// ======================= INPUTS =======================

const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");

// ======================= ERRORS =======================

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const termsError = document.getElementById("termsError");

// ======================= PASSWORD STRENGTH =======================

const strengthText = document.getElementById("strengthText");
const strengthFill = document.getElementById("strengthFill");

// ======================= SHOW PASSWORD =======================

const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {

    if(password.type==="password"){

        password.type="text";
        togglePassword.textContent="🙈";

    }

    else{

        password.type="password";
        togglePassword.textContent="👁";

    }

});

// ======================= SHOW CONFIRM PASSWORD =======================

const toggleConfirmPassword=document.getElementById("toggleConfirmPassword");

toggleConfirmPassword.addEventListener("click",()=>{

    if(confirmPassword.type==="password"){

        confirmPassword.type="text";
        toggleConfirmPassword.textContent="🙈";

    }

    else{

        confirmPassword.type="password";
        toggleConfirmPassword.textContent="👁";

    }

});

// ======================= PASSWORD STRENGTH =======================

password.addEventListener("input",()=>{

    let score=0;

    const pass=password.value;

    if(pass.length>=8)
        score++;

    if(/[A-Z]/.test(pass))
        score++;

    if(/[a-z]/.test(pass))
        score++;

    if(/[0-9]/.test(pass))
        score++;

    if(/[!@#$%^&*(),.?":{}|<>]/.test(pass))
        score++;

    if(pass.length===0){

        strengthText.textContent="Weak";
        strengthText.style.color="#ef4444";

        strengthFill.style.width="0%";
        strengthFill.style.background="#ef4444";

        return;
    }

    if(score<=2){

        strengthText.textContent="Weak";
        strengthText.style.color="#ef4444";

        strengthFill.style.width="35%";
        strengthFill.style.background="#ef4444";

    }

    else if(score<=4){

        strengthText.textContent="Medium";
        strengthText.style.color="#f59e0b";

        strengthFill.style.width="70%";
        strengthFill.style.background="#f59e0b";

    }

    else{

        strengthText.textContent="Strong";
        strengthText.style.color="#22c55e";

        strengthFill.style.width="100%";
        strengthFill.style.background="#22c55e";

    }

});

// ======================= SUBMIT =======================

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    clearErrors();

    let valid=true;

    // NAME

    if(name.value.trim()===""){

        showError(name,nameError,"Name is required.");
        valid=false;

    }

    else{

        showSuccess(name);

    }

    // EMAIL

    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(email.value.trim()===""){

        showError(email,emailError,"Email is required.");
        valid=false;

    }

    else if(!emailRegex.test(email.value.trim())){

        showError(email,emailError,"Enter a valid email.");
        valid=false;

    }

    else{

        showSuccess(email);

    }

    // PASSWORD

    const pass=password.value;

    let message=[];

    if(pass.length<8)
        message.push("• Minimum 8 characters");

    if(!/[A-Z]/.test(pass))
        message.push("• Add one uppercase letter");

    if(!/[a-z]/.test(pass))
        message.push("• Add one lowercase letter");

    if(!/[0-9]/.test(pass))
        message.push("• Add one number");

    if(!/[!@#$%^&*(),.?\":{}|<>]/.test(pass))
        message.push("• Add one special character");

    if(message.length>0){

        passwordError.innerHTML=message.join("<br>");
        password.classList.add("input-error");
        valid=false;

    }

    else{

        showSuccess(password);

    }

    // CONFIRM PASSWORD

    if(confirmPassword.value===""){

        showError(confirmPassword,confirmPasswordError,"Confirm your password.");
        valid=false;

    }

    else if(pass!==confirmPassword.value){

        showError(confirmPassword,confirmPasswordError,"Passwords do not match.");
        valid=false;

    }

    else{

        showSuccess(confirmPassword);

    }

    // TERMS

    if(!terms.checked){

        termsError.textContent="Accept Terms & Conditions.";
        valid=false;

    }

    // SUCCESS

    if(valid){

        alert("🎉 Registration Successful!");

        form.reset();

        clearErrors();

        strengthText.textContent="Weak";
        strengthText.style.color="#ef4444";

        strengthFill.style.width="0%";
        strengthFill.style.background="#ef4444";

    }

});

// ======================= FUNCTIONS =======================

function showError(input,error,message){

    input.classList.add("input-error");
    error.innerHTML=message;

}

function showSuccess(input){

    input.classList.add("input-success");

}

function clearErrors(){

    nameError.textContent="";
    emailError.textContent="";
    passwordError.textContent="";
    confirmPasswordError.textContent="";
    termsError.textContent="";

    document.querySelectorAll("input").forEach(input=>{

        input.classList.remove("input-error");
        input.classList.remove("input-success");

    });

}