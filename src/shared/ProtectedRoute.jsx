import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../zustand/authStore";

const ProtectedRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const { pathname } = useLocation();

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ redirectedFrom: pathname }} />
  );
};

export default ProtectedRoute;
