import style from "./Title.module.scss";

interface TitleProps {
  elementType: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  elementText: string;
  elementClass?: string;
}

export default function Title({
  elementType,
  elementText,
  elementClass,
}: TitleProps) {
  const Element = elementType;
  return <Element className={style[`${elementClass}`]}>{elementText}</Element>;
}
