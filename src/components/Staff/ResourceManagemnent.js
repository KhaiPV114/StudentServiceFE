import React from "react";
import { FaTools } from "react-icons/fa";

const ResourceManagement = () => {
  const resources = [
    { id: 1, name: "Phòng họp 101", type: "Phòng học" },
    { id: 2, name: "Máy in Canon", type: "Thiết bị" },
    { id: 3, name: "Phòng LAB 305", type: "Phòng thí nghiệm" },
  ];

  return (
    <div className="p-4">
      <h4 className="fw-bold mb-3 text-primary">
        <FaTools className="me-2" /> Quản lý tài nguyên
      </h4>
      <ul className="list-group">
        {resources.map((r) => (
          <li key={r.id} className="list-group-item d-flex justify-content-between">
            <span>{r.name}</span>
            <span className="text-muted small">{r.type}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceManagement;
