import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function HomeRedirect(){
  const auth = useAuth();

    return (
    <Navigate 
      to={auth.isAuthenticated ? "/users" : "/login"} 
      replace />
  );
}