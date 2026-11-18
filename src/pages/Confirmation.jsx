import { useParams, Link } from "react-router-dom";
import { FiCheckCircle, FiCalendar, FiMapPin } from "react-icons/fi";
import { useBooking } from "../context/BookingContext";

const Confirmation = () => {
  const { id } = useParams();
  const { bookings } = useBooking();

  const booking = bookings.find((item) => item.id === id);

  if (!booking) {
    return (
      <div className="empty-state">
        <h2>Booking not found</h2>
        <Link to="/my-bookings" className="btn btn-primary">
          My Bookings
        </Link>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <div className="confirmation-icon">
          <FiCheckCircle />
        </div>

        <span className="section-label">RESERVATION SUCCESSFUL</span>

        <h1>Your stay is confirmed!</h1>

        <p>
          Thank you, {booking.guestName}. Your booking has been
          successfully created.
        </p>

        <div className="confirmation-id">
          <span>Booking reference</span>
          <strong>{booking.id}</strong>
        </div>

        <div className="confirmation-hotel">
          <img src={booking.hotelImage} alt={booking.hotelName} />

          <div>
            <h3>{booking.hotelName}</h3>
            <p>
              <FiMapPin /> {booking.hotelLocation}
            </p>
            <strong>{booking.roomName}</strong>
          </div>
        </div>

        <div className="confirmation-details">
          <div>
            <FiCalendar />
            <span>Check-in</span>
            <strong>{booking.checkIn}</strong>
          </div>

          <div>
            <FiCalendar />
            <span>Check-out</span>
            <strong>{booking.checkOut}</strong>
          </div>

          <div>
            <span>Duration</span>
            <strong>{booking.nights} nights</strong>
          </div>

          <div>
            <span>Guests</span>
            <strong>{booking.guests}</strong>
          </div>
        </div>

        <div className="confirmation-total">
          <span>Total amount</span>
          <strong>₹{booking.total.toLocaleString("en-IN")}</strong>
        </div>

        <div className="confirmation-actions">
          <Link to="/my-bookings" className="btn btn-primary">
            View My Bookings
          </Link>

          <Link to="/hotels" className="btn btn-secondary">
            Explore More Hotels
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;