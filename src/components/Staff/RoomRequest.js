import React, { useContext, useEffect, useState } from "react";
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

  // State cho API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Hàm gọi API (GET) ---
  const fetchTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL); // Gọi API GET
      if (!response.ok) {
        throw new Error("Không thể tải danh sách yêu cầu");
      }
      const data = await response.json();
      setTickets(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Tải dữ liệu khi component mount ---
  useEffect(() => {
    fetchTickets();
  }, []); // Chạy 1 lần

  const handleOpenModal = (ticket) => {
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTicket(null);
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

  // --- Render ---

  const renderLoading = () => (
    <div className="text-center p-5">
      <Spinner animation="border" variant="primary" />
      <p className="mt-2">Đang tải dữ liệu...</p>
    </div>
  );

  const renderError = () => (
    <Alert variant="danger">
      <Alert.Heading>Đã xảy ra lỗi</Alert.Heading>
      <p>{error}</p>
      <Button onClick={fetchTickets} variant="danger">Thử lại</Button>
    </Alert>
  );

  const renderTable = () => (
    <Table striped bordered hover responsive="lg" className="align-middle shadow-sm bg-white">
      <thead className="table-light">
        <tr>
          <th>#</th>
          <th>Tên yêu cầu (Title)</th>
          <th>Loại (Category)</th>
          <th>Trạng thái (Status)</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {tickets.length > 0 ? (
          tickets.map((ticket, index) => {
            // Lấy thông tin hiển thị từ statusMap
            const statusInfo = statusMap[ticket.status] || { text: ticket.status, bg: "secondary", textDark: false };

            return (
              <tr key={ticket._id}> {/* Dùng _id từ MongoDB */}
                <td>{index + 1}</td>
                <td>{ticket.title}</td>
                <td>{ticket.category}</td>
                <td>
                  <Badge
                    bg={statusInfo.bg}
                    className={statusInfo.textDark ? "text-dark" : ""}
                  >
                    {statusInfo.text}
                  </Badge>
                </td>
                <td>
                  {canUpdate(ticket.status) ? (
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleOpenModal(ticket)}
                      // disabled={!user} // <-- ĐÃ GỠ BỎ
                    >
                      Cập nhật
                    </button>
                  ) : (
                    <span className="text-muted small fst-italic">
                      Đã xử lý
                    </span>
                  )}
                </td>
              </tr>
            );
          })
        ) : (
           <tr>
              <td colSpan="5" className="text-center text-muted p-3">
                Không tìm thấy yêu cầu (ticket) nào.
              </td>
            </tr>
        )}
      </tbody>
    </Table>
  );

  return (
    <div className="p-4">
      {/* Đổi tiêu đề cho khớp với API */}
      <h4 className="fw-bold mb-3 text-primary">Quản lý Yêu cầu (Tickets)</h4>

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