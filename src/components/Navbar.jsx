import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";
import { useUser } from "../utils/UserContext";

export default function Navbar() {
  const { user } = useUser();
  const location = useLocation();

  if (!user) return null;
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">
          Twitter
        </Link>
        <div className="navbar-links">
          <Link
            to="/home"
            className={
              location.pathname === "/home"
                ? "home-link active-page"
                : "home-link"
            }
          >
            Home
          </Link>
          <Link
            to={`/profile/${user.nickname}`}
            className={
              location.pathname.startsWith("/profile/")
                ? "profile-link active-page"
                : "profile-link"
            }
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}
