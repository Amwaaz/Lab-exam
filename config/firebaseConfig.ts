// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKgT8vzCMfL2aW_apf3HkPFvzJdd2uePg",
  authDomain: "g3-lab-exam.firebaseapp.com",
  projectId: "g3-lab-exam",
  storageBucket: "g3-lab-exam.firebasestorage.app",
  messagingSenderId: "52102215445",
  appId: "1:52102215445:web:af57b406571c4bf3895b1c",
  measurementId: "G-NQ9Q1KVSRW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
