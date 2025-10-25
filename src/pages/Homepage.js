// src/pages/Homepage.js
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Profile from "../components/User/Profile";
import Service from "../components/User/Service";
import { Container, Row } from "react-bootstrap";

const Homepage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />;
      case "service":
        return <Service />;
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
      <Sidebar onToggle={setIsSidebarOpen} onSelect={setActiveTab} />
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

export default Homepage;
