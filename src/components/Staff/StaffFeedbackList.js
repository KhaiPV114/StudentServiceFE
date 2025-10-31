import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const StaffFeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filter, setFilter] = useState("all"); // ⭐ Bộ lọc rating

  useEffect(() => {
    // ✅ Giả lập dữ liệu feedback
    const mockFeedbacks = [
      {
        id: 1,
        user: "Nguyễn Văn A",
        content: "Dịch vụ rất tốt, nhân viên hỗ trợ nhiệt tình!",
        rating: 5,
        date: "2025-10-20",
      },
      {
        id: 2,
        user: "Trần Thị B",
        content: "Thời gian xử lý hơi lâu, mong cải thiện thêm.",
        rating: 3,
        date: "2025-10-21",
      },
      {
        id: 3,
        user: "Lê Minh C",
        content: "Phản hồi nhanh, cảm ơn đội ngũ hỗ trợ!",
        rating: 4,
        date: "2025-10-23",
      },
      {
        id: 4,
        user: "Phạm Thảo D",
        content: "Không hài lòng với dịch vụ, phản hồi chậm.",
        rating: 2,
        date: "2025-10-24",
      },
    ];

    setFeedbacks(mockFeedbacks);
  }, []);

  // ✅ Hàm lọc theo rating
  const filteredFeedbacks =
    filter === "all"
      ? feedbacks
      : feedbacks.filter((fb) => fb.rating === parseInt(filter));

  return (
    <div className="card mt-4 shadow-sm border-0">
      {/* Header */}
      <div
        className="card-header d-flex justify-content-between align-items-center fw-bold text-white"
        style={{
          background: "linear-gradient(90deg, #FF8008, #FFC837)",
        }}
      >
        <span>💬 Danh sách Feedback</span>

        {/* Bộ lọc ⭐ */}
        <div className="d-flex align-items-center">
          <label className="me-2 mb-0">Lọc theo đánh giá:</label>
          <select
            className="form-select form-select-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ width: "120px" }}
          >
            <option value="all">Tất cả</option>
            <option value="5">⭐ 5 sao</option>
            <option value="4">⭐ 4 sao</option>
            <option value="3">⭐ 3 sao</option>
            <option value="2">⭐ 2 sao</option>
            <option value="1">⭐ 1 sao</option>
          </select>
        </div>
      </div>

      {/* Body */}
      <div className="card-body">
        {filteredFeedbacks.length === 0 ? (
          <p className="text-muted text-center">Không có feedback phù hợp.</p>
        ) : (
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Người gửi</th>
                <th>Nội dung</th>
                <th>Đánh giá</th>
                <th>Ngày gửi</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedbacks.map((fb, index) => (
                <tr key={fb.id}>
                  <td>{index + 1}</td>
                  <td>
                    <FaUserCircle className="me-2 text-secondary" />
                    {fb.user}
                  </td>
                  <td>{fb.content}</td>
                  <td>
                    {"⭐".repeat(fb.rating)}
                    {"☆".repeat(5 - fb.rating)}
                  </td>
                  <td>{fb.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StaffFeedbackList;
