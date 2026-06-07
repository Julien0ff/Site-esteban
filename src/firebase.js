import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQBOLk7AXSzYH8_St5cD3nEMTiFrRHLiw",
  authDomain: "site-esteban.firebaseapp.com",
  projectId: "site-esteban",
  storageBucket: "site-esteban.firebasestorage.app",
  messagingSenderId: "681918267715",
  appId: "1:681918267715:web:fea52ae4f28f8231ef2ff6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
