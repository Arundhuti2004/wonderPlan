// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "import.meta.env.VITE_FIREBASE_CONFIG_API_KEY",
  authDomain: "ai-tripplaner-64681.firebaseapp.com",
  projectId: "ai-tripplaner-64681",
  storageBucket: "ai-tripplaner-64681.firebasestorage.app",
  messagingSenderId: "831727845480",
  appId: "1:831727845480:web:a33eea587557f812c87bdd",
  measurementId: "G-J0F90MDBSB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
//const analytics = getAnalytics(app);