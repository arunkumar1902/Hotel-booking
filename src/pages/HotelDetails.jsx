import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiMapPin,
  FiStar,
  FiCheck,
  FiUsers,
  FiArrowLeft,
} from "react-icons/fi";
import { useBooking } from "../context/BookingContext";

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { hotels } = useBooking();

  const hotel = hotels.find((item) => item.id === Number(id));

  const [selectedRoom, setSelectedRoom] = useState(null);

  if (!hotel) {
    return (
      <div className="empty-state">
        <h2>Hotel not found</h2>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/hotels")}
        >
          Browse Hotels
        </button>
      </div>
    );
  }

  const goToBooking = (room) => {
    navigate(`/booking/${hotel.id}/${room.id}`);
  };

  return (
    <div className="hotel-details-page">
      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        <FiArrowLeft /> Back
      </button>

      <div className="details-header">
        <div>
          <h1>{hotel.name}</h1>

          <p className="hotel-location">
            <FiMapPin /> {hotel.location}
          </p>
        </div>

        <div className="rating large-rating">
          <FiStar />
          {hotel.rating}
          <span>({hotel.reviews} reviews)</span>
        </div>
      </div>

      <div className="hotel-gallery">
        <div className="gallery-main">
          <img src={hotel.images[0]} alt={hotel.name} />
        </div>

        <div className="gallery-secondary">
          <img src={hotel.images[1]} alt={`${hotel.name} view 2`} />
          <img src={hotel.images[2]} alt={`${hotel.name} view 3`} />
        </div>
      </div>

      <div className="details-content">
        <div className="hotel-description">
          <h2>About this property</h2>
          <p>{hotel.description}</p>

          <div className="details-divider" />

          <h2>Popular amenities</h2>

          <div className="amenities-grid">
            {hotel.amenities.map((amenity) => (
              <div className="amenity-item" key={amenity}>
                <FiCheck />
                {amenity}
              </div>
            ))}
          </div>

          <div className="details-divider" />

          <h2>Choose your room</h2>

          <div className="room-list">
            {hotel.rooms.map((room) => (
              <div
                className={`room-card ${
                  selectedRoom?.id === room.id ? "selected" : ""
                }`}
                key={room.id}
              >
                <div className="room-card-info">
                  <h3>{room.name}</h3>
                  <p>{room.beds}</p>

                  <p>
                    <FiUsers /> Up to {room.capacity} guests
                  </p>

                  <p className="room-availability">
                    {room.available} rooms available (sample data)
                  </p>
                </div>

                <div className="room-card-price">
                  <strong>
                    ₹{room.price.toLocaleString("en-IN")}
                  </strong>

                  <span>per night</span>

                  <button
                    className="btn btn-primary"
                    onClick={() => goToBooking(room)}
                  >
                    Book Room
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="details-side-card">
          <h3>Stay at {hotel.name}</h3>

          <p>Starting from</p>

          <h2>
            ₹{hotel.price.toLocaleString("en-IN")}
            <span>/ night</span>
          </h2>

          <div className="side-card-rating">
            <FiStar /> {hotel.rating} · {hotel.reviews} reviews
          </div>

          <p className="side-card-description">
            Choose from our comfortable room options and book
            your stay today.
          </p>

          <button
            className="btn btn-primary full-width"
            onClick={() => {
              const cheapestRoom = [...hotel.rooms].sort(
                (a, b) => a.price - b.price
              )[0];

              goToBooking(cheapestRoom);
            }}
          >
            Book Now
          </button>
        </aside>
      </div>
    </div>
  );
};

export default HotelDetails;