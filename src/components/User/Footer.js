import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
    style={{
      backgroundColor: "#ffffff",
      color: "#4b5563",
      padding: "20px 0",
      borderTop: "1px solid #e5e7eb",
    }}
    className="shadow-soft"
  >
    <Container>
      <Row className="text-center text-md-start">
        <Col md={4} className="mb-3">
          <h5 className="fw-bold text-primary">Student Portal</h5>
          <p style={{ marginBottom: 0 }}>
            Manage and support student services efficiently and conveniently.
          </p>
        </Col>

        <Col md={4} className="mb-3">
          <h6 className="fw-bold">Quick Links</h6>
          <ul className="list-unstyled">
            <li><a href="/" className="text-primary text-decoration-none">Home</a></li>
            <li><a href="/services" className="text-primary text-decoration-none">Services</a></li>
            <li><a href="/contact" className="text-primary text-decoration-none">Contact</a></li>
          </ul>
        </Col>

        <Col md={4} className="mb-3">
          <h6 className="fw-bold">Contact Us</h6>
          <p className="mb-1">📍 123 Campus Road, University City</p>
          <p className="mb-1">📞 +84 123 456 789</p>
          <p className="mb-0">✉️ support@studentportal.com</p>
        </Col>
      </Row>

      <hr className="border-light" />
      <Row>
        <Col className="text-center small text-muted">
          © {new Date().getFullYear()} Student Portal. All rights reserved.
        </Col>
      </Row>
    </Container>
  </footer>
  );
};

export default Footer;
