console.log("Dashboard Started");


// =======================
// GET USER INFORMATION
// =======================

const userName =
    localStorage.getItem("userName");

const userEmail =
    localStorage.getItem("userEmail");

const userId =
    localStorage.getItem("userId");

const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");


// =======================
// CHECK LOGIN
// =======================

if (!token || !userId) {

    alert("Please login first.");

    window.location.href = "login.html";

    throw new Error("User not logged in");
}


// =======================
// DISPLAY USER
// =======================

const userNameElement =
    document.getElementById("userName");

const welcomeUser =
    document.getElementById("welcomeUser");


if (userName) {

    userNameElement.textContent =
        userName;

    welcomeUser.textContent =
        "👋 " + userName;

}


// =======================
// LOAD STATISTICS
// =======================

async function loadStatistics() {

    try {

        const response = await fetch(
            `http://localhost:8080/api/interviews/user/${userId}/stats`,
            {
                method: "GET",

                headers: {
                    "Authorization":
                        "Bearer " + token
                }
            }
        );


        // =======================
        // HANDLE ERROR
        // =======================

        if (!response.ok) {

            console.error(
                "Statistics API failed:",
                response.status
            );

            return;
        }


        // =======================
        // GET DATA
        // =======================

        const data =
            await response.json();

        console.log(
            "Statistics received:",
            JSON.stringify(data, null, 2),
            data
        );


        // =======================
        // UPDATE DASHBOARD
        // =======================

        document.getElementById(
            "totalInterviews"
        ).textContent =
            data.totalInterviews;


        document.getElementById(
            "averageScore"
        ).textContent =
            data.averageScore;


        document.getElementById(
            "completedInterviews"
        ).textContent =
            data.completedInterviews;


        document.getElementById(
            "progress"
        ).textContent =
            data.progress + "%";


    } catch (error) {

        console.error(
            "Error loading statistics:",
            error
        );

    }

}


// =======================
// LOGOUT
// =======================

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


logoutButton.addEventListener(
    "click",
    function () {

        localStorage.removeItem("token");

        localStorage.removeItem("userId");

        localStorage.removeItem("userName");

        localStorage.removeItem("userEmail");

        sessionStorage.removeItem("token");

        window.location.href =
            "index.html";

    }
);


// =======================
// START INTERVIEW
// =======================

const startInterviewButton =
    document.getElementById(
        "startInterviewButton"
    );


startInterviewButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "interview.html";

    }
);


// =======================
// RESUME ANALYZER
// =======================

const resumeButton =
    document.getElementById(
        "resumeButton"
    );


resumeButton.addEventListener(
    "click",
    function () {

        alert(
            "Resume Analyzer coming soon! 📄"
        );

    }
);


// =======================
// HISTORY
// =======================

const historyButton =
    document.getElementById(
        "historyButton"
    );


historyButton.addEventListener("click", function () {

    window.location.href = "history.html";

});


// =======================
// START DASHBOARD
// =======================

loadStatistics();