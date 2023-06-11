/* eslint-disable @typescript-eslint/no-non-null-assertion */

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
      <input type="text" value={inputValue} readOnly={true} />
      {canBeChanged && <button>Change</button>}
    </article>
  );
}
