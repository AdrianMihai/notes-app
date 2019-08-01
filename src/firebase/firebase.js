import firebase from 'firebase/app';
import database from 'firebase/database';

let firebaseApp = firebase.initializeApp(
    {
        apiKey: "AIzaSyAA6RPZuPoUM8IPwM_e0_8LRmesUP5spAY",
        authDomain: "notes-app-2cf47.firebaseapp.com",
        databaseURL: "https://notes-app-2cf47.firebaseio.com",
        projectId: "notes-app-2cf47",
        storageBucket: "",
        messagingSenderId: "706374015248",
        appId: "1:706374015248:web:175d32cda862b09c"
    }
);

export default firebaseApp;