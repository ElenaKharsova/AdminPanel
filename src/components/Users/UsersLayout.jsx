import styles from './users.module.css'
import {Outlet, useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast'
import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../auth/useAuth';
import { deleteUser, getUsers } from '../../api';
import Users from './Users.jsx';
import DeleteUserConfirmModal from './Modal/DeleteUserConfirmModal.jsx';

export default function UsersLayout(){
  const {token} = useAuth();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [direction, setDirection] = useState("up");  
  const [deleteUserId, setDeleteUserId] = useState(null);
  const navigate = useNavigate();
    
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

  function updateUser(userUpdated){
    setUsers(usersPrev=>{
      const index = usersPrev.findIndex(userPrev=>userPrev.id === userUpdated.id);

      if(index===-1){
        return [userUpdated, ...usersPrev]
      }
      const usersNewList = [...usersPrev]
      usersNewList[index]={...usersPrev[index],...userUpdated}
      return usersNewList;
    })
  }

  function handleDeleteUser(){
    console.log("Handle delete user starts")
    if(!deleteUserId) return;
    deleteUser(token, deleteUserId)
      .then(()=>{
        setUsers(prevUsers=> prevUsers.filter(user=>user.id!==deleteUserId));
        closeModalDeleteUser();
        toast.success('User deleted');
        navigate('/');
      })
      .catch(error=>console.error("deleteUsers error:", error));
  }

  function createUser(){
    navigate('new');
  }

  function openModalDeleteUser(event, userId){
    event?.preventDefault();
    setDeleteUserId(userId);
  
    const modal = document.querySelector('#modal');
    const html = document.documentElement;
    const body = document.body;
  
    const marginSize = window.innerWidth - html.clientWidth;
      
    if (marginSize) {
      html.style.marginRight = `${marginSize}px`;
    }
  
    body.classList.add("unscroll");
    modal.showModal();
  }

  function closeModalDeleteUser(){
    const modal = document.querySelector('#modal');
    const body = document.body;
    const html = document.documentElement;
    setDeleteUserId(null);
  
    modal.close();
    html.style.marginRight = "";
    body.classList.remove("unscroll");
  }

  const context = {
    setUsers, direction, setDirection, filter, setFilter, 
    filteredUsers, updateUser, createUser, openModalDeleteUser
  }

  
  return(
  <>
    <div className="wrap">
      <main className={styles["users-wrap"]}>
        <Users context={context}/>
        <Outlet context={context}/>
      </main>
    </div>
    <DeleteUserConfirmModal onHandleDeleteUser={handleDeleteUser} onHandleCloseModal={closeModalDeleteUser}/>
  </>
  );
}