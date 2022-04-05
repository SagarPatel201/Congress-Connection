import Signup from "../components/Signup";
import '../App.css';
import { Link } from "react-router-dom";

export default function SignupRoute() {
  return (
    <div className="App">
      <Signup />
      <Link to ="/">
          <p>Back to Homepage</p>
      </Link>
    </div>
  );
}
