import IForm from "../../types/IForm";
import { UseFormRegister } from "react-hook-form";

interface SignFormInputProps {
  inputType: "email" | "password" | "text";
  inputPlaceholder: string;
  register: UseFormRegister<IForm>;
  fieldName: keyof IForm;
}

export default function SignFormInput({
  register,
  inputType,
  inputPlaceholder,
  fieldName,
}: SignFormInputProps) {
  return (
    <input
      type={inputType}
      placeholder={inputPlaceholder}
      {...register(fieldName, {
        required: true,
        ...(inputType === "password" && { minLength: 6 }),
      })}
    />
  );
}
