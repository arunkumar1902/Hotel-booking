import { createContext, useContext, useEffect, useState } from "react";
import { hotels as initialHotels } from "../data/hotels";

const BookingContext = createContext();

const getStorage = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

export const BookingProvider = ({ children }) => {
  const [hotels, setHotels] = useState(() =>
    getStorage("hotelData", initialHotels)
  );

  const [bookings, setBookings] = useState(() =>
    getStorage("hotelBookings", [])
  );

  const [profile, setProfile] = useState(() =>
    getStorage("hotelProfile", {
      name: "Arun Kumar",
      email: "arun@example.com",
      phone: "9876543210",
      address: "ABC Street, XYZ City",
    })
  );

  useEffect(() => {
    localStorage.setItem("hotelData", JSON.stringify(hotels));
  }, [hotels]);

  useEffect(() => {
    localStorage.setItem("hotelBookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem("hotelProfile", JSON.stringify(profile));
  }, [profile]);

  const createBooking = (bookingData) => {
    const booking = {
      ...bookingData,
      id: `HTL-${Date.now().toString().slice(-8)}`,
      status: "Confirmed",
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [booking, ...prev]);

    return booking;
  };

  const cancelBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: "Cancelled" }
          : booking
      )
    );
  };

  const addHotel = (hotel) => {
    setHotels((prev) => [
      {
        ...hotel,
        id: Date.now(),
      },
      ...prev,
    ]);
  };

  const updateHotel = (hotelId, updatedHotel) => {
    setHotels((prev) =>
      prev.map((hotel) =>
        hotel.id === hotelId
          ? { ...hotel, ...updatedHotel }
          : hotel
      )
    );
  };

  const deleteHotel = (hotelId) => {
    setHotels((prev) => prev.filter((hotel) => hotel.id !== hotelId));
  };

  const updateRoom = (hotelId, roomId, updates) => {
    setHotels((prev) =>
      prev.map((hotel) =>
        hotel.id === hotelId
          ? {
              ...hotel,
              rooms: hotel.rooms.map((room) =>
                room.id === roomId
                  ? { ...room, ...updates }
                  : room
              ),
            }
          : hotel
      )
    );
  };

  const addRoom = (hotelId, room) => {
    setHotels((prev) =>
      prev.map((hotel) =>
        hotel.id === hotelId
          ? {
              ...hotel,
              rooms: [
                ...hotel.rooms,
                { ...room, id: Date.now() },
              ],
            }
          : hotel
      )
    );
  };

  const deleteRoom = (hotelId, roomId) => {
    setHotels((prev) =>
      prev.map((hotel) =>
        hotel.id === hotelId
          ? {
              ...hotel,
              rooms: hotel.rooms.filter(
                (room) => room.id !== roomId
              ),
            }
          : hotel
      )
    );
  };

  return (
    <BookingContext.Provider
      value={{
        hotels,
        bookings,
        profile,
        setProfile,
        createBooking,
        cancelBooking,
        addHotel,
        updateHotel,
        deleteHotel,
        addRoom,
        updateRoom,
        deleteRoom,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be inside BookingProvider");
  }

  return context;
};