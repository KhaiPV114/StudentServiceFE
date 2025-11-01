import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (password !== confirm) {
      setError("Password and confirm password do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:9999/auth/register", {
        name,
        email,
        password,
      });

      // set a one-time flash message and navigate immediately to login
      const msg = res.data?.message || "Registration successful. Please login.";
      try {
        sessionStorage.setItem("flash", JSON.stringify({ type: "success", message: msg }));
      } catch (e) {
        // ignore sessionStorage errors
      }
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

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

          <Form onSubmit={handleSubmit}>
            {error && (
              <div className="alert alert-danger mb-3" role="alert">
                {error}
              </div>
            )}

            <Form.Group className="mb-3">
              <Form.Label>
                FullName <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Email <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Password <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>
                Confirm Password <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-enter password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              disabled={loading}
              className="w-100 fw-bold border-0 mb-3"
              style={{
                backgroundColor: "#FFA401",
              }}
            >
              {loading ? "Registering..." : "Register"}
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
