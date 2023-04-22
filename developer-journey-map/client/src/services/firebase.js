import { initializeApp } from "firebase/app";
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
    getAuth,
    signOut
} from "firebase/auth";

console.log(process.env.FIREBASE_API_KEY);

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const signInWithGoogle = async () => {
    const googleAuthProvider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, googleAuthProvider);
        console.log(result);

        return result.user;
    } catch (err) {
        console.error(err);
    }
};

const signInWithGithub = async () => {
    const githubAuthProvider = new GithubAuthProvider();

    try {
        const result = await signInWithPopup(auth, githubAuthProvider);
        console.log(result);

        return result.user;
    } catch (err) {
        console.error(err);
    }
};

const logout = async () => {
    await signOut(auth);
};

export { auth, signInWithGoogle, signInWithGithub, logout };