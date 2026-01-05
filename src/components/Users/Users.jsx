import Table from './Table';
import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/useAuth';
import { getUsers } from '../../api';

export default function Users(){
  const [users, setUsers] = useState([]);
  const {token} = useAuth();

  useEffect(()=>{
    getUsers(token)
      .then(data=>console.log(data))
      .catch(error => console.error("getUsers error:", error));
  }, []);

  return(
    <>
      <h1>User list</h1>
      <Table users={users}/>
    </>
  );
}