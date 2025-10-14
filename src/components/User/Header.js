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
    <Navbar expand="lg" style={{ backgroundColor: '#FFA401' }} className="shadow-sm">
      <Container >
        {/* <Navbar.Brand
          href="/"
          className="fw-bold text-white"
          style={{ fontSize: '1.5rem' }}
        >
          Student Service
        </Navbar.Brand> */}
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          {/* <Nav className="me-auto">
            <Nav.Link href="/" className="text-white">Home</Nav.Link>
            <Nav.Link href="/services" className="text-white">Services</Nav.Link>
            <Nav.Link href="/contact" className="text-white">Contact</Nav.Link>
          </Nav> */}
          <Nav>
            <NavDropdown
              title={<span className="text-white">{user.name}</span>}
              id="user-dropdown"
              align="end"
            >
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
