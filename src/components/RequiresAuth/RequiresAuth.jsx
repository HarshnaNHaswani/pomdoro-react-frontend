import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "context/auth-context.js";
export function RequiresAuth() {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
}
