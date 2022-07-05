// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { onAuthStateChanged, getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA8DTIg1fAEWvDi8iNwFZuHZnVQd8hXLwo",
    authDomain: "mercury-eu.firebaseapp.com",
    projectId: "mercury-eu",
    storageBucket: "mercury-eu.appspot.com",
    messagingSenderId: "1071131662907",
    appId: "1:1071131662907:web:5fa78a959011bd6a5a9a1e"
};


// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const currentUser = () => {
    const auth = getAuth(firebaseApp)
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe()
            resolve(user)
        }, reject)
    })
}