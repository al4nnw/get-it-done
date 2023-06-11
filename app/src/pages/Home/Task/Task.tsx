/* eslint-disable @typescript-eslint/no-explicit-any */
import ITask from "../../../types/ITask";
import { MdDelete, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoIosCheckbox } from "react-icons/io";
import style from "./Task.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  updateTaskCompleted,
  updateTaskName,
  deleteTask,
} from "../../../lib/redux/reducers/user/actions";
import axios from "axios";
import classNames from "classnames";

interface TaskProps {
  task: ITask;
}

interface RootState {
  userReducer: any; // replace 'any' with the shape of your state in userReducer
}

export default function Task({ task }: TaskProps) {
  const { currentUser } = useSelector(
    (rootReducer: RootState) => rootReducer.userReducer
  );
  const dispatch = useDispatch();
  return (
    <article
      id={task.taskId}
      className={classNames({
        [style.task]: true,
        [style.taskCompleted]: task.isCompleted,
      })}
    >
      <input
        type="text"
        readOnly
        defaultValue={task.taskName}
        onFocus={(e) => {
          if (!task.isCompleted) {
            e.currentTarget.readOnly = false;
            e.currentTarget.classList.add(`${style["taskEdit"]}`);
          }
        }}
        onBlur={async (e) => {
          if (e.currentTarget.value != "") {
            e.currentTarget.readOnly = true;
            e.currentTarget.classList.remove(`${style["taskEdit"]}`);

            await axios
              .post(
                "http://127.0.0.1:5001/sittus-dev/southamerica-east1/updateTaskName",
                {
                  userUID: currentUser.userUID,
                  task: { ...task, taskName: e.target.value },
                }
              )
              .then((response) => {
                console.log(response);
                dispatch(
                  updateTaskName({
                    taskId: task.taskId,
                    taskName: e.target.value,
                  })
                );
              });
          } else {
            e.currentTarget.value = task.taskName;
            e.currentTarget.readOnly = true;
            e.currentTarget.classList.remove(`${style["taskEdit"]}`);
          }
        }}
      />
      <div className={style.taskInteractions}>
        <button
          onClick={async () => {
            await axios
              .post(
                "http://127.0.0.1:5001/sittus-dev/southamerica-east1/updateTaskStatus",
                {
                  userUID: currentUser.userUID,
                  task,
                }
              )
              .then(() => {
                dispatch(updateTaskCompleted(task));
              })
              .catch((error) => console.log(error));
          }}
        >
          {task.isCompleted ? (
            <IoIosCheckbox />
          ) : (
            <MdOutlineCheckBoxOutlineBlank />
          )}
        </button>
        <button
          onClick={async () => {
            await axios
              .post(
                "http://127.0.0.1:5001/sittus-dev/southamerica-east1/deleteTask",
                {
                  userUID: currentUser.userUID,
                  task,
                }
              )
              .then(() => {
                const taskElement = document.querySelector(`#${task.taskId}`);
                taskElement?.classList.add(`${style["removeTask"]}`);
                setTimeout(() => {
                  dispatch(deleteTask(task));
                }, 100);
              });
          }}
        >
          <MdDelete />
        </button>
      </div>
    </article>
  );
}
