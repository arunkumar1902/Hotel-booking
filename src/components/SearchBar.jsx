import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiSearch,
} from "react-icons/fi";

const SearchBar = ({ compact = false }) => {
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!destination.trim()) {
      alert("Please enter a destination");
      return;
    }

    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    if (checkIn < today) {
      alert("Check-in date cannot be in the past");
      return;
    }

    if (checkOut <= checkIn) {
      alert("Check-out must be after check-in");
      return;
    }

    if (guests < 1 || rooms < 1) {
      alert("Guests and rooms must be at least 1");
      return;
    }

    navigate(
      `/hotels?destination=${encodeURIComponent(destination)}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&rooms=${rooms}`
    );
  };

  return (
    <form
      className={`search-bar ${compact ? "compact" : ""}`}
      onSubmit={handleSearch}
    >
      <div className="search-field destination-field">
        <FiMapPin />

        <div className="field-content">
          <label>Destination</label>

          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Where are you going?"
          />
        </div>
      </div>

      <div className="search-field">
        <FiCalendar />

        <div className="field-content">
          <label>Check-in</label>

          <input
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);

              if (checkOut && e.target.value >= checkOut) {
                setCheckOut("");
              }
            }}
          />
        </div>
      </div>

      <div className="search-field">
        <FiCalendar />

        <div className="field-content">
          <label>Check-out</label>

          <input
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
      </div>

      <div className="search-field guest-field">
        <FiUsers />

        <div className="field-content">
          <label>Guests / Rooms</label>

          <div className="guest-inputs">
            <input
              type="number"
              min="1"
              max="20"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            />

            <span>Guests</span>

            <input
              type="number"
              min="1"
              max="10"
              value={rooms}
              onChange={(e) => setRooms(Number(e.target.value))}
            />

            <span>Rooms</span>
          </div>
        </div>
      </div>

      <button className="search-button" type="submit">
        <FiSearch />
        Search
      </button>
    </form>
  );
};

export default SearchBar;