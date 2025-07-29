import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/AuthContext";

function HomeRedirect() {
  const navigate = useNavigate();
  const {user} = useContext(UserContext);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  return null;
}

export default HomeRedirect;
