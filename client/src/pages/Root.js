import { Outlet, NavLink } from "react-router-dom";
import React from 'react';
import { BiLogoGithub, BiLogoLinkedin } from 'react-icons/bi';
import { FaStackOverflow } from 'react-icons/fa';
import './Root.css';

export default function Root(props) {
  return (
    <div>
      <header style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 40, height: 200, backgroundImage: `url(${process.env.PUBLIC_URL}/images/blueScales.jpg)` }}>
        <h1 style={{ fontSize: 72, color: "#a50308" }}>Dungeon Finderrz</h1>
      <nav style={{ alignSelf: "start" }}>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Home
        </NavLink>
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
        >
          Profile
        </NavLink>
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