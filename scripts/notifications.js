function displayNotifications(data) {

    $(".notifications-notified").text(notifications.notified)
    $(".notifications-course").text(notifications.course)
    $(".notifications-mainNotifications").text(notifications.mainNotifications)
    $(".notifications-estimatedTime").text(notifications.estimatedTime)

}

function populateNotificationCards() {

    const template = document.querySelector("#notificationsCardTemplate");

    // Clone the new row and insert it into the table
    const notifcationCard = template.content.cloneNode(true);


    document.getElementById("main").appendChild(notifcationCard);

}

function notificationClicked() {
    window.location.href = "./discussion.html"
}

populateNotificationCards();