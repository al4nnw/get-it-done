import { Link } from "react-router-dom";
import style from "./Landing.module.scss";

export default function Landing() {
  return (
    <main className={style.landing}>
      <h1 className={style.title}>
        <span className={style.titleName}>Get It Done</span> - The Ultimate Todo
        List App
      </h1>
      <h2 className={style.subtitle}>Empowering You to Achieve Your Goals</h2>
      <button className={style.link}>
        <Link to="/signup">Start Your Productivity Journey</Link>
      </button>
    </main>
  );
}
