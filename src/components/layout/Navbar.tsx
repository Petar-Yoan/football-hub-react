import { NavLink } from 'react-router';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__brand">Football Hub</div>

      <div className="navbar__links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/matches">Matches</NavLink>
        <NavLink to="/create">Create</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;