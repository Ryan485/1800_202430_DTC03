// Get the docID from the URL
let docID = new URL(window.location.href).searchParams.get("docID");

// Reference to the Firestore collection
const assignmentsRef = db.collection("assignments");
const slider = document.getElementById('slider');
const progressBars = document.querySelectorAll('.progress-bar');
const percentageDisplays = document.querySelectorAll('.percentage');

// Initialize the progress bar on page load
initializeProgressBars();

// Fetch the document based on the docID
assignmentsRef.doc(docID).get()
    .then(doc => {
        if (doc.exists) {
            const assignment = doc.data();
            // Set the initial slider and progress values
            slider.value = assignment.progress || 0;
            updateProgressBars(assignment.progress || 0);
        } else {
            console.log("No document found with the given docID");
        }
    })
    .catch(error => {
        console.error("Error fetching document:", error);
    });

// Update Firestore and progress bar on slider input
slider.addEventListener('input', function () {
    const value = slider.value; // Get slider's value
    updateProgressBars(value); // Update all progress bars and percentages
    saveProgress(value); // Save progress to Firestore
});

// Function to initialize progress bars
function initializeProgressBars() {
    const initialValue = slider.value; // Get slider's initial value
    updateProgressBars(initialValue); // Update progress bars on load
}

// Function to update progress bars and percentages
function updateProgressBars(value) {
    progressBars.forEach(bar => {
        bar.style.width = `${value}%`; // Update the width of each progress bar
    });
    percentageDisplays.forEach(display => {
        display.innerHTML = `<span>${value}</span>% Complete`; // Update percentage text
    });
}

// Save the progress value to Firestore
function saveProgress(value) {
    assignmentsRef.doc(docID).update({
        progress: parseInt(value)
    }).then(() => {
        console.log("Progress updated successfully");
    }).catch(error => {
        console.error("Error updating progress:", error);
    });
}
