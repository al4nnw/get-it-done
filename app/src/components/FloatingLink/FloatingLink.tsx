import { Link } from "react-router-dom";
import style from "./FloatingLink.module.scss";

interface FloatingButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageIcon: any;
  elementLink: string;
  elementText: string;
}

export default function FloatingLink({
  elementText,
  elementLink,
  imageIcon,
}: FloatingButtonProps) {
  return (
    <Link to={elementLink} className={style.wrapper}>
      <img src={imageIcon} alt="" aria-hidden="true" />
      <span>{elementText}</span>
    </Link>
  );
}
