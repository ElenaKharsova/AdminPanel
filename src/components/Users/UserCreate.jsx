import { postUser } from '../../api';
import { useAuth } from '../../auth/useAuth';
import { useState } from 'react';
import { useOutletContext, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'
import UserForm from './UserForm';


export default function UserCreate(){
  const {token} = useAuth(); 
  const navigate = useNavigate();
  const {setUsers, openModalDeleteUser} = useOutletContext();  
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  function createUser(event){
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    const payload = {
      username: formData.get('username')?.toString() ?? '',
      first_name: formData.get('firstName')?.toString() ?? '',
      last_name: formData.get('lastName')?.toString() ?? '',
      password: formData.get('password')?.toString() ?? '',
      is_active: formData.get('isActive') === 'on'
    }
  
    postUser(token, payload)
      .then(data=>{
        setUsers(curUsers=>[...curUsers, data]);
        toast.success('User created');
        navigate('..');
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
        toast.error('Could not create user');        
      })
      .finally(()=>{
        setIsSaving(false);
      })
  }

  return(
    <UserForm 
      mode='create'
      saveUser={createUser} 
      isSaving={isSaving} 
      openModalDeleteUser={openModalDeleteUser}
      error={error}
    />
  );
}