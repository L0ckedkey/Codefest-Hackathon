// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBzSL51zFvbPrCTsUSqXSt212nlMD0dtiE",
    authDomain: "chordify-529b2.firebaseapp.com",
    projectId: "chordify-529b2",
    storageBucket: "chordify-529b2.appspot.com",
    messagingSenderId: "412658569358",
    appId: "1:412658569358:web:62e6f9f14a5e7ed863b9df",
    measurementId: "G-5KFYFTZSRX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage()
const analytics = getAnalytics(app);

export { app, storage }