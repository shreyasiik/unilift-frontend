import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DriverDashboard from "./pages/DriverDashboard";
import RiderDashboard from "./pages/RiderDashboard";
import CreateRide from "./pages/CreateRide";
import RideStatus from "./pages/RideStatus";
import SearchRide from "./pages/SearchRide";
import AvailableRides from "./pages/AvailableRides";

import DriverRideConfirmed from "./pages/DriverRideConfirmed";


import "./App.css";

function App() {
  // ✅ GLOBAL RIDES STATE
  const [rides, setRides] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login/:role" element={<Login />} />
        <Route path="/signup/:role" element={<Signup />} />

        <Route
          path="/driver/dashboard"
          element={<DriverDashboard rides={rides} />}
        />

        <Route
          path="/rider/dashboard"
          element={<RiderDashboard rides={rides} />}
        />

        <Route
          path="/driver/create-ride"
          element={<CreateRide setRides={setRides} />}
        />

        <Route path="/search-ride" element={<SearchRide />} />

        <Route path="/ride/status/:status" element={<RideStatus />} />

        <Route
  path="/driver/ride-confirmed"
  element={<DriverRideConfirmed />}
/>
<Route
  path="/available-rides"
  element={<AvailableRides rides={rides} />}
/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
