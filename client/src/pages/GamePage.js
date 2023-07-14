// individual game page
import { data } from "../fakeData";
import { useParams } from "react-router-dom";

export default function GamePage() {
  const { gameId } = useParams();

  // query to be used once server is set up, along with mutations and queries utils
  // const { loading, data } = useQuery(QUERY_GAMES);

  const gameList = data?.games || [];
  const gameInfo = gameList.find(game => game._id === gameId);
  console.log(gameList);
  console.log(gameInfo);

  return (
    <div>
      {/* loading ternary to be used once above useQuery is implemented */}
      {/* {loading ? (
        <div>Loading...</div>
      ) : ( */}
        {/* <div></div> */}
      {/* )} */}
      {gameInfo ? (
        <>
          <h1>{gameInfo.title}</h1>
          <p>{gameInfo.location}</p>
          <p>{gameInfo.date}</p>
          <p>{gameInfo.description}</p>
        </>
      ) : (
        <div>gameInfo not found </div>
      )}
    </div>
  )
}