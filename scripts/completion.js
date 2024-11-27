// Get the docID from the URL
let docID = new URL(window.location.href).searchParams.get("docID");

// Reference to the Firestore collection
const assignmentsRef = db.collection("assignments");
const slider = document.getElementById('slider');
const progressBars = document.querySelectorAll('.progress-bar'); // NodeList for all progress bars
const percentageDisplays = document.querySelectorAll('.percentage'); // NodeList for all percentage elements

// Initialize the progress bar on page load
initializeProgressBars();

// Fetch the document based on the docID
assignmentsRef.doc(docID).get()
    .then(doc => {
        if (doc.exists) {
            // Extract and display assignment data
            $(".assignment-course").text(doc.data().course);
            $(".assignment-estimated-time").text(estimatedTimeString(doc.data().estimatedTimeInMinutes));
            $(".assignment-name").text(doc.data().name);

            const dueDate = new Date(doc.data().dueDate);
            const dueInDays = daysFromToday(dueDate);

            $(".assignment-due-date").text(`${dayOfWeekFromToday(dueInDays)} ${dueDate.toLocaleDateString()} (in ${dueInDays} day${plural(dueInDays)})`);

            // Set the initial progress
            const progress = doc.data().progress;
            updateProgressBars(progress);
        } else {
            console.log("No document found with the given docID");
        }
    })
    .catch(error => {
        console.error("Error fetching document:", error);
    });

// Update progress bar and percentage elements on slider input
slider.addEventListener('input', function () {
    const value = slider.value; // Get slider's value
    updateProgressBars(value); // Update all progress bars and percentages
});

// Function to initialize progress bars and percentage elements
function initializeProgressBars() {
    const initialValue = slider.value; // Get slider's initial value
    updateProgressBars(initialValue); // Update progress bars and percentages on load
}

// Function to update all progress bars and percentage displays
function updateProgressBars(value) {
    progressBars.forEach(bar => {
        bar.style.width = `${value}%`; // Update the width of each progress bar
    });
    percentageDisplays.forEach(display => {
        display.innerHTML = `<span>${value}</span>% Complete`; // Update the percentage text
    });
}

// Navigation function for comment link
function commentLinkClicked() {
    window.location.href = "./comments.html?docID=" + docID;
}
