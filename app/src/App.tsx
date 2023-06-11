import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Landing from "@pages/Landing/Landing";
import SignIn from "@pages/Sign/SignIn/SignIn";
import SignUp from "@pages/Sign/SignUp/SignUp";
import Home from "@pages/Home/Home";
import Error from "@pages/Error/Error";
import Settings from "@pages/Settings/Settings";
import { useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { setCurrentUser } from "./lib/redux/reducers/user/actions";
import { useEffect } from "react";
import Loading from "@pages/Loading/Loading";

const App = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const [currentUser, loading] = useAuthState(auth);

  useEffect(() => {
    dispatch(
      setCurrentUser({
        userName: currentUser?.displayName,
        userEmail: currentUser?.email,
        userUID: currentUser?.uid,
        userGoal: "No goal",
      })
    );
  }, [currentUser, dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home">
            <Route
              index
              element={
                currentUser ? <Home /> : <Navigate to="/signin" replace />
              }
            />
            <Route
              path="/home/settings"
              element={
                currentUser ? <Settings /> : <Navigate to="/signin" replace />
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
