import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const RoomBookingContext = createContext(null);

export const RoomBookingProvider = ({ children }) => {
  const [bookingRequests, setBookingRequests] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);

  const getBookingRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:9999/roombookings`);
      setBookingRequests(response.data);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách booking:", err);
    }
  };

  const approveBookingRequest = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:9999/roombookings/${id}/approve`
      );
      if (res.data.success) {
        const updated = res.data.data;
        setBookingRequests((prev) =>
          prev.map((b) => (b._id === updated._id ? updated : b))
        );
      } else {
        alert(res.data.message || "Không thể duyệt yêu cầu");
      }
    } catch (err) {
      console.error("Lỗi duyệt booking:", err);
      alert(err.response?.data?.message || "Lỗi server khi duyệt booking");
    }
  };

  const cancelBookingRequest = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:9999/roombookings/${id}/cancel`
      );
      if (res.data.success) {
        setBookingRequests((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: "CANCELLED" } : b))
        );
      } else {
        alert(res.data.message || "Không thể hủy yêu cầu");
      }
    } catch (err) {
      console.error("Lỗi hủy booking:", err);
      alert(err.response?.data?.message || "Lỗi server khi hủy booking");
    }
  };

  const getBookingHistory = async () => {
    try {
      const userId = localStorage.getItem("id");

      const response = await axios.get(
        `http://localhost:9999/roombookings/${userId}/user`
      );

      console.log("HIS: " + response.data);

      setBookingHistory(response.data);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách booking history:", err);
    }
  };

  useEffect(() => {
    getBookingRequests();
    getBookingHistory();
  }, []);

  return (
    <RoomBookingContext.Provider
      value={{
        bookingRequests,
        approveBookingRequest,
        cancelBookingRequest,
        getBookingRequests,
        getBookingHistory,
        bookingHistory,
        setBookingRequests
      }}
    >
      {children}
    </RoomBookingContext.Provider>
  );
};

export default RoomBookingContext;
