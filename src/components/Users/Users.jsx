import Table from './Table/Table.jsx';
import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../auth/useAuth';
import { getUsers } from '../../api';
import styles from './users.module.css';

export default function Users(){
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const {token} = useAuth();

  useEffect(()=>{
    if(!token) return;

    getUsers(token)
      .then(data=>setUsers(data))
      .catch(error => console.error("getUsers error:", error));
  }, [token]);

  const filteredUsers = useMemo(()=>{
    const filterCheck = filter.trim().toLowerCase();
    if(!filterCheck) return users;
    return users.filter(user=> user.username.toLowerCase().includes(filterCheck));
  }, [users, filter]);

  return(
    <div className="wrap">
      <div className={styles['user-list-wrap']}>
        <div className={styles['user-list__header']}>
          <h1>User List</h1>
          <input 
            type='text'
            value={filter}
            placeholder='Filter by username'
            onChange={(event)=>setFilter(event.target.value)}
          />
        </div>
        <Table users={filteredUsers} />
      </div>
    </div>
  );
}