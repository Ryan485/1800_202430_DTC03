//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyBh8eghNtST_yZmmGK05JhYqOzSZJO32co",
    authDomain: "dtc-03-trello-assignment.firebaseapp.com",
    projectId: "dtc-03-trello-assignment",
    storageBucket: "dtc-03-trello-assignment.appspot.com",
    messagingSenderId: "527031161104",
    appId: "1:527031161104:web:c90a1a736785f06f685595"
};


//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

