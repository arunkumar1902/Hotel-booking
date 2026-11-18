import { Link } from "react-router-dom";
import { FiMapPin, FiStar, FiArrowRight } from "react-icons/fi";

const HotelCard = ({ hotel }) => {
  return (
    <article className="hotel-card">
      <Link to={`/hotels/${hotel.id}`} className="hotel-image-link">
        <img src={hotel.image} alt={hotel.name} />

        <span className="hotel-image-badge">
          Guest Favorite
        </span>
      </Link>

      <div className="hotel-card-content">
        <div className="hotel-card-heading">
          <h3>{hotel.name}</h3>

          <div className="rating">
            <FiStar />
            <span>{hotel.rating}</span>
          </div>
        </div>

        <p className="hotel-location">
          <FiMapPin />
          {hotel.location}
        </p>

        <p className="hotel-reviews">
          {hotel.reviews} reviews
        </p>

        <div className="hotel-card-bottom">
          <div className="hotel-price">
            <strong>
              ₹{hotel.price.toLocaleString("en-IN")}
            </strong>

            <span>/ night</span>
          </div>

          <Link
            to={`/hotels/${hotel.id}`}
            className="hotel-details-link"
          >
            View Details <FiArrowRight />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default HotelCard;