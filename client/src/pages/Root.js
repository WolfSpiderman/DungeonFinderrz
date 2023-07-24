import { Outlet, NavLink, useNavigate } from "react-router-dom";
import React from 'react';
import { BiLogoGithub, BiLogoLinkedin } from 'react-icons/bi';
import { FaStackOverflow } from 'react-icons/fa';
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
        <a href="https://github.com/WolfSpiderman" style={{ marginRight: 15 }}>
          <BiLogoGithub style={{ minHeight: 100, minWidth: 100, color: '#a50308' }}/>
        </a>

        <a href="https://www.linkedin.com/in/joshua-jenkins-4960aa259" style={{ marginRight: 15 }}>
          <BiLogoLinkedin style={{ minHeight: 100, minWidth: 100, color: '#a50308' }}/>
        </a>

        <a href="https://stackoverflow.com/users/22142526/joshua-jenkins">
          <FaStackOverflow style={{ minHeight: 100, minWidth: 100, color: '#a50308' }} />
        </a>
      </footer>
    </div>
  )
}