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
            let course = doc.data().course;
            console.log(course);  // Logs the course name (e.g., "COMP 1116")
        } else {
            console.log("No document found with the given docID");
        }
    })
    .catch(error => {
        console.error("Error fetching document:", error);
    });
