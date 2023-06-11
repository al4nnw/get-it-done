/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import IconUser from "../../assets/icons/iconUser.svg";
import IconSettings from "../../assets/icons/iconGear.svg";
import FloatingButton from "@components/FloatingButton/FloatingButton";
import FloatingLink from "@components/FloatingLink/FloatingLink";
import Title from "@components/Title/Title";
import Task from "./Task/Task";
import FormButton from "@components/FormButton/FormButton";
import FormInput from "@components/FormInput/FormInput";
import { useForm, SubmitHandler } from "react-hook-form";
import style from "./Home.module.scss";
import ITask from "../../types/ITask";
import { addNewTask } from "../../lib/redux/reducers/user/actions";
import generateNewId from "../../utils/generateNewId";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "@pages/Loading/Loading";
import useGetUser from "../../utils/useGetUser";

interface RootState {
  userReducer: any; // replace 'any' with the shape of your state in userReducer
}

export default function Home() {
  const getUser = useGetUser();
  const [firstLoad, setFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { currentUser, userTasks } = useSelector(
    (rootReducer: RootState) => rootReducer.userReducer
  );
  console.log(userTasks);

  useEffect(() => {
    getUser();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ITask>();

  const generateNewDate = () => {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  };

  const onSubmit: SubmitHandler<ITask> = async (data) => {
    const newTask = {
      ...data,
      taskId: `${data.taskName
        .trim()
        .slice(0, data.taskName.indexOf(" "))}${generateNewId()}`,
      isCompleted: false,
      taskCreationDate: generateNewDate(),
    };
    firstLoad && setIsLoading(true);
    await axios
      .post(
        "http://127.0.0.1:5001/sittus-dev/southamerica-east1/createNewTask",
        {
          userUID: currentUser.userUID,
          task: newTask,
        }
      )
      .then(() => {
        dispatch(addNewTask(newTask));
      })
      .catch((error) => console.log(error));
    firstLoad && setIsLoading(false);
    firstLoad && setFirstLoad(false);
    reset();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className={style.home}>
      <div className={style.navbarLinks}>
        <FloatingButton
          elementType="div"
          elementText={currentUser.userName}
          imageIcon={IconUser}
        />
        <FloatingLink
          elementLink="/home/settings"
          elementText="Settings"
          imageIcon={IconSettings}
        />
      </div>
      <section className={style.mainContent}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={style.mainContentForm}
        >
          <Title
            elementType="h1"
            elementText="Get It Done"
            elementClass="homeTitle"
          />
          <FormInput
            inputType="text"
            inputPlaceholder="Buy Bread"
            nameField="taskName"
            register={register}
          />
          {errors.taskName?.type === "required" && (
            <span className={style.errorWarning}>Task name is required</span>
          )}
          <FormButton buttonType="submit" buttonText="Create" />
        </form>
        <section className={style.tasks}>
          <Title
            elementClass="taskTitle"
            elementType="h2"
            elementText="Tasks"
          />
          <div className={style.taskList}>
            {userTasks.length > 0 ? (
              userTasks.map((task: ITask) => (
                <Task key={task.taskId} task={task} />
              ))
            ) : (
              <span className={style.taskWarning}>No tasks were found!</span>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
