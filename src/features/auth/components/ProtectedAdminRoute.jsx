// ProtectedAdminRoute.js
import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function ProtectedAdminRoute({ children }) {
  const { authUser } = useAuth();

  if (authUser.role !== "Admin") {
    return <Navigate to="/" />;
  }

  return children;
}
