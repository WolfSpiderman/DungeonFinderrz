import { Link, redirect } from "react-router-dom";
import "../styles/Home.css";
import Auth from "../utils/auth";
import Login from "../components/Login";
import Signup from "../components/Signup";

export async function loader({ request }) {
  const isLoggedIn = Auth.loggedIn();

  if (isLoggedIn) {
    console.log(isLoggedIn);
    return redirect(`/games`);
  } else {
    return null;
  }
}

export default function Home(props) {
  return (
    <div id="home-card">
      <div id="account-options">
        <h2>Login</h2>
        <Login id="log-in"/>
        <h2>Create Account</h2>
        <Signup id="create-account"/>
      </div>
      <div id="browse-link">
        <Link>Browse games without logging in</Link>
      </div>
    </div>
  )
}