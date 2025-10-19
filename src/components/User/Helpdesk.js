import React from "react";
import { Button } from "react-bootstrap";

const HelpDesk = () => (
  <div>
    <h5 style={{ fontWeight: 600, color: "#0d6efd" }}>Hỗ trợ / Góp ý</h5>
    <p>
      Gửi yêu cầu bảo trì, sửa chữa hoặc góp ý cho nhà trường. Theo dõi trạng
      thái xử lý và phản hồi nhanh chóng.
    </p>
    <Button variant="primary">Gửi yêu cầu</Button>
  </div>
);

export default HelpDesk;
