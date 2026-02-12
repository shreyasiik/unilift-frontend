import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

function Signup() {
  const { role } = useParams();
  const navigate = useNavigate();

  const handleSignup = () => {
    if (role === "driver") navigate("/driver/dashboard");
    else navigate("/rider/dashboard");
  };

  return (
    <>
      <Header />

      <div className="auth-page">
        <div className="auth-card">
          <h2 className="auth-title">
            {role === "driver" ? "Driver Signup" : "Rider Signup"}
          </h2>

          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />

          {role === "driver" && (
            <>
              <input type="text" placeholder="Driving License Number" />
              <input type="text" placeholder="Vehicle Type (Bike / Car)" />
              <input type="text" placeholder="Vehicle Number" />
            </>
          )}

          <button className="primary-btn" onClick={handleSignup}>
            Create Account
          </button>

          <p className="auth-link" onClick={() => navigate(`/login/${role}`)}>
            Already have an account? Login
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
