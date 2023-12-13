// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "code-chronicle.firebaseapp.com",
  projectId: "code-chronicle",
  storageBucket: "code-chronicle.appspot.com",
  messagingSenderId: "764222654518",
  appId: "1:764222654518:web:3ed081c2645c1c73163097",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
