import React, { useContext, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AdminDashboard from "../components/Admin/Admindashboard";
import UserManagement from "../components/Admin/Usermanagement";
import Reports from "../components/Admin/Reports";
import SystemNotice from "../components/Admin/SystemNotice";
import UserContext from "../context/UserContext";

const AdminPage = () => {
  const [selected, setSelected] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (selected) {
      case "dashboard":
        return <AdminDashboard />;
      case "users":
        return <UserManagement />;
      case "reports":
        return <Reports />;
      case "system":
        return <SystemNotice />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar cố định */}
      <Sidebar role="admin" onToggle={setSidebarOpen} onSelect={setSelected} />

      {/* Phần nội dung chính */}
      <div
        style={{
          marginLeft: sidebarOpen ? "220px" : "70px", // 🔥 giúp tránh bị che
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

export default AdminPage;
