import React, { useContext, useState } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import RoomBookingContext from "../../context/RoomBookingContext";
import axios from "axios";

const BookingHistory = () => {
  const { bookingHistory, setBookingRequests } = useContext(RoomBookingContext);

  const cancelBooking = async (id) => {
        try {
          const res = await axios.post(
            `http://localhost:9999/roombookings/${id}/reject`
          );
          if (res.data.success) {
            setBookingRequests((prev) =>
              prev.map((b) =>
                b._id === id ? { ...b, status: "CANCELLED" } : b
              )
            );
          } else {
            alert(res.data.message || "Không thể hủy yêu cầu");
          }
        } catch (err) {
          console.error("Lỗi hủy booking:", err);
          alert(err.response?.data?.message || "Lỗi server khi hủy booking");
        }
      };

  const handleCancel = (id) => {
    if (window.confirm("Bạn có chắc muốn hủy yêu cầu này không?")) {
      cancelBooking(id)
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "BOOKED":
        return <Badge bg="success">BOOKED</Badge>;
      case "PENDING":
        return (
          <Badge bg="warning" text="dark">
            PENDING
          </Badge>
        );
      case "CANCELLED":
        return <Badge bg="danger">CANCELLED</Badge>;
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
            {/* <th>Mục đích</th> */}
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {bookingHistory?.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center text-muted">
                Không có lịch sử đặt phòng nào.
              </td>
            </tr>
          ) : (
            bookingHistory?.map((b, index) => (
              <tr key={b.id}>
                <td>{index + 1}</td>
                <td>{b.roomId.name}</td>
                <td>{new Date(b.date).toISOString().split("T")[0]}</td>
                <td>{b.slotId.name}</td>
                <td>{getStatusBadge(b.status)}</td>
                <td>
                  {b.status === "PENDING" && (
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
