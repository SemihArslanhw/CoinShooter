import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBIyrhmTWiUSO7r4yrYPS8enPbmgf5GBV8",
    authDomain: "coinshooter-cbf6b.firebaseapp.com",
    projectId: "coinshooter-cbf6b",
    storageBucket: "coinshooter-cbf6b.appspot.com",
    messagingSenderId: "28227233382",
    appId: "1:28227233382:web:a6c62d1070ddfbf4e5afa7",
    measurementId: "G-X541DL48D4"
  };

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

  const db = app.firestore();
  const auth = app.auth();


  export { db, auth,app };