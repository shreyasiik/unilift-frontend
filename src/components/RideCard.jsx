import { useNavigate } from "react-router-dom";

function RideCard({ mode, ride }) {
  const navigate = useNavigate();

  const handleRequest = () => {
    navigate("/ride-status/accepted"); // rider confirmation
  };

  return (
    <div className="ride-card">
      <div className="ride-top">
        <span>{ride.vehicle}</span>
        <span className="price">₹{ride.price}</span>
      </div>

      <div className="ride-route">
        <p>📍 {ride.pickup}</p>
        <p>🏁 {ride.drop}</p>
        <p>⏰ {ride.time}</p>
      </div>

      {/* ✅ BUTTON ONLY FOR RIDER */}
      {mode === "rider" && (
        <button className="action-btn" onClick={handleRequest}>
          Request Ride
        </button>
      )}
    </div>
  );
}

export default RideCard;
