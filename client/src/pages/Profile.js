import { redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";

export async function loader() {
  const isLoggedIn = Auth.loggedIn();
  if (!isLoggedIn) {
    return redirect("/");
  } 
  return null;
}

export default function Profile() {
  const userId = localStorage.getItem("user_id");

  const { loading, error, data } = useQuery(QUERY_USER,
    {
      variables: { userId }
  });

  

  // const userData = data?.user || [];

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <h1>{data.user.username}'s Profile</h1>
      )}
    </div>
  )
}