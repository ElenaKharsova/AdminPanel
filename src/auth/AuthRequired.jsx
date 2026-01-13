import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';

export default function AuthRequired(){

  const {isAuthenticated} = useAuth();
  const location = useLocation();

    if(!isAuthenticated){
      return <Navigate 
        to="/login" 
        replace
        state={{
          pathname: location.pathname,
          search: location.search
        }}/>
    }

    return <Outlet/>
}