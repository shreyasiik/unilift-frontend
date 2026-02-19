import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

function LocationMarker({ setPosition }) {
  const [position, setLocalPosition] = useState(null);

  useMapEvents({
    click(e) {
      setLocalPosition(e.latlng);
      setPosition(e.latlng);
    }
  });

  return position === null ? null : <Marker position={position}></Marker>;
}

export default function MapPicker({ setCoordinates }) {
  const [position, setPosition] = useState(null);

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
      setPosition(coords);
      setCoordinates(coords);
    });
  };

  return (
    <div>
      <button onClick={handleLocation}>
        Use My Location 📍
      </button>

      <MapContainer
        center={[22.7196, 75.8577]} // Default center (change to your city)
        zoom={13}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker setPosition={setCoordinates} />
      </MapContainer>
    </div>
  );
}
