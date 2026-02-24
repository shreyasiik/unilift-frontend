const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://unilift-backend.onrender.com".replace(/\/$/, "")
    : "http://localhost:5000";

export default API_BASE;