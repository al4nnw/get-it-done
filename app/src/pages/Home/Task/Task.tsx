import ITask from "../../../types/ITask";
import { MdDelete, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoIosCheckbox } from "react-icons/io";
import style from "./Task.module.scss";

interface TaskProps {
  task: ITask;
  deleteTask: (task: ITask) => void;
  completeTask: (task: ITask) => void;
  editTaskName: (id: string | undefined, name: string) => void;
}

export default function Task({
  task,
  deleteTask,
  completeTask,
  editTaskName,
}: TaskProps) {
  return (
    <article id="task" className={style.task}>
      <input
        type="text"
        readOnly
        defaultValue={task.taskName}
        onFocus={(e) => {
          e.currentTarget.readOnly = false;
          e.currentTarget.classList.add(`${style["taskEdit"]}`);
        }}
        onBlur={(e) => {
          e.currentTarget.readOnly = true;
          e.currentTarget.classList.remove(`${style["taskEdit"]}`);
          editTaskName(task.taskId, e.target.value);
        }}
      />
      <div className={style.taskInteractions}>
        <button onClick={() => completeTask(task)}>
          {task.completed ? (
            <IoIosCheckbox />
          ) : (
            <MdOutlineCheckBoxOutlineBlank />
          )}
        </button>
        <button
          onClick={() => {
            const taskElement = document.querySelector("#task");
            taskElement?.classList.add(`${style["removeTask"]}`);
            setTimeout(() => {
              deleteTask(task);
            }, 100);
          }}
        >
          <MdDelete />
        </button>
      </div>
    </article>
  );
}
