import IconUser from "../../assets/icons/iconUser.svg";
import IconGoal from "../../assets/icons/iconGoal.svg";
import IconSettings from "../../assets/icons/iconGear.svg";
import FloatingButton from "@components/FloatingButton/FloatingButton";
import FloatingLink from "@components/FloatingLink/FloatingLink";
import Title from "@components/Title/Title";
import Task from "./Task/Task";
import FormButton from "@components/FormButton/FormButton";
import FormInput from "@components/FormInput/FormInput";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

interface IForm {
  taskName: string;
}

export default function Home() {
  const { register, handleSubmit } = useForm<IForm>();
  const [userUid, setUserUid] = useState<string | undefined>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const uid = user?.uid;
      uid ? setUserUid(uid) : navigate("/signup");
      console.log(uid);
    });
  }, [navigate]);

  onAuthStateChanged;
  return (
    <main>
      <div>
        <FloatingButton
          elementType="div"
          elementText="John Doe"
          imageIcon={IconUser}
        />
        <FloatingButton
          elementType="div"
          elementText="5 tasks / day"
          imageIcon={IconGoal}
        />
        <FloatingLink
          elementLink="/home/settings"
          elementText="Settings"
          imageIcon={IconSettings}
        />
      </div>
      <section>
        <form>
          <Title elementType="h1" elementText="Get It Done" />
          <FormInput inputType="text" inputPlaceholder="Buy Bread" />
          <FormButton buttonType="submit" buttonText="Create" />
        </form>
        <section>
          <Title elementType="h2" elementText="Tasks" />
          <div>
            <Task inputValue="Task 1" />
            <Task inputValue="Task 2" />
            <Task inputValue="Task 3" />
            <Task inputValue="Task 4" />
            <Task inputValue="Task 5" />
          </div>
        </section>
      </section>
    </main>
  );
}
