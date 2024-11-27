let docID = new URL(window.location.href).searchParams.get("docID");
const assignmentsRef = db.collection("assignments");

assignmentsRef.doc(docID).onSnapshot(doc => {
    if (doc.exists) {
        const assignment = doc.data();
        console.log("Assignment updated:", assignment);


        $(".assignment-name").text(assignment.name);
        $(".assignment-description").text(assignment.description);
        $(".assignment-course").text(assignment.course);
        $(".assignment-estimated-time").text(estimatedTimeString(assignment.estimatedTimeInMinutes));

        const dueDate = new Date(assignment.dueDate);
        const dueInDays = daysFromToday(dueDate);
        $(".assignment-due-date").text(`${dayOfWeekFromToday(dueInDays)} ${dueDate.toLocaleDateString()} (in ${dueInDays} day${plural(dueInDays)})`);


        $(".assignment-progress-bar").css("width", assignment.progress + "%");
        $(".assignment-progress-percent").text(assignment.progress);

        $(".assignment-comments-link").attr("href", "comments.html?docID=" + doc.id);
        $(".assignment-priority").attr("href", "/priority.html?docID=" + docID);
        $(".assignment-completion").attr("href", "/completion.html?docID=" + docID);
        $(".discussion-thread-link").attr("href", "/comments.html?docID=" + docID);
    } else {
        console.log("No document found with the given docID");
    }
});
