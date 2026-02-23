import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

function Login() {
  const { role } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        if (role === "driver") {
          navigate("/driver/dashboard");
        } else {
          navigate("/search-ride");
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
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

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="primary-btn">
              Login
            </button>
          </form>

          <p
            className="auth-link"
            onClick={() => navigate(`/signup/${role}`)}
          >
            Don’t have an account? Sign up
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;