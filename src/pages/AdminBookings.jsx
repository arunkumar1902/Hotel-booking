import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useBooking } from "../context/BookingContext";

const AdminBookings = () => {
  const { bookings } = useBooking();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(search.toLowerCase()) ||
      booking.guestName.toLowerCase().includes(search.toLowerCase()) ||
      booking.hotelName.toLowerCase().includes(search.toLowerCase()) ||
      booking.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || booking.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <span className="section-label">RESERVATIONS</span>
          <h1>Booking Management</h1>
          <p>View and monitor all customer reservations.</p>
        </div>
      </div>

      <div className="admin-booking-filters">
        <div className="admin-search">
          <FiSearch />

          <input
            placeholder="Search booking, guest or hotel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="admin-panel">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Guest Details</th>
                <th>Hotel</th>
                <th>Room</th>
                <th>Stay</th>
                <th>Guests</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>

                  <td>
                    <strong>{booking.guestName}</strong>
                    <small>{booking.email}</small>
                    <small>{booking.phone}</small>
                  </td>

                  <td>{booking.hotelName}</td>

                  <td>{booking.roomName}</td>

                  <td>
                    {booking.checkIn}
                    <br />
                    {booking.checkOut}
                  </td>

                  <td>{booking.guests}</td>

                  <td>
                    ₹{booking.total.toLocaleString("en-IN")}
                  </td>

                  <td>
                    <span
                      className={`status-badge ${
                        booking.status === "Confirmed"
                          ? "status-confirmed"
                          : "status-cancelled"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">
            <h3>No bookings found</h3>
            <p>Try another search term or status filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;