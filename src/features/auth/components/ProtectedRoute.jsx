import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { authUser } = useAuth();

  if (!authUser) return <Navigate to={"/login"} />;

  // if (authUser.role === "Admin") return <Navigate to="/admin" />;

  return children;
}
