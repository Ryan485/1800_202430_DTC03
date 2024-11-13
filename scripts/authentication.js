// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            var user = authResult.user;
            if (authResult.additionalUserInfo.isNewUser) {
                db.collection("users").doc(user.uid).set({
                    name: user.displayName,
                    email: user.email,
                }).then(function () {
                    console.log("New user added to firestore");
                    window.location.assign(document.referrer);
                }).catch(function (error) {
                    console.error("Error adding new user: " + error);
                });
            } else {
                return true;
            }
            return false;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: document.referrer,
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};

console.log(uiConfig);
ui.start('#firebaseui-auth-container', uiConfig);

var loggedInUser

firebase.auth().onAuthStateChanged(user => {
    console.log("Logged in user:", user)
    loggedInUser = user

    if (user) {
        $("#login-button").hide()
        $("#login-username").text(user.displayName)
        $(".login-username").text(user.displayName)
        $("#login-message").show()
        $("#logout-button").show()

        $(".show-if-logged-in").show()
        $(".hide-if-logged-in").hide()
    } else {
        $("#login-button").show()
        $("#login-username").text("")
        $(".login-username").text("")
        $("#login-message").hide()
        $("#logout-button").hide()

        $(".show-if-logged-in").hide()
        $(".hide-if-logged-in").show()
    }
})

function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
        console.error(error)
    })
}
