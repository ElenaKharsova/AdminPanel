import styles from './modal.module.css'

export default function DeleteUserConfirmModal({onHandleDeleteUser, onHandleCloseModal}){
  return(
    <dialog 
      id='modal' 
      className={styles['dialog']}
    >
      <div className={styles['modal__close-btn-wrap']}>
        <button 
          className={styles['modal__close-btn']} 
          type='button'
          onClick={onHandleCloseModal}
          aria-label="Close"
        >
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles['modal__close-icon']}>
            <path d="M36 24L24 36" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M24 24L36 36" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className={styles['confirm-form-wrap']}>
        <h3 className={styles['confirm__header']}>Do you want to delete user?</h3>
        <form className={styles['dialog-confirm__form']} method="dialog">
          <button 
            className={`${styles['modal__btn']} ${styles['btn-delete']}`} 
            type="button"
            aria-label='delete user'
            onClick={onHandleDeleteUser}
          > DELETE USER</button>
          <button 
            className={`${styles['modal__btn']} ${styles['btn-cancel']}`} 
            type="button" 
            onClick={onHandleCloseModal}
            aria-label='cancel'
          >CANCEL</button>
        </form>
      </div>
    </dialog>
  );
}