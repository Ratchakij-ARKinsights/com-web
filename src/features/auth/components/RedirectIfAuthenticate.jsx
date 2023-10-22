import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function RedirectIfAuthenticate({ children }) {
  const { authUser } = useAuth();
  if (authUser) {
    return <Navigate to={"/"} />;
  }
  return children;
}
