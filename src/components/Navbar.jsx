import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiBriefcase } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-icon">✦</span>
          Hotel<span>Stay</span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/hotels" onClick={closeMenu}>
            Explore Hotels
          </NavLink>

          <NavLink to="/my-bookings" onClick={closeMenu}>
            My Bookings
          </NavLink>

          <NavLink to="/profile" onClick={closeMenu}>
            <FiUser /> Profile
          </NavLink>

          <NavLink to="/admin" onClick={closeMenu}>
            <FiBriefcase /> Admin
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;