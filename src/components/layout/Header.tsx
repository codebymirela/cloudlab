import {
  Link,
  NavLink,
} from "react-router";

export default function Header() {
  return (
    <header className="header">
      <Link
        to="/"
        className="logo"
      >
        <span className="logo-mark">
          C
        </span>

        <span>
          CloudLab
        </span>
      </Link>

      <nav className="navigation">
        <NavLink
          to="/learn"
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          Learn
        </NavLink>

        <NavLink
          to="/build"
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          Build
        </NavLink>
      </nav>

      <div className="user-stats">
        <span>
          ⭐ 0 XP
        </span>

        <span>
          🔥 0
        </span>
      </div>
    </header>
  );
}