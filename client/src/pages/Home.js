import { Link, redirect } from "react-router-dom";
import "../styles/Home.css";
import Auth from "../utils/auth";

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
        <Link id="log-in">Log In</Link>
        <span id="break">or</span>
        <Link id="create-account">Create Account</Link>
      </div>
      <div id="browse-link">
        <Link>Browse games without logging in</Link>
      </div>
    </div>
  )
}