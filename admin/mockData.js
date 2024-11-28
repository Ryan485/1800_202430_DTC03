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
    {
        course: "COMP 1116",
        name: "Presentation",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem error alias illo dolore, vitae dolorum molestias aliquam in. Cupiditate maiores ut explicabo animi totam vel illum maxime quia harum consequuntur. Architecto totam impedit voluptas hic obcaecati debitis quidem ducimus, vero, necessitatibus iure ipsa, quo temporibus dignissimos est tenetur animi voluptatum?",
        estimatedTimeInMinutes: 80,
        dueDate: daysAwayFromToday(3),
        new: false,
        progress: 0
    },
    {
        course: "COMP 1800",
        name: "Presentation",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis libero minus omnis explicabo sapiente praesentium consectetur, necessitatibus quia aspernatur voluptas? Facere, cupiditate in voluptates unde harum eos quod odit doloremque.",
        estimatedTimeInMinutes: 60,
        dueDate: daysAwayFromToday(3),
        new: false,
        progress: 0

    }

]


var notifications = [

    {
        course: "COMP 1510: Lab 4 - Discussion Post",
        mainNotifications: "@chrisp23 Mentioned You",
        estimatedTime: "",
        date: daysAwayFromToday(-2),
        assignment: "jWFxSxZ2ei7KtVFAjSTC",
        to: "all",
        from: "mockData",
        new: false,
    },
    {
        course: "COMP 1510",
        mainNotifications: "Lab 5 - Unit Testing",
        estimatedTime: "~2 hr",
        date: daysAwayFromToday(-2),
        assignment: "xm7OBTLFjudSNbgctNqj",
        to: "all",
        from: "mockData",
        new: true,
    },

    {
        course: "COMP 1712: Lab 5 - Discussion Post",
        mainNotifications: "@doug31 Mentioned You",
        estimatedTime: "",
        date: daysAwayFromToday(-2),
        assignment: "tgCSBVVvJXQhR9L0fsoy",
        to: "all",
        from: "mockData",
        new: false,
    },
    {
        course: "COMP 1537",
        mainNotifications: "Lab 5 - JavaScript Basics",
        estimatedTime: "~1 hr 20 mins",
        date: daysAwayFromToday(-2),
        assignment: "EAz4sEuEiDBZXXdg1iOW",
        to: "all",
        from: "mockData",
        new: true,
    },
    {
        course: "COMP 1116: Presentation - Discussion Post",
        mainNotifications: "@melissawo Mentioned You",
        estimatedTime: "",
        date: daysAwayFromToday(-2),
        assignment: "1PS3fSBDTcCUlEXtuvYF",
        to: "all",
        from: "mockData",
        new: false,
    },

    {
        course: "Comp 1510: Data Structures - Discussion Post",
        mainNotifications: "@johng Mentioned You",
        estimatedTime: "",
        date: daysAwayFromToday(-2),
        assignment: "pPlPKbY8L8jACQXwNbax",
        to: "all",
        from: "mockData",
        new: false,
    },
    {
        course: "COMP 1113: Quiz 5 - Floating Point",
        mainNotifications: "@jerryjoe Mentioned You",
        estimatedTime: "",
        date: daysAwayFromToday(-2),
        assignment: "zjJ1OlWcMt72Y3fomfpw",
        to: "all",
        from: "mockData",
        new: false,
    },
    {
        course: "Comp 1800",
        mainNotifications: "Week 3 Quiz - Wireframes",
        estimatedTime: "~2 hr 45 mins",
        date: daysAwayFromToday(-2),
        assignment: "tvqCtmNGyM7cdkUG6rph",
        to: "all",
        from: "mockData",
        new: true,
    },

]
