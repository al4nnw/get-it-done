import IconDelete from "../../../assets/icons/iconDelete.svg";

interface TaskProps {
  inputValue: string;
}

export default function Task({ inputValue }: TaskProps) {
  return (
    <article>
      <input type="text" readOnly value={inputValue} />
      <div>
        <input type="checkbox" />
        <button>
          <img src={IconDelete} alt="" />
        </button>
      </div>
    </article>
  );
}
