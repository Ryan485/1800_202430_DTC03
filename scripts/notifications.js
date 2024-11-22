function displayNotifications(data) {

    $(".notifications-notified").text(notifications.notified)
    $(".notifications-course").text(notifications.course)
    $(".notifications-mainNotifications").text(notifications.mainNotifications)
    $(".notifications-estimatedTime").text(notifications.estimatedTime)

}

function populateNotificationCards() {


}

function notificationClicked() {
    window.location.href = "./notification.html"
}

populateNotificationCards();

const template = document.querySelector("#notificationsCardTemplate");


const notificationsRef = db.collection("notifications");

function getNotifications() {

    notificationsRef.orderBy("date").get()
        .then(notifications => {
            notifications.docs.forEach(doc => {
                var notification = doc.data()
                console.log("Doc", doc)
                console.log("Doc.data", notification)


                // Clone the new row and insert it into the table
                const notifcationCard = template.content.cloneNode(true);
                console.log(notifcationCard)
                notifcationCard.querySelector('.notifications-course').innerText = notification.course
                if (notification.new) {
                    notifcationCard.querySelector('.notifications-course').innerText += " NEW"
                }
                notifcationCard.querySelector('.notifications-estimatedTime').innerText = notification.estimatedTime
                notifcationCard.querySelector('.notifications-mainNotifications').innerText = notification.mainNotifications
                notifcationCard.querySelector('.notifications-link').href = "/assignment.html?docID=" + notification.assignment

                document.getElementById("main").appendChild(notifcationCard);

            })
        })
}
getNotifications()