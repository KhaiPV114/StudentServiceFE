import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaTools } from "react-icons/fa";

const ResourceManagement = () => {
  const [resources, setResources] = useState([
    { id: 1, name: "Phòng họp 101", type: "Phòng học", status: "Chờ duyệt" },
    { id: 2, name: "Máy in Canon", type: "Thiết bị", status: "Đang xử lý" },
    { id: 3, name: "Phòng LAB 305", type: "Phòng thí nghiệm", status: "Hoàn thành" },
    { id: 4, name: "Thiết bị chiếu 4K", type: "Thiết bị", status: "Hủy" },
  ]);

  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Gửi thông báo toàn hệ thống (có thể bắt ở Header)
  const sendNotification = (message) => {
    window.dispatchEvent(
      new CustomEvent("new-notification", {
        detail: { message },
      })
    );
  };

  const handleOpenModal = (item) => {
    setSelected(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelected(null);
    setShowModal(false);
  };

  const handleUpdateStatus = (newStatus) => {
    setResources((prev) =>
      prev.map((r) =>
        r.id === selected.id ? { ...r, status: newStatus } : r
      )
    );
    sendNotification(`Tài nguyên "${selected.name}" đã được ${newStatus.toLowerCase()}.`);
    handleCloseModal();
  };

  const canUpdate = (status) => {
    return !(status === "Hoàn thành" || status === "Hủy");
  };

  return (
    <div className="p-4">
      <h4 className="fw-bold mb-3 text-primary">
        <FaTools className="me-2" /> Quản lý tài nguyên
      </h4>

      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên tài nguyên</th>
            <th>Loại</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.name}</td>
              <td>{r.type}</td>
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
          <Modal.Title>Cập nhật trạng thái tài nguyên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected && (
            <>
              <p>
                <strong>Tên tài nguyên:</strong> {selected.name}
              </p>
              <p>
                <strong>Trạng thái hiện tại:</strong>{" "}
                <span className="badge bg-secondary">{selected.status}</span>
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

export default ResourceManagement;
