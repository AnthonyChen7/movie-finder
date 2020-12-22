// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/database";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0KYNmjGS9DC3DFrGxybs6Mss89im21PA",
  authDomain: "movie-finder-2c0b1.firebaseapp.com",
  projectId: "movie-finder-2c0b1",
  storageBucket: "movie-finder-2c0b1.appspot.com",
  messagingSenderId: "345019433883",
  appId: "1:345019433883:web:807550039413a047fc173e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref();
export const watchLaterRef = databaseRef.child("watch-later");
export default firebase;

// https://levelup.gitconnected.com/todo-app-using-firebase-react-typescript-ea0a34bd417d