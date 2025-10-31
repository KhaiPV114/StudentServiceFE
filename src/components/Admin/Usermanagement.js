import React, { useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Nguyễn Văn A", role: "Sinh viên", isBanned: false },
    { id: 2, name: "Trần Thị B", role: "Nhân viên", isBanned: true },
    { id: 3, name: "Hoàng Minh Chính", role: "Admin", isBanned: false },
    { id: 4, name: "Phạm Văn C", role: "Sinh viên", isBanned: false },
  ]);

  // Hàm bật/tắt trạng thái ban
  const handleBanToggle = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isBanned: !user.isBanned } : user
      )
    );
  };

  return (
    <div className="p-4">
      <h4 className="fw-bold mb-3 text-primary">Quản lý người dùng (Test Mode)</h4>
      <table className="table table-hover align-middle shadow-sm">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Họ tên</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={u.id}>
              <td>{index + 1}</td>
              <td>{u.name}</td>
              <td>{u.role}</td>
              <td>
                {u.isBanned ? (
                  <span className="badge bg-danger">Bị khóa</span>
                ) : (
                  <span className="badge bg-success">Hoạt động</span>
                )}
              </td>
              <td>
                <button
                  className={`btn btn-sm ${
                    u.isBanned ? "btn-success" : "btn-danger"
                  }`}
                  onClick={() => handleBanToggle(u.id)}
                >
                  {u.isBanned ? "Mở khóa" : "Khóa"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
