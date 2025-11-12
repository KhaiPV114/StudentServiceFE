import React, { useContext } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";

const UserManagement = () => {
  const { users, getAllUsers, page, totalPages } = useContext(UserContext);
  const token = sessionStorage.getItem("accessToken");

  const handleStatusToggle = async (id, isBanned) => {
    try {
      await axios.patch(
        `http://localhost:9999/users/${id}/status`,
        { status: isBanned ? "ACTIVE" : "BANNED" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      getAllUsers(page); // refresh dữ liệu sau khi update
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái:", err);
    }
  };

  const handlePrev = () => {
    if (page > 1) getAllUsers(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) getAllUsers(page + 1);
  };

  // Nhóm người dùng theo role
  const usersByRole = users.reduce((acc, user) => {
    if (!acc[user.role]) acc[user.role] = [];
    acc[user.role].push(user);
    return acc;
  }, {});

  return (
    <div className="p-4">
      <h4 className="fw-bold mb-3 text-primary">Quản lý người dùng</h4>

      {Object.keys(usersByRole).map((role) => (
        <div key={role} className="mb-4">
          <h5 className="text-secondary">{role}</h5>
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
              {usersByRole[role].length > 0 ? (
                usersByRole[role].map((u, index) => (
                  <tr key={u._id}>
                    <td>{index + 1}</td>
                    <td>{u.name}</td>
                    <td>{u.role}</td>
                    <td>
                      {u.status === "BANNED" ? (
                        <span className="badge bg-danger">Bị khóa</span>
                      ) : (
                        <span className="badge bg-success">Hoạt động</span>
                      )}
                    </td>
                    <td>
                      <button
                        className={`btn btn-sm ${
                          u.status === "BANNED" ? "btn-success" : "btn-danger"
                        }`}
                        onClick={() => handleStatusToggle(u._id, u.status === "BANNED")}
                      >
                        {u.status === "BANNED" ? "Mở khóa" : "Khóa"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    Không có người dùng
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}

      {/* Pagination */}
      <div className="d-flex justify-content-between mt-2">
        <button className="btn btn-sm btn-primary" onClick={handlePrev} disabled={page === 1}>
          Trang trước
        </button>
        <span>Trang {page} / {totalPages}</span>
        <button className="btn btn-sm btn-primary" onClick={handleNext} disabled={page === totalPages}>
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
