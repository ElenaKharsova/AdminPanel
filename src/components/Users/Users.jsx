import Table from './Table/Table.jsx';
import styles from './users.module.css';

export default function Users({context}){
  const {filter, setFilter, direction, setDirection, filteredUsers} = context;
  function changeSorting(){
    setDirection(prev=>prev==="up" ? "down" : "up");
  }
  
  return(
      <div className={styles['user-list-wrap']}>
        <div className={styles['user-list__header-wrap']}>
          <h1 className={styles['user-list__header']}>User List</h1>
          <input 
            type='text'
            value={filter}
            placeholder='Filter by username'
            onChange={(event)=>setFilter(event.target.value)}
            className={`${styles['user-list__filter-input']} input`}
            spellCheck={false}
            aria-label='Filter by username'
          />
        </div>
        <Table users={filteredUsers} direction={direction} changeSorting={changeSorting}/>
      </div>
  );
}