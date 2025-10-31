import React from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  return (
    <div
      style={{
        backgroundColor: "#f88d29ff",
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Card
          className="p-4 shadow-lg"
          style={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "15px",
            border: "none",
          }}
        >
          <h3
            className="text-center mb-4 fw-bold"
            style={{ color: "#F95B01" }}
          >
            Student Service Register
          </h3>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your full name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Create a password" />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Re-enter password" />
            </Form.Group>

            <Button
              type="submit"
              className="w-100 fw-bold border-0 mb-3"
              style={{
                backgroundColor: "#FFA401",
              }}
            >
              Register
            </Button>

            <div className="text-center mb-3 fw-bold text-secondary">or</div>

            <Button
              variant="light"
              className="w-100 d-flex align-items-center justify-content-center border"
              style={{
                borderRadius: "8px",
                padding: "10px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <FcGoogle size={20} className="me-2" />
              <span style={{ color: "#444" }}>Sign up with Google</span>
            </Button>
          </Form>

          <div className="text-center mt-3">
            <small>
              Already have an account?{" "}
              <a href="/login" style={{ color: "#F95B01" }}>
                Login here
              </a>
            </small>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
