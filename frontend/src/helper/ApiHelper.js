import axios from "axios";

// ✅ Backend base URLs
const BASE_URL = "http://localhost:3000";

const Api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

Api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // 401 - Token invalid / expired
      if (error.response.status === 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("users");
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  },
);

const sessionStore = (token, user) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("users", JSON.stringify(user));
};

const sessionRemove = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("users");
};

const handleApiError = (error, setError = null, addToast = null) => {
  if (error.response && error.response.status === 422) {
    if (setError) setError(error.response.data.errors || {});
    if (addToast) addToast("Please fix the validation errors", "danger");
  } else {
    const message = error.response?.data?.message || "Internal server error";
    if (addToast) {
      addToast(message, "danger");
    } else {
      alert(message);
    }
  }
};

export { Api, BASE_URL, sessionStore, sessionRemove, handleApiError };
