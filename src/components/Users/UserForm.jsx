import styles from './users.module.css'
import { useNavigate } from 'react-router-dom';

export default function UserForm({mode, user, userId, saveUser, isSaving, openModalDeleteUser}) {
  const navigate = useNavigate();

  function cancel(){
    navigate('/')
  }

  return(
    <div className={styles['details-wrap']}>
      <h3 className={styles['details-header']}>
        {mode==='update' ? 'Edit User' : 'Create User'}
      </h3>
      <form className={styles['details-form']} key={userId} onSubmit={saveUser}>
        <label className={styles['details__label']}>Username
          <input 
            type='text' 
            name='username'
            className={`${styles['details__input']} input`}
            defaultValue={user?.username ?? ''}
            spellCheck={false}
            maxLength={20}
          />
        </label>
        <label className={styles['details__label']}>First name
          <input 
            type='text'
            name='firstName'
            className={`${styles['details__input']} input`} 
            defaultValue={user?.first_name ?? ''}
            spellCheck={false}
            maxLength={20}
          />
        </label>
        <label className={styles['details__label']}>Last name
          <input 
            type='text' 
            name='lastName'
            className={`${styles['details__input']} input`} 
            defaultValue={user?.last_name ?? ''}
            spellCheck={false}
            maxLength={20}
          />
        </label>
        <label className={styles['details__label']}>Password
          <input 
            type='text'
            name='password'
            className={`${styles['details__input']} input`}
            spellCheck={false}
            maxLength={20}
          />
        </label>      
        <div >      
          <label className={`${styles["checkbox__label"]} ${styles["details__checkbox-wrap"]}`}>
            <input 
              type='checkbox' 
              id='isActive'
              name='isActive' 
              defaultChecked={user?.is_active ?? true}
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
          {mode==='update' ? 'Save changes' : 'Create user'}
        </button>
        <button
          type='button'
          className={`${styles['details__btn']} ${styles['btn__cancel']} btn`}
          onClick={cancel}>
            Cancel
        </button>
        { mode==='update' && <button 
          type='button'
          className={`${styles['delete-btn']} btn`}
          onClick={(e)=>openModalDeleteUser(e, userId)}>
            Delete user
        </button>}
      </form>
    </div>
  );
}