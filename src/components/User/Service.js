import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import ServiceBooking from "./Booking";
import EventsClubs from "./EventsAndClub";
import EquipmentBorrowing from "./EquipmentLoan";
import HelpDesk from "./Helpdesk";

const Services = () => {
  const [activeTab, setActiveTab] = useState("booking");

  const renderContent = () => {
    switch (activeTab) {
      case "booking":
        return <ServiceBooking />;
      case "events":
        return <EventsClubs />;
      case "equipment":
        return <EquipmentBorrowing />;
      case "help":
        return <HelpDesk />;
      default:
        return <ServiceBooking />;
    }
  };

  return (
    <div className="p-4">
      <h3 style={{ fontWeight: 700, color: "#0d6efd" }}>Dịch vụ sinh viên</h3>
      <div className="mt-3 mb-4">
        <Button
          variant={activeTab === "booking" ? "primary" : "outline-primary"}
          className="me-2"
          onClick={() => setActiveTab("booking")}
        >
          Đặt dịch vụ
        </Button>
        <Button
          variant={activeTab === "events" ? "primary" : "outline-primary"}
          className="me-2"
          onClick={() => setActiveTab("events")}
        >
          Sự kiện / CLB
        </Button>
        <Button
          variant={activeTab === "equipment" ? "primary" : "outline-primary"}
          className="me-2"
          onClick={() => setActiveTab("equipment")}
        >
          Mượn thiết bị
        </Button>
        <Button
          variant={activeTab === "help" ? "primary" : "outline-primary"}
          onClick={() => setActiveTab("help")}
        >
          Hỗ trợ
        </Button>
      </div>

      <Card
        style={{
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          padding: "1.5rem",
          border: "none",
        }}
      >
        {renderContent()}
      </Card>
    </div>
  );
};

export default Services;
