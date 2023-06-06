import IconHome from "../../assets/icons/iconHome.svg";
import IconLogout from "../../assets/icons/iconLogout.svg";
import FloatingLink from "@components/FloatingLink/FloatingLink";
import FloatingButton from "@components/FloatingButton/FloatingButton";
import Title from "@components/Title/Title";
import ConfigInput from "./ConfigInput/ConfigInput";
import FormButton from "@components/FormButton/FormButton";
import style from "./Settings.module.scss";
import { getAuth, onAuthStateChanged, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../lib/firebase";
import { useEffect, useState } from "react";
import IUser from "../../types/IUser";

export default function Settings() {
  const [user, setUser] = useState<IUser>();
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/signin");
      } else {
        setUser({
          userEmail: user?.email,
          userName: `${user?.email
            ?.slice(0, user?.email?.indexOf("@"))[0]
            .toUpperCase()}${user?.email?.slice(1, user?.email?.indexOf("@"))}`,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

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
    user && deleteUser(user).then(() => navigate("/signup"));
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
        <ConfigInput inputValue={user?.userName ?? "Unknown"} canBeChanged />
        <ConfigInput
          inputValue={user?.userEmail ?? "unknown@gmail.com"}
          canBeChanged={false}
        />
        <ConfigInput inputValue="Password" canBeChanged />
        <ConfigInput inputValue={user?.goal ?? "No goal"} canBeChanged />
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
