/* eslint-disable @typescript-eslint/no-explicit-any */
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface ISignForm {
  email: string;
  password: string;
}

const useUserSignin = () => {
  const [firebaseErrors, setFirebaseErrors] = useState<any>(null);
  const navigate = useNavigate();

  const userSignin = async (data: ISignForm) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredentials.user;
      if (user) {
        navigate("/home");
      }
    } catch (error: any) {
      console.log(error);
      setFirebaseErrors(error);
    }
  };

  return { userSignin, firebaseErrors };
};

export default useUserSignin;
