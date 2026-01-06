import styles from './users.module.css'
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, putUser } from '../../api';
import { useAuth } from '../../auth/useAuth';

export default function UserDetails(){
  const navigate = useNavigate();
  const {token} = useAuth();
  const params = useParams();
  const userId = params.id;
  const [user, setUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false)
  const {updateUser} = useOutletContext();

  useEffect(()=>{
    if(!token) return;

    setUser(null);

    getUser(token, userId)
    .then((data)=>setUser(data))
    .catch(error => console.error("getUsers error:", error))
  },[userId, token])
    

  if(!user) return <div className='loading'>Loading...</div>;
  console.log("UserDetails user:", user);

  function saveUser(event){
    event.preventDefault();
    setIsSaving(true);

    const formData = new FormData(event.currentTarget);

    const data = {
      id: user.id,
      username: formData.get('username')?.toString() ?? '',
      first_name: formData.get('firstName')?.toString() ?? '',
      last_name: formData.get('lastName')?.toString() ?? '',
      password: formData.get('password')?.toString() ?? '',
      is_active: formData.get('isActive') === 'on'
    }

    console.log('Save data: ', data);
    
    putUser(token, data)
      .then(data=>{
        setUser(data);
        updateUser(data);
      })  
      .catch(error => console.error("getUsers error:", error))
      .finally(()=>setIsSaving(false));    
  }

  function cancelSave(){
    navigate('/')
  }

  function deleteUser(){

  }

  return(
    <div className={styles['details-wrap']}>
      <h3 className={styles['details-header']}>Edit User</h3>
      <form className={styles['details-form']} key={userId} onSubmit={saveUser}>
        <label className={styles['details__label']}>Username
          <input 
            type='text' 
            name='username'
            className={`${styles['details__input']} input`}
            defaultValue={user.username ?? ''}
            spellCheck={false}
          />
        </label>
        <label className={styles['details__label']}>First name
          <input 
            type='text'
            name='firstName'
            className={`${styles['details__input']} input`} 
            defaultValue={user.first_name ?? ''}
            spellCheck={false}
          />
        </label>
        <label className={styles['details__label']}>Last name
          <input 
            type='text' 
            name='lastName'
            className={`${styles['details__input']} input`} 
            defaultValue={user.last_name ?? ''}
            spellCheck={false}
          />
        </label>
        <label className={styles['details__label']}>Password
          <input 
            type='text'
            name='password'
            className={`${styles['details__input']} input`}
            spellCheck={false}
          />
        </label>      
        <div >      
          <label className={`${styles["checkbox__label"]} ${styles["details__checkbox-wrap"]}`}>
            <input 
              type='checkbox' 
              id='isActive'
              name='isActive' 
              defaultChecked={user.is_active}
              className={styles['details__checkbox']}
            />
            <span>Active user</span>
          </label>
        </div>
        <button
          type='submit'
          className={`${styles['details__btn']} btn`}
          disabled={isSaving}
        >
            Save changes
        </button>
        <button
          type='button'
          className={`${styles['details__btn']} ${styles['btn__cancel']} btn`}
          onClick={cancelSave}>
            Cancel
        </button>
        <button 
          type='button'
          className={`${styles['delete-btn']} btn`}
          onClick={deleteUser}>
            Delete user
        </button>
      </form>
    </div>
  );
}