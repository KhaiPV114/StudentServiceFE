import React, { useEffect, useState } from "react";
import { Form, Button, Table, Badge, Spinner } from "react-bootstrap";
import axios from "axios";

const API_TICKETS = "http://localhost:9999/tickets";

const COLORS = {
  primary: "#FF7A00",
  hoverPrimary: "#E56A00",
  success: "#00B894",
  textDark: "#222222",
  textLight: "#555555",
  border: "#E0E0E0",
  bgLight: "#FAFAFA",
};

const Helpdesk = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "maintenance",
  });
  const [submitting, setSubmitting] = useState(false);

  // 🟢 Lấy danh sách ticket
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(API_TICKETS);
        setTickets(res.data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách ticket:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  // 🟡 Gửi yêu cầu hỗ trợ
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const newTicket = {
        ...form,
        userId: "6714c1a8f8e8b21b2f11a101", // user mặc định
        status: "pending",
      };
      const res = await axios.post(API_TICKETS, newTicket);
      setTickets((prev) => [...prev, res.data]);
      setForm({ title: "", description: "", category: "maintenance", priority: "normal" });
      alert("Gửi yêu cầu hỗ trợ thành công!");
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      alert("Gửi yêu cầu thất bại! Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case "resolved":
        return <Badge bg="success">Đã xử lý</Badge>;
      case "pending":
        return <Badge bg="warning" text="dark">Đang chờ</Badge>;
      case "assigned":
        return <Badge bg="info">Đang xử lý</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <h4 className="mb-4" style={{ color: COLORS.textDark }}>
        Gửi yêu cầu hỗ trợ (Help Desk)
      </h4>

      {/* Form gửi yêu cầu */}
      <Form
        onSubmit={handleSubmit}
        className="p-4 shadow-sm rounded"
        style={{ backgroundColor: COLORS.bgLight }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Tiêu đề yêu cầu</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tiêu đề..."
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mô tả chi tiết</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Nhập mô tả chi tiết vấn đề..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Loại yêu cầu</Form.Label>
          <Form.Select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          >
            <option value="maintenance">Bảo trì / Sửa chữa</option>
            <option value="suggestion">Đề xuất / Góp ý</option>
            <option value="feedback">Phản hồi</option>
          </Form.Select>
        </Form.Group>

        <Button
          type="submit"
          disabled={submitting}
          style={{
            backgroundColor: COLORS.primary,
            border: "none",
            fontWeight: 500,
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = COLORS.hoverPrimary)}
          onMouseOut={(e) => (e.target.style.backgroundColor = COLORS.primary)}
        >
          {submitting ? "Đang gửi..." : "Gửi yêu cầu"}
        </Button>
      </Form>

      {/* Danh sách ticket */}
      <h5 className="mt-5 mb-3" style={{ color: COLORS.textDark }}>
        Danh sách yêu cầu đã gửi
      </h5>

      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : tickets.length === 0 ? (
        <p style={{ color: COLORS.textLight }}>Chưa có yêu cầu hỗ trợ nào.</p>
      ) : (
        <Table bordered hover responsive>
          <thead style={{ backgroundColor: "#FFF3E6" }}>
            <tr>
              <th>#</th>
              <th>Tiêu đề</th>
              <th>Loại</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t, index) => (
              <tr key={t._id}>
                <td>{index + 1}</td>
                <td>{t.title}</td>
                <td>{t.category}</td>
                <td>{renderStatusBadge(t.status)}</td>
                <td>
                  {t.createdAt
                    ? new Date(t.createdAt).toLocaleDateString("vi-VN")
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Helpdesk;
