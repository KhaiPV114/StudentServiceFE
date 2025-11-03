import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import "./Style/theme.css";
import AdminPage from "./pages/AdminPage";
import StaffPage from "./pages/StaffPage";
import EventsClubs from "./components/User/EventsAndClub";
import Helpdesk from "./components/User/Helpdesk";
import ProtectRoute from "./pages/ProtectRoute";
import StudentPage from "./pages/StudentPage";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/staff" element={<StaffPage />} />
        {/* Protected routes */}
        <Route element={<ProtectRoute />}>
          {/* Default route "/" will be handled based on role */}
          <Route path="/" element={<Homepage />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/admin" element={<AdminPage />} />
          {/* <Route path="/staff" element={<StaffPage />} /> */}
          <Route path="/events-clubs" element={<EventsClubs />} />
          <Route path="/helpdesk" element={<Helpdesk />} />
        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
