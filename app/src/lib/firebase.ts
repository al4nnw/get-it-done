import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDu-TPWrlLDCtINiuhh5cjkVnXviMYstog",
  authDomain: "sittus-dev.firebaseapp.com",
  projectId: "sittus-dev",
  storageBucket: "sittus-dev.appspot.com",
  messagingSenderId: "653542995253",
  appId: "1:653542995253:web:ea2f9834554f8e6b3e087c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
