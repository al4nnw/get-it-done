import style from "./FloatingButton.module.scss";

interface FloatingButtonProps {
  elementType: "button" | "div";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageIcon: any;
  elementText: string;
  onClickFunction?: () => void;
}

export default function FloatingButton({
  elementText,
  elementType,
  imageIcon,
  onClickFunction,
}: FloatingButtonProps) {
  const Element = elementType;
  return (
    <Element
      className={style.wrapper}
      onClick={() => onClickFunction && onClickFunction()}
    >
      <img src={imageIcon} alt="" aria-hidden="true" />
      <span>{elementText}</span>
    </Element>
  );
}
