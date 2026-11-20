import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token && token !== "undefined") {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // FormData
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("expirationTime");

        console.log("401 - Token expired or unauthorized");
      }
    }

    return Promise.reject(error);
  },
);

export default api;
