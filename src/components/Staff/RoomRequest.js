import React, { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import RoomBookingContext from "../../context/RoomBookingContext";

const RoomRequests = () => {
  const {
    bookingRequests,
    approveBookingRequest,
    cancelBookingRequest,
  } = useContext(RoomBookingContext);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
    setShowModal(false);
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!selectedRequest) return;

    if (newStatus === "BOOKED") {
      await approveBookingRequest(selectedRequest._id);
    } else if (newStatus === "CANCELLED") {
      await cancelBookingRequest(selectedRequest._id);
    }

    handleCloseModal();
  };

  const canUpdate = (status) => {
    return !(status === "BOOKED" || status === "CANCELLED");
  };

  return (
    <div className="p-4">
      <h4 className="fw-bold mb-3 text-primary">Quản lý yêu cầu đặt phòng</h4>

      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th>No</th>
            <th>Phòng</th>
            <th>Ngày</th>
            <th>Trạng thái</th>
            <th>Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {bookingRequests.map((r, idx) => (
            <tr key={r._id}>
              <td>{idx + 1}</td>
              <td>{r.roomId?.name}</td>
              <td>{new Date(r.date).toISOString().split("T")[0]}</td>
              <td>
                <span
                  className={`badge ${
                    r.status === "BOOKED"
                      ? "bg-success"
                      : r.status === "CANCELLED"
                      ? "bg-danger"
                      : "bg-warning text-dark"
                  }`}
                >
                  {r.status}
                </span>
              </td>
              <td>
                {canUpdate(r.status) ? (
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleOpenModal(r)}
                  >
                    Cập nhật
                  </button>
                ) : (
                  <span className="text-muted small fst-italic">
                    Không thể cập nhật
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal cập nhật */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật trạng thái yêu cầu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <>
              <p>
                <strong>Phòng:</strong> {selectedRequest.roomId?.name}
              </p>
              <p>
                <strong>Ngày:</strong>{" "}
                {new Date(selectedRequest.date).toISOString().split("T")[0]}
              </p>
              <p>
                <strong>Trạng thái hiện tại:</strong>{" "}
                <span className="badge bg-secondary">
                  {selectedRequest.status}
                </span>
              </p>
            </>
          )}
          <div className="d-flex justify-content-around mt-3">
            <Button
              variant="success"
              onClick={() => handleUpdateStatus("BOOKED")}
            >
              ✅ Xác nhận
            </Button>
            <Button
              variant="danger"
              onClick={() => handleUpdateStatus("CANCELLED")}
            >
              ❌ Hủy yêu cầu
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RoomRequests;
