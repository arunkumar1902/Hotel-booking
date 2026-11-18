import { Link } from "react-router-dom";
import { FiArrowRight, FiMapPin, FiStar } from "react-icons/fi";
import SearchBar from "../components/SearchBar";
import HotelCard from "../components/HotelCard";
import { useBooking } from "../context/BookingContext";

const destinations = [
  {
    name: "Goa",
    image:
      "https://images.unsplash.com/photo-1512340436992-7f3e8d4e3a5c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Ooty",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Jaipur",
    image:
      "https://images.unsplash.com/photo-1599661046827-9b9c4e1a2b4d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Chennai",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
];

const Home = () => {
  const { hotels } = useBooking();

  const featuredHotels = hotels.slice(0, 3);

  return (
    <div>
      <section className="hero">
        <div className="hero-background"></div>

        <div className="hero-content">
          <span className="hero-tag">
            YOUR NEXT GETAWAY STARTS HERE
          </span>

          <h1>
            Find your perfect
            <br />
            <span>place to stay.</span>
          </h1>

          <p>
            Discover beautiful hotels, unforgettable experiences
            and exceptional stays wherever you travel.
          </p>
        </div>

        <div className="hero-search-wrapper">
          <SearchBar />
        </div>
      </section>

      <section className="section destinations-section">
        <div className="section-heading">
          <div>
            <span className="section-label">EXPLORE INDIA</span>
            <h2>Popular destinations</h2>
            <p>Places travelers love to explore</p>
          </div>

          <Link to="/hotels" className="text-link">
            Explore all <FiArrowRight />
          </Link>
        </div>

        <div className="destination-grid">
          {destinations.map((destination) => (
            <Link
              key={destination.name}
              to={`/hotels?destination=${destination.name}`}
              className="destination-card"
            >
              <img src={destination.image} alt={destination.name} />

              <div className="destination-overlay">
                <h3>{destination.name}</h3>
                <span>
                  <FiMapPin /> Explore destination
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section featured-section">
        <div className="section-heading">
          <div>
            <span className="section-label">HANDPICKED FOR YOU</span>
            <h2>Featured stays</h2>
            <p>Comfort, style and exceptional hospitality</p>
          </div>

          <Link to="/hotels" className="text-link">
            View all hotels <FiArrowRight />
          </Link>
        </div>

        <div className="hotel-grid">
          {featuredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>

      <section className="benefits-section">
        <div className="benefits-container">
          <div className="benefit">
            <span className="benefit-icon">✦</span>
            <h3>Handpicked Hotels</h3>
            <p>Discover carefully selected stays for every trip.</p>
          </div>

          <div className="benefit">
            <span className="benefit-icon">⌘</span>
            <h3>Easy Booking</h3>
            <p>Book your perfect room with a simple experience.</p>
          </div>

          <div className="benefit">
            <span className="benefit-icon">♡</span>
            <h3>Memorable Stays</h3>
            <p>Find stays that make your journey unforgettable.</p>
          </div>
        </div>
      </section>

      <section className="promo-section">
        <div className="promo-content">
          <span>TRAVEL MORE. EXPERIENCE MORE.</span>
          <h2>Your next adventure is waiting.</h2>
          <p>Explore unique destinations and find your perfect stay.</p>

          <Link to="/hotels" className="btn btn-primary">
            Discover Hotels <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;