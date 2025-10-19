import React, { useState } from "react";
import { Row, Col, Card, Badge, Button, Modal } from "react-bootstrap";

const ServiceBooking = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const userBookings = [
    {
      id: 1,
      room: "Phòng học nhóm – A101",
      date: "20/10/2025",
      time: "08:00 - 10:00",
      status: "confirmed",
    },
    {
      id: 2,
      room: "Phòng CLB – B205",
      date: "22/10/2025",
      time: "13:00 - 15:00",
      status: "pending",
    },
    {
      id: 3,
      room: "Sân bóng – C003",
      date: "18/10/2025",
      time: "17:00 - 18:00",
      status: "cancelled",
    },
  ];

  const allRooms = [
    { name: "Phòng học nhóm – A101", status: "Đã đặt" },
    { name: "Phòng học nhóm – A102", status: "Trống" },
    { name: "Phòng CLB – B205", status: "Đã đặt" },
    { name: "Phòng CLB – B206", status: "Bảo trì" },
    { name: "Sân bóng – C003", status: "Đã đặt" },
    { name: "Sân bóng – C004", status: "Trống" },
    { name: "Sân bóng – C005", status: "Bảo trì" },
  ];

  // Sắp xếp: Trống → Bảo trì → Đã đặt
  const sortedRooms = [...allRooms].sort((a, b) => {
    const order = { Trống: 1, "Bảo trì": 2, "Đã đặt": 3 };
    return order[a.status] - order[b.status] || a.name.localeCompare(b.name);
  });

  const renderStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return <Badge bg="success">Đã xác nhận</Badge>;
      case "pending":
        return (
          <Badge bg="warning" text="dark">
            Chờ xác nhận
          </Badge>
        );
      case "cancelled":
        return <Badge bg="danger">Bị hủy</Badge>;
      default:
        return null;
    }
  };

  const renderRoomBadge = (status) => {
    switch (status) {
      case "Trống":
        return <Badge bg="success">{status}</Badge>;
      case "Bảo trì":
        return (
          <Badge bg="warning" text="dark">
            {status}
          </Badge>
        );
      case "Đã đặt":
        return <Badge bg="secondary">{status}</Badge>;
      default:
        return null;
    }
  };

  // Khi bấm nút "Hủy đặt chỗ"
  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  // Khi xác nhận hủy trong modal
  const handleConfirmCancel = () => {
    setShowModal(false);
    if (selectedBooking) {
      alert(`✅ Đã hủy đặt chỗ: ${selectedBooking.room}`);
      // TODO: Gọi API hủy thật tại đây
    }
    setSelectedBooking(null);
  };

  return (
    <div>
      <h4 className="mb-4">Đặt phòng học nhóm / CLB / sân thể thao</h4>
      <Row>
        {/* Cột trái: lịch đặt phòng của user */}
        <Col md={8}>
          <h5 className="mb-3">Lịch đặt phòng của bạn</h5>
          {userBookings.map((booking) => (
            <Card
              key={booking.id}
              className="mb-3 shadow-sm border-0 position-relative"
              style={{ borderRadius: "12px" }}
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <Card.Title style={{ fontWeight: 600 }}>
                      {booking.room}
                    </Card.Title>
                    <Card.Text className="mb-1">
                      <strong>Ngày:</strong> {booking.date}
                    </Card.Text>
                    <Card.Text className="mb-2">
                      <strong>Thời gian:</strong> {booking.time}
                    </Card.Text>
                  </div>
                  {renderStatusBadge(booking.status)}
                </div>

                {/* 🔹 Nút hủy hiển thị khi chưa bị hủy */}
                {(booking.status === "confirmed" ||
                  booking.status === "pending") && (
                  <div
                    style={{
                      position: "absolute",
                      right: "16px",
                      bottom: "16px",
                    }}
                  >
                    <Button
                      style={{
                        backgroundColor: "#dc3545",
                        border: "none",
                        borderRadius: "20px",
                        padding: "4px 12px",
                        fontWeight: 500,
                      }}
                      size="sm"
                      onClick={() => handleOpenModal(booking)}
                    >
                      Hủy đặt chỗ
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}

          <Button variant="primary" className="mt-2">
            Đặt chỗ mới
          </Button>
        </Col>

        {/* Cột phải: danh sách phòng */}
        <Col md={4}>
          <h5 className="mb-3">Danh sách phòng</h5>
          {sortedRooms.map((room, index) => (
            <Card
              key={index}
              className="mb-2 shadow-sm border-0"
              style={{ borderRadius: "10px" }}
            >
              <Card.Body className="d-flex justify-content-between align-items-center">
                <span>{room.name}</span>
                {renderRoomBadge(room.status)}
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>

      {/* 🔸 Modal xác nhận hủy */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận hủy đặt chỗ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking ? (
            <>
              <p>
                Bạn có chắc chắn muốn hủy đặt chỗ:
                <br />
                <strong>{selectedBooking.room}</strong> vào ngày{" "}
                <strong>{selectedBooking.date}</strong> không?
              </p>
            </>
          ) : (
            <p>Bạn có chắc chắn muốn hủy đặt chỗ này?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Quay lại
          </Button>
          <Button
            style={{
              backgroundColor: "#dc3545",
              border: "none",
              borderRadius: "20px",
              padding: "6px 16px",
              fontWeight: 500,
            }}
            onClick={handleConfirmCancel}
          >
            Xác nhận hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ServiceBooking;
