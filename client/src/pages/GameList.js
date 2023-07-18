import { useQuery } from "@apollo/client";
import GameCard from "../components/GameCard";
import { QUERY_GAMES } from "../utils/queries";
import { data } from "../fakeData";

export default function GameList() {
  // query to be used once server is set up, along with mutations and queries utils
  // const { loading, data } = useQuery(QUERY_GAMES);

  const gameList = data?.games || [];

  return (
    <div>
      <h1>Games</h1>
      <div>
        {/* loading ternary to be used once the above useQuery is functional */}
        {/* {loading ? (
          <div>Loading...</div>
        ) : ( */}
          <ul>
            {gameList.map((game) => {
              return (
                <GameCard id={game._id} title={game.title} location={game.location} date={game.date} slots={game.slots} players={game.players}/>
              );
            })}
          </ul>
        {/* )} */}
      </div>
    </div>
  )
}