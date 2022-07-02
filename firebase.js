import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDa3I3g_mkD5oiaPsBwsEa0g39ZF-Mc-K4",
  authDomain: "signal-clone-f45fb.firebaseapp.com",
  projectId: "signal-clone-f45fb",
  storageBucket: "signal-clone-f45fb.appspot.com",
  messagingSenderId: "1090282750227",
  appId: "1:1090282750227:web:ebb664d199fbfe11e65ae6",
};

let app;

if (getApps().length === 0) app = initializeApp(firebaseConfig);
else app = getApp();

const db = getFirestore(app);
const auth = getAuth();

export { auth, db };
