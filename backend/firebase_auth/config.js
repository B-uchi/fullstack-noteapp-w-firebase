// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app"
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDwWyM2AkIBpxK-sNhnUfSq10SY3btTrc",
  authDomain: "mern-note-server.firebaseapp.com",
  projectId: "mern-note-server",
  storageBucket: "mern-note-server.appspot.com",
  messagingSenderId: "175054511013",
  appId: "1:175054511013:web:5a5d794435429d4de4264c",
  measurementId: "G-6QC6HR13TC",
};

// Initialize Firebase
const app =  initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
