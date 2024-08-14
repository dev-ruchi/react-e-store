import axios from "axios";

const backend = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

backend.interceptors.request.use((req) => {
  if (localStorage.token) {
    req.headers.Authorization = `Bearer ${localStorage.token}`;
  }
  return req;
});

export default backend;
