import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#FFA401",
        color: "white",
        padding: "20px 0",
        marginTop: "auto",
      }}
      className="shadow-sm"
    >
      <Container >
        <Row className="text-center text-md-start">
          <Col md={4} className="mb-3">
            <h5 className="fw-bold">Student Service</h5>
            <p style={{ marginBottom: 0 }}>
              A platform to manage and support student services efficiently and
              conveniently.
            </p>
          </Col>

          <Col md={4} className="mb-3">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/services" className="text-white text-decoration-none">Services</a></li>
              <li><a href="/contact" className="text-white text-decoration-none">Contact</a></li>
            </ul>
          </Col>

          <Col md={4} className="mb-3">
            <h6 className="fw-bold">Contact Us</h6>
            <p className="mb-1">📍 123 Campus Road, University City</p>
            <p className="mb-1">📞 +84 123 456 789</p>
            <p className="mb-0">✉️ support@studentservice.com</p>
          </Col>
        </Row>

        <hr className="border-light" />
        <Row>
          <Col className="text-center small">
            © {new Date().getFullYear()} Student Service. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
