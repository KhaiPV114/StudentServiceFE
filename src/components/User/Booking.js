import React, { useState } from "react";
import { Row, Col, Card, Badge, Button, Form } from "react-bootstrap";

const ServiceBooking = () => {
  const [selectedBuilding, setSelectedBuilding] = useState("Tất cả");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("07:30-09:00");

  const allRooms = [
    { name: "AL101", building: "Alpha", status: "Trống" },
    { name: "AL102", building: "Alpha", status: "Đã đặt" },
    { name: "AL103", building: "Alpha", status: "Bảo trì" },
    { name: "BE101", building: "Beta", status: "Trống" },
    { name: "BE102", building: "Beta", status: "Đã đặt" },
    { name: "DE319", building: "Delta", status: "Trống" },
    { name: "GA201", building: "Gamma", status: "Bảo trì" },
    { name: "GA301", building: "Gamma", status: "Trống" },
    { name: "EP101", building: "Epsilon", status: "Trống" },
    { name: "EP102", building: "Epsilon", status: "Đã đặt" },
  ];

  const timeSlots = [
    "07:30-09:00",
    "09:10-10:40",
    "10:50-12:20",
    "13:00-14:30",
    "14:40-16:10",
    "16:20-17:40",
  ];

  const renderRoomBadge = (status) => {
    switch (status) {
      case "Trống":
        return <Badge bg="success">{status}</Badge>;
      case "Đã đặt":
        return <Badge bg="secondary">{status}</Badge>;
      case "Bảo trì":
        return (
          <Badge bg="warning" text="dark">
            {status}
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleBookRoom = (roomName) => {
    if (!selectedDate) {
      alert("⚠️ Vui lòng chọn ngày trước khi đặt phòng!");
      return;
    }
    alert(
      `✅ Đã gửi yêu cầu đặt phòng ${roomName} (${selectedDate}, ${selectedTime})`
    );
  };

  const filteredRooms =
    selectedBuilding === "Tất cả"
      ? allRooms
      : allRooms.filter((r) => r.building === selectedBuilding);

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    const order = { Trống: 1, "Bảo trì": 2, "Đã đặt": 3 };
    return order[a.status] - order[b.status] || a.name.localeCompare(b.name);
  });

  return (
    <div>
      <h4 className="mb-4">Đặt phòng học nhóm / CLB</h4>

      {/* Bộ lọc lựa chọn */}
      <Card className="mb-4 p-3 shadow-sm border-0">
        <Row className="g-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Chọn tòa nhà</Form.Label>
              <Form.Select
                value={selectedBuilding}
                onChange={(e) => setSelectedBuilding(e.target.value)}
              >
                <option value="Tất cả">Tất cả</option>
                <option value="Alpha">Tòa Alpha</option>
                <option value="Beta">Tòa Beta</option>
                <option value="Delta">Tòa Delta</option>
                <option value="Gamma">Tòa Gamma</option>
                <option value="Epsilon">Tòa Epsilon</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Chọn ngày</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Chọn khung giờ</Form.Label>
              <Form.Select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                {timeSlots.map((t, i) => (
                  <option key={i} value={t}>
                    {t}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card>

      <h5 className="mb-3">
        Danh sách phòng{" "}
        {selectedBuilding !== "Tất cả" && (
          <span className="text-muted">({selectedBuilding})</span>
        )}
      </h5>

      <Row>
        {sortedRooms.map((room, index) => (
          <Col xs={6} sm={4} md={3} lg={2} key={index} className="mb-3">
            <Card
              className={`shadow-sm text-center ${
                room.status === "Trống"
                  ? "border-success"
                  : room.status === "Bảo trì"
                  ? "border-warning"
                  : "border-secondary"
              }`}
              style={{
                borderRadius: "10px",
                cursor: room.status === "Trống" ? "pointer" : "not-allowed",
                opacity: room.status === "Trống" ? 1 : 0.6,
                padding: "4px",
                height: "120px",
              }}
              onClick={
                room.status === "Trống"
                  ? () => handleBookRoom(room.name)
                  : undefined
              }
            >
              <Card.Body className="d-flex flex-column justify-content-center align-items-center p-2">
                <h6 className="fw-bold mb-1">{room.name}</h6>
                <small className="text-muted mb-2">{room.building}</small>
                {renderRoomBadge(room.status)}
                {room.status === "Trống" && (
                  <Button
                    variant="primary"
                    size="sm"
                    className="mt-2"
                    style={{
                      borderRadius: "20px",
                      fontSize: "12px",
                      padding: "2px 10px",
                    }}
                    onClick={() => handleBookRoom(room.name)}
                  >
                    Đặt
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ServiceBooking;
