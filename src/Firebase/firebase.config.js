// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDngtYQkyY3SAsnoNMmMdcfTqstkntcY_Y",
    authDomain: "argon-app-f3026.firebaseapp.com",
    projectId: "argon-app-f3026",
    storageBucket: "argon-app-f3026.appspot.com",
    messagingSenderId: "339819060556",
    appId: "1:339819060556:web:3332d245a469e33ac2c3e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export default getFirestore(app);