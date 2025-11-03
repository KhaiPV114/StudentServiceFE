import React from "react";
import { Card, Row, Col, Button, Badge } from "react-bootstrap";

const EquipmentLoan = () => {
  // Dữ liệu mẫu — có thể thay bằng dữ liệu từ API sau này
  const equipments = [
    { id: 1, name: "Máy chiếu", duration: "3 ngày", status: "Còn sẵn" },
    { id: 2, name: "Laptop", duration: "1 tuần", status: "Đã mượn" },
    { id: 3, name: "Micro không dây", duration: "2 ngày", status: "Còn sẵn" },
    { id: 4, name: "Loa Bluetooth", duration: "3 ngày", status: "Bảo trì" },
  ];

  // Sắp xếp: Còn sẵn → Bảo trì → Đã mượn
  const sortedEquipments = [...equipments].sort((a, b) => {
    const order = { "Còn sẵn": 1, "Bảo trì": 2, "Đã mượn": 3 };
    return order[a.status] - order[b.status] || a.name.localeCompare(b.name);
  });

  const renderStatusBadge = (status) => {
    switch (status) {
      case "Còn sẵn":
        return <Badge bg="success">{status}</Badge>;
      case "Bảo trì":
        return <Badge bg="warning" text="dark">{status}</Badge>;
      case "Đã mượn":
        return <Badge bg="secondary">{status}</Badge>;
      default:
        return <Badge bg="light" text="dark">{status}</Badge>;
    }
  };

  return (
    <div>
      <h4 className="mb-4">Mượn thiết bị học tập</h4>

      <Row>
        {sortedEquipments.map((item) => (
          <Col md={6} lg={4} key={item.id} className="mb-4">
            <Card
              className="shadow-sm border-0 h-100"
              style={{ borderRadius: "12px" }}
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Badge bg="info">Thiết bị</Badge>
                  {renderStatusBadge(item.status)}
                </div>

                <Card.Title style={{ fontWeight: 600 }}>{item.name}</Card.Title>
                <Card.Text className="mb-3">
                  <strong>Thời gian mượn:</strong> {item.duration}
                </Card.Text>

                <Button
                  variant="primary"
                  size="sm"
                  disabled={item.status !== "Còn sẵn"}
                >
                  {item.status === "Còn sẵn" ? "Đăng ký mượn" : "Không khả dụng"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default EquipmentLoan;
