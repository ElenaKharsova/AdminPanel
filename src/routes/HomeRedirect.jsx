import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function HomeRedirect(){
  const {isAuthenticated} = useAuth();
  console.log("HomeRedirect: isAuthenticated =", isAuthenticated);

    return (
    <Navigate 
      to={isAuthenticated ? "/users" : "/login"} 
      replace />
  );
}