// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";  // Import Firestore methods

const firebaseConfig = {
    apiKey: "AIzaSyBoalPV-k4H2WeaYzEk9k4jlb6xXycqjPo",
    authDomain: "yoga-posture-detection-cb2e6.firebaseapp.com",
    projectId: "yoga-posture-detection-cb2e6",
    storageBucket: "yoga-posture-detection-cb2e6.appspot.com",
    messagingSenderId: "6092338878",
    appId: "1:6092338878:web:ec4d2ad7df40021caf90ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Authentication service
const db = getFirestore(app); // Firestore service

export { auth, db, getDoc, setDoc, doc }; // Export the necessary Firestore methods
