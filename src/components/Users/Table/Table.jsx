import styles from './table.module.css';
import Row from './Row.jsx';

export default function Table({users}){
  const userList = users.map(user=>{
      return (
        <Row user={user} key={user.id}/>
      );
    })
    
  return(
    <table className={styles["table"]}>
      <thead>
        <tr className={styles["row__header"]}>
          <th className={styles["header__cell"]}>ID</th>
          <th className={styles["header__cell"]}>Username</th>
          <th className={styles["header__cell"]}>First name</th>
          <th className={styles["header__cell"]}>Last name</th>
          <th className={styles["header__cell"]}>Active user</th>
        </tr>
      </thead>
      <tbody className={styles['table__body']}>
        {userList}
      </tbody>
    </table>
  );
}