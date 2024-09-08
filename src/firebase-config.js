// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwNi0ZvK15nLgercAJVY0pEPLXNv4P9VA",
  authDomain: "chat-a23db.firebaseapp.com",
  projectId: "chat-a23db",
  storageBucket: "chat-a23db.appspot.com",
  messagingSenderId: "368110679438",
  appId: "1:368110679438:web:1aa9882a28cb6d3679a0df",
  measurementId: "G-YTFL5XWH1X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)