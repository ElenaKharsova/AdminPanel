import Table from './Table';
import { useState, useEffect } from 'react';

export default function Users(){
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    
  }, []);

  return(
    <>
      <h1>User list</h1>
      <Table users={users}/>
    </>
  );
}