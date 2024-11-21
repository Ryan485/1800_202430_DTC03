// Get the docID from the URL
let docID = new URL(window.location.href).searchParams.get("docID");

// Reference to the Firestore collection
const assignmentsRef = db.collection("assignments");
const slider = document.getElementById('slider');
const progressBar = document.getElementById('progress-bar');
const percentageDisplay = document.getElementById('percentage');



// Initialize the progress bar on page load
initializeProgressBar();

// Fetch the document based on the docID
assignmentsRef.doc(docID).get()
    .then(doc => {
        console.log(doc)
        if (doc.exists) {
            // Extract the course information from the document
            $(".assignment-course").text(doc.data().course)
            $(".assignment-estimated-time").text(estimatedTimeString(doc.data().estimatedTimeInMinutes))
            $(".assignment-name").text(doc.data().name)

            var dueDate = new Date(doc.data().dueDate)
            var dueInDays = daysFromToday(dueDate)
            console.log(dueDate, dueInDays)

            $(".assignment-due-date").text(`${dayOfWeekFromToday(dueInDays)} ${dueDate.toLocaleDateString()} (in ${dueInDays} day${plural(dueInDays)})`)
            $(".assignment-progress-bar").css("width", doc.data().progress + "%")
            $(".assignment-progress-percent").text(doc.data().progress)
        } else {
            console.log("No document found with the given docID");
        }
    })
    .catch(error => {
        console.error("Error fetching document:", error);
    });


slider.addEventListener('input', function () {
    const value = slider.value; // Get slider's value
    progressBar.style.width = `${value}%`; // Adjust the width of the progress bar
    percentageDisplay.textContent = value; // Update percentage text
});


// Function to initialize progress bar and percentage
function initializeProgressBar() {
    const initialValue = slider.value; // Get slider's initial value
    progressBar.style.width = `${initialValue}%`; // Set progress bar width
    percentageDisplay.textContent = initialValue; // Set initial percentage text
}


function commentLinkClicked() {
    window.location.href = "./comments.html?docID=" + docID
}

var header = headerTemplate.content.cloneNode(true)

header.querySelector('.due-day').innerText = group.dueDay
header.querySelector('.due-in-days-number').innerText = group.dueInDays
var header = headerTemplate.content.cloneNode(true)



