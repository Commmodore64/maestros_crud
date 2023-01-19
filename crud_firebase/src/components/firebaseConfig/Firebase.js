import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsLzuhXQ_9z5g9BrysEq3rQQDUkbTTCRo",
  authDomain: "maestros-utch.firebaseapp.com",
  projectId: "maestros-utch",
  storageBucket: "maestros-utch.appspot.com",
  messagingSenderId: "125898224435",
  appId: "1:125898224435:web:ac30ceb16872aa8053c446"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);