// src/assets/firebase/config.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARZ06WXXbVOUuarrJP29bUdhmFlPUAU5k",
  authDomain: "onoprojectguyroei.firebaseapp.com",
  projectId: "onoprojectguyroei",
  storageBucket: "onoprojectguyroei.firebasestorage.app",
  messagingSenderId: "683599965371",
  appId: "1:683599965371:web:fcfa2de073c03c14d08d9e"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and export
export const firestore = getFirestore(app);

// (Optional) export the app instance if needed elsewhere
export default app;
