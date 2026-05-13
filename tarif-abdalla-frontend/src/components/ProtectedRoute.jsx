import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

// Guards private routes and redirects unauthenticated users.
export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace state={{ from: location.pathname }} />;
  }

  return children;
}
