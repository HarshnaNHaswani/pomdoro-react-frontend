import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
export function RequiresAuth({ children }) {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? (
    // children
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
}
