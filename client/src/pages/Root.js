import { Outlet, NavLink, useNavigate } from "react-router-dom";
import React from 'react';
import './Root.css';

import AuthService from '../utils/auth';

export default function Root(props) {
  const navigate = useNavigate();

  const handleProfileClick = (event) => {
    event.preventDefault();
    if (AuthService.loggedIn()) {
      navigate("/profile");
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <header style={{ marginBottom: 40, backgroundImage: `url(${process.env.PUBLIC_URL}/images/blueScales.jpg)` }}>
        <h1 style={{ fontSize: 72, color: "#a50308" }}>Dungeon Finderrz</h1>
        <nav>
        <NavLink
          to="/games"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Games
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
          onClick={handleProfileClick}
        >
          Profile
        </NavLink>
        {/* Conditional rendering for login/logout */}
        {AuthService.loggedIn() ? (
          <NavLink onClick={AuthService.logout}>Logout</NavLink>
        ) : (
          <NavLink to="/">Login</NavLink>
        )}
      </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 40, height: 200, backgroundImage: `url(${process.env.PUBLIC_URL}/images/blueScales.jpg)` }}>
        <a href={`https://github.com/JoelCupeles`}>
          <img src={`https://img.shields.io/badge/GitHub-JoelCupeles-%23a50308`} alt="GitHub" />
        </a>
        <a href={`https://github.com/jbowdle`}>
          <img src={`https://img.shields.io/badge/GitHub-jbowdle-%23a50308`} alt="GitHub" />
        </a>
        <a href={`https://github.com/blackshane`}>
          <img src={`https://img.shields.io/badge/GitHub-blackshane-%23a50308`} alt="GitHub" />
        </a>
        <a href={`https://github.com/WolfSpiderman`}>
          <img src={`https://img.shields.io/badge/GitHub-WolfSpiderman-%23a50308`} alt="GitHub" />
        </a>
      </footer>
    </div>
  )
}