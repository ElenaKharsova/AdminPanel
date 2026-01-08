import styles from './table.module.css';
import clsx from "clsx";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

export default function Row({user}){
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {id} = useParams();

  const isActive = id === String(user.id);

  return(
    <tr 
      className={clsx(styles['row'], isActive && styles['row_active'])} 
      onClick={()=>navigate(`${user.id}?${searchParams}`)}>
      <td className={clsx(styles['cell'], styles['cell__id'])}>{user.id}</td>
      <td className={clsx(styles['cell'], styles['cell__username'])}>{user.username}</td>
      <td className={clsx(styles['cell'], styles['cell__first-name'])}>{user.first_name}</td>
      <td className={clsx(styles['cell'], styles['cell__last-name'])}>{user.last_name}</td>
      <td className={clsx(styles['cell'], styles['cell__isActive'])}>{user.is_active ? "yes": "no"}</td>
    </tr>
)}