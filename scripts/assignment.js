let docID = new URL(window.location.href).searchParams.get("docID");
let assignmentsRef = db.collection("assignments")

function getAssignment() {
    assignmentsRef.doc(docID).get()
        .then(doc => {
            var assignment = doc.data()
            console.log(doc, assignment)

            $(".assignment-name").text(assignment.name)
            $(".assignment-description").text(assignment.description)
            $(".assignment-course").text(assignment.course)
            $(".assignment-estimated-time").text(estimatedTimeString(assignment.estimatedTimeInMinutes))

            var dueDate = new Date(assignment.dueDate)
            var dueInDays = daysFromToday(dueDate)
            $(".assignment-due-date").text(`${dayOfWeekFromToday(dueInDays)} ${dueDate.toLocaleDateString()} (in ${dueInDays} day${plural(dueInDays)})`)

            $(".assignment-progress-bar").css("width", assignment.progress + "%")
            $(".assignment-progress-percent").text(assignment.progress)
        })
}
getAssignment()