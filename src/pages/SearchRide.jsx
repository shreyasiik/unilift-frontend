import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function SearchRide() {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/rider/dashboard");
  };

  return (
    <>
      <Header />

      <div className="auth-page">
        <form className="auth-card" onSubmit={handleSearch}>
          <h2 className="auth-title">Where do you want to go?</h2>

          <input
            type="text"
            placeholder="📍Pickup location"
            required
          />

          <input
            type="text"
            placeholder="🏁Drop location"
            required
          />
         


          <button className="primary-btn" type="submit">
            Search Rides
          </button>
        </form>
      </div>
    </>
  );
}

export default SearchRide;
