import {
  FiHome,
  FiCalendar,
  FiUsers,
  FiDollarSign,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

const AdminDashboard = () => {
  const { hotels, bookings } = useBooking();

  const confirmed = bookings.filter(
    (booking) => booking.status === "Confirmed"
  );

  const cancelled = bookings.filter(
    (booking) => booking.status === "Cancelled"
  );

  const revenue = confirmed.reduce(
    (sum, booking) => sum + booking.total,
    0
  );

  const totalRooms = hotels.reduce(
    (sum, hotel) => sum + hotel.rooms.length,
    0
  );

  const stats = [
    {
      title: "Total Hotels",
      value: hotels.length,
      icon: <FiHome />,
      color: "blue",
    },
    {
      title: "Total Rooms",
      value: totalRooms,
      icon: <FiUsers />,
      color: "purple",
    },
    {
      title: "Confirmed Bookings",
      value: confirmed.length,
      icon: <FiCalendar />,
      color: "green",
    },
    {
      title: "Booking Revenue",
      value: `₹${revenue.toLocaleString("en-IN")}`,
      icon: <FiDollarSign />,
      color: "orange",
    },
  ];

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <span className="section-label">MANAGEMENT</span>
          <h1>Admin Dashboard</h1>
          <p>Monitor your hotel booking operations.</p>
        </div>
      </div>

      <div className="admin-stats-grid">
        {stats.map((stat) => (
          <div className="admin-stat-card" key={stat.title}>
            <div className={`admin-stat-icon ${stat.color}`}>
              {stat.icon}
            </div>

            <div>
              <span>{stat.title}</span>
              <h2>{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-overview-grid">
        <div className="admin-panel">
          <h2>Booking Overview</h2>

          <div className="overview-item">
            <span>Confirmed</span>
            <strong>{confirmed.length}</strong>
          </div>

          <div className="overview-item">
            <span>Cancelled</span>
            <strong>{cancelled.length}</strong>
          </div>

          <div className="overview-item">
            <span>Total Bookings</span>
            <strong>{bookings.length}</strong>
          </div>

          <div className="overview-item">
            <span>Cancellation Rate</span>
            <strong>
              {bookings.length
                ? `${Math.round(
                    (cancelled.length / bookings.length) * 100
                  )}%`
                : "0%"}
            </strong>
          </div>
        </div>

        <div className="admin-panel">
          <h2>Quick Actions</h2>

          <Link to="/admin/rooms" className="admin-action">
            <FiHome />
            <div>
              <strong>Manage Rooms</strong>
              <span>Update hotel rooms and pricing</span>
            </div>
          </Link>

          <Link to="/admin/bookings" className="admin-action">
            <FiCalendar />
            <div>
              <strong>Manage Bookings</strong>
              <span>View booking records</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="admin-panel">
        <h2>Recent Bookings</h2>

        {bookings.length === 0 ? (
          <div className="empty-inline">
            No booking activity yet.
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Guest</th>
                  <th>Hotel</th>
                  <th>Dates</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {bookings.slice(0, 5).map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.guestName}</td>
                    <td>{booking.hotelName}</td>
                    <td>
                      {booking.checkIn} – {booking.checkOut}
                    </td>
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
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;