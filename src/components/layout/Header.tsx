import {
  Link,
  NavLink,
} from "react-router";

import {
  useProgress,
} from "../../hooks/useProgress";

export default function Header() {
  const {
    progress,
  } = useProgress();

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
          className={({
            isActive,
          }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          Learn
        </NavLink>

        <NavLink
          to="/build"
          className={({
            isActive,
          }) =>
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
          ⭐ {progress.totalXp} XP
        </span>

        <span>
          🔥 {progress.streak}
        </span>
      </div>
    </header>
  );
}