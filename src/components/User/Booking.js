import React, { useContext } from "react";
import { Card, Form, Row, Col, Button, Badge } from "react-bootstrap";
import RoomContext from "../../context/RoomContext";

const ServiceBooking = () => {
  const {
    rooms,
    slots,
    roomsAvailable,
    location,
    setLocation,
    date,
    setDate,
    slotId,
    setSlotId,
    getRoomsAvailable,
    loading,
    setRoomsAvailable,
    bookingRoom
  } = useContext(RoomContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    getRoomsAvailable(location, slotId, date);
  };

  const handleReset = () => {
    setLocation("");
    setDate("");
    setSlotId("");
    setRoomsAvailable([]);
  };

  // 🟩 Hàm xử lý khi ấn "Đặt"
  const handleBook = (room) => {
    const confirmBooking = window.confirm(
      `Bạn có chắc muốn đặt phòng ${room.name} không?`
    );
    if (confirmBooking) {
      // 🟢 Ở đây bạn có thể gọi API hoặc hàm đặt phòng
      bookingRoom(localStorage.getItem("id"), room._id, slotId, date);
      alert(`Đã đặt phòng ${room.name} thành công!`);
      // ví dụ: bookRoom(room._id, slotId, date)
    }
  };

  return (
    <div>
      <h4 className="mb-4">Đặt phòng học nhóm / CLB</h4>

      <Card className="mb-4 p-3 shadow-sm border-0">
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Chọn tòa nhà</Form.Label>
                <Form.Select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">Tất cả</option>
                  {[...new Set(rooms.map((r) => r.location))].map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Chọn ngày</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Chọn khung giờ</Form.Label>
                <Form.Select
                  value={slotId}
                  onChange={(e) => setSlotId(e.target.value)}
                >
                  <option value="">-- Chọn khung giờ --</option>
                  {slots.map((slot) => (
                    <option key={slot._id} value={slot._id}>
                      {slot.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col className="d-flex gap-2 justify-content-end">
              <Button
                variant="outline-secondary"
                type="button"
                onClick={handleReset}
              >
                Đặt lại
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Đang tìm..." : "Tìm phòng"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      <h5 className="mb-3">
        Danh sách phòng{" "}
        {location && <span className="text-muted">({location})</span>}
      </h5>

      <Row>
        {roomsAvailable?.length === 0 ? (
          <div className="text-center text-muted my-4">
            Không tìm thấy phòng trống
          </div>
        ) : (
          roomsAvailable?.map((room, i) => (
            <Col key={i} xs={6} sm={4} md={3} lg={2} className="mb-3">
              <Card
                className="shadow-sm text-center border-success"
                style={{ borderRadius: "10px", cursor: "pointer" }}
              >
                <Card.Body>
                  <h6 className="fw-bold mb-1">Phòng {room.name}</h6>
                  <Badge bg="success">Trống</Badge>
                  <Button
                    variant="primary"
                    size="sm"
                    className="mt-2"
                    style={{
                      borderRadius: "20px",
                      fontSize: "12px",
                      padding: "2px 10px",
                    }}
                    onClick={() => handleBook(room)} // 👈 Gọi hàm confirm
                  >
                    Đặt
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default ServiceBooking;
