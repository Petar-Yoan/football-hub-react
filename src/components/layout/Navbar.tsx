import { NavLink } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar__brand">Football Hub</div>

      <div className="navbar__links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/matches">Matches</NavLink>

        {user ? (
          <>
            <NavLink to="/create">Create</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <button type="button" className="logout-button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;