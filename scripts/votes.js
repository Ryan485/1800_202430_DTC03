function getVotes() {
    votesRef
        .where("assignment", "==", assignmentID)
        .get()
        .then(votes => {
            votes.docs.forEach(doc => {
                const voteData = doc.data()
                const scoreDelta = voteData.isUpvote ? 1 : -1
                $("#comment-score-" + voteData.comment).text(parseInt($("#comment-score-" + voteData.comment).text()) + scoreDelta)
                if (loggedInUser && voteData.user == loggedInUser.uid) {
                    $(`#comment-${voteData.isUpvote ? "up" : "down"}vote-${voteData.comment}`).addClass(voteData.isUpvote ? UPVOTE_COLOR : DOWNVOTE_COLOR)
                }
            })
        })
}

function submitVote(newVote, commentID, newComment) {
    const upvoteButtonId = "#comment-upvote-" + commentID
    const downvoteButtonId = "#comment-downvote-" + commentID

    votesRef.add(newVote)
        .then(() => {
            log("Submitted " + (newVote.isUpvote ? "up" : "down") + "vote for " + commentID + (newComment ? " (new comment)" : " (existing comment)"), newVote)
            if (!newComment) {
                $(upvoteButtonId).removeClass("text-gray-500")
                $(downvoteButtonId).removeClass("text-gray-500")

                if (newVote.isUpvote) {
                    $(upvoteButtonId).addClass(UPVOTE_COLOR)
                    $("#comment-score-" + commentID).text(parseInt($("#comment-score-" + commentID).text()) + 1)
                } else {
                    $(downvoteButtonId).addClass(DOWNVOTE_COLOR)
                    $("#comment-score-" + commentID).text(parseInt($("#comment-score-" + commentID).text()) - 1)
                }
            }
        })
        .catch(error => {
            alert("Error submitting vote: " + error);
            log("Error submitting vote", error)
        })
}

async function vote(isUpvote, commentID, newComment = false) {
    if (!loggedInUser) {
        console.warn("Cannot submit vote: No user signed in")
        return
    }
    if (!assignmentID) {
        console.warn("Cannot submit: No comment selected.")
        return
    }

    const upvoteButtonId = "#comment-upvote-" + commentID
    const downvoteButtonId = "#comment-downvote-" + commentID

    $(isUpvote ? upvoteButtonId : downvoteButtonId).addClass("text-gray-500")

    const newVote = {
        user: loggedInUser.uid,
        comment: commentID,
        assignment: assignmentID,
        isUpvote: isUpvote, // true for upvote, false for downvote
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }

    const existingVote = await votesRef
        .where("comment", "==", commentID)
        .where("user", "==", loggedInUser.uid)
        .get()

    console.log(existingVote)

    if (existingVote.docs[0]) {
        const existingVoteDirection = existingVote.docs[0].data().isUpvote

        await votesRef.doc(existingVote.docs[0].id).delete()
            .then(() => {
                log("Deleted existing vote", existingVote)

                $(upvoteButtonId).removeClass(UPVOTE_COLOR)
                $(downvoteButtonId).removeClass(DOWNVOTE_COLOR)

                if (existingVoteDirection == isUpvote) {
                    $(upvoteButtonId).removeClass("text-gray-500")
                    $(downvoteButtonId).removeClass("text-gray-500")

                    if (isUpvote) {
                        $("#comment-score-" + commentID).text(parseInt($("#comment-score-" + commentID).text()) - 1)
                    } else {
                        $("#comment-score-" + commentID).text(parseInt($("#comment-score-" + commentID).text()) + 1)
                    }
                } else {
                    if (isUpvote) {
                        $("#comment-score-" + commentID).text(parseInt($("#comment-score-" + commentID).text()) + 1)
                    } else {
                        $("#comment-score-" + commentID).text(parseInt($("#comment-score-" + commentID).text()) - 1)
                    }
                    submitVote(newVote, commentID, newComment)
                }
            })
            .catch(error => {
                alert("Error deleting vote: " + error)
                log("Error deleting vote", error)
            })
    } else {
        submitVote(newVote, commentID, newComment)
    }
}
