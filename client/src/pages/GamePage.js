// individual game page
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_GAME, CHECK_REQUEST_EXISTS } from '../utils/queries';
import { ADD_REQUEST, APPROVE_REQUEST, DENY_REQUEST } from '../utils/mutations';
import { useParams } from "react-router-dom";
import AuthService from '../utils/auth';
import "../styles/GamePage.css";

export default function GamePage() {
  const [errorMessage, setErrorMessage] = useState('');
  const { gameId } = useParams();
  console.log(gameId);

  // query to be used once server is set up, along with mutations and queries utils
  const { loading, error, data } = useQuery(QUERY_GAME,
    {
      variables: { gameId }
    }
  );

  console.log(data);
  const gameInfo = data?.game;

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  const { loading: requestLoading, data: requestData } = useQuery(CHECK_REQUEST_EXISTS, {
    variables: { gameId, userId }
  });
  const [addRequest] = useMutation(ADD_REQUEST);
  const [approveRequest] = useMutation(APPROVE_REQUEST);
  const [denyRequest] = useMutation(DENY_REQUEST);

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
    if (AuthService.loggedIn()) {
      const modal = document.getElementById("request-modal");
      modal.style.display = "block";
    } else {
      modal.stlye.display = "none";
    }
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
  
    const prefClass = document.querySelector('[name="pref-class"]').value;
    const userId = AuthService.getProfile().data._id; // Assuming AuthService has a method to retrieve the user id from the token payload
  
    console.log(userId);
  
    try {
      // Check if a matching request already exists
      const requestExists = requestData?.checkRequestExists;
  
      console.log(requestData);
      if (requestExists) {
        // Display an error message to the user
        setErrorMessage("You've already requested to join this game! Be patient!");
        return;
      }
  
      // If no request exists, proceed with creating a new request
      const { data } = await addRequest({
        variables: { gameId, role: prefClass, userId: userId },
      });
  
      console.log(data);
      // Handle successful request submission
      window.location.reload();
    } catch (err) {
      console.error(err);
      // Handle error
      console.log("Error:", err.message);
    }
  };  

  const handleApproveRequest = async (requestId) => {
    try {
      await approveRequest({
        variables: { requestId }, // Pass the requestId to the mutation
      });
      console.log("Request approved successfully");
      // Handle success
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  const handleDenyRequest = async (requestId) => {
    try {
      await denyRequest({
        variables: { requestId }, // Pass the requestId to the mutation
      });
      console.log("Request denied successfully");
      // Handle success
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        gameInfo ? (
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

            {AuthService.loggedIn() && gameInfo?.createdBy === AuthService.getProfile().data._id && (
        <>
          {/* Render buttons for approving or denying requests */}
          {gameInfo.requests.map((request) => (
            <div key={request.id}>
              <p>{request.username} has requested to join as {request.prefClass}</p>
              <button onClick={() => handleApproveRequest(request.id)}>Approve</button>
              <button onClick={() => handleDenyRequest(request.id)}>Deny</button>
            </div>
          ))}
        </>
      )}

            <button onClick={handleOpenBtnClick}>Request to Join Game</button>
            <div id="request-modal" className="modal">
              <div className="modal-content">
                <span id="close-request-modal" className="close" onClick={handleCloseBtnClick}>&times;</span>
                {errorMessage && <p>{errorMessage}</p>}
                <p>The form in this modal is currently non-functional</p>
                <form>
                  <div>
                    <label htmlFor="pref-class">Choose Preferred Class:</label>
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
                      </select>
                    </div>
                    <button type="submit" onClick={handleFormSubmit}>Submit Request</button>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <div>Game not found.</div>
          )
        )}
      </div>
    );
  }
                      
