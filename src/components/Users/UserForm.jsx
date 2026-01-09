import styles from './users.module.css'
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

export default function UserForm({mode, user, userId, saveUser, isSaving, openModalDeleteUser}) {
  const navigate = useNavigate();

  function cancel(){
    navigate(-1);
  }

  return(
    <div className={styles['details-wrap']}>
      <h3 className={styles['details-header']}>
        {mode==='update' ? 'Edit User' : 'Create User'}
      </h3>
      <form className={styles['details-form']} key={userId} onSubmit={saveUser}>
        <div className={styles['details-form__inputs-wrap']}>
          <label className={styles['details__label']}>
            <span className={styles['details__labelText']}>Username</span>
            <input 
              type='text' 
              name='username'
              className={clsx(styles['details__input'],'input')}
              defaultValue={user?.username ?? ''}
              spellCheck={false}
              maxLength={20}
              placeholder='username'
            />
          </label>
          <label className={styles['details__label']}>
            <span className={styles['details__labelText']}>First name</span>
            <input 
              type='text'
              name='firstName'
              className={clsx(styles['details__input'],'input')}
              defaultValue={user?.first_name ?? ''}
              spellCheck={false}
              maxLength={20}
              placeholder='First name'
            />
          </label>
          <label className={styles['details__label']}>
            <span className={styles['details__labelText']}>Last name</span>
            <input 
              type='text' 
              name='lastName'
              className={clsx(styles['details__input'],'input')}
              defaultValue={user?.last_name ?? ''}
              spellCheck={false}
              maxLength={20}
              placeholder='Last name'
            />
          </label>
          <label className={styles['details__label']}>
            <span className={styles['details__labelText']}>Password</span>
            <input 
              type='text'
              name='password'
              className={clsx(styles['details__input'],'input')}
              spellCheck={false}
              maxLength={20}
              placeholder='Password'
            />
          </label>     
        </div> 
        <div className={styles['details__buttons-wrap']}>
          <div>
          <label className={clsx(styles["checkbox__label"], styles["details__checkbox-wrap"])}>
            <input 
              type='checkbox' 
              id='isActive'
              name='isActive' 
              defaultChecked={user?.is_active ?? true}
              className={styles['details__checkbox']}
            />
            <span>Active user</span>
          </label>
          <button
            type='submit'
            className={clsx(styles['details__btn'], 'btn')}
            disabled={isSaving}
          >
            {mode==='update' ? 'Save changes' : 'Create user'}
          </button>
          <button
            type='button'
            className={clsx(styles['details__btn'], styles['btn__cancel'], 'btn')}
            onClick={cancel}>
              Cancel
          </button>
            </div>
          { mode==='update' && <button 
            type='button'
            className={clsx(styles['delete-btn'], 'btn')}
            onClick={(e)=>openModalDeleteUser(e, userId)}>
              Delete user
          </button>}
        </div>
      </form>
    </div>
  );
}