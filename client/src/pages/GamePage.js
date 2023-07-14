// individual game page
import { data } from "../fakeData";
import { useParams } from "react-router-dom";
import "../styles/GamePage.css"

export default function GamePage() {
  const { gameId } = useParams();

  // query to be used once server is set up, along with mutations and queries utils
  // const { loading, data } = useQuery(QUERY_GAMES);

  const gameList = data?.games || [];
  const gameInfo = gameList.find(game => game._id === gameId);

  const handleOpenBtnClick = () => {
    const modal = document.getElementById("request-modal");
    modal.style.display = "block";
  }

  const handleCloseBtnClick = () => {
    const modal = document.getElementById("request-modal");
    modal.style.display = "none";
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

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

          {/* pressing button will activate modal form */}
          <button onClick={handleOpenBtnClick}>Request to Join Game</button>
          <div id="request-modal" className="modal">
            <div className="modal-content">
              <span id="close-request-modal" className="close" onClick={handleCloseBtnClick}>&times;</span>
              <p>modal!</p>
            </div>
          </div>
        </>
      ) : (
        <div>gameInfo not found </div>
      )}
    </div>
  )
}