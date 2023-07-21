import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

export default function Profile() {
  const userId = "5e1a0651741b255ddda996c1";

  const { loading, error, data } = useQuery(QUERY_USER,
    {
      variables: userId
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
        <h1>{data.username}</h1>
      )};
    </div>
  )
}