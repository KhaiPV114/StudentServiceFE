import React, { useState } from "react";
import { FaChartBar, FaUsers, FaClipboardList, FaTools, FaStar } from "react-icons/fa";
import { Table, Card } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Reports = () => {
  const [reportData] = useState({
    summary: {
      totalRequests: 320,
      totalResources: 85,
      totalUsers: 150,
      avgRating: 4.2,
    },
    monthlyStats: [
      { month: "Tháng 6", requests: 280, feedback: 60 },
      { month: "Tháng 7", requests: 310, feedback: 80 },
      { month: "Tháng 8", requests: 290, feedback: 70 },
      { month: "Tháng 9", requests: 350, feedback: 90 },
      { month: "Tháng 10", requests: 420, feedback: 110 },
    ],
    topUsers: [
      { id: 1, name: "Nguyễn Văn A", requests: 25, feedbacks: 4 },
      { id: 2, name: "Trần Thị B", requests: 21, feedbacks: 6 },
      { id: 3, name: "Phạm Văn C", requests: 18, feedbacks: 3 },
    ],
  });

  return (
    <div className="p-4">
      <h4 className="fw-bold mb-4 text-primary d-flex align-items-center">
        <FaChartBar className="me-2" /> Báo cáo & Thống kê hệ thống
      </h4>

      {/* 🧮 Thống kê tổng quan */}
      <div className="row mb-4">
        <div className="col-md-3">
          <Card className="shadow-sm border-0 p-3 text-center">
            <FaClipboardList className="text-primary fs-3 mb-2" />
            <h6>Yêu cầu đã xử lý</h6>
            <p className="fw-bold fs-5">{reportData.summary.totalRequests}</p>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="shadow-sm border-0 p-3 text-center">
            <FaTools className="text-success fs-3 mb-2" />
            <h6>Tài nguyên đang hoạt động</h6>
            <p className="fw-bold fs-5">{reportData.summary.totalResources}</p>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="shadow-sm border-0 p-3 text-center">
            <FaUsers className="text-info fs-3 mb-2" />
            <h6>Người dùng hoạt động</h6>
            <p className="fw-bold fs-5">{reportData.summary.totalUsers}</p>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="shadow-sm border-0 p-3 text-center">
            <FaStar className="text-warning fs-3 mb-2" />
            <h6>Điểm đánh giá TB</h6>
            <p className="fw-bold fs-5">{reportData.summary.avgRating} ⭐</p>
          </Card>
        </div>
      </div>

      {/* 📊 Biểu đồ thống kê */}
      <Card className="shadow-sm border-0 p-3 mb-4">
        <h6 className="fw-bold mb-3 text-primary">Thống kê theo tháng</h6>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={reportData.monthlyStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="requests" fill="#007bff" name="Yêu cầu" />
            <Bar dataKey="feedback" fill="#ffc107" name="Feedback" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* 🏆 Top người dùng */}
      <Card className="shadow-sm border-0 p-3">
        <h6 className="fw-bold mb-3 text-primary">Top người dùng nổi bật</h6>
        <Table striped hover responsive>
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Họ tên</th>
              <th>Yêu cầu đã gửi</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {reportData.topUsers.map((u, index) => (
              <tr key={u.id}>
                <td>{index + 1}</td>
                <td>{u.name}</td>
                <td>{u.requests}</td>
                <td>{u.feedbacks}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default Reports;
