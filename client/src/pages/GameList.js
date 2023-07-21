import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import GameCard from "../components/GameCard";
import { QUERY_GAMES } from "../utils/queries";
import { ADD_GAME } from "../utils/mutations";
import AuthService from "../utils/auth";
import "./GameList.css";

export default function GameList() {
  const { loading, data } = useQuery(QUERY_GAMES);
  const [addGame] = useMutation(ADD_GAME);

  const gameList = data?.games || [];

  const [showFormModal, setShowFormModal] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    totalPlayers: 0,
  });

  const handleAddGame = async () => {
    try {
      const { title, description, date, location, totalPlayers } = formValues;

      await addGame({
        variables: {
          title,
          description,
          date,
          location,
          totalPlayers,
        },
        refetchQueries: [{ query: QUERY_GAMES }], // Refetch the games after adding a new game
      });

      setFormValues({
        title: "",
        description: "",
        date: "",
        location: "",
        totalPlayers: 0,
      });

      setShowFormModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Game Library</h1>
      {loading ? (
        <p>Loading games...</p>
      ) : (
        <div>
          {gameList.length === 0 ? (
            <p>No games found.</p>
          ) : (
            <ul>
              {gameList.map((game) => {
                return (
                  <GameCard
                    className="gameCard"
                    key={game._id}
                    id={game._id}
                    title={game.title}
                    location={game.location}
                    date={game.date}
                    slots={game.slots}
                    players={game.players}
                  />
                );
              })}
            </ul>
          )}
          {AuthService.loggedIn() && (
            <button onClick={() => setShowFormModal(true)}>Add Game</button>
          )}
          {showFormModal && (
            <div className="modal">
              <form onSubmit={handleAddGame}>
                <div>
                  <label htmlFor="gameName">Game Name:</label>
                  <input
                    type="text"
                    id="gameName"
                    value={formValues.gameName}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        gameName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="totalPlayers">Total Players:</label>
                  <input
                    type="number"
                    id="totalPlayers"
                    value={formValues.totalPlayers}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        totalPlayers: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <button type="submit">Submit</button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}