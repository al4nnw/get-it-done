import axios from "axios";
import {
  setCurrentUser,
  setCurrentUserTasks,
} from "../lib/redux/reducers/user/actions";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";

export default function useGetUser() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  async function getUser() {
    dispatch(
      setCurrentUser({
        userName: user?.displayName,
        userEmail: user?.email,
        userUID: user?.uid,
        userGoal: "No goal",
      })
    );
    await axios
      .post(
        "http://127.0.0.1:5001/sittus-dev/southamerica-east1/getUserTasks",
        {
          userUID: user?.uid,
        }
      )
      .then((response) => dispatch(setCurrentUserTasks([...response.data])))
      .catch((error) => console.log(error));
  }
  return getUser;
}
