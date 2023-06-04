interface FormSubmiteButtonProps {
  buttonText: string;
  buttonType: "submit" | "button";
}

export default function FormButton({
  buttonText,
  buttonType,
}: FormSubmiteButtonProps) {
  return <button type={buttonType}>{buttonText}</button>;
}
