import React, { useState } from "react";

const Processing = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="p-4">
      <h4 className="fw-bold mb-3 text-primary">Xử lý yêu cầu</h4>
      <p>Nhập ghi chú xử lý và nhấn <strong>Xác nhận</strong>.</p>
      <textarea
        className="form-control mb-3"
        rows="4"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Nhập nội dung xử lý..."
      />
      <button className="btn btn-primary">Xác nhận</button>
    </div>
  );
};

export default Processing;
