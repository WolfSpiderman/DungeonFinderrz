// individual game page
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_GAME } from "../utils/queries";
import "../styles/GamePage.css"

export default function GamePage() {
  const { gameId } = useParams();
  console.log(gameId);

  // query to be used once server is set up, along with mutations and queries utils
  const { loading, error, data } = useQuery(QUERY_GAME,
    {
      variables: { gameId }
    }
  );

  console.log(data);

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  // Following code causes QUERY_GAME to return undefined for some reason

  // const participants = data.game.requests.filter(request => request.status === "approved");

  // const DM = participants.find(participant => participant.role === "DM");

  // const playerList = participants.filter(participant => participant.role !== "DM").map((player) => (
  //   <tr>
  //     <td>{player.userId.username}</td>
  //     <td>{player.class}</td>
  //   </tr>
  // ));

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
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>{data.game.title}</h1>
          <p>{data.game.location}</p>
          <p>{data.game.date}</p>
          <p>{data.game.description}</p>
          <p>Participants: <span>{data.game.players.length}/{data.game.maxPlayers}</span></p>

          {/* <table>
            <thead>
              <tr>
                <th colSpan="2">Participants</th>
              </tr>
              <tr>
                <th>Username</th>
                <th>Class</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{DM.userId.username}</td>
                <td>Dungeon Master</td>
              </tr>
              {playerList}
            </tbody>
          </table> */}

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
      )}


      {/* {loading ? (
        <div>Loading...</div>
      ) : ( 
        <>
          <h1>{data.game.title}</h1>
          <p>{data.game.location}</p>
          <p>{data.game.date}</p>
          <p>{data.game.description}</p>
          <p>Slots filled: <span>{data.game.players.length}/{data.game.slots}</span></p>

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
      )} */}
    </div>
  )
}