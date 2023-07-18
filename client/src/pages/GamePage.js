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

  const DM = gameInfo.players.find(player => player.DM === true);

  const playerList = gameInfo.players.filter(player => player.DM === false).map((player) => (
    <tr>
      <td>{player.username}</td>
      <td>{player.class}</td>
    </tr>
  ));

  const handleOpenBtnClick = () => {
    const modal = document.getElementById("request-modal");
    modal.style.display = "block";
  }

  const handleCloseBtnClick = () => {
    const modal = document.getElementById("request-modal");
    modal.style.display = "none";
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const requestMessage = document.getElementById("request-message");
    requestMessage.textContent = "This modal is currently non-functional";
    requestMessage.style.color = "red";
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
          <p>Slots filled: <span>{gameInfo.players.length}/{gameInfo.slots}</span></p>

          <table>
            <thead>
              <tr>
                <th colspan="2">Members</th>
              </tr>
              <tr>
                <th>Username</th>
                <th>Class</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{DM.username}</td>
                <td>Dungeon Master</td>
              </tr>
              {playerList}
            </tbody>
          </table>

          {/* pressing button will activate modal form */}
          <button onClick={handleOpenBtnClick}>Request to Join Game</button>
          <div id="request-modal" className="modal">
            <div className="modal-content">
              <span id="close-request-modal" className="close" onClick={handleCloseBtnClick}>&times;</span>
              <p>The form in this modal is currently non functional</p>
              <form>
                <div>
                  <label htmlFor="pref-class" >Choose Preferred Class:</label>
                  <select name="pref-class">
                    <option value="">--Please select a class--</option>
                    <option value="artificer">Artificer</option>
                    <option value="barbarian">Barbarian</option>
                    <option value="bard">Bard</option>
                    <option value="cleric">Cleric</option>
                    <option value="druid">Druid</option>
                    <option value="fighter">Fighter</option>
                    <option value="monk">Monk</option>
                    <option value="paladin">Paladin</option>
                    <option value="ranger">Ranger</option>
                    <option value="rogue">Rogue</option>
                    <option value="sorcerer">Sorcerer</option>
                    <option value="warlock">Warlock</option>
                    <option value="wizard">Wizard</option>
                    <option value="homebrew">Homebrew</option>
                  </select>
                </div>
                <div>
                  <input type="submit" value="Request to join game" onClick={handleFormSubmit}/>
                </div>
                <div>
                  <p id="request-message"></p>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <div>gameInfo not found </div>
      )}
    </div>
  )
}