import style from "./ConfigInput.module.scss";

interface ConfigInputProps {
  inputValue: string;
  canBeChanged: boolean;
}

export default function ConfigInput({
  inputValue,
  canBeChanged,
}: ConfigInputProps) {
  return (
    <article className={style.configInput}>
      <input type="text" value={inputValue} readOnly />
      {canBeChanged && <button>Change</button>}
    </article>
  );
}
