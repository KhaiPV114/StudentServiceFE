import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/StudentPage";
import "./Style/theme.css";
import AdminPage from "./pages/AdminPage";
import StaffPage from "./pages/StaffPage";
import EventsClubs from "./components/User/EventsAndClub";
import Helpdesk from "./components/User/Helpdesk";
import ProtectRoute from "./pages/ProtectRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />

        <Route element={<ProtectRoute />}>
          <Route path="/events-clubs" element={<EventsClubs />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/helpdesk" element={<Helpdesk />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
