function sayHello() {

}
//sayHello();

function loadSkeleton() {
    console.log($('#navbar').load('./components/navbar.html'))
    console.log($('#footer').load('./components/footer.html'))
}
loadSkeleton()

function restoreLog() {
    $("#log").text(localStorage.getItem("log"))
}

function log(text, json = null) {
    var time = new Date();
    console.log(text, json, time)

    if (json) {
        text += ` ${JSON.stringify(json)}`
    }

    var logEntry = `[${time.toLocaleString()} ${window.location.pathname}] ${text}`
    $("#log").text(logEntry + "\n" + $("#log").text())
    localStorage.setItem("log", logEntry + "\n" + localStorage.getItem("log"))
}

function clearLog() {
    $("#log").empty()
    localStorage.setItem("log", "")
    console.log("Log cleared")
}

function daysFromToday(date) {
    return Math.floor((date - new Date()) / (1000 * 60 * 60 * 24))
}

function dayOfWeekFromToday(days) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return daysOfWeek[Math.abs(new Date().getDay() + days) % 7]
}

function plural(number) {
    return number == 1 ? "" : "s"
}

function estimatedTimeString(minutes) {
    if (minutes < 60) {
        return `${minutes} min${plural(minutes)}`
    } else {
        var hours = Math.floor(minutes / 60)
        var remainingMinutes = minutes % 60
        if (remainingMinutes) {
            return `${hours} hr${plural(hours)} ${remainingMinutes} min${plural(remainingMinutes)}`
        } else {
            return `${hours} hr${plural(hours)}`
        }
    }
}
