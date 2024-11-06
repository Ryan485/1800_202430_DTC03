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

function log(data, json = false) {
    var time = new Date();
    console.log(data, time)
    var html = `<p>[${time.toLocaleString()} ${window.location.pathname}] ${json ? JSON.stringify(data) : data}</p>`
    $("#log").prepend(html)
    localStorage.setItem("log", html + localStorage.getItem("log"))
}

function clearLog() {
    $("#log").empty()
    localStorage.setItem("log", "")
    console.log("Log cleared")
}
