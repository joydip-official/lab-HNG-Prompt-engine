import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBslOB4I91N7MzJRZ6S6yXjUuRRaadxkZg",
  authDomain: "prompt-engine-hng-ai-lab.firebaseapp.com",
  projectId: "prompt-engine-hng-ai-lab",
  storageBucket: "prompt-engine-hng-ai-lab.firebasestorage.app",
  messagingSenderId: "525522741192",
  appId: "1:525522741192:web:f4cabdc60c075b739082fd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
