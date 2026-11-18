import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <Link to="/" className="brand footer-brand">
            <span className="brand-icon">✦</span>
            Hotel<span>Stay</span>
          </Link>

          <p>
            Discover beautiful stays and make every trip memorable.
          </p>
        </div>

        <div className="footer-links">
          <Link to="/hotels">Explore Hotels</Link>
          <Link to="/my-bookings">My Bookings</Link>
          <Link to="/profile">My Profile</Link>
          <Link to="/admin">Admin</Link>
        </div>

        <div className="footer-bottom">
          © 2026 Hotelstay. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;