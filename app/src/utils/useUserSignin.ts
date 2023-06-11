/* eslint-disable @typescript-eslint/no-explicit-any */
import userActionTypes from "../lib/redux/reducers/user/action-types.ts";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUserTasks } from "../lib/redux/reducers/user/actions.ts";
import axios from "axios";

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
        await axios
          .post(
            "http://127.0.0.1:5001/sittus-dev/southamerica-east1/getUserTasks",
            {
              userUID: user.uid,
            }
          )
          .then((response) => {
            console.log(response);
            dispatch(setCurrentUserTasks([...response.data]));
          });

        navigate("/home");
      }
    } catch (error: any) {
      setFirebaseErrors(error);
    }
  };

  return { userSignin, firebaseErrors };
};

export default useUserSignin;
