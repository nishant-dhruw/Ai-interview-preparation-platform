let selectedInterviewType = null;

const typeSelection =
    document.getElementById("typeSelection");

const questionSection =
    document.getElementById("questionSection");

const startInterviewButton =
    document.getElementById("startInterviewButton");

const typeButtons =
    document.querySelectorAll(".type-button");

console.log("Interview Page Started");

// =====================================================
// VARIABLES
// =====================================================

let interviewId = null;
let questions = [];
let currentQuestionIndex = 0;


// =====================================================
// GET TOKEN
// =====================================================

const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");


// =====================================================
// CHECK LOGIN
// =====================================================

if (!token) {

    alert("Please login first.");

    window.location.href = "login.html";

    throw new Error("User not logged in.");
}


// =====================================================
// GET ELEMENTS
// =====================================================

const interviewTypeElement =
    document.getElementById("interviewType");

const progressText =
    document.getElementById("progressText");

const questionNumber =
    document.getElementById("questionNumber");

const questionText =
    document.getElementById("questionText");

const answerInput =
    document.getElementById("answerInput");

const nextButton =
    document.getElementById("nextButton");

const loadingMessage =
    document.getElementById("loadingMessage");

const errorMessage =
    document.getElementById("errorMessage");

const exitButton =
    document.getElementById("exitButton");


// =====================================================
// EXIT
// =====================================================

exitButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "dashboard.html";

    }
);


// =====================================================
// START INTERVIEW
// =====================================================

async function startInterview() {

    if (!selectedInterviewType) {

        alert(
            "Please select an interview type first."
        );

        return;
    }


    const interviewType =
        selectedInterviewType;


    interviewTypeElement.textContent =
        interviewType + " Interview";


    progressText.textContent =
        "Preparing your interview...";


    typeSelection.style.display =
        "none";


    loadingMessage.style.display =
        "block";


    questionSection.style.display =
        "none";


    nextButton.disabled = true;


    try {

        const userId =
            localStorage.getItem("userId");


        if (!userId) {

            throw new Error(
                "User ID not found."
            );
        }


        // =================================================
        // CREATE INTERVIEW
        // =================================================

        const url =
            "http://localhost:8080/api/interviews/start" +
            "?userId=" +
            encodeURIComponent(userId) +
            "&type=" +
            encodeURIComponent(interviewType);


        console.log(
            "Starting interview:",
            url
        );


        const response =
            await fetch(
                url,
                {
                    method: "POST",

                    headers: {
                        "Authorization":
                            "Bearer " + token
                    }
                }
            );


        console.log(
            "Interview creation status:",
            response.status
        );


        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(
                "Failed to create interview. " +
                response.status +
                " " +
                errorText
            );
        }


        const interview =
            await response.json();


        console.log(
            "Interview created:",
            interview
        );


        // =================================================
        // SAVE INTERVIEW DATA
        // =================================================

        interviewId =
            interview.id;


        questions =
            interview.questions || [];


        console.log(
            "Interview ID:",
            interviewId
        );


        console.log(
            "Questions:",
            questions
        );


        if (!interviewId) {

            throw new Error(
                "Interview ID was not returned."
            );
        }


        if (questions.length === 0) {

            throw new Error(
                "No questions were generated."
            );
        }


        // Only use maximum 5 questions
        questions =
            questions.slice(0, 5);


        currentQuestionIndex = 0;


        // =================================================
        // SHOW FIRST QUESTION
        // =================================================

        loadingMessage.style.display =
            "none";


        questionSection.style.display =
            "block";


        showQuestion();

    } catch (error) {

        console.error(
            "Interview error:",
            error
        );


        loadingMessage.style.display =
            "none";


        errorMessage.style.display =
            "block";


        errorMessage.textContent =
            "Unable to start interview: " +
            error.message;
    }
}


// =====================================================
// SHOW QUESTION
// =====================================================

function showQuestion() {

    console.log(
        "Showing question:",
        currentQuestionIndex + 1
    );


    // Safety check

    if (
        currentQuestionIndex < 0 ||
        currentQuestionIndex >= questions.length
    ) {

        console.error(
            "Invalid question index:",
            currentQuestionIndex
        );

        return;
    }


    const question =
        questions[currentQuestionIndex];


    console.log(
        "Question object:",
        question
    );


    // =================================================
    // CLEAR PREVIOUS ANSWER
    // =================================================

    answerInput.value = "";


    // =================================================
    // SHOW QUESTION NUMBER
    // =================================================

    questionNumber.textContent =
        "Question " +
        (currentQuestionIndex + 1);


    // =================================================
    // SHOW QUESTION
    // =================================================

    questionText.textContent =
        question.questionText;


    // =================================================
    // SHOW PROGRESS
    // =================================================

    progressText.textContent =
        "Question " +
        (currentQuestionIndex + 1) +
        " of " +
        questions.length;


    // =================================================
    // BUTTON TEXT
    // =================================================

    if (
        currentQuestionIndex ===
        questions.length - 1
    ) {

        nextButton.textContent =
            "Finish Interview ✓";

    } else {

        nextButton.textContent =
            "Next Question →";
    }


    nextButton.disabled = false;


    answerInput.focus();
}


