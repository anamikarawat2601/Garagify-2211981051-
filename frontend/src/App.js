import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sign from "./pages/Signup";
import About from "./pages/About";
import ShowNearbyGarages from "./pages/ShowNearbyGarages";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";
import AddStore from "./pages/AddStore";
import Garage from "./pages/Garage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/about" element={<About />} />
        <Route path="/shownearbygarages" element={<ShowNearbyGarages />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addstore" element={<AddStore />} />
        <Route path="/garage" element={<Garage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
