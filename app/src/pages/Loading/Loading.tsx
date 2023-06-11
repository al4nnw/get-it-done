import style from "./Loading.module.scss";
import { FaSpinner } from "react-icons/fa";

export default function Loading() {
  return (
    <main className={style.page}>
      <span className={style.spinner}>
        <FaSpinner />
      </span>
      <h1>Almost there!</h1>
      <h2>Hang on tight...</h2>
    </main>
  );
}