// =====================================================
// SUBMIT CURRENT ANSWER
// =====================================================

async function submitCurrentAnswer() {

    const answer =
        answerInput.value.trim();


    // =================================================
    // CHECK EMPTY ANSWER
    // =================================================

    if (!answer) {

        alert(
            "Please enter your answer before continuing."
        );

        return false;
    }


    const question =
        questions[currentQuestionIndex];


    if (!question || !question.id) {

        console.error(
            "Question ID missing:",
            question
        );

        alert(
            "Question information is missing."
        );

        return false;
    }


    console.log(
        "Submitting answer for question:",
        question.id
    );


    console.log(
        "Answer:",
        answer
    );


    // =================================================
    // DISABLE BUTTON
    // =================================================

    nextButton.disabled = true;


    nextButton.textContent =
        "🤖 Evaluating...";


    try {

        const url =
            "http://localhost:8080/api/answers/submit" +
            "?questionId=" +
            encodeURIComponent(question.id) +
            "&answerText=" +
            encodeURIComponent(answer);


        console.log(
            "Submitting answer to:",
            url
        );


        const response =
            await fetch(
                url,
                {
                    method: "POST",

                    headers: {
                        "Authorization":
                            "Bearer " + token
                    }
                }
            );


        console.log(
            "Answer submission status:",
            response.status
        );


        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(
                "Failed to submit answer. " +
                response.status +
                " " +
                errorText
            );
        }


        const answerResult =
            await response.json();


        console.log(
            "Answer evaluated:",
            answerResult
        );


        // =================================================
        // SAVE RESULT LOCALLY FOR RESULTS PAGE
        // =================================================

        const storedResults =
            JSON.parse(
                sessionStorage.getItem(
                    "interviewResults"
                ) || "[]"
            );


        storedResults.push({

            questionId:
                question.id,

            questionText:
                question.questionText,

            answerText:
                answerResult.answerText,

            score:
                answerResult.score,

            feedback:
                answerResult.feedback

        });


        sessionStorage.setItem(
            "interviewResults",
            JSON.stringify(storedResults)
        );


        return true;


    } catch (error) {

        console.error(
            "Answer submission error:",
            error
        );


        alert(
            "Unable to evaluate your answer.\n\n" +
            error.message
        );


        nextButton.disabled = false;


        if (
            currentQuestionIndex ===
            questions.length - 1
        ) {

            nextButton.textContent =
                "Finish Interview ✓";

        } else {

            nextButton.textContent =
                "Next Question →";
        }


        return false;
    }
}


// =====================================================
// NEXT QUESTION
// =====================================================

nextButton.addEventListener(
    "click",
    async function () {

        console.log(
            "NEXT BUTTON CLICKED"
        );


        console.log(
            "Current index:",
            currentQuestionIndex
        );


        console.log(
            "Total questions:",
            questions.length
        );


        // =================================================
        // SUBMIT ANSWER FIRST
        // =================================================

        const submitted =
            await submitCurrentAnswer();


        if (!submitted) {

            return;
        }


        // =================================================
        // LAST QUESTION
        // =================================================

        if (
            currentQuestionIndex ===
            questions.length - 1
        ) {

            await finishInterview();

            return;
        }


        // =================================================
        // MOVE TO NEXT QUESTION
        // =================================================

        currentQuestionIndex++;


        showQuestion();

    }
);


// =====================================================
// FINISH INTERVIEW
// =====================================================

async function finishInterview() {

    console.log(
        "Finishing interview:",
        interviewId
    );


    try {

        const response =
            await fetch(
                "http://localhost:8080/api/interviews/" +
                interviewId +
                "/complete",
                {
                    method: "POST",

                    headers: {
                        "Authorization":
                            "Bearer " + token
                    }
                }
            );


        console.log(
            "Complete status:",
            response.status
        );


        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(
                "Failed to complete interview. " +
                errorText
            );
        }


        const interview =
            await response.json();


        console.log(
            "Interview completed:",
            interview
        );


        // =================================================
        // GO TO RESULTS PAGE
        // =================================================

        window.location.href =
        "results.html?interviewId=" + interviewId;

    } catch (error) {

        console.error(
            "Complete interview error:",
            error
        );


        alert(
            "Unable to complete interview.\n\n" +
            error.message
        );


        nextButton.disabled = false;


        nextButton.textContent =
            "Finish Interview ✓";
    }
}


// =====================================================
// INTERVIEW TYPE SELECTION
// =====================================================

typeButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            function () {

                // Remove previous selection

                typeButtons.forEach(
                    btn => {

                        btn.classList.remove(
                            "selected"
                        );

                    }
                );


                // Select clicked button

                this.classList.add(
                    "selected"
                );


                // Save selected type

                selectedInterviewType =
                    this.dataset.type;


                console.log(
                    "Selected interview type:",
                    selectedInterviewType
                );


                // Enable start button

                startInterviewButton.disabled =
                    false;

            }
        );

    }
);


// =====================================================
// START BUTTON
// =====================================================

startInterviewButton.addEventListener(
    "click",
    startInterview
);