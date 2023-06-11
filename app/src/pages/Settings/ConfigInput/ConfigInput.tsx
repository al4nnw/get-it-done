/* eslint-disable @typescript-eslint/no-non-null-assertion */
import style from "./ConfigInput.module.scss";

interface ConfigInputProps {
  inputValue: string;
  canBeChanged: boolean;
  setModalOpen?: (value: boolean) => void;
}

export default function ConfigInput({
  inputValue,
  canBeChanged,
  setModalOpen,
}: ConfigInputProps) {
  return (
    <article className={style.configInput}>
      <input type="text" value={inputValue} readOnly={true} />
      {canBeChanged && (
        <button onClick={() => setModalOpen && setModalOpen(true)}>
          Change
        </button>
      )}
    </article>
  );
}
