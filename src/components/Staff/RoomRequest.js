import React from "react";

const RoomRequests = () => {
  const requests = [
    { id: 1, name: "Xác nhận điểm rèn luyện", status: "Đang xử lý" },
    { id: 2, name: "Xin giấy xác nhận sinh viên", status: "Hoàn thành" },
    { id: 3, name: "Cấp lại thẻ sinh viên", status: "Chờ duyệt" },
  ];

  return (
    <div className="p-4">
      <h4 className="fw-bold mb-3 text-primary">Danh sách yêu cầu</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên yêu cầu</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.name}</td>
              <td>
                <span
                  className={`badge ${
                    r.status === "Hoàn thành"
                      ? "bg-success"
                      : r.status === "Chờ duyệt"
                      ? "bg-warning text-dark"
                      : "bg-info"
                  }`}
                >
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomRequests;
