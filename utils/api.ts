import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://expensetrackergg.up.railway.app",
});

export default api;
