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
  const userId = AuthService.getProfile().data._id;
  const modal = document.getElementsByClassName('modal');

  console.log(gameId);
  const { loading, data } = useQuery(QUERY_GAME, {
    variables: { id: gameId }
  });

  console.log(data);
  const gameInfo = data?.game;

  const { loading: requestLoading, data: requestData } = useQuery(CHECK_REQUEST_EXISTS, {
    variables: { gameId, userId }
  });
  const [addRequest] = useMutation(ADD_REQUEST);
  const [approveRequest] = useMutation(APPROVE_REQUEST);
  const [denyRequest] = useMutation(DENY_REQUEST);

  const DM = gameInfo?.players?.find(player => player.role === "dm");

  const playerList = gameInfo?.players?.filter(player => player.role !== "dm").map((player) => (
    <tr>
      <td>{player.player}</td>
      <td>{player.role}</td>
    </tr>
  ));

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
            <h1>{gameInfo.title}</h1>
            <p>{gameInfo.location}</p>
            <p>{gameInfo.date}</p>
            <p>{gameInfo.description}</p>
            <p>Slots filled: <span>{gameInfo.players.length}/{gameInfo.slots}</span></p>

            <table>
              <thead>
                <tr>
                  <th colSpan="2">Members</th>
                </tr>
                <tr>
                  <th>Username</th>
                  <th>Class</th>
                </tr>
              </thead>
              <tbody>
                {DM ? (
                  <tr>
                    <td>{DM.player}</td>
                    <td>DM</td>
                  </tr>
                ) : (
                  <tr>
                    <td>N/A</td>
                    <td>N/A</td>
                  </tr>
                )}
                {playerList}
              </tbody>
            </table>

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
                <p>Which class would you like to join this campaign as?</p>
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
                      