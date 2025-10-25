import React from "react";

const UserManagement = () => {
  const users = [
    { id: 1, name: "Nguyễn Văn A", role: "Sinh viên" },
    { id: 2, name: "Trần Thị B", role: "Nhân viên" },
    { id: 3, name: "Admin", role: "Quản trị viên" },
  ];

  return (
    <div className="p-4">
      <h4 className="fw-bold mb-3 text-primary">Quản lý người dùng</h4>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Họ tên</th>
            <th>Vai trò</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
