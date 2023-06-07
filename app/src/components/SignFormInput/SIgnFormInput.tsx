import { UseFormRegister } from "react-hook-form";
import style from "./SignFormInput.module.scss";
import { ValidationSchemaSignIn } from "@pages/Sign/SignIn/SignIn";
import { ValidationSchemaSignUp } from "@pages/Sign/SignUp/SignUp";

interface SignFormInputProps {
  inputType: "email" | "password" | "text";
  inputPlaceholder: string;
  register: UseFormRegister<ValidationSchemaSignIn | ValidationSchemaSignUp>;
  fieldName: keyof ValidationSchemaSignIn | keyof ValidationSchemaSignUp;
}

export default function SignFormInput({
  register,
  inputType,
  inputPlaceholder,
  fieldName,
}: SignFormInputProps) {
  return (
    <input
      className={style.input}
      type={inputType}
      placeholder={inputPlaceholder}
      {...register(fieldName)}
    />
  );
}
