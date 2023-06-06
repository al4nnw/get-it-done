import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import IForm from "../types/IForm";
import axios from "axios";

const useUserSignup = () => {
  const navigate = useNavigate();

  const userSignup = async (data: IForm) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredentials.user;
      if (user) {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return userSignup;
};

export default useUserSignup;
