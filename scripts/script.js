function sayHello() {

}
//sayHello();

function loadSkeleton() {
    console.log($('#navbar').load('/components/navbar.html'))
    console.log($('#footer').load('/components/footer.html'))
}
loadSkeleton()
