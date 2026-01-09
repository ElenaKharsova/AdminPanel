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

  useEffect(()=>{
    if(!token) return;

    setUser(null);

    getUser(token, userId)
    .then((data)=>setUser(data))
    .catch(error => console.error("getUsers error:", error))
  },[userId, token])
    
  function saveUser(event){
    event.preventDefault();
    setIsSaving(true);

    const formData = new FormData(event.currentTarget);

    const payload = {
      id: user.id,
      username: formData.get('username')?.toString() ?? '',
      first_name: formData.get('firstName')?.toString() ?? '',
      last_name: formData.get('lastName')?.toString() ?? '',
      password: formData.get('password')?.toString() ?? '',
      is_active: formData.get('isActive') === 'on'
    }
    
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

  if(!user) return <div className='loading'>Loading...</div>;

  return(
    <UserForm 
      mode={'update'}
      user={user} 
      userId={userId} 
      saveUser={saveUser} 
      isSaving={isSaving} 
      openModalDeleteUser={openModalDeleteUser}
    />
  );
}