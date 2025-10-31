import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Calendar, Bell, ClipboardCheck, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import  { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Profile from "../components/User/Profile";
import UserFeedback from "../components/User/UserFeedback";

import ServiceBooking from "../components/User/Booking";
import EventsClubs from "../components/User/EventsAndClub";
import EquipmentBorrowing from "../components/User/EquipmentLoan";
import HelpDesk from "../components/User/Helpdesk";

const StudentPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("home");

  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />;
      case "booking":
        return <ServiceBooking />;
      case "events":
        return <EventsClubs />;
      case "equipment":
        return <EquipmentBorrowing />;
      case "helpdesk":
        return <HelpDesk />;
      case "feedback":
        return <UserFeedback />;
      default:
        return (
          <div
            style={{
              background: "linear-gradient(90deg, #FF8008, #FFC837)",
              color: "white",
              padding: "2rem",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <h1>Chào mừng đến với cổng thông tin sinh viên</h1>
            <p>Quản lý hoạt động học tập và dịch vụ của bạn</p>
          </div>
        );
    }
  };

  return (
    <>
      <div
        style={{
          background: "linear-gradient(to right, #FF7A00 70%, #00B894 30%)",
          borderBottomLeftRadius: "60px",
          borderBottomRightRadius: "60px",
          padding: "80px 20px",
          color: "#FFFFFF",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontWeight: "700",
            fontSize: "2.5rem",
            marginBottom: "10px",
          }}
        >
          FPT Campus Service System
        </h1>
        <p style={{ fontSize: "1.1rem", marginBottom: "30px" }}>
          Nơi sinh viên quản lý, đăng ký và sử dụng mọi dịch vụ trong khuôn viên trường
        </p>
        <div>
          <Button
            style={{
              backgroundColor: "#007BFF",
              border: "none",
              padding: "10px 24px",
              borderRadius: "8px",
              marginRight: "12px",
              fontWeight: "500",
            }}
            onClick={() => navigate("/events-clubs")}
          >
            Khám phá ngay
          </Button>
          <Button
            style={{
              backgroundColor: "#FFFFFF",
              color: "#007BFF",
              border: "2px solid #007BFF",
              padding: "10px 24px",
              borderRadius: "8px",
              fontWeight: "500",
            }}
            onClick={() => navigate("/login")}
          >
            Đăng nhập
          </Button>
        </div>
      </div>

      {/* FEATURE SECTION */}
      <Container className="my-5 text-center">
        <h3
          style={{
            color: "#222222",
            fontWeight: "700",
            marginBottom: "30px",
          }}
        >
          Dịch vụ nổi bật
        </h3>

        <Row className="justify-content-center g-4">
          <Col xs={12} md={6} lg={3}>
            <Card
              className="shadow-sm border-0"
              style={{
                backgroundColor: "#007BFF",
                color: "#FFFFFF",
                borderRadius: "16px",
                padding: "20px",
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
              onClick={() => navigate("/room-booking")}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Building2 size={40} className="mb-3" />
              <h5>Đặt phòng học / CLB</h5>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={3}>
            <Card
              className="shadow-sm border-0"
              style={{
                backgroundColor: "#FF7A00",
                color: "#FFFFFF",
                borderRadius: "16px",
                padding: "20px",
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
              onClick={() => navigate("/events-clubs")}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Calendar size={40} className="mb-3" />
              <h5>Sự kiện & CLB</h5>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={3}>
            <Card
              className="shadow-sm border-0"
              style={{
                backgroundColor: "#00B894",
                color: "#FFFFFF",
                borderRadius: "16px",
                padding: "20px",
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
              onClick={() => navigate("/helpdesk")}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <ClipboardCheck size={40} className="mb-3" />
              <h5>Yêu cầu hỗ trợ</h5>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={3}>
            <Card
              className="shadow-sm border-0"
              style={{
                backgroundColor: "#007BFF",
                color: "#FFFFFF",
                borderRadius: "16px",
                padding: "20px",
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
              onClick={() => navigate("/notifications")}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Bell size={40} className="mb-3" />
              <h5>Thông báo</h5>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default StudentPage;
