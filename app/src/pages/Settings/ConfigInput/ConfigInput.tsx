/* eslint-disable @typescript-eslint/no-non-null-assertion */
import generateNewId from "../../../utils/generateNewId";
import style from "./ConfigInput.module.scss";

interface ConfigInputProps {
  inputValue: string;
  canBeChanged: boolean;
  handleClick?: (element: HTMLElement) => void;
}

export default function ConfigInput({
  inputValue,
  canBeChanged,
  handleClick,
}: ConfigInputProps) {
  return (
    <article className={style.configInput}>
      <input
        id={`${inputValue.slice(
          0,
          inputValue.indexOf(" ") + 1
        )}${generateNewId()}`}
        type="text"
        value={inputValue}
        readOnly={true}
      />
      {canBeChanged && <button>Change</button>}
    </article>
  );
}
