
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNkxbnkGslOG8EOzfoizxNFE65dEPkFzI",
  authDomain: "groviya.firebaseapp.com",
  projectId: "groviya",
  storageBucket: "groviya.firebasestorage.app",
  messagingSenderId: "997250693080",
  appId: "1:997250693080:web:8c6009c903ee2a365264ad",
  measurementId: "G-Z36E9K09QX"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();