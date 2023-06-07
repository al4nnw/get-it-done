import IconUser from "../../assets/icons/iconUser.svg";
import IconGoal from "../../assets/icons/iconGoal.svg";
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
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";
import IUser from "../../types/IUser";

export default function Home() {
  const [user, setUser] = useState<IUser>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ITask>();
  const [taskList, setTaskList] = useState<ITask[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/signin");
      } else {
        console.log(user);
        setUser({
          userName: user?.displayName,
          userEmail: user?.email,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const onSubmit: SubmitHandler<ITask> = (data) => {
    createNewTask(data);
    reset();
  };

  function generateRandomId() {
    return Math.random().toString(36);
  }

  function createNewTask({ taskName }: { taskName: string }) {
    setTaskList((prev) => [
      ...prev,
      { taskName, taskId: generateRandomId(), completed: false },
    ]);
  }

  function deleteTask(task: ITask) {
    setTaskList((prev) => prev.filter((t) => t.taskId !== task.taskId));
  }

  function completeTask(task: ITask) {
    setTaskList((prev) =>
      prev.map((t) =>
        t.taskId === task.taskId ? { ...t, completed: !t.completed } : t
      )
    );
  }

  function editTaskName(id: string | undefined, name: string) {
    setTaskList((prev) =>
      prev.map((t) =>
        t.taskId === id
          ? {
              ...t,
              taskName: name,
            }
          : t
      )
    );
  }

  return (
    <main className={style.home}>
      <div className={style.navbarLinks}>
        <FloatingButton
          elementType="div"
          elementText={user?.userName ?? "Unknown"}
          imageIcon={IconUser}
        />
        <FloatingButton
          elementType="div"
          elementText={user?.goal ?? "No goal"}
          imageIcon={IconGoal}
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
            {taskList.length > 0 ? (
              taskList.map((task) => (
                <Task
                  editTaskName={editTaskName}
                  key={task.taskId}
                  task={task}
                  deleteTask={deleteTask}
                  completeTask={completeTask}
                />
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
