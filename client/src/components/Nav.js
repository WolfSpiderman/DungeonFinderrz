import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../utils/auth';

function Nav() {
  const logout = event => {
    event.preventDefault();
    AuthService.logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        DungeonFinderrz
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/games">
              Games
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {AuthService.loggedIn() ? (
            <li className="nav-item">
              <a className="nav-link" href="/" onClick={logout}>
                Logout
              </a>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;