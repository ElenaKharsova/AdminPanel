import {Outlet} from 'react-router-dom';

export default function UserDetails(){
  return(
    <>
      <h1>Users page</h1>
      <Outlet />
    </>
  );
}