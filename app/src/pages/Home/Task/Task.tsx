import IconDelete from "../../../assets/icons/iconDelete.svg";
import style from "./Task.module.scss";

interface TaskProps {
  inputValue: string;
}

export default function Task({ inputValue }: TaskProps) {
  return (
    <article className={style.task}>
      <input type="text" readOnly value={inputValue} />
      <div className={style.taskInteractions}>
        <input className={style.checkbox} type="checkbox" />
        <button>
          <img src={IconDelete} alt="" />
        </button>
      </div>
    </article>
  );
}
