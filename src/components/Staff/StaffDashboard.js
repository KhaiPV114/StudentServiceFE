// src/components/Staff/StaffDashboard.js
import React, { useEffect, useState } from "react";
import { FaChartLine, FaUserCheck, FaBook, FaCommentDots } from "react-icons/fa";

const StaffDashboard = () => {
  const [stats, setStats] = useState([
    { icon: <FaUserCheck />, label: "Yêu cầu đã xử lý", value: 128 },
    { icon: <FaBook />, label: "Dịch vụ đang hoạt động", value: 24 },
    { icon: <FaChartLine />, label: "Hiệu suất tháng này", value: "92%" },
    { icon: <FaCommentDots />, label: "Tổng feedback", value: 0 },
  ]);

  useEffect(() => {
    // ✅ Giả lập số feedback (sau này lấy từ API)
    const totalFeedback = 3;
    setStats((prev) =>
      prev.map((s) =>
        s.label === "Tổng feedback" ? { ...s, value: totalFeedback } : s
      )
    );
  }, []);

  return (
    <div className="p-4">
      <h4 className="fw-bold mb-3 text-primary">Tổng quan công việc</h4>

      <div className="row">
        {stats.map((item, index) => (
          <div key={index} className="col-md-3 mb-3">
            <div className="card shadow-sm border-0 p-3 text-center">
              <div className="fs-2 text-primary mb-2">{item.icon}</div>
              <h6 className="fw-bold">{item.label}</h6>
              <p className="fs-5 mb-0">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffDashboard;
