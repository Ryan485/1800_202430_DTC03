const assignmentID = new URL(window.location.href).searchParams.get("docID");
const commentsRef = db.collection("comments")
const usersRef = db.collection("users")
const commentTemplate = document.getElementById("commentTemplate")
const commentList = document.getElementById("comments")

function commentStatusMessage(message) {
    $(".comment-status").text(message)
}

async function displayComment(id, comment) {
    var newComment = commentTemplate.content.cloneNode(true)

    await usersRef.doc(comment.user).get().then(user => {
        newComment.querySelector(".comment-user").innerText = user.data().name
    })

    newComment.id = id
    newComment.querySelector(".comment-content").innerText = comment.content
    newComment.querySelector(".comment-timestamp").innerText = comment.timestamp.toDate()

    commentList.prepend(newComment)
}

function getComments() {
    commentsRef.orderBy("timestamp")
        .where("assignment", "==", assignmentID)
        .get()
        .then(comments => {
            commentList.innerHTML = ""
            comments.docs.forEach(doc => {
                displayComment(doc.id, doc.data())
            })
        })
}
getComments()

function addComment() {
    let commentText = $("#comment-textarea").val()

    if (!loggedInUser) {
        commentStatusMessage("Cannot add comment: No user signed in.")
        return
    }
    if (!assignmentID) {
        commentStatusMessage("Cannot add comment: No assignment selected.")
        return
    }
    if (!commentText) {
        commentStatusMessage("Cannot add comment: Comment text field is empty.")
        return
    }

    commentStatusMessage("Submitting...")

    let comment = {
        user: loggedInUser.uid,
        assignment: assignmentID,
        content: commentText,
        replyTo: "",
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }
    log("New comment:", JSON.stringify(comment))

    commentsRef.add(comment)
        .then(result => {
            commentStatusMessage("Comment added successfully.")
            log(`Comment added successfully with ID ${result.id}`, JSON.stringify(result))
            getComments()
        })
        .catch(error => {
            commentStatusMessage("Error adding comment: " + error);
            log("Error adding comment", JSON.stringify(error))
        });
}
