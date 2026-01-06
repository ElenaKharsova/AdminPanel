import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './useAuth';

export default function AuthRequired(){

    const {isAuthenticated} = useAuth();

    if(!isAuthenticated){
      return <Navigate 
        to="/login" 
        replace/>
    }

    return <Outlet/>
}