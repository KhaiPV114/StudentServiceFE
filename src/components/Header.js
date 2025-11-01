import React, { useState, useEffect, useRef, useContext } from "react";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, logout } = useContext(AuthContext);
  const userName = user?.name || "Guest";
  const userRole = (user?.role || "").toUpperCase();

  const handleLogout = () => {
    logout();
  };
  
  useEffect(() => {
    const handleNewNotification = (event) => {
      const newNoti = {
        id: Date.now(),
        message: event.detail.message,
        time: "Vừa xong",
      };
      setNotifications((prev) => [newNoti, ...prev]);
    };

    window.addEventListener("new-notification", handleNewNotification);
    return () =>
      window.removeEventListener("new-notification", handleNewNotification);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <Navbar bg="light" expand="lg" className="px-3 shadow-sm sticky-top">
      <Container fluid>
        <Navbar.Brand href="/" className="me-auto fw-bold text-primary">
          Student Portal
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            {/* 🛎️ Chỉ hiển thị chuông nếu là user */}
            {(userRole !== "ADMIN" && userRole !== "STAFF") && (
              <div className="position-relative me-3" ref={dropdownRef}>
                <FaBell
                  className="fs-4 text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsOpen(!isOpen)}
                />
                {notifications.length > 0 && (
                  <Badge
                    bg="danger"
                    pill
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {notifications.length}
                  </Badge>
                )}

                {/* Popup danh sách thông báo */}
                {isOpen && (
                  <div
                    className="position-absolute end-0 mt-2 shadow-lg"
                    style={{
                      width: "320px",
                      background: "white",
                      borderRadius: "10px",
                      zIndex: 100,
                      maxHeight: "350px",
                      overflowY: "auto",
                    }}
                  >
                    <div
                      className="p-3 border-bottom fw-bold"
                      style={{
                        background: "linear-gradient(90deg, #FF8008, #FFC837)",
                        color: "white",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                      }}
                    >
                      Thông báo
                    </div>

                    {notifications.length === 0 ? (
                      <div className="p-3 text-center text-muted">
                        Không có thông báo mới
                      </div>
                    ) : (
                      notifications.map((noti) => (
                        <div
                          key={noti.id}
                          className="d-flex justify-content-between align-items-start p-3 border-bottom"
                        >
                          <div>
                            <div className="fw-semibold">{noti.message}</div>
                            <div className="small text-muted">{noti.time}</div>
                          </div>
                          <button
                            className="btn btn-sm btn-outline-danger ms-2"
                            onClick={() => removeNotification(noti.id)}
                          >
                            ×
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 👤 Dropdown user info */}
            <NavDropdown
              title={userName || "Guest"}
              id="basic-nav-dropdown"
              align="end"
            >
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
