import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";

function CreateRide({ setRides }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    pickup: "",
    drop: "",
    vehicle: "",
    seats: "",
    time: "",
    price: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setRides((prev) => [...prev, form]); // ✅ SAVE RIDE
    navigate("/driver/dashboard");
  };

  return (
    <>
      <Header />

      <div className="auth-page">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h2 className="auth-title">Create a Ride</h2>
          navigate("/driver/ride-confirmed");


          <input name="pickup" placeholder="Pickup Location" onChange={handleChange} required />
          <input name="drop" placeholder="Drop Location" onChange={handleChange} required />

          <select name="vehicle" onChange={handleChange} required>
            <option value="">Vehicle</option>
            <option>Bike</option>
            <option>Car</option>
          </select>

          <input name="seats" type="number" placeholder="Seats" onChange={handleChange} required />
          <input name="time" type="time" onChange={handleChange} required />
          <input name="price" type="number" placeholder="Price ₹" onChange={handleChange} required />

          <button className="primary-btn">Publish Ride</button>
        </form>
      </div>
    </>
  );
}

export default CreateRide;
