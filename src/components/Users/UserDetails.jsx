import { useOutletContext, useParams } from "react-router-dom";
import styles from './users.module.css'

export default function UserDetails(){
  const {users} = useOutletContext();
  const params = useParams();
  const userId = params.id;
  const user = users.find(user=> user.id.toString() === userId);
  console.log("UserDetails user:", user);

  return(
    <div className={styles["details-wrap"]}>
      <h3 className={styles["details-header"]}>Edit User</h3>
      <form className={styles['details-form']}>
        <label className={styles["details__label"]}>Username
          <input 
            type='text' 
            className={`${styles["details__input"]} input`}
          />
        </label>
        <label className={styles["details__label"]}>First name
          <input 
            type='text' 
            className={`${styles["details__input"]} input`} 
            value={user.first_name}
          />
        </label>
        <label className={styles["details__label"]}>Last name
          <input 
            type='text' 
            className={`${styles["details__input"]} input`} 
            value={user.last_name}
          />
        </label>
        <label className={styles["details__label"]}>Password
          <input 
            type='text' 
            className={`${styles["details__input"]} input`}
          />
        </label>      
        <div >      
          <label className={`${styles["checkbox__label"]} ${styles["details__checkbox-wrap"]}`}>
            <input 
              type='checkbox' 
              id="isActive" 
              name="isActive" 
              checked={user.is_active}
              className={styles["details__checkbox"]}
            />
            <span>Is active user</span>
          </label>
        </div>
        <button className={`${styles["details__btn"]} btn`}>Save changes</button>
        <button className={`${styles["details__btn"]} ${styles["btn__cancel"]} btn`}>Cancel</button>
        <button className={`${styles["delete-btn"]} btn`}>Delete user</button>
      </form>
    </div>
  );
}