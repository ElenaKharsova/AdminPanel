import styles from './users.module.css'
import clsx from 'clsx'

export default function Header({filter, setFilter, createUser}){
  return(
    <div className={styles['user-list__header-wrap']}>
      <h1 className={styles['user-list__header']}>User List</h1>
      <div className={styles['header-buttons-wrap']}>
        <input 
          type='text'
          value={filter}
          placeholder='Filter by username'
          onChange={(event)=>setFilter(event.target.value)}
          className={`${styles['user-list__filter-input']} input`}
          spellCheck={false}
          aria-label='Filter by username'
        />
        <button 
          className={clsx(styles['create-user-btn'], 'btn')}
          onClick={createUser}
        >+ Create user</button>
      </div>
    </div>
  );
}