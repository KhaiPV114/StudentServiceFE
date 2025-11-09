import React, { useEffect, useState, useContext } from "react";
import { Card, Row, Col, Button, Badge, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // <-- 1. IMPORT AUTH CONTEXT

const API_URL = "http://localhost:9999/events";
const COLORS = {
  primary: "#FF7A00",
  secondary: "#007BFF",
  success: "#00B894",
  textDark: "#222222",
  textLight: "#555555",
  border: "#E0E0E0",
  bgLight: "#FAFAFA",
  hoverPrimary: "#E56A00",
  hoverSecondary: "#0069D9",
  bgPrimaryLight: "#FFF3E6",
  bgSecondaryLight: "#E6F0FF",
  bgSuccessLight: "#E6FAF5",
};

const EventsClubs = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // <-- 2. SỬ DỤNG CONTEXT

  // 🔑 Lấy userId từ user trong Context
  const userId = user?.id; // <-- 3. LẤY USER ID TỪ CONTEXT (user.id)

  /* 4. XÓA BỎ KHỐI LOGIC TỰ DECODE TOKEN
  let userId = null;
  const token = localStorage.getItem("token");
  if (token) {
    try {
      userId = jwtDecode(token).id; // Lỗi xảy ra ở đây vì token có thể không chứa 'id'
    } catch (err) {
      console.error("Lỗi decode token:", err);
    }
  }
  */

  const fetchEvents = async () => {
    try {
      const res = await axios.get(API_URL);
      setEvents(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu sự kiện:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleJoinEvent = async (eventId) => {
    // Check này bây giờ sẽ hoạt động
    if (!userId) return alert("Vui lòng đăng nhập để tham gia sự kiện."); 
    try {
      await axios.post(`${API_URL}/${eventId}/join`, { userId });
      alert("✅ Đăng ký tham gia sự kiện thành công!");
      fetchEvents();
    } catch (error) {
      if (error.response) alert("⚠️ " + error.response.data.message);
      else alert("❌ Lỗi khi kết nối máy chủ.");
    }
  };

  const handleCancelJoin = async (eventId) => {
    // Check này bây giờ sẽ hoạt động
    if (!userId) return alert("Vui lòng đăng nhập để hủy đăng ký.");
    if (window.confirm("Bạn có chắc muốn hủy đăng ký sự kiện này không?")) {
      try {
        await axios.post(`${API_URL}/${eventId}/leave`, { userId });
        alert("❎ Hủy đăng ký thành công!");
        fetchEvents();
      } catch (error) {
        if (error.response) alert("⚠️ " + error.response.data.message);
        else alert("❌ Lỗi khi kết nối máy chủ.");
      }
    }
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case "upcoming":
        return <Badge bg="info">Sắp diễn ra</Badge>;
      case "finished":
        return <Badge bg="secondary">Đã kết thúc</Badge>;
      case "cancelled":
        return <Badge bg="danger">Đã hủy</Badge>;
      default:
        return (
          <Badge bg="light" text="dark">
            {status}
          </Badge>
        );
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3" style={{ color: COLORS.textLight }}>
          Đang tải danh sách sự kiện...
        </p>
      </div>
    );
  }

  return (
    <div style={{ background: COLORS.bgLight, padding: "20px", borderRadius: "12px" }}>
      <h4 className="mb-4" style={{ color: COLORS.primary, fontWeight: 600 }}>
        Sự kiện & Hoạt động
      </h4>
      <p style={{ color: COLORS.textLight }}>Xem danh sách các sự kiện sắp diễn ra và đăng ký tham gia.</p>

      <Row>
        {events.length === 0 ? (
          <p className="text-center" style={{ color: COLORS.textLight }}>
            Không có sự kiện nào.
          </p>
        ) : (
          events.map((event) => (
            <Col md={6} lg={4} key={event._id} className="mb-4">
              <Card
                className="shadow-sm border-0 h-100"
                style={{ borderRadius: "12px", border: `1px solid ${COLORS.border}` }}
              >
                {event.image ? (
                  <Card.Img
                    variant="top"
                    src={event.image}
                    alt={event.title}
                    style={{
                      height: "180px",
                      objectFit: "cover",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: "180px",
                      background: COLORS.bgPrimaryLight,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 500,
                      color: COLORS.primary,
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  >
                    {event.type === "club_event"
                      ? "Sự kiện câu lạc bộ"
                      : event.type === "workshop"
                      ? "Buổi workshop"
                      : "Hoạt động sinh viên"}
                  </div>
                )}

                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Badge bg={event.type === "club_event" ? "primary" : "secondary"}>
                      {event.type}
                    </Badge>
                    {renderStatusBadge(event.status)}
                  </div>

                  <Card.Title style={{ fontWeight: 600, color: COLORS.textDark }}>
                    {event.title}
                  </Card.Title>

                  <Card.Text style={{ color: COLORS.textLight }}>
                    <strong>Địa điểm:</strong> {event.location || "Chưa rõ"}
                    <br />
                    <strong>Thời gian:</strong>{" "}
                    {new Date(event.startTime).toLocaleString("vi-VN", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </Card.Text>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => navigate(`/events/${event._id}`)}
                    >
                      Xem chi tiết
                    </Button>

                    {/* Logic này bây giờ sẽ chạy đúng vì 'userId' đã được lấy từ Context */}
                    {event.participants?.some((id) => id.toString() === userId) ? (
                      <Button
                        size="sm"
                        style={{
                          backgroundColor: "#6c757d",
                          border: "none",
                          fontWeight: 500,
                        }}
                        onClick={() => handleCancelJoin(event._id)}
                      >
                        Hủy đăng ký
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        style={{
                          backgroundColor: COLORS.primary,
                          border: "none",
                          fontWeight: 500,
                        }}
                        onClick={() => handleJoinEvent(event._id)}
                      >
                        Đăng ký
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default EventsClubs;