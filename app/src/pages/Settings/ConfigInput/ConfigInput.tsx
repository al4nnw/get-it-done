import style from "./ConfigInput.module.scss";

interface ConfigInputProps {
  inputValue: string;
  canBeChanged: boolean;
  handleClick?: () => void;
}

export default function ConfigInput({
  inputValue,
  canBeChanged,
  handleClick,
}: ConfigInputProps) {
  return (
    <article className={style.configInput}>
      <input
        id={inputValue.trim().slice(0, inputValue.indexOf(" "))}
        type="text"
        value={inputValue}
        readOnly={true}
      />
      {canBeChanged && (
        <button onClick={() => handleClick && handleClick()}>Change</button>
      )}
    </article>
  );
}
