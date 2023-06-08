/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import { ValidationSchemaSignUp } from "@pages/Sign/SignUp/SignUp";
import { useState } from "react";
import axios from "axios";

const useUserSignup = () => {
  const createUserDocFunctionURL =
    "https://createuserdoc-sh3wjct3pa-rj.a.run.app";
  const [firebaseErrors, setFirebaseErrors] = useState<any>(null);
  const navigate = useNavigate();

  const userSignup = async (data: ValidationSchemaSignUp) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredentials.user;
      if (user && auth.currentUser && data.firstName) {
        await updateProfile(auth.currentUser, {
          ...user,
          displayName: data.firstName,
        });
        await axios
          .post(createUserDocFunctionURL, {
            userUid: user.uid,
            userEmail: user.email,
          })
          .then((response) => console.log(response));
        navigate("/home");
      }
    } catch (error: any) {
      console.log(error);
      setFirebaseErrors(error);
    }
  };

  return { userSignup, firebaseErrors };
};

export default useUserSignup;
