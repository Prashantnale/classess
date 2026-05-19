import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");

  return !token ? children : <Navigate to="/admin/product" />;
};

export default PublicRoute;
