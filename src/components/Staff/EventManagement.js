import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Badge,
  Card,
  Table,
  Spinner, // Thêm Spinner
  Alert,   // Thêm Alert
} from "react-bootstrap";
import {
  FaCalendarAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaFilter,
} from "react-icons/fa";
// Giả định AuthContext được export từ đây, dựa trên file Header.js
// import { AuthContext } from "../../context/AuthContext"; // Tạm thời không dùng

// --- Cấu hình API ---
const API_BASE_URL = "http://localhost:9999/events";

const statusColors = {
  upcoming: "info",
  finished: "secondary",
  cancelled: "danger",
};

const statusVietnamese = {
  upcoming: "Sắp diễn ra",
  finished: "Đã kết thúc",
  cancelled: "Đã hủy",
};

// --- Helper định dạng ngày giờ ---
const formatDateForInput = (isoString) => {
  if (!isoString) return "";
  try {
    const date = new Date(isoString);
    // Chuyển sang múi giờ địa phương và lấy 16 ký tự đầu (yyyy-MM-ddTHH:mm)
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 16);
  } catch (error) {
    console.error("Lỗi định dạng ngày:", error);
    return "";
  }
};

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  // --- State cho API ---
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // === THAY ĐỔI: FIX CỨNG USER ĐỂ TEST ===
  // const { user } = useContext(AuthContext); // Tạm thời vô hiệu hóa Context
  const user = {
    _id: "6908bbd3d1aad448987e8b36", // ID bạn cung cấp
    name: "Fake Staff Account" // Tên giả
  };
  // === KẾT THÚC FAKE USER ===

  // --- Hàm gọi API ---
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error("Không thể tải danh sách sự kiện");
      }
      const data = await response.json();
      // Giả định API trả về mảng sự kiện
      setEvents(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Tải dữ liệu khi component mount ---
  useEffect(() => {
    // === GỌI API NGAY LẬP TỨC ===
    fetchEvents();
  }, []); // <-- Chỉ chạy 1 lần duy nhất khi component mount

  // Lọc sự kiện dựa trên trạng thái (sử dụng giá trị BE)
  const filteredEvents = events.filter((event) => {
    if (filterStatus === "all") return true;
    return event.status === filterStatus;
  });

  // --- Xử lý Modal (Khớp với Schema) ---
  const handleShowModal = (event = null) => {
    if (event) {
      // Chế độ Edit
      setIsEditMode(true);
      setCurrentEvent({
        ...event,
        // Chuyển đổi ngày giờ sang định dạng input
        startTime: formatDateForInput(event.startTime),
        endTime: formatDateForInput(event.endTime),
      });
    } else {
      // Chế độ Create (Khớp với Schema)
      setIsEditMode(false);
      setCurrentEvent({
        _id: null,
        title: "",
        description: "",
        image: "", // Thêm trường image
        type: "workshop", // Thêm trường type (giá trị mặc định)
        location: "",
        startTime: "",
        endTime: "",
        capacity: 0, // Thêm trường capacity
        status: "upcoming", // Mặc định là 'upcoming'
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentEvent(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prev) => ({
      ...prev,
      // Chuyển capacity sang Number
      [name]: name === "capacity" ? Number(value) : value,
    }));
  };

  // --- Xử lý CRUD (Gọi API) ---
  const handleSaveEvent = async (e) => {
    e.preventDefault();
    
    // Dữ liệu gửi đi (payload)
    const eventData = { ...currentEvent };
    
    let url = API_BASE_URL;
    let method = "POST";

    if (isEditMode) {
      // --- Chế độ UPDATE (PUT) ---
      url = `${API_BASE_URL}/${currentEvent._id}`;
      method = "PUT";
    } else {
      // --- Chế độ CREATE (POST) ---
      // === THAY ĐỔI: KHÔI PHỤC GÁN organizerId ===
      // Tự động thêm organizerId từ user (fake)
      eventData.organizerId = user._id; 
    }

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          // Thêm Authorization header nếu cần
          // "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Lưu sự kiện thất bại");
      }

      // Lưu thành công, đóng modal và tải lại danh sách
      handleCloseModal();
      fetchEvents(); // Tải lại dữ liệu
    } catch (err) {
      alert(`Lỗi: ${err.message}`); // Hiển thị lỗi (bạn có thể dùng state)
    }
  };

  const handleDeleteEvent = async (id) => {
    // Sử dụng modal xác nhận thay vì window.confirm
    if (!window.confirm("Bạn có chắc chắn muốn xóa sự kiện này?")) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
        // Thêm Authorization header nếu cần
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Xóa sự kiện thất bại");
      }

      // Xóa thành công, tải lại danh sách
      fetchEvents();
    } catch (err) {
      alert(`Lỗi: ${err.message}`);
    }
  };

  // --- Render ---

  // Hiển thị loading
  const renderLoading = () => (
    <div className="text-center p-5">
      <Spinner animation="border" variant="primary" />
      <p className="mt-2">Đang tải dữ liệu...</p>
    </div>
  );

  // Hiển thị lỗi
  const renderError = () => (
    <Alert variant="danger">
      <Alert.Heading>Đã xảy ra lỗi</Alert.Heading>
      <p>{error}</p>
      <Button onClick={fetchEvents} variant="danger">Thử lại</Button>
    </Alert>
  );

  // Hiển thị bảng nội dung
  const renderTable = () => (
    <>
      <Table striped bordered hover responsive="lg" className="align-middle shadow-sm bg-white">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Tên sự kiện</th>
            <th>Thời gian bắt đầu</th>
            <th>Thời gian kết thúc</th>
            <th>Địa điểm</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <tr key={event._id}> {/* Sử dụng _id từ MongoDB */}
                <td>{index + 1}</td>
                <td>
                  <div className="fw-bold">{event.title}</div> {/* Đổi thành title */}
                  <small className="text-muted">{event.description.substring(0, 50)}...</small>
                </td>
                <td>{new Date(event.startTime).toLocaleString("vi-VN")}</td>
                <td>{new Date(event.endTime).toLocaleString("vi-VN")}</td>
                <td>{event.location}</td>
                <td>
                  <Badge
                    bg={statusColors[event.status] || "secondary"}
                    className={statusColors[event.status] === "info" ? "text-dark" : ""}
                  >
                    {/* Hiển thị tên tiếng Việt */}
                    {statusVietnamese[event.status] || event.status}
                  </Badge>
                </td>
                <td>
                  {/* === THAY ĐỔI: KHÔI PHỤC 'disabled' === */}
                  {/* (Vì user (fake) luôn tồn tại, 'disabled' sẽ là false) */}
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleShowModal(event)}
                    disabled={!user} 
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteEvent(event._id)} // Sử dụng _id
                    disabled={!user} 
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center text-muted p-3">
                {/* Cập nhật thông báo nếu không có sự kiện */}
                {loading ? "Đang tải..." : "Không tìm thấy sự kiện nào."}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );

  return (
    <div className="p-4">
      {/* Tiêu đề trang */}
      <h4 className="fw-bold mb-3 text-primary">
        <FaCalendarAlt className="me-2" /> Quản lý Sự kiện
      </h4>

      {/* Card Bộ lọc và Nút tạo mới */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Header
          className="d-flex justify-content-between align-items-center fw-bold text-white"
          style={{
            background: "linear-gradient(90deg, #FF8008, #FFC837)",
          }}
        >
          <span>
            <FaFilter className="me-2" />
            Bộ lọc & Hành động
          </span>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Lọc theo trạng thái</Form.Label>
                <Form.Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">Tất cả</option>
                  {/* Sử dụng giá trị BE, hiển thị tên FE */}
                  <option value="upcoming">Sắp diễn ra</option>
                  <option value="finished">Đã kết thúc</option>
                  <option value="cancelled">Đã hủy</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col
              md={8}
              className="d-flex align-items-end justify-content-end"
            >
              {/* === THAY ĐỔI: KHÔI PHỤC 'disabled' === */}
              {/* (Vì user (fake) luôn tồn tại, 'disabled' sẽ là false) */}
              <Button variant="primary" onClick={() => handleShowModal(null)} disabled={!user}>
                <FaPlus className="me-2" /> Tạo sự kiện mới
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Hiển thị Loading, Lỗi hoặc Bảng dữ liệu */}
      {loading ? renderLoading() : error ? renderError() : renderTable()}

      {/* Modal Thêm/Sửa Sự kiện (Đã cập nhật khớp Schema) */}
      {currentEvent && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Header
            closeButton
            className="text-white"
            style={{
              background: "linear-gradient(90deg, #FF8008, #FFC837)",
            }}
          >
            <Modal.Title>
              {isEditMode ? "Chỉnh sửa Sự kiện" : "Tạo Sự kiện mới"}
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSaveEvent}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Tên sự kiện (Title)</Form.Label>
                <Form.Control
                  type="text"
                  name="title" // Đổi thành title
                  value={currentEvent.title}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mô tả (Description)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={currentEvent.description}
                  onChange={handleFormChange}
                />
              </Form.Group>

              <Row>
                <Col md={8}>
                  <Form.Group className="mb-3">
                    <Form.Label>Ảnh (Image URL)</Form.Label>
                    <Form.Control
                      type="text"
                      name="image" // Thêm trường image
                      value={currentEvent.image}
                      onChange={handleFormChange}
                      placeholder="https://example.com/image.png"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Loại sự kiện (Type)</Form.Label>
                    <Form.Select
                      name="type" // Thêm trường type
                      value={currentEvent.type}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="workshop">Workshop</option>
                      <option value="club_event">Club Event</option>
                      <option value="career_fair">Ngày hội việc làm</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Thời gian bắt đầu (Start Time)</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="startTime" // Đổi thành startTime
                      value={currentEvent.startTime}
                      onChange={handleFormChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Thời gian kết thúc (End Time)</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="endTime" // Đổi thành endTime
                      value={currentEvent.endTime}
                      onChange={handleFormChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={8}>
                  <Form.Group className="mb-3">
                    <Form.Label>Địa điểm (Location)</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={currentEvent.location}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Sức chứa (Capacity)</Form.Label>
                    <Form.Control
                      type="number"
                      name="capacity" // Thêm trường capacity
                      value={currentEvent.capacity}
                      onChange={handleFormChange}
                      min="0"
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Trạng thái (Event Status)</Form.Label>
                <Form.Select
                  name="status"
                  value={currentEvent.status}
                  onChange={handleFormChange}
                >
                  {/* Sử dụng giá trị BE, hiển thị tên FE */}
                  <option value="upcoming">Sắp diễn ra</option>
                  <option value="finished">Đã kết thúc</option>
                  <option value="cancelled">Đã hủy</option>
                </Form.Select>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Đóng
              </Button>
              <Button variant="primary" type="submit">
                Lưu thay đổi
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default EventManagement;