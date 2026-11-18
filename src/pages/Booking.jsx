import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { useBooking } from "../context/BookingContext";

const Booking = () => {
  const { hotelId, roomId } = useParams();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const { hotels, createBooking, profile } = useBooking();

  const hotel = hotels.find((h) => h.id === Number(hotelId));

  const room = hotel?.rooms.find((r) => r.id === Number(roomId));

  const [form, setForm] = useState({
    guestName: profile.name || "",
    email: profile.email || "",
    phone: profile.phone || "",
    guests: Number(params.get("guests")) || 1,
    checkIn: params.get("checkIn") || "",
    checkOut: params.get("checkOut") || "",
    specialRequests: "",
  });

  const [errors, setErrors] = useState({});

  if (!hotel || !room) {
    return (
      <div className="empty-state">
        <h2>Booking details not found</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/hotels")}
        >
          Explore Hotels
        </button>
      </div>
    );
  }

  const nights =
    form.checkIn && form.checkOut
      ? Math.max(
          0,
          Math.round(
            (new Date(form.checkOut) - new Date(form.checkIn)) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const subtotal = room.price * nights;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  const today = new Date().toISOString().split("T")[0];

  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.guestName.trim()) {
      newErrors.guestName = "Guest name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s]{10,15}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!form.checkIn) {
      newErrors.checkIn = "Check-in date is required";
    } else if (form.checkIn < today) {
      newErrors.checkIn = "Check-in cannot be in the past";
    }

    if (!form.checkOut) {
      newErrors.checkOut = "Check-out date is required";
    } else if (form.checkOut <= form.checkIn) {
      newErrors.checkOut = "Check-out must be after check-in";
    }

    if (form.guests < 1 || form.guests > room.capacity) {
      newErrors.guests = `This room accommodates up to ${room.capacity} guests`;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const booking = createBooking({
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelLocation: hotel.location,
      hotelImage: hotel.image,
      roomId: room.id,
      roomName: room.name,
      guestName: form.guestName,
      email: form.email,
      phone: form.phone,
      guests: Number(form.guests),
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      nights,
      pricePerNight: room.price,
      subtotal,
      taxes,
      total,
      specialRequests: form.specialRequests,
    });

    navigate(`/confirmation/${booking.id}`);
  };

  return (
    <div className="booking-page">
      <button
        className="back-button"
        onClick={() => navigate(`/hotels/${hotel.id}`)}
      >
        <FiArrowLeft /> Back to hotel
      </button>

      <div className="booking-header">
        <span className="section-label">COMPLETE YOUR RESERVATION</span>
        <h1>Confirm your stay</h1>
        <p>Enter your details to complete the booking.</p>
      </div>

      <div className="booking-layout">
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="form-section-title">
              <span>01</span>
              <div>
                <h2>Guest information</h2>
                <p>Who is staying at the hotel?</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label>Full name *</label>

                <input
                  value={form.guestName}
                  onChange={(e) =>
                    updateField("guestName", e.target.value)
                  }
                  placeholder="Enter your full name"
                />

                {errors.guestName && (
                  <span className="error-text">{errors.guestName}</span>
                )}
              </div>

              <div className="form-field">
                <label>Email address *</label>

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    updateField("email", e.target.value)
                  }
                  placeholder="you@example.com"
                />

                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>

              <div className="form-field">
                <label>Phone number *</label>

                <input
                  value={form.phone}
                  onChange={(e) =>
                    updateField("phone", e.target.value)
                  }
                  placeholder="+91 98765 43210"
                />

                {errors.phone && (
                  <span className="error-text">{errors.phone}</span>
                )}
              </div>

              <div className="form-field">
                <label>Number of guests *</label>

                <input
                  type="number"
                  min="1"
                  max={room.capacity}
                  value={form.guests}
                  onChange={(e) =>
                    updateField("guests", Number(e.target.value))
                  }
                />

                {errors.guests && (
                  <span className="error-text">{errors.guests}</span>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-title">
              <span>02</span>
              <div>
                <h2>Your stay</h2>
                <p>Select your check-in and check-out dates.</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label>Check-in *</label>

                <input
                  type="date"
                  min={today}
                  value={form.checkIn}
                  onChange={(e) => updateField("checkIn", e.target.value)}
                />

                {errors.checkIn && (
                  <span className="error-text">{errors.checkIn}</span>
                )}
              </div>

              <div className="form-field">
                <label>Check-out *</label>

                <input
                  type="date"
                  min={form.checkIn || today}
                  value={form.checkOut}
                  onChange={(e) => updateField("checkOut", e.target.value)}
                />

                {errors.checkOut && (
                  <span className="error-text">{errors.checkOut}</span>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-title">
              <span>03</span>
              <div>
                <h2>Special requests</h2>
                <p>Anything else we should know?</p>
              </div>
            </div>

            <div className="form-field">
              <textarea
                rows="4"
                value={form.specialRequests}
                onChange={(e) =>
                  updateField("specialRequests", e.target.value)
                }
                placeholder="Late check-in, room preferences..."
              />
            </div>
          </div>

          <button className="btn btn-primary booking-submit" type="submit">
            Confirm Booking
          </button>

          <p className="booking-disclaimer">
            Demo booking only. No payment is collected.
          </p>
        </form>

        <aside className="booking-summary">
          <img src={hotel.image} alt={hotel.name} />

          <div className="booking-summary-content">
            <h3>{hotel.name}</h3>
            <p>{hotel.location}</p>

            <div className="summary-room">
              <strong>{room.name}</strong>
              <span>{room.beds}</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-dates">
              <div>
                <span>Check-in</span>
                <strong>{form.checkIn || "Select date"}</strong>
              </div>

              <div>
                <span>Check-out</span>
                <strong>{form.checkOut || "Select date"}</strong>
              </div>
            </div>

            <div className="summary-divider" />

            <div className="price-row">
              <span>
                ₹{room.price.toLocaleString("en-IN")} × {nights} nights
              </span>
              <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
            </div>

            <div className="price-row">
              <span>Taxes (12%)</span>
              <strong>₹{taxes.toLocaleString("en-IN")}</strong>
            </div>

            <div className="summary-divider" />

            <div className="price-total">
              <span>Total</span>
              <strong>₹{total.toLocaleString("en-IN")}</strong>
            </div>

            {!nights && (
              <p className="summary-hint">
                Select your dates to calculate the total price.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Booking;