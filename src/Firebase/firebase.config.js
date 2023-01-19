// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: "AIzaSyDngtYQkyY3SAsnoNMmMdcfTqstkntcY_Y",
    // authDomain: "argon-app-f3026.firebaseapp.com",
    // projectId: "argon-app-f3026",
    // storageBucket: "argon-app-f3026.appspot.com",
    // messagingSenderId: "339819060556",
    // appId: "1:339819060556:web:3332d245a469e33ac2c3e9"

    // apiKey: "AIzaSyD22e-M8WbUsanypvGQ1YSO6ZiU917i868",
    // authDomain: "argon-1d04c.firebaseapp.com",
    // projectId: "argon-1d04c",
    // storageBucket: "argon-1d04c.appspot.com",
    // messagingSenderId: "566194160028",
    // appId: "1:566194160028:web:44554ce7b4ef5481a60859"

    // Main DataBase

    apiKey: "AIzaSyDrzd_SK_uq7nSjISd9VFkARU7OsctwKPQ",
    authDomain: "locality-tradesmen.firebaseapp.com",
    databaseURL: "https://locality-tradesmen-default-rtdb.firebaseio.com",
    projectId: "locality-tradesmen",
    storageBucket: "locality-tradesmen.appspot.com",
    messagingSenderId: "843068978464",
    appId: "1:843068978464:web:e853b17d34875c801f5345",
    measurementId: "G-S81PHZXMK6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore(app);

export { db, auth };