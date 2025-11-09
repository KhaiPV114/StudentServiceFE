import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Profile from "../components/User/Profile";
import UserFeedback from "../components/User/UserFeedback";
import { Container, Row } from "react-bootstrap";

import ServiceBooking from "../components/User/Booking";
import EventsClubs from "../components/User/EventsAndClub";
import EquipmentBorrowing from "../components/User/EquipmentLoan";
import HelpDesk from "../components/User/Helpdesk";
import BookingHistory from "../components/User/BookingHistory";
import EventDetail from "../components/User/EventDetail";

const StudentPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />;
      case "booking":
        return <ServiceBooking />;
      case "bookingHistory":
        return <BookingHistory />;
      case "events":
        return <EventsClubs />;
        case "eventsDetail":
        return <EventDetail />;
      case "equipment":
        return <EquipmentBorrowing />;
      case "helpdesk":
        return <HelpDesk />;
      case "bookingHistory":
        return <BookingHistory/>
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
      <Sidebar onToggle={setIsSidebarOpen} onSelect={setActiveTab} role="user" />
      <div
        style={{
          marginLeft: isSidebarOpen ? "220px" : "70px",
          transition: "margin-left 0.3s ease",
        }}
      >
        <Header />
        <Container fluid className="my-5">
          <Row>{renderContent()}</Row>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default StudentPage;
