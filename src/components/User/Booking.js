import React, {  use, useContext, useState } from "react";
import { Row, Col, Card, Badge, Button, Form } from "react-bootstrap";
import RoomContext from "../../context/RoomContext";

const ServiceBooking = () => {
  const [selectedBuilding, setSelectedBuilding] = useState("Tất cả");
  const [selectedDate, setSelectedDate] = useState("");
  const {rooms, slots, roomsAvailable, location, setLocation, date, setDate, slotId, setSlotId} = useContext(RoomContext);
  // console.log("room: " + rooms);
  // console.log("slot: " + slots);


  const filteredRooms = selectedBuilding === "Tất cả"
    ? rooms
    : rooms.filter(room => room.location === selectedBuilding);

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
                onChange={(e) => {setSelectedBuilding(e.target.value); setLocation(e.target.value)}}
              >
                <option value="Tất cả" default>Tất cả</option>
                {rooms && rooms.length > 0 && (
                  <>
                    {[...new Set(rooms.map(room => room.location))].map((location, index) => (
                      <option key={index} value={location}>{location}</option>
                    ))}
                  </>
                )}
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
                {slots && slots.length > 0 && (
                  slots.map((slot) => (
                    <option key={slot._id} value={slot._id}>{slot.name} : {slot.startTime} - {slot.endTime}</option>
                  ))
                )}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card>

      <h5 className="mb-3">
        Danh sách phòng{" "}
        {rooms !== "Tất cả" && (
          <span className="text-muted">({selectedBuilding})</span>
        )}
      </h5>

      {/* Danh sách phòng hiển thị ở đây */}
      <Row>
        {/* Ví dụ template 1 phòng */}
        {filteredRooms.map((room) => (
        <Col xs={6} sm={4} md={3} lg={2} className="mb-3">
          <Card
            className="shadow-sm text-center border-success"
            style={{
              borderRadius: "10px",
              cursor: "pointer",
              padding: "4px",
              height: "120px",
            }}
          >
            <Card.Body className="d-flex flex-column justify-content-center align-items-center p-2">
              <h6 className="fw-bold mb-1">{room.name}</h6>
              <small className="text-muted mb-2">{room.location}</small>
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
              >
                Đặt
              </Button>
            </Card.Body>
          </Card>
        </Col>
        ))}
      </Row>
    </div>
  );
};

export default ServiceBooking;
