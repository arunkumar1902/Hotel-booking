import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FiFilter, FiSliders, FiX } from "react-icons/fi";
import HotelCard from "../components/HotelCard";
import SearchBar from "../components/SearchBar";
import { useBooking } from "../context/BookingContext";

const Hotels = () => {
  const { hotels } = useBooking();
  const [searchParams] = useSearchParams();

  const initialDestination =
    searchParams.get("destination") || "";

  const [destination, setDestination] = useState(initialDestination);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("recommended");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const amenitiesList = [
    "Swimming Pool",
    "Free WiFi",
    "Restaurant",
    "Parking",
    "Spa",
    "Gym",
    "Breakfast",
  ];

  const filteredHotels = useMemo(() => {
    let result = hotels.filter((hotel) => {
      const matchesDestination =
        !destination.trim() ||
        hotel.city.toLowerCase().includes(destination.toLowerCase()) ||
        hotel.location.toLowerCase().includes(destination.toLowerCase());

      const matchesPrice = hotel.price <= maxPrice;

      const matchesRating = hotel.rating >= minRating;

      const matchesAmenities = selectedAmenities.every((amenity) =>
        hotel.amenities.includes(amenity)
      );

      return (
        matchesDestination &&
        matchesPrice &&
        matchesRating &&
        matchesAmenities
      );
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [hotels, destination, maxPrice, minRating, sortBy, selectedAmenities]);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const resetFilters = () => {
    setMaxPrice(20000);
    setMinRating(0);
    setSortBy("recommended");
    setSelectedAmenities([]);
  };

  return (
    <div className="catalogue-page">
      <div className="catalogue-top">
        <div className="catalogue-intro">
          <span className="section-label">EXPLORE STAYS</span>
          <h1>Find your perfect hotel</h1>
          <p>Discover the best places to stay for your next trip.</p>
        </div>

        <SearchBar compact />
      </div>

      <div className="catalogue-layout">
        <aside className={`filters-panel ${showFilters ? "show" : ""}`}>
          <div className="filter-heading">
            <h3>
              <FiSliders /> Filters
            </h3>

            <button
              className="mobile-filter-close"
              onClick={() => setShowFilters(false)}
            >
              <FiX />
            </button>

            <button className="reset-button" onClick={resetFilters}>
              Reset
            </button>
          </div>

          <div className="filter-group">
            <h4>Destination</h4>

            <input
              className="filter-input"
              placeholder="Search city..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <h4>Maximum price per night</h4>

            <input
              type="range"
              min="1000"
              max="20000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />

            <div className="range-label">
              <span>₹1,000</span>
              <strong>₹{maxPrice.toLocaleString("en-IN")}</strong>
            </div>
          </div>

          <div className="filter-group">
            <h4>Minimum rating</h4>

            {[0, 3, 4, 4.5].map((rating) => (
              <label key={rating} className="filter-option">
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === rating}
                  onChange={() => setMinRating(rating)}
                />

                {rating === 0 ? "All ratings" : `${rating}+ stars`}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Amenities</h4>

            {amenitiesList.map((amenity) => (
              <label key={amenity} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() => toggleAmenity(amenity)}
                />

                {amenity}
              </label>
            ))}
          </div>
        </aside>

        {showFilters && (
          <div
            className="filter-backdrop"
            onClick={() => setShowFilters(false)}
          />
        )}

        <main className="catalogue-results">
          <div className="results-toolbar">
            <div>
              <h2>{filteredHotels.length} hotels found</h2>

              {destination && (
                <p>
                  Results for <strong>{destination}</strong>
                </p>
              )}
            </div>

            <div className="results-actions">
              <button
                className="filter-mobile-button"
                onClick={() => setShowFilters(true)}
              >
                <FiFilter /> Filters
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {filteredHotels.length > 0 ? (
            <div className="hotel-grid">
              {filteredHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">⌕</div>
              <h3>No hotels found</h3>
              <p>Try changing your destination or filters.</p>

              <button
                className="btn btn-primary"
                onClick={() => {
                  setDestination("");
                  resetFilters();
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Hotels;