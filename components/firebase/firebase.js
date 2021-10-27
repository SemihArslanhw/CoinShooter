import firebase from "firebase";

const firebaseConfig = {
    Your Firebase Key
  };

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

  const db = app.firestore();
  const auth = app.auth();


  export { db, auth,app };
