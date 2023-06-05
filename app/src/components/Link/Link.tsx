import { Link } from "react-router-dom";
import style from "./Link.module.scss";

interface LinkToProps {
  linkValue: string;
  textValue: string;
}

export default function LinkTo({ linkValue, textValue }: LinkToProps) {
  return (
    <Link className={style.link} to={linkValue}>
      {textValue}
    </Link>
  );
}
