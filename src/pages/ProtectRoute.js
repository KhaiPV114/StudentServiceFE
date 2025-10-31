import { Navigate, Outlet } from "react-router-dom";

function ProtectRoute() {
  const isLoggedIn = sessionStorage.getItem("userRole"); 

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectRoute;
