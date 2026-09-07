console.log("Interview History Page Started");

// =====================================================
// GET ELEMENTS
// =====================================================

const historyContainer =
    document.getElementById("historyContainer");

const loadingMessage =
    document.getElementById("loadingMessage");

const errorMessage =
    document.getElementById("errorMessage");

const dashboardButton =
    document.getElementById("dashboardButton");


// =====================================================
// TOKEN
// =====================================================

const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");


// =====================================================
// USER ID
// =====================================================

const userId =
    localStorage.getItem("userId");


// =====================================================
// LOGIN CHECK
// =====================================================

if (!token || !userId) {

    alert("Please login first.");

    window.location.href =
        "login.html";

    throw new Error(
        "User is not logged in."
    );
}


// =====================================================
// DASHBOARD BUTTON
// =====================================================

dashboardButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "dashboard.html";

    }
);


// =====================================================
// LOAD INTERVIEW HISTORY
// =====================================================

async function loadInterviewHistory() {

    console.log(
        "Loading interview history..."
    );

    try {

        const response =
            await fetch(
                "http://localhost:8080/api/interviews/user/" +
                userId,
                {
                    method: "GET",

                    headers: {
                        "Authorization":
                            "Bearer " + token
                    }
                }
            );


        console.log(
            "History API status:",
            response.status
        );


        // =================================================
        // CHECK RESPONSE
        // =================================================

        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(
                "Failed to load interview history. " +
                response.status +
                " " +
                errorText
            );
        }


        // =================================================
        // GET DATA
        // =================================================

        const interviews =
            await response.json();


        console.log(
            "Interview History:",
            interviews
        );


        // =================================================
        // HIDE LOADING
        // =================================================

        loadingMessage.style.display =
            "none";


        // =================================================
        // EMPTY HISTORY
        // =================================================

        if (
            !interviews ||
            interviews.length === 0
        ) {

            historyContainer.innerHTML = `

                <div class="empty-history">

                    <div style="font-size: 50px;">
                        📭
                    </div>

                    <p>
                        You haven't completed any interviews yet.
                    </p>

                </div>

            `;

            return;
        }


        // =================================================
        // CLEAR CONTAINER
        // =================================================

        historyContainer.innerHTML = "";


        // =================================================
        // CREATE INTERVIEW CARDS
        // =================================================

        interviews.forEach(
            interview => {

                const card =
                    document.createElement("div");


                card.className =
                    "interview-card";


                // =================================================
                // STATUS
                // =================================================

                const status =
                    interview.status || "STARTED";


                const statusClass =
                    status === "COMPLETED"
                        ? "status-completed"
                        : "status-started";


                // =================================================
                // DATE
                // =================================================

                const date =
                    interview.createdAt
                        ? new Date(
                            interview.createdAt
                        ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        })
                        : "Unknown";

                const time =
                    interview.createdAt
                        ? new Date(
                            interview.createdAt
                        ).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                        })
                        : "Unknown";


                // =================================================
                // QUESTIONS
                // =================================================

                const questionCount =
                    interview.questions
                        ? interview.questions.length
                        : 0;


                // =================================================
                // CARD HTML
                // =================================================

                card.innerHTML = `

                    <div class="interview-card-top">

                        <div class="interview-type">

                            🤖
                            ${escapeHtml(
                                interview.type || "Interview"
                            )}

                        </div>


                        <div class="
                            interview-status
                            ${statusClass}
                        ">

                            ${escapeHtml(status)}

                        </div>

                    </div>


                    <div class="interview-info">

                        <div class="info-item">

                            <span>Questions</span>

                            <strong>
                                ${questionCount}
                            </strong>

                        </div>


                        <div class="info-item">

                            <span>Date</span>

                            <strong>
                                ${escapeHtml(date)}
                            </strong>

                        </div>


                        <div class="info-item">

                            <span>Time</span>

                            <strong>
                                ${escapeHtml(time)}
                            </strong>

                        </div>


                        <div class="info-item">

                            <span>Interview ID</span>

                            <strong>
                                #${interview.id}
                            </strong>

                        </div>

                    </div>


                    ${
                        status === "COMPLETED"

                        ? `

                            <button
                                class="view-result-button"
                                data-id="${interview.id}"
                            >

                                View Results →

                            </button>

                        `

                        : `

                            <button
                                class="view-result-button"
                                data-id="${interview.id}"
                            >

                                View Interview →

                            </button>

                        `
                    }

                `;


                // =================================================
                // BUTTON CLICK
                // =================================================

                const resultButton =
                    card.querySelector(
                        ".view-result-button"
                    );


                resultButton.addEventListener(
                    "click",
                    function () {

                        const id =
                            this.dataset.id;


                        if (
                            status === "COMPLETED"
                        ) {

                            window.location.href =
                                "results.html?interviewId=" +
                                id;

                        } else {

                            window.location.href =
                                "interview.html";

                        }

                    }
                );


                // =================================================
                // ADD CARD
                // =================================================

                historyContainer.appendChild(
                    card
                );

            }
        );


        console.log(
            "Interview history loaded successfully."
        );


    } catch (error) {

        console.error(
            "History error:",
            error
        );


        loadingMessage.style.display =
            "none";


        errorMessage.style.display =
            "block";


        errorMessage.textContent =
            "Unable to load interview history: " +
            error.message;

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
// START
// =====================================================

loadInterviewHistory();