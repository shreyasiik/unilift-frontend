import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function AvailableRides({ rides }) {
  const navigate = useNavigate();

  const handleSelectRide = (ride) => {
  navigate("/ride/status/accepted");

  };

  return (
    <>
      <Header />

      <div className="dashboard">
        <h2>Available Rides 🚕</h2>

        {rides.length === 0 && (
          <p style={{ marginTop: "20px" }}>
            No rides available right now.
          </p>
        )}

        {rides.map((ride, index) => (
          <div key={index} className="ride-card">
            <div className="ride-top">
              <span>{ride.vehicle}</span>
              <span className="price">₹{ride.price}</span>
            </div>

            <div className="ride-route">
              <div className="point">
                <div className="dot pickup"></div>
                <span>{ride.pickup}</span>
              </div>

              <div className="line"></div>

              <div className="point">
                <div className="dot drop"></div>
                <span>{ride.drop}</span>
              </div>
            </div>

            <div className="ride-bottom">
              <span>{ride.seats} seats</span>
              <button
                className="action-btn"
                onClick={() => handleSelectRide(ride)}
              >
                Select Ride
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AvailableRides;
