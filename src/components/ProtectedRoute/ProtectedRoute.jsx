// components/ProtectedRoute.js
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAdmin } from "../../Store/authSlice";

export default function ProtectedRoute({ children }) {
  const isAdmin = useSelector(selectIsAdmin);

  // Also check localStorage as a fallback
  const localStorageAdmin = localStorage.getItem("user") === "admin";

  if (!isAdmin && !localStorageAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
