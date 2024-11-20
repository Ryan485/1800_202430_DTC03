const assignmentID = new URL(window.location.href).searchParams.get("docID");
const commentsRef = db.collection("comments")
const usersRef = db.collection("users")
const commentTemplate = document.getElementById("commentTemplate")
const commentList = document.getElementById("comments")
var commentData = []

function commentStatusMessage(message, id) {
    $("#" + id).text(message)
}

async function displayComment(id, comment) {
    var newComment = commentTemplate.content.cloneNode(true)

    await usersRef.doc(comment.user).get().then(user => {
        newComment.querySelector(".comment-user").innerText = user.data().name
    })

    newComment.id = id
    newComment.querySelector(".comment-content").innerText = comment.content
    newComment.querySelector(".comment-timestamp").innerText = comment.timestamp.toDate()
    newComment.querySelector(".comment-reply").onclick = function () { reply(id) }
    newComment.querySelector(".comment-reply-form").id = "comment-reply-form-" + id
    newComment.querySelector(".comment-replies").id = "comment-replies-" + id
    console.log(newComment.querySelector(".comment-replies").id)

    if (comment.replyTo) {
        console.log("Reply", "comment-replies-" + comment.replyTo, id, comment)
        document.getElementById("comment-replies-" + comment.replyTo).prepend(newComment)
    } else {
        console.log("Top level comment", id, comment)
        commentList.prepend(newComment)
    }
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

function addComment(replyTo="") {
    const statusElementId = function (id) {
        console.log("replyTo:", id)
        if (id) {
            return "comment-status-" + id
        } else {
            return "comment-status"
        }
    }(replyTo)

    const commentTextId = function (id) {
        if (id) {
            return "comment-textarea-" + id
        } else {
            return "comment-textarea"
        }
    }(replyTo)

    const commentText = $("#" + commentTextId).val()

    if (!loggedInUser) {
        commentStatusMessage("Cannot add comment: No user signed in.", statusElementId)
        return
    }
    if (!assignmentID) {
        commentStatusMessage("Cannot add comment: No assignment selected.", statusElementId)
        return
    }
    if (!commentText) {
        commentStatusMessage("Cannot add comment: Comment text field is empty.", statusElementId)
        return
    }

    commentStatusMessage("Submitting...", statusElementId)

    const comment = {
        user: loggedInUser.uid,
        assignment: assignmentID,
        content: commentText,
        replyTo: replyTo,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }
    log("New comment:", comment)

    commentsRef.add(comment)
        .then(result => {
            commentStatusMessage("Comment added successfully.", statusElementId)
            log(`Comment added successfully with ID ${result.id}`, result)
            $("#" + commentTextId).val("")
            getComments()
        })
        .catch(error => {
            commentStatusMessage("Error adding comment: " + error, statusElementId);
            log("Error adding comment", error)
        });
}

function reply(id) {
    console.log("Displaying reply form for", id)
    const replyForm = commentForm.cloneNode(true)
    replyForm.querySelector("#comment-textarea").id += "-" + id
    replyForm.querySelector("#comment-status").id += "-" + id
    replyForm.querySelector(".comment-submit-button").onclick = function () { addComment(id) }
    $("#comment-reply-form-" + id).html(replyForm)
}