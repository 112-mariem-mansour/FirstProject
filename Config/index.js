// Import the functions you need from the SDKs you need
import app from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAe95FinoQgq9gYPWze6LPagGVr3V-Pzas",
  authDomain: "auth-1a33a.firebaseapp.com",
  databaseURL: "https://auth-1a33a-default-rtdb.firebaseio.com",
  projectId: "auth-1a33a",
  storageBucket: "auth-1a33a.appspot.com",
  messagingSenderId: "275536494034",
  appId: "1:275536494034:web:7a72218a01e2aa9350dc0b",
  measurementId: "G-ZXX4DDNBXS"
};

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export default firebase ;