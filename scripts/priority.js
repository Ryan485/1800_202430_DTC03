// Get the docID from the URL
let docID = new URL(window.location.href).searchParams.get("docID");

// Reference to the Firestore collection
const assignmentsRef = db.collection("assignments");
const dropdownButton = document.getElementById('dropdownButton');
const dropdownMenu = document.getElementById('dropdownMenu');
const selectedOption = document.getElementById('selectedOption');

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


// Toggle dropdown menu visibility
dropdownButton.addEventListener('click', () => {
    dropdownMenu.classList.toggle('hidden');
});

// Handle option selection
dropdownMenu.addEventListener('click', (event) => {
    const target = event.target.closest('.priority-option');
    if (target) {
        const priority = target.getAttribute('data-priority');
        selectedOption.textContent = priority; // Update button text
        dropdownMenu.classList.add('hidden'); // Hide dropdown after selection
    }
});

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
    if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.add('hidden');
    }
});



function commentLinkClicked() {
    window.location.href = "./comments.html?docID=" + docID
}

var header = headerTemplate.content.cloneNode(true)

header.querySelector('.due-day').innerText = group.dueDay
header.querySelector('.due-in-days-number').innerText = group.dueInDays
var header = headerTemplate.content.cloneNode(true)
