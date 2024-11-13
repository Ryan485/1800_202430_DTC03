// Get the docID from the URL
let docID = new URL(window.location.href).searchParams.get("docID");

// Reference to the Firestore collection
const assignmentsRef = db.collection("assignments");

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

<<<<<<< HEAD
var header = headerTemplate.content.cloneNode(true)

header.querySelector('.due-day').innerText = group.dueDay
header.querySelector('.due-in-days-number').innerText = group.dueInDays
var header = headerTemplate.content.cloneNode(true)
>>>>>>> 11c785e730d809fbe702625ea01dc4c37c882654
