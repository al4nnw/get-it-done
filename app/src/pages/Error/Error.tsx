import style from "./Error.module.scss";
import { Link } from "react-router-dom";
/* import NotFoundImage from "../../assets/notFound.svg"; */
export default function Error() {
  return (
    <main className={style.notFound}>
      {/*       <div className={style.notFoundImage}>
        <img src={NotFoundImage} alt="" />
      </div> */}
      <h1>404</h1>
      <p>Page not found</p>
      <button>
        <Link to="/">Go Home</Link>
      </button>
    </main>
  );
}
