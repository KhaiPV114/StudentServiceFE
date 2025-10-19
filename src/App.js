import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import "./Style/theme.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
