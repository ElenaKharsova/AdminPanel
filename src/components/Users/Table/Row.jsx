import styles from './table.module.css';
import clsx from "clsx";
import { useNavigate } from 'react-router-dom';

export default function Row({user}){
  const navigate = useNavigate();

  return(
    <tr className={styles['row']} onClick={()=>navigate(`${user.id}`)}>
      <td className={clsx(styles['cell'], styles['cell__id'])}>{user.id}</td>
      <td className={clsx(styles['cell'], styles['cell__username'])}>{user.username}</td>
      <td className={clsx(styles['cell'], styles['cell__first-name'])}>{user.first_name}</td>
      <td className={clsx(styles['cell'], styles['cell__last-name'])}>{user.last_name}</td>
      <td className={clsx(styles['cell'], styles['cell__isActive'])}>{user.is_active ? "yes": "no"}</td>
    </tr>
)}