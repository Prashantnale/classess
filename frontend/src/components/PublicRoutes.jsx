import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");

  return !token ? children : <Navigate to="/admin/dashboard" />;
};

export default PublicRoute;
