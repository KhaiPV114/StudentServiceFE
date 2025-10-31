import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:9999/auth/login", {
        email,
        password,
      });

      const { accessToken, refreshToken } = response.data;
      
      if (accessToken && refreshToken) {
        // Store tokens
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        
        // Decode the JWT to get user info
        const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
        
        // Store user role and other relevant info
        localStorage.setItem("userRole", decodedToken.role);

        // Navigate based on role
        switch (decodedToken.role) {
          case "ADMIN":
            navigate("/admin");
            break;
          case "STAFF":
            navigate("/staff");
            break;
          default:
            navigate("/"); // for regular users
        }
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again later.");
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
            Student Service Login
          </h3>

          <Form onSubmit={handleSubmit}>
            {error && (
              <div className="alert alert-danger mb-3" role="alert">
                {error}
              </div>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              className="w-100 fw-bold border-0 mb-3"
              style={{
                backgroundColor: "#FFA401",
              }}
            >
              Login
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
              <span style={{ color: "#444" }}>Login with Google</span>
            </Button>
          </Form>

          <div className="text-center mt-3">
            <small>
              Don’t have an account?{" "}
              <a href="/register" style={{ color: "#F95B01" }}>
                Sign up
              </a>
            </small>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
