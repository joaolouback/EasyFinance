// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClzv0XuudL07jRLLGEiZz_YmN6yJurao8",
  authDomain: "projeto-mobile-88c6f.firebaseapp.com",
  projectId: "projeto-mobile-88c6f",
  storageBucket: "projeto-mobile-88c6f.firebasestorage.app",
  messagingSenderId: "305610214768",
  appId: "1:305610214768:web:e9643d3988413336b013b5",
  measurementId: "G-5652K8NBCD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);