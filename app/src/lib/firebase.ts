import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6Oc9fq4F4-32Emiek64sYmY_Ei_vpJbc",
  authDomain: "get-it-done-dcd9d.firebaseapp.com",
  projectId: "get-it-done-dcd9d",
  storageBucket: "get-it-done-dcd9d.appspot.com",
  messagingSenderId: "888654200860",
  appId: "1:888654200860:web:6af11979509cbd4c0e9fd9",
  measurementId: "G-X5HL6EN33K",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
