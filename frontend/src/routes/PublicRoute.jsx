import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/AuthContext";
import FullPageLoader from "../components/FullPageLoader";

const PublicRoute = ({ children }) => {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) return <FullPageLoader />;

  return user ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;
