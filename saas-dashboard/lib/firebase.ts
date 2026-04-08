// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaUhE6wH6Z1jw4O0scLLecopZxyBsE0VA",
  authDomain: "saas-dashboard-6d65b.firebaseapp.com",
  projectId: "saas-dashboard-6d65b",
  storageBucket: "saas-dashboard-6d65b.firebasestorage.app",
  messagingSenderId: "110685261679",
  appId: "1:110685261679:web:80b424081852e67f33629a",
  measurementId: "G-XE1XR71YRC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);