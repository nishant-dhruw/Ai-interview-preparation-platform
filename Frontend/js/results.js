console.log("Results Page Started");


// =====================================================
// GET ELEMENTS
// =====================================================

const overallScore =
    document.getElementById("overallScore");

const scoreMessage =
    document.getElementById("scoreMessage");

const performanceSummary =
    document.getElementById("performanceSummary");

const questionsContainer =
    document.getElementById("questionsContainer");

const loadingMessage =
    document.getElementById("loadingMessage");

const errorMessage =
    document.getElementById("errorMessage");

const dashboardButton =
    document.getElementById("dashboardButton");

const dashboardButtonBottom =
    document.getElementById("dashboardButtonBottom");


// =====================================================
// TOKEN
// =====================================================

const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");


// =====================================================
// LOGIN CHECK
// =====================================================

if (!token) {

    alert("Please login first.");

    window.location.href = "login.html";

    throw new Error("User not logged in.");
}


// =====================================================
// GET INTERVIEW ID FROM URL
// =====================================================

const urlParams =
    new URLSearchParams(window.location.search);

const interviewId =
    urlParams.get("interviewId");


console.log(
    "Interview ID:",
    interviewId
);


// =====================================================
// CHECK INTERVIEW ID
// =====================================================

if (!interviewId) {

    showError(
        "Interview ID was not provided."
    );

    throw new Error(
        "Interview ID missing."
    );
}


// =====================================================
// DASHBOARD BUTTONS
// =====================================================

dashboardButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "dashboard.html";

    }
);


dashboardButtonBottom.addEventListener(
    "click",
    function () {

        window.location.href =
            "dashboard.html";

    }
);


// =====================================================
// LOAD RESULTS
// =====================================================

