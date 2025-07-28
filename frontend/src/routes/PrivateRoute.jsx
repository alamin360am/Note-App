import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/AuthContext";
import FullPageLoader from "../components/FullPageLoader";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) return <FullPageLoader />;

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
