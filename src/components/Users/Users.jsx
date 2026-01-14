import Table from './Table/Table.jsx';
import Header from './Header.jsx'
import styles from './users.module.css';

export default function Users({context}){
  const {isLoading, error, filter, setFilter, sort, setAllSearchParams, filteredUsers, createUser} = context;
  
  function changeSorting(){
    const changedSort = sort === 'asc' ? 'desc' : 'asc'
    setAllSearchParams('sort', changedSort);
  }
  
  return(
      <div className={styles['user-list-wrap']}>
        <Header 
          filter={filter} 
          setFilter={setFilter} 
          createUser={createUser} 
          setAllSearchParams={setAllSearchParams}
        />
        <Table users={filteredUsers} sort={sort} changeSorting={changeSorting} isLoading={isLoading} error={error}/>
      </div>
  );
}