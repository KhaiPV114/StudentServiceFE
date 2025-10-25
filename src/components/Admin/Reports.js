import React from "react";

const Reports = () => {
  const reports = [
    { id: 1, name: "Thống kê yêu cầu tháng 10", date: "2025-10-01" },
    { id: 2, name: "Hoạt động tài nguyên", date: "2025-09-25" },
  ];

  return (
    <div className="p-4">
      <h4 className="fw-bold mb-3 text-primary">Báo cáo & Thống kê</h4>
      <ul className="list-group">
        {reports.map((r) => (
          <li key={r.id} className="list-group-item d-flex justify-content-between">
            <span>{r.name}</span>
            <small className="text-muted">{r.date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
