import styles from './users.module.css'
import {Outlet, useNavigate, useSearchParams} from 'react-router-dom';
import toast from 'react-hot-toast'
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../../auth/useAuth';
import { deleteUser, getUsers } from '../../api';
import Users from './Users.jsx';
import DeleteUserConfirmModal from './Modal/DeleteUserConfirmModal.jsx';

export default function UsersLayout(){
  const {token} = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState(searchParams.get('filter') ?? '');
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null);
  
  const sort = searchParams.get('sort') === 'desc' ? 'desc' : 'asc';
    
  useEffect(()=>{
    if(!token) return;

    setIsLoading(true);
    getUsers(token)
      .then(data=>setUsers(data))
      .catch(error => {
        if(error.message === 'NETWORK_ERROR'){
          setError('Network error. Check your internet connection and try again.');
          return;
        }        
        if(error.status === 401 || error.status === 403){
          setError('Login, please');
          return;
        }
        if(error.status >= 500){
          setError('Server error. Please try again later.');
          return;
        }
      })
      .finally(()=>{
        setIsLoading(false);
      });
  }, [token]);
  const filteredUsers = useMemo(()=>{
    const filterCheck = filter.trim().toLowerCase();
    let resultUsers = [...users];
  
    if(filterCheck){
      resultUsers = users.filter(user=> user.username.toLowerCase().includes(filterCheck));
    }
    
    resultUsers = [...resultUsers].sort((a,b)=>{ 
      return sort === "asc" ? a.id-b.id : b.id - a.id
    });
    
    return resultUsers;
  }, [users, filter, sort]);

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
    if(!deleteUserId) return;
    deleteUser(token, deleteUserId)
      .then(()=>{
        setUsers(prevUsers=> prevUsers.filter(user=>user.id!==deleteUserId));
        closeModalDeleteUser();
        toast.success('User deleted');
        navigate('..', {replace: true});
      })
      .catch(error=>{
        if(error.message === 'NETWORK_ERROR'){
          setError('Network error. Check your internet connection and try again.');
          return;
        }        
        if(error.status === 401 || error.status === 403){
          setError('Login, please');
          return;
        }
        if(error.status >= 500){
          setError('Server error. Please try again later.');
          return;
        }
      });
  }

  function createUser(){
    navigate(`new?${searchParams}`);
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

  const setAllSearchParams = useCallback((key, value)=>{  
    
    setSearchParams(prevParams=>{
      const prevValue = prevParams.get(key) ?? '';
      const newValue = value === null ? '' : String(value);

      if(prevValue===newValue){
        return prevValue;
      }

      if(value===null) {
        prevParams.delete(key)
      } else {
        prevParams.set(key, value)  
      }
      return prevParams;
    }, {replace: true})  
  },[setSearchParams])

  const context = useMemo(()=>({
    sort, isLoading, error, filter, setFilter, filteredUsers, createUser, setAllSearchParams }),
    [sort, isLoading, error, filter, setFilter, filteredUsers, createUser, setAllSearchParams]);

  const contextOut = useMemo(()=>({ 
    updateUser, setUsers , openModalDeleteUser }),
    [updateUser, setUsers , openModalDeleteUser]);

  
  return(
  <>
    <div className="wrap">
      <main className={styles["users-wrap"]}>
        <Users context={context}/>
        <Outlet context={contextOut}/>
      </main>
    </div>
    <DeleteUserConfirmModal onHandleDeleteUser={handleDeleteUser} onHandleCloseModal={closeModalDeleteUser}/>
  </>
  );
}