import { UseFormRegister } from "react-hook-form";

import style from "./FormInput.module.scss";
import ITask from "../../types/ITask";

interface FormInputProps {
  inputPlaceholder: string;
  inputType: "text" | "email" | "password";
  register?: UseFormRegister<ITask>;
  nameField?: keyof ITask;
}

export default function FormInput({
  inputPlaceholder,
  inputType,
  register,
  nameField,
}: FormInputProps) {
  return (
    <>
      {nameField && register ? (
        <input
          className={style.formInput}
          type={inputType}
          placeholder={inputPlaceholder}
          {...register(nameField, { required: true })}
        />
      ) : (
        <input
          className={style.formInput}
          type={inputType}
          placeholder={inputPlaceholder}
        />
      )}
    </>
  );
}
