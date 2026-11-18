import { BrowserRouter, Routes, Route } from "react-router-dom";

import { BookingProvider } from "./context/BookingContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import Booking from "./pages/Booking";
import Confirmation from "./pages/Confirmation";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";

import AdminDashboard from "./pages/AdminDashboard";
import AdminRooms from "./pages/AdminRooms";
import AdminBookings from "./pages/AdminBookings";

const App = () => {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/hotels" element={<Hotels />} />

            <Route path="/hotels/:id" element={<HotelDetails />} />

            <Route
              path="/booking/:hotelId/:roomId"
              element={<Booking />}
            />

            <Route
              path="/confirmation/:id"
              element={<Confirmation />}
            />

            <Route path="/my-bookings" element={<MyBookings />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/admin" element={<AdminDashboard />} />

            <Route path="/admin/rooms" element={<AdminRooms />} />

            <Route
              path="/admin/bookings"
              element={<AdminBookings />}
            />

            <Route
              path="*"
              element={
                <div className="empty-state">
                  <h1>404</h1>
                  <p>Page not found</p>
                </div>
              }
            />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </BookingProvider>
  );
};

export default App;