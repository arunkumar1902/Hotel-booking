import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiSave,
} from "react-icons/fi";
import { useBooking } from "../context/BookingContext";

const Profile = () => {
  const { profile, setProfile, bookings } = useBooking();

  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      return;
    }

    setProfile(form);
    setSaved(true);
  };

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  return (
    <div className="profile-page">
      <div className="page-heading">
        <span className="section-label">ACCOUNT SETTINGS</span>
        <h1>My Profile</h1>
        <p>Manage your personal information and preferences.</p>
      </div>

      <div className="profile-layout">
        <aside className="profile-summary-card">
          <div className="profile-avatar">
            {form.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <h2>{form.name || "Guest User"}</h2>
          <p>{form.email}</p>

          <div className="profile-stats">
            <div>
              <strong>{bookings.length}</strong>
              <span>Total Bookings</span>
            </div>

            <div>
              <strong>{confirmedCount}</strong>
              <span>Active Bookings</span>
            </div>
          </div>
        </aside>

        <div className="profile-form-card">
          <div className="profile-card-heading">
            <h2>Personal information</h2>
            <p>Update your profile details.</p>
          </div>

          <form onSubmit={handleSave}>
            <div className="form-grid">
              <div className="form-field">
                <label>
                  <FiUser /> Full Name
                </label>

                <input
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label>
                  <FiMail /> Email
                </label>

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label>
                  <FiPhone /> Phone
                </label>

                <input
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                />
              </div>

              <div className="form-field">
                <label>
                  <FiMapPin /> Address
                </label>

                <input
                  value={form.address}
                  onChange={(e) => updateField("address", e.target.value)}
                />
              </div>
            </div>

            <div className="profile-settings">
              <h3>Preferences</h3>

              <label className="preference-option">
                <input type="checkbox" defaultChecked />
                Receive booking confirmation notifications
              </label>

              <label className="preference-option">
                <input type="checkbox" defaultChecked />
                Receive promotional offers
              </label>
            </div>

            {saved && (
              <div className="success-message">
                Profile updated successfully!
              </div>
            )}

            <button className="btn btn-primary" type="submit">
              <FiSave /> Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;