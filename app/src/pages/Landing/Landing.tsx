import Title from "../../components/Title/Title";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main>
      <Title elementType="h1" elementText="LANDING PAGE" />
      <Link to="/signin">
        <button>Signin</button>
      </Link>
      <Link to="/signup">
        <button>Signup</button>
      </Link>
      <Link to="/home">
        <button>Home</button>
      </Link>
    </main>
  );
}
