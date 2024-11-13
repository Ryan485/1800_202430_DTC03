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

var header = headerTemplate.content.cloneNode(true)