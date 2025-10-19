import React from "react";
import { Card, Row, Col, Button, Badge } from "react-bootstrap";

const EventsClubs = () => {
  // Dữ liệu mẫu — sau này có thể lấy từ API
  const activities = [
    {
      id: 1,
      type: "CLB",
      name: "CLB Lập trình",
      schedule: "Thứ 7 hàng tuần",
      status: "Đang hoạt động",
    },
    {
      id: 2,
      type: "Sự kiện",
      name: "Ngày hội việc làm",
      schedule: "25/10/2025",
      status: "Sắp diễn ra",
    },
    {
      id: 3,
      type: "CLB",
      name: "CLB Tiếng Anh",
      schedule: "Thứ 5 hàng tuần",
      status: "Đang tuyển thành viên",
    },
  ];

  // Hiển thị trạng thái đẹp hơn
  const renderStatusBadge = (status) => {
    switch (status) {
      case "Đang hoạt động":
        return <Badge bg="success">{status}</Badge>;
      case "Sắp diễn ra":
        return <Badge bg="info">{status}</Badge>;
      case "Đang tuyển thành viên":
        return <Badge bg="warning" text="dark">{status}</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <div>
      <h4 className="mb-4">Đăng ký tham gia sự kiện hoặc CLB</h4>
      <p>Xem danh sách các CLB, sự kiện và đăng ký.</p>

      <Row>
        {activities.map((item) => (
          <Col md={6} lg={4} key={item.id} className="mb-4">
            <Card
              className="shadow-sm border-0 h-100"
              style={{ borderRadius: "12px" }}
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Badge
                    bg={item.type === "CLB" ? "primary" : "secondary"}
                  >
                    {item.type}
                  </Badge>
                  {renderStatusBadge(item.status)}
                </div>

                <Card.Title style={{ fontWeight: 600 }}>
                  {item.name}
                </Card.Title>
                <Card.Text>
                  <strong>Lịch:</strong> {item.schedule}
                </Card.Text>

                <Button variant="primary" size="sm">
                  Đăng ký
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default EventsClubs;
