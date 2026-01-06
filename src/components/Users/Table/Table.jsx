import styles from './table.module.css';
import Row from './Row.jsx';
import ArrowIcon from './ArrowIcon.jsx';
import clsx from "clsx";

export default function Table({users, direction, changeSorting}){

  /*function openUserDetails(id){
    console.log("userDetails ID:", id);
    setSearchParams({id: id});
    console.log("Params ", params);
    console.log("Open user details, searchParams:", searchParams.get("id"));
  }*/

  const userList = users.map(user=>{
      return (
        <Row user={user} key={user.id}/>
      );
    })

  return(
    <div className={styles["table-wrap"]}>
      <table className={styles['table']}>
        <thead>
          <tr className={styles['row__header']}>
            <th 
            className={clsx(styles['header__cell'], styles['header-cell__ID'])}
            onClick={changeSorting}>
                <span>ID</span>
                <span className={styles['header-cell__sort-icon']}>
                  <ArrowIcon direction={direction}/>
                </span>
            </th>
            <th className={styles['header__cell']}>Username</th>
            <th className={styles['header__cell']}>First name</th>
            <th className={styles['header__cell']}>Last name</th>
            <th className={styles['header__cell']}>Active user</th>
          </tr>
        </thead>
        <tbody className={styles['table__body']}>
          {userList}
        </tbody>
      </table>
    </div>
  );
}