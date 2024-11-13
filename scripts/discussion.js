const assignmentsRef = db.collection("assignments")
const discussionTemplate = document.getElementById("discussionTemplate")
const discussionList = document.getElementById("discussions")

function getDiscussions() {
    assignmentsRef.orderBy("dueDate").get()
        .then(assignments => {
            assignments.docs.forEach(doc => {
                var assignment = doc.data()
                console.log(doc)
                console.log(assignment)

                var discussion = discussionTemplate.content.cloneNode(true)

                discussion.querySelector('.assignment-course').innerText = assignment.course
                discussion.querySelector('.assignment-estimated-time').innerText = estimatedTimeString(assignment.estimatedTimeInMinutes)
                discussion.querySelector('.assignment-name').innerText = assignment.name
                discussion.querySelector('.discussion-thread-link').href = `/comments.html?docID=${doc.id}`
                discussion.querySelector('.discussion-thread-link').id = doc.id

                discussionList.appendChild(discussion)
            })
        })
}

getDiscussions()

