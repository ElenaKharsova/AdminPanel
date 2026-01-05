import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './useAuth';

export default function AuthRequired(){

    const {isAuthenticated} = useAuth();
    console.log("AuthRequired: isAuthenticated =", isAuthenticated);
    
    if(!isAuthenticated){
      return <Navigate 
        to="/login" 
        replace/>
    }
    console.log("AuthRequired: authenticated");

    return <Outlet/>
}