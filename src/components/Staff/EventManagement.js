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
  Spinner,
  Alert,
} from "react-bootstrap";
import {
  FaCalendarAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaFilter,
} from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useContext(AuthContext);

  // === DEBUG ===
  useEffect(() => {
    console.log("👤 Current user from EventManagement:", user);
  }, [user]);

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
      setEvents(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Lọc sự kiện
  const filteredEvents = events.filter((event) => {
    if (filterStatus === "all") return true;
    return event.status === filterStatus;
  });

  // --- Xử lý Modal ---
  const handleShowModal = (event = null) => {
    if (event) {
      setIsEditMode(true);
      setCurrentEvent({
        ...event,
        startTime: formatDateForInput(event.startTime),
        endTime: formatDateForInput(event.endTime),
      });
    } else {
      setIsEditMode(false);
      setCurrentEvent({
        _id: null,
        title: "",
        description: "",
        image: "",
        type: "workshop",
        location: "",
        startTime: "",
        endTime: "",
        capacity: 0,
        status: "upcoming",
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
      [name]: name === "capacity" ? Number(value) : value,
    }));
  };

  // --- Xử lý CRUD ---
  const handleSaveEvent = async (e) => {
    e.preventDefault();

    // === FIX: Validation đúng ===
    if (!isEditMode) {
      if (!user?.id) {  // ← ĐỔI TỪ user._id THÀNH user.id
        alert("Lỗi: Bạn phải đăng nhập để tạo sự kiện.");
        return;  // ← BỎ COMMENT, PHẢI CÓ RETURN
      }
      console.log("✅ User ID hợp lệ:", user.id);
    }

    const eventData = { ...currentEvent };

    let url = API_BASE_URL;
    let method = "POST";

    if (isEditMode) {
      url = `${API_BASE_URL}/${currentEvent._id}`;
      method = "PUT";
    } else {
      // === FIX: Gán user.id thay vì user._id ===
      eventData.organizerId = user.id;
      console.log("📤 Payload gửi đi:", JSON.stringify(eventData, null, 2));
    }

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errData = await response.json();
        console.error("❌ Lỗi từ BE:", errData);
        throw new Error(errData.message || "Lưu sự kiện thất bại");
      }

      const result = await response.json();
      console.log("✅ Kết quả:", result);

      alert("Lưu sự kiện thành công!");
      handleCloseModal();
      fetchEvents();
    } catch (err) {
      console.error("❌ Error:", err);
      alert(`Lỗi: ${err.message}`);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!user?.id) {  // ← ĐỔI TỪ !user THÀNH !user?.id
      return alert("Vui lòng đăng nhập để thực hiện hành động này.");
    }

    if (!window.confirm("Bạn có chắc chắn muốn xóa sự kiện này?")) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Xóa sự kiện thất bại");
      }

      alert("Xóa sự kiện thành công!");
      fetchEvents();
    } catch (err) {
      alert(`Lỗi: ${err.message}`);
    }
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
      <Button onClick={fetchEvents} variant="danger">
        Thử lại
      </Button>
    </Alert>
  );

  const renderTable = () => (
    <Table
      striped
      bordered
      hover
      responsive="lg"
      className="align-middle shadow-sm bg-white"
    >
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
            <tr key={event._id}>
              <td>{index + 1}</td>
              <td>
                <div className="fw-bold">{event.title}</div>
                <small className="text-muted">
                  {event.description.substring(0, 50)}...
                </small>
              </td>
              <td>{new Date(event.startTime).toLocaleString("vi-VN")}</td>
              <td>{new Date(event.endTime).toLocaleString("vi-VN")}</td>
              <td>{event.location}</td>
              <td>
                <Badge
                  bg={statusColors[event.status] || "secondary"}
                  className={
                    statusColors[event.status] === "info" ? "text-dark" : ""
                  }
                >
                  {statusVietnamese[event.status] || event.status}
                </Badge>
              </td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShowModal(event)}
                  disabled={!user?.id}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDeleteEvent(event._id)}
                  disabled={!user?.id}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center text-muted p-3">
              {loading ? "Đang tải..." : "Không tìm thấy sự kiện nào."}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );

  return (
    <div className="p-4">
      <h4 className="fw-bold mb-3 text-primary">
        <FaCalendarAlt className="me-2" /> Quản lý Sự kiện
      </h4>

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
                  <option value="upcoming">Sắp diễn ra</option>
                  <option value="finished">Đã kết thúc</option>
                  <option value="cancelled">Đã hủy</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={8} className="d-flex align-items-end justify-content-end">
              <Button
                variant="primary"
                onClick={() => handleShowModal(null)}
                disabled={!user?.id}
              >
                <FaPlus className="me-2" /> Tạo sự kiện mới
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {loading ? renderLoading() : error ? renderError() : renderTable()}

      {/* Modal */}
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
                <Form.Label className="fw-bold">Tên sự kiện</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={currentEvent.title}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mô tả</Form.Label>
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
                    <Form.Label>Ảnh (URL)</Form.Label>
                    <Form.Control
                      type="text"
                      name="image"
                      value={currentEvent.image}
                      onChange={handleFormChange}
                      placeholder="https://example.com/image.png"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Loại sự kiện</Form.Label>
                    <Form.Select
                      name="type"
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
                    <Form.Label className="fw-bold">Thời gian bắt đầu</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="startTime"
                      value={currentEvent.startTime}
                      onChange={handleFormChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Thời gian kết thúc</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="endTime"
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
                    <Form.Label>Địa điểm</Form.Label>
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
                    <Form.Label>Sức chứa</Form.Label>
                    <Form.Control
                      type="number"
                      name="capacity"
                      value={currentEvent.capacity}
                      onChange={handleFormChange}
                      min="0"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Trạng thái</Form.Label>
                <Form.Select
                  name="status"
                  value={currentEvent.status}
                  onChange={handleFormChange}
                >
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