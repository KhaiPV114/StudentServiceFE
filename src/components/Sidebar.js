// src/components/Sidebar.js
import React, { useState } from "react";
import {
  FaHome,
  FaUser,
  FaBook,
  FaEnvelope,
  FaBars,
  FaUsers,
  FaChartBar,
  FaClipboardList,
  FaTools,
  FaAddressCard,
  FaHistory,
  FaCalendarAlt
} from "react-icons/fa";

const Sidebar = ({ onToggle, onSelect, role = "user" }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [active, setActive] = useState("home");

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) onToggle(newState);
  };

  // ------------------------------
  // 💡 Menu tùy theo vai trò
  // ------------------------------
  const menus = {
    user: [
      { key: "home", name: "Home", icon: <FaHome /> },
      { key: "profile", name: "Profile", icon: <FaUser /> },
      { key: "booking", name: "Đặt phòng họp", icon: <FaBook /> },
      { key: "events", name: "Sự kiện / CLB", icon: <FaClipboardList /> },
      { key: "equipment", name: "Mượn thiết bị", icon: <FaTools /> },
      { key: "helpdesk", name: "Hỗ trợ (Help Desk)", icon: <FaEnvelope /> },
      { key: "bookingHistory", name: "Lịch sử đặt phòng", icon: <FaHistory /> },
      { key: "feedback", name: "Feedback", icon: <FaAddressCard /> },
    ],
    staff: [
      { key: "dashboard", name: "Trang chủ", icon: <FaHome /> },
      { key: "requests", name: "Quản lý yêu cầu", icon: <FaClipboardList /> },
      { key: "resources", name: "Quản lý tài nguyên", icon: <FaTools /> },
      { key: "events", name: "Quản lý Sự kiện", icon: <FaCalendarAlt /> },
      { key: "processing", name: "Xử lý yêu cầu", icon: <FaBook /> },
      {
        key: "feedbacklist",
        name: "Danh sách feedback",
        icon: <FaAddressCard />,
      },
    ],
    admin: [
      { key: "dashboard", name: "Dashboard", icon: <FaChartBar /> },
      { key: "users", name: "Quản lý người dùng", icon: <FaUsers /> },
      { key: "reports", name: "Báo cáo & Thống kê", icon: <FaClipboardList /> },
      { key: "system", name: "Thông báo hệ thống", icon: <FaEnvelope /> },
    ],
  };

  const menuItems = menus[role] || menus.user;

  // ------------------------------
  // 💅 UI
  // ------------------------------
  return (
    <div
      style={{
        width: isOpen ? "220px" : "70px",
        backgroundColor: "#ffffff",
        color: "#1e293b",
        borderRight: "1px solid #e5e7eb",
        minHeight: "100vh",
        transition: "all 0.3s",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
        overflowX: "hidden",
      }}
      className="shadow-soft d-flex flex-column"
    >
      {/* Header */}
      <div
        className="d-flex align-items-center justify-content-between p-3 border-bottom"
        style={{
          background:
            role === "admin"
              ? "linear-gradient(90deg, #FF8008, #FFC837)"
              : role === "staff"
              ? "linear-gradient(90deg, #FF8008, #FFC837)"
              : "linear-gradient(90deg, #FF8008, #FFC837)",
          color: "white",
        }}
      >
        {isOpen && (
          <h5 className="fw-bold m-0">
            {role === "admin"
              ? "Quản trị viên"
              : role === "staff"
              ? "Nhân viên"
              : "Homepage"}
          </h5>
        )}
        <FaBars
          style={{ cursor: "pointer", fontSize: "20px", color: "white" }}
          onClick={toggleSidebar}
        />
      </div>

      {/* Menu */}
      <div className="flex-grow-1 mt-3">
        {menuItems.map((item) => (
          <div
            key={item.key}
            onClick={() => {
              setActive(item.key);
              if (onSelect) onSelect(item.key);
            }}
            className={`d-flex align-items-center p-3 rounded-3 mb-1 ${
              active === item.key ? "active-menu" : ""
            }`}
            style={{
              color: active === item.key ? "#3B82F6" : "#1E293B",
              backgroundColor: active === item.key ? "#E0E7FF" : "transparent",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            <div style={{ fontSize: "20px", width: "30px", color: "#3B82F6" }}>
              {item.icon}
            </div>
            {isOpen && <span className="ms-2">{item.name}</span>}
          </div>
        ))}
      </div>

      {/* Footer */}
      {isOpen && (
        <div className="text-center small p-3 border-top text-muted">
          © {new Date().getFullYear()} Student Portal
        </div>
      )}
    </div>
  );
};

export default Sidebar;
