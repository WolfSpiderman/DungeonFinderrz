import { Outlet, NavLink } from "react-router-dom";

export default function Root(props) {
  return (
    <div>
      <nav>
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
      <main>
        <Outlet />
      </main>
    </div>
  )
}