import { Link } from 'react-router';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__brand">Football World</div>

      <div className="navbar__links">
        <Link to="/">Home</Link>
        <Link to="/teams">Teams</Link>
        <Link to="/matches">Matches</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;