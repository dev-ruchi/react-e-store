import axios from "axios";

const backend = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

backend.interceptors.request.use((req) => {
  if (localStorage.token) {
    req.headers.Authorization = localStorage.token;
  }
  return req;
});

export default backend;
