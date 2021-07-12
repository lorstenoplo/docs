import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCYQpptsPQXF7cCvoVjI-uoPOkDivSnCus",
  authDomain: "docsu-docs.firebaseapp.com",
  projectId: "docsu-docs",
  storageBucket: "docsu-docs.appspot.com",
  messagingSenderId: "768522418363",
  appId: "1:768522418363:web:087eaa67460d06e4c1119e",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
