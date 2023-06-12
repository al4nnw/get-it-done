/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import IconHome from "../../assets/icons/iconHome.svg";
import IconLogout from "../../assets/icons/iconLogout.svg";
import FloatingLink from "@components/FloatingLink/FloatingLink";
import FloatingButton from "@components/FloatingButton/FloatingButton";
import Title from "@components/Title/Title";
import ConfigInput from "./ConfigInput/ConfigInput";
import FormButton from "@components/FormButton/FormButton";
import style from "./Settings.module.scss";
import { getAuth, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUserNull } from "../../lib/redux/reducers/user/actions";
import axios from "axios";
import Loading from "@pages/Loading/Loading";

interface RootState {
  userReducer: any; // replace 'any' with the shape of your state in userReducer
}

export default function Settings() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (rootReducer: RootState) => rootReducer.userReducer
  );
  const navigate = useNavigate();

  const onClickLogout = () => {
    const auth = getAuth();
    auth
      .signOut()
      .then(() => {
        dispatch(setCurrentUserNull());
        navigate("/signin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickDelete = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      axios
        .post("https://deleteuserdata-sh3wjct3pa-rj.a.run.app", {
          userUID: currentUser.userUID,
        })
        .then(() => {
          deleteUser(user).then(() => {
            dispatch(setCurrentUserNull());
            navigate("/signup");
          });
        })
        .catch((error) => console.log(error));
    }
  };

  if (!currentUser) {
    return <Loading />;
  }

  return (
    <main className={style.settings}>
      <div className={style.navbarLinks}>
        <FloatingLink
          elementText="Home"
          elementLink="/home"
          imageIcon={IconHome}
        />
        <FloatingButton
          elementType="button"
          elementText="Logout"
          imageIcon={IconLogout}
          onClickFunction={onClickLogout}
        />
      </div>
      <section className={style.form}>
        <Title
          elementClass="settingsTitle"
          elementType="h1"
          elementText="Settings"
        />
        <ConfigInput inputValue={currentUser.userName} canBeChanged={false} />
        <ConfigInput inputValue={currentUser.userEmail} canBeChanged={false} />
        <ConfigInput inputValue="Password" canBeChanged={false} />
        <FormButton
          buttonClass="deleteAccountButton"
          buttonType="button"
          buttonText="Delete account"
          onClickFunction={onClickDelete}
        />
      </section>
    </main>
  );
}
