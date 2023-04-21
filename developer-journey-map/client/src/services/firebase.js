import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, getAuth, signOut } from "firebase/auth";

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

const provider = new GoogleAuthProvider().setCustomParameters({ prompt: "select_account" });

const signInWithGoogle = async () => {
    try {
        const data = await signInWithPopup(auth, provider);
        console.log(data.user);

        return data.user;
    } catch (err) {
        console.error(err);
    }
};

const logout = async () => {
    await signOut(auth);
};

export { app, auth, provider, signInWithGoogle, logout };