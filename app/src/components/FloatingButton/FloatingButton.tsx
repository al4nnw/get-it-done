import style from "./FloatingButton.module.scss";

interface FloatingButtonProps {
  elementType: "button" | "div";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageIcon: any;
  elementText: string;
}

export default function FloatingButton({
  elementText,
  elementType,
  imageIcon,
}: FloatingButtonProps) {
  const Element = elementType;
  return (
    <Element className={style.wrapper}>
      <img src={imageIcon} alt="" aria-hidden="true" />
      <span>{elementText}</span>
    </Element>
  );
}