async function loadResults() {

    console.log(
        "Loading interview results..."
    );

    try {

        const response =
            await fetch(
                "http://localhost:8080/api/interviews/" +
                interviewId,
                {
                    method: "GET",

                    headers: {
                        "Authorization":
                            "Bearer " + token
                    }
                }
            );


        console.log(
            "Results API status:",
            response.status
        );


        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(
                "Failed to load interview results. " +
                response.status +
                " " +
                errorText
            );
        }


        const interview =
            await response.json();


        console.log(
            "Interview results:",
            interview
        );


        // =================================================
        // GET QUESTIONS
        // =================================================

        const questions =
            interview.questions || [];


        console.log(
            "Questions:",
            questions
        );


        if (questions.length === 0) {

            throw new Error(
                "No questions found for this interview."
            );
        }


        // =================================================
        // CALCULATE SCORE
        // =================================================

        let totalScore = 0;

        let evaluatedQuestions = 0;


        questions.forEach(question => {

            const answers =
                question.answers || [];


            if (answers.length > 0) {

                const latestAnswer =
                    answers[answers.length - 1];


                if (
                    latestAnswer.score !== null &&
                    latestAnswer.score !== undefined
                ) {

                    totalScore +=
                        Number(latestAnswer.score);

                    evaluatedQuestions++;

                }

            }

        });


        let averageScore = 0;


        if (evaluatedQuestions > 0) {

            averageScore =
                totalScore /
                evaluatedQuestions;

        }


        console.log(
            "Total score:",
            totalScore
        );

        console.log(
            "Evaluated questions:",
            evaluatedQuestions
        );

        console.log(
            "Average score:",
            averageScore
        );


        // =================================================
        // SHOW OVERALL SCORE
        // =================================================

        overallScore.textContent =
            averageScore.toFixed(1) +
            "/10";


        // =================================================
        // SCORE MESSAGE
        // =================================================

        scoreMessage.textContent =
        getPerformance(averageScore);

        // =================================================
        // AI RECOMMENDATION
        // =================================================

        const aiRecommendation =
            document.getElementById("aiRecommendation");

        if (averageScore >= 9) {

            aiRecommendation.textContent =
                "Excellent performance! 🚀 Your answers show strong understanding of the concepts. Keep practicing advanced interview questions to maintain this level.";

        } else if (averageScore >= 7) {

            aiRecommendation.textContent =
                "Very good performance! 🌟 You have a solid understanding of the fundamentals. Focus on improving answer completeness and explaining concepts with practical examples.";

        } else if (averageScore >= 5) {

            aiRecommendation.textContent =
                "Your fundamentals are good, but there is room for improvement. 👍 Focus on strengthening core concepts, giving more complete answers, and practicing more interview questions.";

        } else {

            aiRecommendation.textContent =
                "Keep practicing! 💪 Focus on strengthening your fundamentals and try answering more interview questions. Review the AI feedback for each question and work on the areas mentioned there.";
        }


        // =================================================
        // PERFORMANCE SUMMARY
        // =================================================

        performanceSummary.innerHTML = `

            <p>
                You completed a
                <strong>${interview.type}</strong>
                interview with
                <strong>${questions.length}</strong>
                questions.
            </p>

            <p>
                You answered
                <strong>${evaluatedQuestions}</strong>
                questions with evaluated answers.
            </p>

            <p>
                Your average score was
                <strong>${averageScore.toFixed(1)}/10</strong>.
            </p>

        `;


        // =================================================
        // SHOW QUESTION RESULTS
        // =================================================

        questionsContainer.innerHTML = "";


        questions.forEach(
            (question, index) => {

                const answers =
                    question.answers || [];


                const latestAnswer =
                    answers.length > 0
                        ? answers[answers.length - 1]
                        : null;


                const answerText =
                    latestAnswer
                        ? latestAnswer.answerText
                        : "No answer submitted.";


                const score =
                    latestAnswer &&
                    latestAnswer.score !== null &&
                    latestAnswer.score !== undefined
                        ? latestAnswer.score + "/10"
                        : "Not evaluated";


                const feedback =
                    latestAnswer &&
                    latestAnswer.feedback
                        ? latestAnswer.feedback
                        : "No feedback available.";


                const card =
                    document.createElement("div");


                card.className =
                    "question-result-card";


                card.innerHTML = `

                <div class="question-number">
                    Question ${index + 1}
                </div>

                <div class="question-text">
                    ${escapeHtml(
                    question.questionText
                    )}
                </div>


                <!-- ================= YOUR ANSWER ================= -->

                <div class="answer-title">
                    ✍️ Your Answer
                </div>

                <div class="answer-text">
                    ${
                        latestAnswer
                        ? escapeHtml(answerText)
                        : "No answer submitted."
                    }
                </div>


                <!-- ================= SCORE ================= -->

                <div class="question-score">
                    🎯 Score: ${escapeHtml(
                    String(score)
                    )}
                </div>

                <div class="score-bar-container">
                    <div
                        class="score-bar"
                        style="width: ${
                            latestAnswer &&
                            latestAnswer.score !== null &&
                            latestAnswer.score !== undefined
                                ? Number(latestAnswer.score) * 10
                                : 0
                        }%"
                    ></div>
                </div>


                <!-- ================= AI FEEDBACK ================= -->

                <div class="feedback-title">
                    🤖 AI Feedback
                </div>

                <div class="feedback-text">
                    ${escapeHtml(
                    feedback
                    )}
                </div>

            `;


                questionsContainer.appendChild(
                    card
                );

            }
        );


        // =================================================
        // HIDE LOADING
        // =================================================

        loadingMessage.style.display =
            "none";


        console.log(
            "Results loaded successfully."
        );

    } catch (error) {

        console.error(
            "Results error:",
            error
        );


        loadingMessage.style.display =
            "none";


        showError(
            "Unable to load results: " +
            error.message
        );

    }
}


// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHtml(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text ?? "";

    return div.innerHTML;
}

// =====================================================
// GET PERFORMANCE
// =====================================================

function getPerformance(score) {

    if (score >= 9)
        return "Excellent 🚀";

    if (score >= 7)
        return "Very Good 🌟";

    if (score >= 5)
        return "Good 👍";

    return "Needs Improvement 📘";
}


// =====================================================
// SHOW ERROR
// =====================================================

function showError(message) {

    errorMessage.style.display =
        "block";

    errorMessage.textContent =
        message;

}


// =====================================================
// START
// =====================================================

loadResults();