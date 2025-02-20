import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../zustand/authStore";

const ProtectedRoute = () => {
  const { accessToken } = useAuthStore((state) => state);

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
