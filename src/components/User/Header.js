// src/components/UserHeader.jsx
import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

const Header = () => {
  // Giả sử user info được lưu trong sessionStorage sau khi login
  const user = JSON.parse(sessionStorage.getItem('user')) || { name: 'Guest' };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/login';
  };

  return (
    <Navbar bg="light" expand="lg" className="px-3">
      <Container fluid>
        {/* Logo gần sidebar */}
        <Navbar.Brand href="/" className="me-auto fw-bold">
          Student Portal
        </Navbar.Brand>

        {/* Nút toggle (mobile) */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Guest nằm sát phải */}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <NavDropdown title="Guest" id="basic-nav-dropdown" align="end">
              <NavDropdown.Item href="login">Login</NavDropdown.Item>
              <NavDropdown.Item href="register">Register</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
