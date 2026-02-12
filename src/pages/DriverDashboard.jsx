import Header from "../components/Header";
import RideCard from "../components/RideCard";
import { useNavigate } from "react-router-dom";

function DriverDashboard({ rides }) {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div className="dashboard">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2>Your Published Rides</h2>

          <button
            className="primary-btn"
            onClick={() => navigate("/driver/create-ride")}
          >
            + Publish Ride
          </button>
        </div>

        {rides.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              marginTop: "20px",
            }}
          >
            <p style={{ marginBottom: "15px" }}>
              You haven’t published any rides yet.
            </p>

            <button
              className="primary-btn"
              onClick={() => navigate("/driver/create-ride")}
            >
              Create Your First Ride
            </button>
          </div>
        ) : (
          rides.map((ride, index) => (
            <RideCard key={index} mode="driver" ride={ride} />
          ))
        )}
      </div>
    </>
  );
}

export default DriverDashboard;
