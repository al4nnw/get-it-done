interface ConfigInputProps {
  inputValue: string;
  canBeChanged: boolean;
}

export default function ConfigInput({
  inputValue,
  canBeChanged,
}: ConfigInputProps) {
  return (
    <article>
      <input type="text" value={inputValue} readOnly />
      {canBeChanged && <button>Change</button>}
    </article>
  );
}
