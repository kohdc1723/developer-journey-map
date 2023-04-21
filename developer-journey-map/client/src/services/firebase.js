import { initializeApp } from "firebase/app";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, getAuth, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCkYskBSadsh_fE7m3pAsoNPiG7vSG9_yg",
    authDomain: "developer-journey-map-auth.firebaseapp.com",
    projectId: "developer-journey-map-auth",
    storageBucket: "developer-journey-map-auth.appspot.com",
    messagingSenderId: "680932717154",
    appId: "1:680932717154:web:dae9d6e116239b580c173b",
    measurementId: "G-JD4PKVQ2RP"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider().setCustomParameters({ prompt: "select_account" });
const githubAuthProvider = new GithubAuthProvider();

const signInWithGoogle = async () => {
    try {
        const data = await signInWithPopup(auth, googleAuthProvider);
        console.log(data.user);

        return data.user;
    } catch (err) {
        console.error(err);
    }
};

const signInWithGithub = async () => {
    try {
        const data = await signInWithPopup(auth, githubAuthProvider);
        console.log(data.user);

        return data.user;
    } catch (err) {
        console.error(err);
    }
};

const logout = async () => {
    await signOut(auth);
};

export { app, auth, googleAuthProvider, githubAuthProvider, signInWithGoogle, signInWithGithub, logout };