import Table from './Table/Table.jsx';
import Header from './Header.jsx'
import styles from './users.module.css';

export default function Users({context}){
  const {filter, setFilter, direction, setDirection, filteredUsers, createUser} = context;
  function changeSorting(){
    setDirection(prev=>prev==="up" ? "down" : "up");
  }
  
  return(
      <div className={styles['user-list-wrap']}>
        <Header filter={filter} setFilter={setFilter} createUser={createUser}/>
        <Table users={filteredUsers} direction={direction} changeSorting={changeSorting}/>
      </div>
  );
}