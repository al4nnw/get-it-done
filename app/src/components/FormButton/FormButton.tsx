import style from "./FormButton.module.scss";

interface FormSubmiteButtonProps {
  buttonText: string;
  buttonType: "submit" | "button";
  buttonClass?: string;
  onClickFunction?: () => void;
}

export default function FormButton({
  buttonText,
  buttonType,
  buttonClass,
  onClickFunction,
}: FormSubmiteButtonProps) {
  return (
    <button
      className={`${style.button} ${buttonClass && style[buttonClass]}`}
      type={buttonType}
      onClick={() => {
        onClickFunction && onClickFunction();
      }}
    >
      {buttonText}
    </button>
  );
}
