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
import { auth } from "../../lib/firebase";
import { useEffect } from "react";
import { setCurrentUserNull } from "../../lib/redux/reducers/user/actions";

import { useDispatch, useSelector } from "react-redux";

export default function Settings() {
  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeClick = (element: HTMLElement) => {
    console.log(element);
  };

  const onClickLogout = () => {
    auth
      .signOut()
      .then(() => {
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
      deleteUser(user).then(() => {
        navigate("/signup");
      });
    }
  };

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
        <ConfigInput inputValue={currentUser.userName} canBeChanged />
        <ConfigInput inputValue={currentUser.userEmail} canBeChanged={false} />
        <ConfigInput inputValue="Password" canBeChanged />
        <ConfigInput inputValue={currentUser.userGoal} canBeChanged />
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
