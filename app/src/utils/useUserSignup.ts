/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import { ValidationSchemaSignUp } from "@pages/Sign/SignUp/SignUp";
import { useState } from "react";
import { useDispatch } from "react-redux";
import userActionTypes from "../lib/redux/reducers/user/action-types.ts";

const useUserSignup = () => {
  const dispatch = useDispatch();
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
        console.log("SETTING USER");
        dispatch({
          type: userActionTypes.LOGIN,
          payload: {
            userName: user.displayName,
            userEmail: user.email,
            userUID: user.uid,
            userGoal: "No goal",
          },
        });
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
