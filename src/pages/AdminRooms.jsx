import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useBooking } from "../context/BookingContext";
import Modal from "../components/Modal";

const emptyRoom = {
  name: "",
  price: "",
  capacity: 2,
  beds: "1 Queen Bed",
  available: 1,
};

const AdminRooms = () => {
  const {
    hotels,
    addRoom,
    updateRoom,
    deleteRoom,
  } = useBooking();

  const [hotelId, setHotelId] = useState(
    hotels[0]?.id || ""
  );

  const [editing, setEditing] = useState(null);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [form, setForm] = useState(emptyRoom);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const selectedHotel = hotels.find(
    (hotel) => hotel.id === Number(hotelId)
  );

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyRoom });
    setShowRoomModal(true);
  };

  const openEdit = (room) => {
    setEditing(room);

    setForm({
      name: room.name,
      price: room.price,
      capacity: room.capacity,
      beds: room.beds,
      available: room.available,
    });

    setShowRoomModal(true);
  };

  const closeModal = () => {
    setShowRoomModal(false);
    setEditing(null);
    setForm({ ...emptyRoom });
  };

  const saveRoom = (e) => {
    e.preventDefault();

    if (!selectedHotel) return;

    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      capacity: Number(form.capacity),
      beds: form.beds.trim(),
      available: Number(form.available),
    };

    if (
      !payload.name ||
      payload.price <= 0 ||
      payload.capacity < 1 ||
      payload.available < 0
    ) {
      return;
    }

    if (editing) {
      updateRoom(
        selectedHotel.id,
        editing.id,
        payload
      );
    } else {
      addRoom(selectedHotel.id, payload);
    }

    closeModal();
  };

  const confirmDelete = () => {
    if (!deleteTarget || !selectedHotel) return;

    deleteRoom(
      selectedHotel.id,
      deleteTarget.id
    );

    setDeleteTarget(null);
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <span className="section-label">
            PROPERTY MANAGEMENT
          </span>

          <h1>Room Management</h1>

          <p>
            Manage room types, pricing and sample inventory.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={openAdd}
        >
          <FiPlus /> Add Room
        </button>
      </div>

      <div className="hotel-selector">
        <label>Select Hotel</label>

        <select
          value={hotelId}
          onChange={(e) => setHotelId(e.target.value)}
        >
          {hotels.map((hotel) => (
            <option
              key={hotel.id}
              value={hotel.id}
            >
              {hotel.name}
            </option>
          ))}
        </select>
      </div>

      {selectedHotel && (
        <>
          <div className="room-management-summary">
            <div>
              <span>Property</span>
              <h2>{selectedHotel.name}</h2>
            </div>

            <div>
              <span>Room Types</span>
              <h2>{selectedHotel.rooms.length}</h2>
            </div>

            <div>
              <span>Total Sample Inventory</span>
              <h2>
                {selectedHotel.rooms.reduce(
                  (sum, room) =>
                    sum + Number(room.available),
                  0
                )}
              </h2>
            </div>
          </div>

          <div className="admin-panel">
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Room Type</th>
                    <th>Beds</th>
                    <th>Capacity</th>
                    <th>Price / Night</th>
                    <th>Available</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {selectedHotel.rooms.map((room) => (
                    <tr key={room.id}>
                      <td>
                        <strong>{room.name}</strong>
                      </td>

                      <td>{room.beds}</td>

                      <td>{room.capacity} guests</td>

                      <td>
                        ₹{room.price.toLocaleString("en-IN")}
                      </td>

                      <td>{room.available}</td>

                      <td>
                        <div className="table-actions">
                          <button
                            className="icon-button edit"
                            onClick={() => openEdit(room)}
                            title="Edit room"
                          >
                            <FiEdit2 />
                          </button>

                          <button
                            className="icon-button delete"
                            onClick={() => setDeleteTarget(room)}
                            title="Delete room"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedHotel.rooms.length === 0 && (
              <div className="empty-state">
                <h3>No rooms configured</h3>
                <p>Add room types for this property.</p>
              </div>
            )}
          </div>
        </>
      )}

      {showRoomModal && (
        <Modal
          title={editing ? "Edit Room" : "Add Room"}
          onClose={closeModal}
        >
          <form
            onSubmit={saveRoom}
            className="modal-form"
          >
            <div className="form-field">
              <label>Room name *</label>

              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                placeholder="Deluxe Room"
              />
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label>Price per night *</label>

                <input
                  type="number"
                  min="1"
                  required
                  value={form.price}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      price: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-field">
                <label>Guest capacity</label>

                <input
                  type="number"
                  min="1"
                  required
                  value={form.capacity}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      capacity: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-field">
                <label>Available rooms</label>

                <input
                  type="number"
                  min="0"
                  required
                  value={form.available}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      available: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-field">
                <label>Bed configuration</label>

                <input
                  required
                  value={form.beds}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      beds: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Cancel
              </button>

              <button
                className="btn btn-primary"
                type="submit"
              >
                {editing ? "Update Room" : "Add Room"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <Modal
          title="Delete Room"
          onClose={() => setDeleteTarget(null)}
        >
          <p>
            Are you sure you want to delete{" "}
            <strong>{deleteTarget.name}</strong>?
          </p>

          <div className="modal-actions">
            <button
              className="btn btn-secondary"
              onClick={() => setDeleteTarget(null)}
            >
              Cancel
            </button>

            <button
              className="btn btn-danger"
              onClick={confirmDelete}
            >
              Delete Room
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminRooms;