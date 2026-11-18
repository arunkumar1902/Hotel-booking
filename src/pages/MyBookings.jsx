import { useState } from "react";
import { FiCalendar, FiMapPin, FiXCircle } from "react-icons/fi";
import { useBooking } from "../context/BookingContext";
import Modal from "../components/Modal";

const MyBookings = () => {
  const { bookings, cancelBooking } = useBooking();

  const [filter, setFilter] = useState("All");
  const [cancelTarget, setCancelTarget] = useState(null);

  const filteredBookings = bookings.filter((booking) => {
    return filter === "All" || booking.status === filter;
  });

  const confirmCancel = () => {
    if (!cancelTarget) return;

    cancelBooking(cancelTarget.id);
    setCancelTarget(null);
  };

  return (
    <div className="my-bookings-page">
      <div className="page-heading">
        <span className="section-label">YOUR TRAVEL</span>
        <h1>My Bookings</h1>
        <p>Manage your reservations and upcoming stays.</p>
      </div>

      <div className="booking-tabs">
        {["All", "Confirmed", "Cancelled"].map((status) => (
          <button
            key={status}
            className={filter === status ? "active" : ""}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {filteredBookings.length > 0 ? (
        <div className="my-bookings-list">
          {filteredBookings.map((booking) => (
            <article className="my-booking-card" key={booking.id}>
              <img src={booking.hotelImage} alt={booking.hotelName} />

              <div className="my-booking-content">
                <div className="booking-card-top">
                  <div>
                    <h3>{booking.hotelName}</h3>

                    <p>
                      <FiMapPin /> {booking.hotelLocation}
                    </p>
                  </div>

                  <span
                    className={`status-badge ${
                      booking.status === "Confirmed"
                        ? "status-confirmed"
                        : "status-cancelled"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="my-booking-info">
                  <div>
                    <span>Booking ID</span>
                    <strong>{booking.id}</strong>
                  </div>

                  <div>
                    <span>Room</span>
                    <strong>{booking.roomName}</strong>
                  </div>

                  <div>
                    <span>Guests</span>
                    <strong>{booking.guests}</strong>
                  </div>
                </div>

                <div className="my-booking-dates">
                  <div>
                    <FiCalendar />
                    <span>
                      {booking.checkIn} → {booking.checkOut}
                    </span>
                  </div>

                  <span>{booking.nights} nights</span>
                </div>

                <div className="my-booking-footer">
                  <strong>
                    ₹{booking.total.toLocaleString("en-IN")}
                  </strong>

                  {booking.status === "Confirmed" && (
                    <button
                      className="btn btn-danger-outline"
                      onClick={() => setCancelTarget(booking)}
                    >
                      <FiXCircle /> Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">⌑</div>
          <h3>No bookings found</h3>
          <p>
            {filter === "All"
              ? "You haven't made any bookings yet."
              : `You don't have any ${filter.toLowerCase()} bookings.`}
          </p>
        </div>
      )}

      {cancelTarget && (
        <Modal
          title="Cancel booking?"
          onClose={() => setCancelTarget(null)}
        >
          <p>
            Are you sure you want to cancel your booking at{" "}
            <strong>{cancelTarget.hotelName}</strong>?
          </p>

          <div className="modal-actions">
            <button
              className="btn btn-secondary"
              onClick={() => setCancelTarget(null)}
            >
              Keep Booking
            </button>

            <button className="btn btn-danger" onClick={confirmCancel}>
              Confirm Cancellation
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyBookings;