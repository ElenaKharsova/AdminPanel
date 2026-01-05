import {Navigate, Outlet} from 'react-router-dom';
import { getToken } from '../../storage';

export default function AuthRequired(){
  const token = getToken();
  console.log("AuthRequired token:", token);

  if(!token){
    return <Navigate 
    to="/login" 
    replace/>
  }
  console.log("AuthRequired: authenticated");
  return <Outlet/>
}