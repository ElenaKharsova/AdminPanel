import { useAuth } from '../../auth/useAuth';
import { getUser, putUser } from '../../api';
import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import toast from 'react-hot-toast'
import UserForm from './UserForm'

export default function UserUpdate(){
  const {token} = useAuth();
  const params = useParams();
  const userId = params.id;
  const [user, setUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false)
  const {updateUser, openModalDeleteUser} = useOutletContext();
  const [error, setError] = useState(null);

  useEffect(()=>{
    if(!token) return;

    setError(null);
    setUser(null);

    getUser(token, userId)
    .then((data)=>setUser(data))
    .catch(error => {
      if(error.message === 'NETWORK_ERROR'){
        setError('Network error. \nCheck your internet connection and try again.');
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
  },[userId, token])
    
  function saveUser(event){
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const payload = {
      id: user.id,
      username: formData.get('username')?.toString().trim() ?? '',
      first_name: formData.get('firstName')?.toString() ?? '',
      last_name: formData.get('lastName')?.toString() ?? '',
      password: formData.get('password')?.toString() ?? '',
      is_active: formData.get('isActive') === 'on'
    }

    if(!payload.username || !payload.password) {
      setError(`Login and password can't be empty`);
      return;
    }

    if(payload.password.length < 8 || !(/^(?=.*[A-Z])(?=.*\d).+$/).test(payload.password)) {
      setError('Password should be 8+ character, \n1 capital, 1 numeric');
      return;
    }

    setIsSaving(true);
    
    putUser(token, payload)
      .then(data=>{
        setUser(data);
        updateUser(data);
        toast.success('Changes saved');
      })  
      .catch(error => {
        console.error("getUsers error:", error);
        toast.error('Could not save changes');
        })
      .finally(()=>setIsSaving(false));    
  }

  if(!user) return <div className='loading' role="status">Loading...</div>;

  return(
    <UserForm 
      mode={'update'}
      user={user} 
      userId={userId} 
      saveUser={saveUser} 
      isSaving={isSaving} 
      openModalDeleteUser={openModalDeleteUser}
      error={error}
    />
  );
}