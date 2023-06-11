/* eslint-disable @typescript-eslint/no-explicit-any */
import userActionTypes from "../lib/redux/reducers/user/action-types.ts";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface ISignForm {
  email: string;
  password: string;
}

const useUserSignin = () => {
  const dispatch = useDispatch();
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

  return { userSignin, firebaseErrors };
};

export default useUserSignin;
