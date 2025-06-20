// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from "firebase/auth";
import { getFunctions } from "firebase/functions";



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATzXe3G1U1y9kpIQOKxO4K0avwOSUZ7Iw",
    authDomain: "filmyfy-99879.firebaseapp.com",
    projectId: "filmyfy-99879",
    appId: "1:534473055247:web:20dff70a986f20c3e6977a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const functions = getFunctions();

/**
 * Signs the user in with a Google popup.
 * @returns A promise that resolves with the user's credentials.
 */
export function signInWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider());
}

/**
 * Signs the user out.
 * @returns A promise that resolves when the user is signed out.
 */
export function signOut() {
    return auth.signOut();
}

/**
 * Trigger a callback when user auth state changes.
 * @returns A function to unsubscribe callback.
 */
export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
}



