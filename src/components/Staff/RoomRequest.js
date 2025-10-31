import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const RoomRequests = () => {
  const [requests, setRequests] = useState([
    { id: 1, name: "Đặt phòng 101", status: "Chờ duyệt" },
    { id: 2, name: "Phòng LAB 203", status: "Đang xử lý" },
    { id: 3, name: "Phòng hội nghị", status: "Hoàn thành" },
    { id: 4, name: "Phòng thí nghiệm 402", status: "Hủy" },
  ]);

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

  const handleUpdateStatus = (newStatus) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === selectedRequest.id ? { ...r, status: newStatus } : r
      )
    );
    handleCloseModal();
  };

  // Hàm kiểm tra xem trạng thái có được phép cập nhật không
  const canUpdate = (status) => {
    return !(status === "Hoàn thành" || status === "Hủy");
  };

  return (
    <div className="p-4">
      <h4 className="fw-bold mb-3 text-primary">Quản lý yêu cầu đặt phòng</h4>

      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên yêu cầu</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.name}</td>
              <td>
                <span
                  className={`badge ${
                    r.status === "Hoàn thành"
                      ? "bg-success"
                      : r.status === "Hủy"
                      ? "bg-danger"
                      : r.status === "Đang xử lý"
                      ? "bg-info"
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
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal cập nhật trạng thái */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật trạng thái yêu cầu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <>
              <p>
                <strong>Tên yêu cầu:</strong> {selectedRequest.name}
              </p>
              <p>
                <strong>Trạng thái hiện tại:</strong>{" "}
                <span className="badge bg-secondary">{selectedRequest.status}</span>
              </p>
            </>
          )}
          <div className="d-flex justify-content-around mt-3">
            <Button
              variant="success"
              onClick={() => handleUpdateStatus("Hoàn thành")}
            >
              ✅ Xác nhận
            </Button>
            <Button
              variant="danger"
              onClick={() => handleUpdateStatus("Hủy")}
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
