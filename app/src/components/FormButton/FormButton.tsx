import style from "./FormButton.module.scss";

interface FormSubmiteButtonProps {
  buttonText: string;
  buttonType: "submit" | "button";
}

export default function FormButton({
  buttonText,
  buttonType,
}: FormSubmiteButtonProps) {
  return (
    <button className={style.button} type={buttonType}>
      {buttonText}
    </button>
  );
}
