import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

interface ISignForm {
  email: string;
  password: string;
}

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
      console.log(error);
      return false;
    }
  };

  return userSignin;
};

export default useUserSignin;
