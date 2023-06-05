import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "@pages/Landing/Landing";
import SignIn from "@pages/Sign/SignIn/SignIn";
import SignUp from "@pages/Sign/SignUp/SignUp";
import Home from "@pages/Home/Home";
import Error from "@pages/Error/Error";
import Settings from "@pages/Settings/Task";
/* import store from "./lib/redux";
import { Provider } from "react-redux"; */

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <Provider store={store}>
  <Router>
    <Routes>
      <Route path="/">
        <Route index element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home">
          <Route index element={<Home />} />
          <Route path="/home/settings" element={<Settings />} />
        </Route>
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  </Router>
  // </Provider>
);
