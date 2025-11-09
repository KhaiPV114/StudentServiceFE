import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Badge, Spinner } from "react-bootstrap";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

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
  danger: "#DC3545",
};

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  // 🔑 Lấy userId từ token
  const token = localStorage.getItem("token");
  let userId = null;
  if (token) {
    try {
      userId = jwtDecode(token).id.toString(); // convert sang string
    } catch (err) {
      console.error("Lỗi decode token:", err);
    }
  }

  // 📦 Lấy danh sách tất cả event, lọc ra event hiện tại
  const fetchEventDetail = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      const currentEvent = res.data.find((e) => e._id === id);
      if (!currentEvent) {
        alert("Không tìm thấy sự kiện.");
        navigate("/events");
      } else {
        setEvent(currentEvent);
      }
    } catch (err) {
      console.error("Lỗi khi tải chi tiết sự kiện:", err);
      alert("Không tìm thấy sự kiện.");
      navigate("/events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventDetail();
  }, [id]);

  // ⚙️ Đăng ký tham gia
  const handleJoin = async () => {
    if (!userId) return alert("Vui lòng đăng nhập để tham gia sự kiện.");
    try {
      await axios.post(`${API_URL}/${id}/join`, { userId });
      alert("✅ Bạn đã đăng ký sự kiện!");
      fetchEventDetail(); // cập nhật lại event từ server
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi khi đăng ký sự kiện.");
    }
  };

  // ⚙️ Hủy đăng ký
  const handleCancel = async () => {
    if (!userId) return alert("Vui lòng đăng nhập để hủy đăng ký.");
    if (window.confirm("Bạn có chắc muốn hủy đăng ký sự kiện này không?")) {
      try {
        await axios.post(`${API_URL}/${id}/leave`, { userId });
        alert("❎ Bạn đã hủy đăng ký sự kiện.");
        fetchEventDetail(); // cập nhật lại event từ server
      } catch (err) {
        alert(err.response?.data?.message || "Lỗi khi hủy đăng ký.");
      }
    }
  };

  // ⚙️ Gửi feedback (mock)
  const handleFeedbackSubmit = () => {
    if (!feedback.trim()) {
      alert("Vui lòng nhập nội dung phản hồi.");
      return;
    }
    alert("✅ Gửi phản hồi thành công (mock).");
    setFeedback("");
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3" style={{ color: COLORS.textLight }}>
          Đang tải thông tin sự kiện...
        </p>
      </div>
    );
  }

  if (!event) return null;

  const isJoined = event.participants?.some((id) => id.toString() === userId);
  const participantsCount = event.participants?.length || 0;

  return (
    <div
      style={{
        backgroundColor: COLORS.bgLight,
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <Button
        variant="light"
        onClick={() => navigate("/student")}
        style={{
          border: `1px solid ${COLORS.border}`,
          marginBottom: "15px",
          color: COLORS.textLight,
        }}
      >
        ← Quay lại danh sách
      </Button>

      <Card
        className="shadow-sm border-0"
        style={{ borderRadius: "12px", border: `1px solid ${COLORS.border}` }}
      >
        {event.image ? (
          <Card.Img
            variant="top"
            src={event.image}
            alt={event.title}
            style={{
              height: "240px",
              objectFit: "cover",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}
          />
        ) : (
          <div
            style={{
              height: "240px",
              background: "#FFF3E6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 500,
              color: COLORS.primary,
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}
          >
            {event.type === "workshop"
              ? "Workshop"
              : event.type === "career_fair"
              ? "Ngày hội việc làm"
              : "Sự kiện sinh viên"}
          </div>
        )}

        <Card.Body>
          <h4 style={{ fontWeight: 700, color: COLORS.textDark }}>
            {event.title}
          </h4>

          <div className="mb-3">
            <Badge bg="secondary" className="me-2">
              {event.type}
            </Badge>
            <Badge bg="info">{event.status}</Badge>
          </div>

          <p style={{ color: COLORS.textLight }}>{event.description}</p>

          <p>
            <strong>📍 Địa điểm:</strong> {event.location} <br />
            <strong>🕒 Thời gian:</strong>{" "}
            {new Date(event.startTime).toLocaleString("vi-VN", {
              dateStyle: "short",
              timeStyle: "short",
            })}{" "}
            -{" "}
            {new Date(event.endTime).toLocaleString("vi-VN", {
              timeStyle: "short",
            })}
            <br />
            <strong>👥 Người tham dự:</strong> {participantsCount}/{event.capacity}
          </p>

          {/* ✅ Nút Đăng ký / Hủy đăng ký */}
          <div className="mt-3">
            {isJoined ? (
              <Button
                style={{
                  backgroundColor: COLORS.danger,
                  border: "none",
                  fontWeight: 500,
                }}
                onClick={handleCancel}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#bb2d3b")}
                onMouseOut={(e) => (e.target.style.backgroundColor = COLORS.danger)}
              >
                Hủy đăng ký
              </Button>
            ) : (
              <Button
                style={{
                  backgroundColor: COLORS.primary,
                  border: "none",
                  fontWeight: 500,
                }}
                onClick={handleJoin}
                onMouseOver={(e) => (e.target.style.backgroundColor = COLORS.hoverPrimary)}
                onMouseOut={(e) => (e.target.style.backgroundColor = COLORS.primary)}
              >
                Đăng ký tham gia
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EventDetail;
