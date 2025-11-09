import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StaffDashboard from "../components/Staff/StaffDashboard";
import RoomRequests from "../components/Staff/RoomRequest";
import ResourceManagement from "../components/Staff/ResourceManagemnent";
import Processing from "../components/Staff/RequestProcessing";
import StaffFeedbackList from "../components/Staff/StaffFeedbackList";
import BookingHistory from "../components/User/BookingHistory";
import EventManagement from "../components/Staff/EventManagement";

const StaffPage = () => {
  const [selected, setSelected] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (selected) {
      case "dashboard":
        return <StaffDashboard />;
      case "requests":
        return <RoomRequests />;
      case "resources":
        return <ResourceManagement />;
      case "processing":
        return <Processing />;
      case "events":
        return <EventManagement />;
      case "feedbacklist":
        return <StaffFeedbackList/>;
      case "bookings":
        return <BookingHistory />;
      default:
        return <StaffDashboard />;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar cố định bên trái */}
      <Sidebar role="staff" onToggle={setSidebarOpen} onSelect={setSelected} />

      {/* Nội dung chính */}
      <div
        style={{
          marginLeft: sidebarOpen ? "220px" : "70px", // 🔥 quan trọng
          transition: "margin-left 0.3s ease",
          width: "100%",
          backgroundColor: "#fafafa",
          minHeight: "100vh",
        }}
      >
        <Header />
        <div className="p-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default StaffPage;
