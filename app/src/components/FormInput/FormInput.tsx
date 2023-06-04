interface FormInputProps {
  inputPlaceholder: string;
  inputType: "text" | "email" | "password";
}

export default function FormInput({
  inputPlaceholder,
  inputType,
}: FormInputProps) {
  return <input type={inputType} placeholder={inputPlaceholder} />;
}
