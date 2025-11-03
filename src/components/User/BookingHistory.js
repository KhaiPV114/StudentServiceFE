import React, { useState } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";

const BookingHistory = () => {
  // Fake data test
  const [bookings, setBookings] = useState([
    {
      id: 1,
      room: "Phòng họp AL101",
      date: "2025-10-25",
      time: "09:00 - 11:00",
      purpose: "Họp nhóm môn lập trình web",
      status: "approved",
    },
    {
      id: 2,
      room: "Phòng họp BE204",
      date: "2025-10-20",
      time: "13:00 - 15:00",
      purpose: "Trao đổi đồ án tốt nghiệp",
      status: "pending",
    },
    {
      id: 3,
      room: "Phòng họp DE301",
      date: "2025-09-30",
      time: "08:00 - 10:00",
      purpose: "CLB IT Meeting",
      status: "rejected",
    },
  ]);

  const handleCancel = (id) => {
    if (window.confirm("Bạn có chắc muốn hủy yêu cầu này không?")) {
      setBookings(bookings.filter((b) => b.id !== id));
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge bg="success">Đã duyệt</Badge>;
      case "pending":
        return <Badge bg="warning" text="dark">Đang chờ</Badge>;
      case "rejected":
        return <Badge bg="danger">Từ chối</Badge>;
      default:
        return <Badge bg="secondary">Không xác định</Badge>;
    }
  };

  return (
    <div className="p-4">
      <h4 className="fw-bold mb-3 text-primary">📅 Lịch sử đặt phòng</h4>
      <Table bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Phòng</th>
            <th>Ngày</th>
            <th>Giờ</th>
            <th>Mục đích</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center text-muted">
                Không có lịch sử đặt phòng nào.
              </td>
            </tr>
          ) : (
            bookings.map((b, index) => (
              <tr key={b.id}>
                <td>{index + 1}</td>
                <td>{b.room}</td>
                <td>{b.date}</td>
                <td>{b.time}</td>
                <td>{b.purpose}</td>
                <td>{getStatusBadge(b.status)}</td>
                <td>
                  {b.status === "pending" && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleCancel(b.id)}
                    >
                      <FaTrashAlt className="me-1" /> Hủy
                    </Button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default BookingHistory;
