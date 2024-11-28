// Get the docID from the URL
let docID = new URL(window.location.href).searchParams.get("docID");

// Firestore Reference
const assignmentsRef = db.collection("assignments");

// Fetch the assignment document
assignmentsRef.doc(docID).get()
    .then((doc) => {
        if (doc.exists) {
            const data = doc.data();

            // Populate assignment details
            $(".assignment-course").text(data.course);
            $(".assignment-estimated-time").text(estimatedTimeString(data.estimatedTimeInMinutes));
            $(".assignment-name").text(data.name);

            const dueDate = new Date(data.dueDate);
            const dueInDays = daysFromToday(dueDate);
            $(".assignment-due-date").text(
                `${dayOfWeekFromToday(dueInDays)} ${dueDate.toLocaleDateString()} (in ${dueInDays} day${plural(dueInDays)})`
            );

            // Update Progress Bar and Percentage
            const progress = data.progress;
            $(".progress-bar").css("width", `${progress}%`);
            $(".assignment-progress-percent").text(progress);
        } else {
            console.log("No document found with the given docID");
        }
    })
    .catch((error) => {
        console.error("Error fetching document:", error);
    });

// Dropdown Button Functionality
const dropdownButton = document.getElementById("dropdownButton");
const dropdownMenu = document.getElementById("dropdownMenu");
const selectedOption = document.getElementById("selectedOption");

dropdownButton.addEventListener("click", () => {
    dropdownMenu.classList.toggle("hidden");
});

dropdownMenu.addEventListener("click", (event) => {
    const target = event.target.closest(".priority-option");
    if (target) {
        const priority = target.getAttribute("data-priority");
        selectedOption.textContent = priority;
        dropdownMenu.classList.add("hidden"); // Close dropdown
    }
});

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
    if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.add("hidden");
    }
});

// Comment Navigation
function commentLinkClicked() {
    window.location.href = "./comments.html?docID=" + docID;
}

// Example Header Update (Remove if unnecessary)
var header = headerTemplate.content.cloneNode(true);
header.querySelector(".due-day").innerText = group.dueDay;
header.querySelector(".due-in-days-number").innerText = group.dueInDays;
