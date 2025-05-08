// src/assets/firebase/config.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARZ06WXXbVOUuarrJP29bUdhmFlPUAU5k",
  authDomain: "onoprojectguyroei.firebaseapp.com",
  projectId: "onoprojectguyroei",
  storageBucket: "onoprojectguyroei.appspot.com", // תוקן כאן
  messagingSenderId: "683599965371",
  appId: "1:683599965371:web:fcfa2de073c03c14d08d9e"
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export default app;
