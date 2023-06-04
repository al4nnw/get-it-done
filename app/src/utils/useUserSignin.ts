import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import { ISignForm } from "../types/IForm";

const useUserSignin = () => {
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
    } catch (error) {
      return false;
    }
  };

  return userSignin;
};

export default useUserSignin;
