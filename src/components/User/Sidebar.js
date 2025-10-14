import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaBook, FaEnvelope, FaBars } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { path: "/", name: "Home", icon: <FaHome /> },
    { path: "/services", name: "Services", icon: <FaBook /> },
    { path: "/profile", name: "Profile", icon: <FaUser /> },
    { path: "/contact", name: "Contact", icon: <FaEnvelope /> },
  ];

  return (
    <div
      style={{
        width: isOpen ? "220px" : "70px",
        backgroundColor: "#FFA401",
        color: "white",
        minHeight: "100vh",
        transition: "all 0.3s",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
        overflowX: "hidden",
      }}
      className="shadow-sm d-flex flex-column"
    >
      {/* Header */}
      <div
        className="d-flex align-items-center justify-content-between p-3 border-bottom border-light"
      >
        {isOpen && (
          <h5 className="fw-bold m-0 text-white">Student Service</h5>
        )}
        <FaBars
          style={{
            cursor: "pointer",
            fontSize: "20px",
            color: "white",
          }}
          onClick={toggleSidebar}
        />
      </div>

      {/* Menu */}
      <div className="flex-grow-1 mt-3">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <div
              className={`d-flex align-items-center p-3 ${
                location.pathname === item.path ? "active-menu" : ""
              }`}
              style={{
                backgroundColor:
                  location.pathname === item.path ? "#F95B01" : "transparent",
                transition: "0.2s",
              }}
            >
              <div style={{ fontSize: "20px", width: "30px" }}>{item.icon}</div>
              {isOpen && <span className="ms-2">{item.name}</span>}
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      {isOpen && (
        <div className="text-center small p-3 border-top border-light">
          © {new Date().getFullYear()} Student Service
        </div>
      )}
    </div>
  );
};

export default Sidebar;
