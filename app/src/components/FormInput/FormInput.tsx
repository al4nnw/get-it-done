import style from "./FormInput.module.scss";
interface FormInputProps {
  inputPlaceholder: string;
  inputType: "text" | "email" | "password";
}

export default function FormInput({
  inputPlaceholder,
  inputType,
}: FormInputProps) {
  return (
    <input
      className={style.formInput}
      type={inputType}
      placeholder={inputPlaceholder}
    />
  );
}
