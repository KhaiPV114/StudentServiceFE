// src/components/User/Sidebar.js
import React, { useState } from "react";
import { FaHome, FaUser, FaBook, FaEnvelope, FaBars } from "react-icons/fa";

const Sidebar = ({ onToggle, onSelect }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [active, setActive] = useState("home");

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) onToggle(newState);
  };

  const menuItems = [
    { key: "home", name: "Home", icon: <FaHome /> },
    { key: "profile", name: "Profile", icon: <FaUser /> },
    { key: "service", name: "Services", icon: <FaBook /> },
    { key: "Contact", name: "Contact", icon: <FaEnvelope /> },
  ];

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
          background: "linear-gradient(90deg, #FF8008, #FFC837)",
          color: "white",
        }}
      >
        {isOpen && <h5 className="fw-bold m-0">Homepage</h5>}
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
              backgroundColor:
                active === item.key ? "#E0E7FF" : "transparent",
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
