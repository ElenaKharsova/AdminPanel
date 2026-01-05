import Table from './Table/Table.jsx';
import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../auth/useAuth';
import { getUsers } from '../../api';
import styles from './users.module.css';

export default function Users(){
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const {token} = useAuth();

  const [direction, setDirection] = useState("up");  

  useEffect(()=>{
    if(!token) return;

    getUsers(token)
      .then(data=>setUsers(data))
      .catch(error => console.error("getUsers error:", error));
  }, [token]);

  const filteredUsers = useMemo(()=>{
    const filterCheck = filter.trim().toLowerCase();
    let resultUsers = users;

    if(filterCheck){
      resultUsers = users.filter(user=> user.username.toLowerCase().includes(filterCheck));
    }

    resultUsers = [...resultUsers].sort((a,b)=>{ 
      return direction === "up" ? a.id-b.id : b.id - a.id
    });

    return resultUsers;
  }, [users, filter, direction]);

  function changeSorting(){
    console.log("Direction changed");
    setDirection(prev=>prev==="up" ? "down" : "up");
  }

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
        <Table users={filteredUsers} direction={direction} changeSorting={changeSorting}/>
      </div>
    </div>
  );
}