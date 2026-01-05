import styles from './table.module.css';
import Row from './Row.jsx';
import ArrowIcon from './ArrowIcon.jsx';
import clsx from "clsx";
import { useState } from 'react';

export default function Table({users, direction, changeSorting}){

  const userList = users.map(user=>{
      return (
        <Row user={user} key={user.id}/>
      );
    })

  return(
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
  );
}