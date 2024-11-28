const courseColors = ["red", "orange", "yellow", "green", "cyan", "blue", "purple"]

var courses = []

function courseColor(course) {
    if (!courses.includes(course)) {
        courses.push(course)
    }
    const color = courseColors[courses.indexOf(course) % courseColors.length]
    return `bg-${color}-400`
}

function displayAssignments(data) {
    console.log("Display Assignments")
    var headerTemplate = document.getElementById("assignmentHeaderTemplate");
    var assignmentTemplate = document.getElementById("assignmentTemplate");
    var assignmentList = document.getElementById("assignments")
    data.forEach(group => {
        console.log(group)
        var header = headerTemplate.content.cloneNode(true)

        header.querySelector('.due-day').innerText = group.dueDay
        header.querySelector('.due-in-days-number').innerText = group.dueInDays
        if (group.dueInDays < 0) {
            header.querySelector('.due-date-header').innerHTML = `<p class="font-bold text-red-500">OVERDUE!! (due ${Math.abs(group.dueInDays)} day${plural(group.dueInDays)} ago!)</p>`
        } else if (group.dueInDays == 0) {
            header.querySelector('.due-date-header').innerHTML = `<p class="font-bold">Due Today!</p>`
        } else if (group.dueInDays == 1) {
            header.querySelector('.due-in-days').classList.add("font-bold")
        } else {
            header.querySelector('.due-in-days-plural').innerText = "s"
        }

        assignmentList.appendChild(header)

        group.items.forEach(item => {
            console.log(item)
            var assignment = assignmentTemplate.content.cloneNode(true)

            assignment.querySelector('.assignment-course').innerText = item.course
            assignment.querySelector('.assignment-course').classList.add(courseColor(item.course))

            assignment.querySelector('.assignment-estimated-time').innerText = item.estimatedTime
            assignment.querySelector('.assignment-name').innerText = item.name
            assignment.querySelector('.assignment-progress').style["width"] = item.progress + "%"
            assignment.querySelector('.assignment-link').href = `/assignment.html?docID=${item.id}`
            assignment.querySelector('.assignment-link').id = item.id
            if (item.new) {
                assignment.querySelector('.assignment-new').innerText = "NEW"
                assignment.querySelector('.assignment-name').classList.add("font-bold")
                assignment.querySelector('.bg-assignment').classList.add("bg-assignment-new")
            }

            assignmentList.appendChild(assignment)
        })
    })
}

let assignmentsRef = db.collection("assignments")

async function getAssignments() {
    var assignmentsList = []

    await assignmentsRef.orderBy("dueDate").get()
        .then(assignments => {
            assignments.docs.forEach(assignment => {
                console.log(assignment)
                var assignmentData = assignment.data()
                assignmentData.estimatedTime = estimatedTimeString(assignmentData.estimatedTimeInMinutes)
                assignmentData.id = assignment.id
                var dueInDays = daysFromToday(assignmentData.dueDate)
                console.log(assignment.data().dueDate, dueInDays)
                var dueDateExists = false
                if (assignmentsList.length) {
                    assignmentsList.forEach(group => {
                        if (group.dueInDays == dueInDays) {
                            group.items.push(assignmentData)
                            dueDateExists = true
                        }
                    });
                }
                if (!dueDateExists) {
                    assignmentsList.push({
                        dueInDays: dueInDays,
                        dueDay: dayOfWeekFromToday(dueInDays),
                        items: [assignmentData]
                    })
                }
                console.log(assignmentsList)
            })
        })
    console.log("Final Assignments List:", assignmentsList)
    displayAssignments(assignmentsList)
}

getAssignments()


/*
const assignmentsExample = [
    {
        dueInDays: 1,
        dueDay: "Monday",
        items: [
            {
                course: "COMP 1800",
                name: "Week 3 Quiz - Wireframes",
                estimatedTime: "30 mins",
                new: false,
                progress: 50
            },
            {
                course: "COMP 1510",
                name: "Lab 4 - Debugging",
                estimatedTime: "1 hr",
                new: false,
                progress: 0
            },
            {
                course: "COMP 1537",
                name: "Lab 3 - Tailwind CSS",
                estimatedTime: "1 hr 20 mins",
                new: false,
                progress: 0
            },
        ]
    },
    {
        dueInDays: 2,
        dueDay: "Tuesday",
        items: [
            {
                course: "COMP 1510",
                name: "Lab 5 - Unit Tests",
                estimatedTime: "1 hr",
                new: true,
                progress: 0
            },
            {
                course: "COMP 1537",
                name: "Lab 5 - JavaScript Basics",
                estimatedTime: "1 hr 20 mins",
                new: false,
                progress: 0
            },
        ]
    },
    {
        dueInDays: 3,
        dueDay: "Wednesday",
        items: [
            {
                course: "COMP 1712",
                name: "Lab 5 - Requirements",
                estimatedTime: "1 hr",
                new: false,
                progress: 0
            },
            {
                course: "COMP 1113",
                name: "Quiz 5 - Floating Point",
                estimatedTime: "1 hr 20 mins",
                new: false,
                progress: 0
            },
            {
                course: "COMP 1510",
                name: "Lab 6 - Data Structures",
                estimatedTime: "2 hr 45 mins",
                new: false,
                progress: 0
            },
        ]
    },
]
*/
