// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyb17D3XCxr_jcF9Ff_M-qALl8H63ImTw",
  authDomain: "todolist-a20f3.firebaseapp.com",
  projectId: "todolist-a20f3",
  storageBucket: "todolist-a20f3.firebasestorage.app",
  messagingSenderId: "553710413012",
  appId: "1:553710413012:web:e5bd6851b13c35ef564741",
  measurementId: "G-SP5G7Q5TCM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);