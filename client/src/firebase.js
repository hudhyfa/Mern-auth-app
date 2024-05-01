// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-app-728c1.firebaseapp.com",
  projectId: "mern-auth-app-728c1",
  storageBucket: "mern-auth-app-728c1.appspot.com",
  messagingSenderId: "549641567250",
  appId: "1:549641567250:web:9993563b2078391deeeccb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);