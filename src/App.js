import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import "./Style/theme.css";
import AdminPage from "./pages/AdminPage";
import StaffPage from "./pages/StaffPage";
import EventsClubs from "./components/User/EventsAndClub";  
import Helpdesk from "./components/User/Helpdesk";    
import EventDetail from "./components/User/EventDetail";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/events-clubs" element={<EventsClubs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/helpdesk" element={<Helpdesk />} />
        <Route path="/events/:id" element={<EventDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
