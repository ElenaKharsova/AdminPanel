import {Outlet} from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../auth/useAuth';
import { getUsers } from '../../api';
import Users from './Users.jsx';
import styles from './users.module.css'

export default function UsersLayout(){
  const {token} = useAuth();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
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

    const context = {
      users, direction, setDirection, filter, setFilter, filteredUsers
    }    
  return(
    <div className="wrap">
      <div className={styles["users-wrap"]}>
        <Users context={context}/>
        <Outlet context={context}/>
      </div>
    </div>
  );
}