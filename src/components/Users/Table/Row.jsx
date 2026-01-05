import styles from './table.module.css';
import clsx from "clsx";

export default function Row({user}){
  return(
    <tr className={styles['row']}>
      <td className={clsx(styles['cell'], styles['cell__id'])}>{user.id}</td>
      <td className={clsx(styles['cell'], styles['cell__username'])}>{user.username}</td>
      <td className={clsx(styles['cell'], styles['cell__first-name'])}>{user.first_name}</td>
      <td className={clsx(styles['cell'], styles['cell__last-name'])}>{user.last_name}</td>
      <td className={clsx(styles['cell'], styles['cell__isActive'])}>{user.is_active ? "yes": "no"}</td>
    </tr>
)}