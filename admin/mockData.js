function daysAwayFromToday(days) {
    return new Date().setDate(new Date().getDate() + days)
}

var assignments = [
    {
        course: "COMP 1800",
        name: "Week 3 Quiz - Wireframes",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis libero minus omnis explicabo sapiente praesentium consectetur, necessitatibus quia aspernatur voluptas? Facere, cupiditate in voluptates unde harum eos quod odit doloremque.",
        estimatedTimeInMinutes: 30,
        dueDate: daysAwayFromToday(1),
        new: false,
        progress: 50
    },
    {
        course: "COMP 1510",
        name: "Lab 4 - Debugging",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis libero minus omnis explicabo sapiente praesentium consectetur, necessitatibus quia aspernatur voluptas? Facere, cupiditate in voluptates unde harum eos quod odit doloremque.",
        estimatedTimeInMinutes: 60,
        dueDate: daysAwayFromToday(1),
        new: false,
        progress: 0
    },
    {
        course: "COMP 1537",
        name: "Lab 3 - Tailwind CSS",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis libero minus omnis explicabo sapiente praesentium consectetur, necessitatibus quia aspernatur voluptas? Facere, cupiditate in voluptates unde harum eos quod odit doloremque.",
        estimatedTimeInMinutes: 80,
        dueDate: daysAwayFromToday(1),
        new: false,
        progress: 0
    },

    {
        course: "COMP 1510",
        name: "Lab 5 - Unit Tests",
        description: "You will employ flowcharts and computational thinking and your growing programming acumen to implement, document, and test solutions to three classic computational problems. For this lab, you must write your own code, but I would like you to work together to create the ultimate suite of unit tests for each function.",
        estimatedTimeInMinutes: 130,
        dueDate: daysAwayFromToday(2),
        new: true,
        progress: 0
    },
    {
        course: "COMP 1537",
        name: "Lab 5 - JavaScript Basics",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis libero minus omnis explicabo sapiente praesentium consectetur, necessitatibus quia aspernatur voluptas? Facere, cupiditate in voluptates unde harum eos quod odit doloremque.",
        estimatedTimeInMinutes: 70,
        dueDate: daysAwayFromToday(2),
        new: false,
        progress: 0
    },

    {
        course: "COMP 1712",
        name: "Lab 5 - Requirements",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis libero minus omnis explicabo sapiente praesentium consectetur, necessitatibus quia aspernatur voluptas? Facere, cupiditate in voluptates unde harum eos quod odit doloremque.",
        estimatedTimeInMinutes: 95,
        dueDate: daysAwayFromToday(3),
        new: false,
        progress: 0
    },
    {
        course: "COMP 1113",
        name: "Quiz 5 - Floating Point",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis libero minus omnis explicabo sapiente praesentium consectetur, necessitatibus quia aspernatur voluptas? Facere, cupiditate in voluptates unde harum eos quod odit doloremque.",
        estimatedTimeInMinutes: 90,
        dueDate: daysAwayFromToday(3),
        new: false,
        progress: 0
    },
    {
        course: "COMP 1510",
        name: "Lab 6 - Data Structures",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis libero minus omnis explicabo sapiente praesentium consectetur, necessitatibus quia aspernatur voluptas? Facere, cupiditate in voluptates unde harum eos quod odit doloremque.",
        estimatedTimeInMinutes: 165,
        dueDate: daysAwayFromToday(3),
        new: false,
        progress: 0
    },
]