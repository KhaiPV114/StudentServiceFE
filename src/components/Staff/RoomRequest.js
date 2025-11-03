import React, { useState, useEffect } from "react";
import { 
    Modal, 
    Button, 
    Spinner, 
    Alert, 
    Table, 
    Badge 
} from "react-bootstrap";

// === CẤU HÌNH API ===
// Giả định API Ticket của bạn chạy ở đây
const API_BASE_URL = "http://localhost:9999/tickets"; 

// --- Ánh xạ trạng thái (BE -> FE) ---
// Dùng để hiển thị Badge màu và Tên tiếng Việt
const statusMap = {
  pending: { text: "Chờ duyệt", bg: "warning", textDark: true },
  in_progress: { text: "Đang xử lý", bg: "info", textDark: false },
  resolved: { text: "Hoàn thành", bg: "success", textDark: false },
  closed: { text: "Hủy", bg: "danger", textDark: false },
};

const RoomRequests = () => {
  // Đổi 'requests' thành 'tickets'
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
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

  // --- Hàm gọi API (PUT) ---
  const handleUpdateStatus = async (newStatusBE) => {
    if (!selectedTicket) return;

    // newStatusBE phải là giá trị của backend (vd: "resolved" hoặc "closed")
    const url = `${API_BASE_URL}/${selectedTicket._id}`; // Dùng _id từ MongoDB

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${user.token}` // Thêm nếu cần
        },
        body: JSON.stringify({ status: newStatusBE }), // Chỉ gửi trạng thái mới
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Cập nhật thất bại");
      }

      // Cập nhật thành công
      handleCloseModal();
      fetchTickets(); // Tải lại danh sách
    } catch (err) {
      alert(`Lỗi: ${err.message}`);
    }
  };

  // Hàm kiểm tra xem trạng thái có được phép cập nhật không (dùng trạng thái BE)
  const canUpdate = (statusBE) => {
    return !(statusBE === "resolved" || statusBE === "closed");
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

      {/* Hiển thị Loading, Lỗi hoặc Bảng */}
      {loading ? renderLoading() : error ? renderError() : renderTable()}

      {/* Modal cập nhật trạng thái */}
      {selectedTicket && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Cập nhật trạng thái yêu cầu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Tên yêu cầu:</strong> {selectedTicket.title}
            </p>
            <p>
              <strong>Trạng thái hiện tại:</strong>{" "}
              <span className="badge bg-secondary">
                {statusMap[selectedTicket.status]?.text || selectedTicket.status}
              </span>
            </p>
            
            <div className="d-flex justify-content-around mt-3">
              <Button
                variant="success"
                onClick={() => handleUpdateStatus("resolved")} // Gửi trạng thái BE
              >
                ✅ Xác nhận (Resolved)
              </Button>
              <Button
                variant="danger"
                onClick={() => handleUpdateStatus("closed")} // Gửi trạng thái BE
              >
                ❌ Hủy (Closed)
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default RoomRequests;