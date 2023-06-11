import ITask from "../../../types/ITask";
import { MdDelete, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoIosCheckbox } from "react-icons/io";
import style from "./Task.module.scss";
import { useDispatch } from "react-redux";
import {
  updateTaskCompleted,
  updateTaskName,
  deleteTask,
} from "../../../lib/redux/reducers/user/actions";

interface TaskProps {
  task: ITask;
}

export default function Task({ task }: TaskProps) {
  console.log(task);
  const dispatch = useDispatch();
  return (
    <article id={task.taskId} className={style.task}>
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
        onBlur={(e) => {
          if (e.currentTarget.value != "") {
            e.currentTarget.readOnly = true;
            e.currentTarget.classList.remove(`${style["taskEdit"]}`);
            dispatch(
              updateTaskName({ taskId: task.taskId, taskName: e.target.value })
            );
          } else {
            e.currentTarget.value = task.taskName;
            e.currentTarget.readOnly = true;
            e.currentTarget.classList.remove(`${style["taskEdit"]}`);
          }
        }}
      />
      <div className={style.taskInteractions}>
        <button
          onClick={() => {
            const taskElement = document.querySelector(`#${task.taskId}`);
            taskElement?.classList.toggle(`${style["taskCompleted"]}`);
            dispatch(updateTaskCompleted(task));
          }}
        >
          {task.isCompleted ? (
            <IoIosCheckbox />
          ) : (
            <MdOutlineCheckBoxOutlineBlank />
          )}
        </button>
        <button
          onClick={() => {
            const taskElement = document.querySelector(`#${task.taskId}`);
            taskElement?.classList.add(`${style["removeTask"]}`);
            setTimeout(() => {
              dispatch(deleteTask(task));
            }, 100);
          }}
        >
          <MdDelete />
        </button>
      </div>
    </article>
  );
}
