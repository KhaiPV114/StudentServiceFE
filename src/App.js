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
import EventDetail from "./components/User/EventDetail";
import { AuthProvider } from "./context/AuthContext";
import { RoomProvider } from "./context/RoomContext";
import { RoomBookingProvider } from "./context/RoomBookingContext";
import UserContext, { UserProvider } from "./context/UserContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoomProvider>
          <RoomBookingProvider>
            <UserProvider>
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Homepage />} />

                {/* Protected routes */}
                <Route element={<ProtectRoute />}>
                  {/* Default route "/" will be handled based on role */}
                  <Route path="/student" element={<StudentPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/staff" element={<StaffPage />} />
                  <Route path="/events" element={<EventsClubs />} />
                  <Route path="/events/:id" element={<EventDetail />} />
                  <Route path="/helpdesk" element={<Helpdesk />} />
                </Route>
              </Routes>
            </UserProvider>
          </RoomBookingProvider>
        </RoomProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
