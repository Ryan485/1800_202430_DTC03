function sayHello() {

}
//sayHello();

function loadSkeleton() {
    console.log($('#navbar').load('./components/navbar.html'))
    console.log($('#footer').load('./components/footer.html'))
}
loadSkeleton()

function restoreLog() {
    $("#log").html(localStorage.getItem("log"))
}

function log(text, json = null) {
    var time = new Date();
    console.log(text, json, time)

    if (json) {
        text += ` <code>${JSON.stringify(json)}</code>`
    }

    var html = `<p>[${time.toLocaleString()} ${window.location.pathname}] ${text}</p>`
    $("#log").prepend(html)
    localStorage.setItem("log", html + localStorage.getItem("log"))
}

function clearLog() {
    $("#log").empty()
    localStorage.setItem("log", "")
    console.log("Log cleared")
}
