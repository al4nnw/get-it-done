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
          userUid: user.uid,
          userEmail: user?.email,
          userName: user?.displayName,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleChangeClick = (element: HTMLElement) => {
    element?.removeAttribute("readOnly");
    element?.focus;
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
        <ConfigInput
          inputValue={user?.userName ?? "Unknown"}
          handleClick={handleChangeClick}
          canBeChanged
        />
        <ConfigInput
          inputValue={user?.userEmail ?? "unknown@gmail.com"}
          canBeChanged={false}
        />
        <ConfigInput
          handleClick={handleChangeClick}
          inputValue="Password"
          canBeChanged
        />
        <ConfigInput
          handleClick={handleChangeClick}
          inputValue={user?.goal ?? "No goal"}
          canBeChanged
        />
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
