import axios from "axios";

const api = axios.create({
  baseURL: "https://back-end-music-app.onrender.com/api",
});

export default api;