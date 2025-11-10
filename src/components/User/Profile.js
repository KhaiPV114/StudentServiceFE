import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

const Profile = () => {
  const [user, setUser] = useState();
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [newName, setName] = useState("");
  const [newEmail, setEmail] = useState("");

  const userId = localStorage.getItem("id");

  const getUserById = async () => {
    try {
      const response = await axios.get(`http://localhost:9999/users/${userId}`);
      setUser(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async () => {
  try {
    const response = await axios.put(`http://localhost:9999/users/${userId}`, {
      name: newName,
      email: newEmail,
    });

    alert("Cập nhật thông tin thành công!");
    getUserById();
  } catch (error) {
    console.error("Lỗi cập nhật:", error);
    alert("Cập nhật thất bại!");
  }
};

// const updatePassword = async () => {
//   try {
//     const response = await axios.put(`http://localhost:9999/users/${userId}`, {
//       name: newName,
//       email: newEmail,
//     });
//     alert("Cập nhật thông tin thành công!");
//   } catch (error) {
    
//   }
// }


  useEffect(() => {
    getUserById();
  }, []);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateInfo = () => {
    alert("Cập nhật thông tin thành công!");
  };

  const handleChangePassword = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    alert("Đổi mật khẩu thành công!");
    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "30px 20px",
      }}
    >
      <h3 style={{ fontWeight: "700", marginBottom: "1.5rem" }}>
        Quản lý tài khoản
      </h3>

      {/* Thông tin cá nhân */}
      <Card
        style={{
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "25px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h5 className="mb-3">Thông tin cá nhân</h5>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={newName}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={newEmail}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Khoa</Form.Label>
                <Form.Select
                  name="major"
                  value={user.major}
                  onChange={handleChange}
                >
                  <option>Công nghệ thông tin</option>
                  <option>Kinh tế</option>
                  <option>Ngôn ngữ Anh</option>
                  <option>Luật</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row> */}

          <Button
            variant="primary"
            onClick={updateProfile}
            style={{ marginTop: "5px" }}
          >
            Cập nhật thông tin
          </Button>
        </Form>
      </Card>

      {/* Đổi mật khẩu */}
      <Card
        style={{
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h5 className="mb-3">Đổi mật khẩu</h5>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu hiện tại</Form.Label>
            <Form.Control
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu mới</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Xác nhận mật khẩu mới</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <Button variant="success" onClick={handleChangePassword}>
            Đổi mật khẩu
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
