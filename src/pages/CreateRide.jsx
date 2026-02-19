import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

/* 📍 Pickup Emoji Marker */
const pickupIcon = L.divIcon({
  html: "<div style='font-size:34px;'>📍</div>",
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

/* 🔵 Live Location Dot */
const liveIcon = L.divIcon({
  html: "<div style='width:16px;height:16px;background:#007bff;border-radius:50%;border:3px solid white;'></div>",
  className: "",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

/* 🗺 Auto Recenter */
function RecenterMap({ coords }) {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.flyTo([coords.lat, coords.lng], 17, {
        animate: true,
        duration: 1.2,
      });
    }
  }, [coords, map]);

  return null;
}

/* 🔵 Live GPS Tracking */
function LiveLocation() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.watchPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => console.log(err),
      { enableHighAccuracy: true }
    );
  }, []);

  return position ? <Marker position={position} icon={liveIcon} /> : null;
}

/* 📍 Click To Select Pickup */
function LocationMarker({ setAddress, setCoords }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      setCoords({ lat, lng });

      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      )
        .then((res) => res.json())
        .then((data) => {
          setAddress(data.display_name);
        });
    },
  });

  return position ? <Marker position={position} icon={pickupIcon} /> : null;
}

function CreateRide({ setRides }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    pickup: "",
    pickupCoords: null,
    drop: "",
    vehicle: "",
    seats: "",
    time: "",
    price: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePickupBlur = async () => {
    if (!form.pickup) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${form.pickup}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);

        setForm((prev) => ({
          ...prev,
          pickupCoords: { lat, lng },
        }));
      }
    } catch (err) {
      console.log("Geocoding error:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRides((prev) => [...prev, form]);
    navigate("/driver/dashboard");
  };

  return (
    <>
      <Header />

      <div className="auth-page">
        <div className="auth-card large-card">
          <h2 className="auth-title">Create a Ride</h2>

          <input
            name="pickup"
            value={form.pickup}
            placeholder="Pickup Location"
            onChange={handleChange}
            onBlur={handlePickupBlur}
            required
          />

          <div className="map-wrapper">
            <MapContainer
              center={[22.7196, 75.8577]}
              zoom={16}
              className="map-container"
            >
              <RecenterMap coords={form.pickupCoords} />

              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />

              <LiveLocation />

              <LocationMarker
                setAddress={(address) =>
                  setForm((prev) => ({ ...prev, pickup: address }))
                }
                setCoords={(coords) =>
                  setForm((prev) => ({
                    ...prev,
                    pickupCoords: coords,
                  }))
                }
              />
            </MapContainer>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              name="drop"
              placeholder="Drop Location"
              onChange={handleChange}
              required
            />

            <select name="vehicle" onChange={handleChange} required>
              <option value="">Vehicle</option>
              <option>Bike</option>
              <option>Car</option>
            </select>

            <input
              name="seats"
              type="number"
              placeholder="Seats"
              onChange={handleChange}
              required
            />

            <input
              name="time"
              type="time"
              onChange={handleChange}
              required
            />

            <input
              name="price"
              type="number"
              placeholder="Price ₹"
              onChange={handleChange}
              required
            />

            <button className="primary-btn">Publish Ride</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateRide;
