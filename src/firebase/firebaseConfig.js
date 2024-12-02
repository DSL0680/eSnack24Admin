// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getMessaging } from "firebase/messaging";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyChFf6OwYtCwl_vX0Wzw5sSXISqdRfBc1A",
    authDomain: "esnack24-e3428.firebaseapp.com",
    projectId: "esnack24-e3428",
    storageBucket: "esnack24-e3428.firebasestorage.app",
    messagingSenderId: "271796527189",
    appId: "1:271796527189:web:fac8921ec0fd74e79574dc",
    measurementId: "G-T42R2J0262"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);