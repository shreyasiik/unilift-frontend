import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

function Login() {
  const { role } = useParams();
  const navigate = useNavigate();

  const handleLogin = () => {
  if (role === "driver") {
    navigate("/driver/dashboard");
  } else {
    navigate("/search-ride");
  }
};

  return (
    <>
      <Header />

      <div className="auth-page">
        <div className="auth-card">
          <h2 className="auth-title">
            {role === "driver" ? "Driver Login" : "Rider Login"}
          </h2>

          <p style={{ textAlign: "center", marginBottom: "15px" }}>
            {role === "driver"
              ? "Login to manage your rides"
              : "Login to find rides near you"}
          </p>

          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />

          <button className="primary-btn" onClick={handleLogin}>
            Login
          </button>

          <p className="auth-link" onClick={() => navigate(`/signup/${role}`)}>
            Don’t have an account? Sign up
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
