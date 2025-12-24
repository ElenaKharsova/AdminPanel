import { useEffect, useState } from 'react';
import styles from './login.module.css';

export default function Login(){
  
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  function login(formData){
    setError(null);

    const username = formData.get("login");
    const password = formData.get("password");

    fetch("https://test-assignment.emphasoft.com/api/v1/login/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username, password: password}),
      })
    .then(res=>{
      if(!res.ok){
        throw new Error('Http error, status = ' + res.status);
      }
      return res.json();
    })
    .then(data=>{
      setToken(data.token);    
    })
    .catch(error=>{
      setToken(null);
      setError(error instanceof Error ? error.message : "Unknown error");
    })
  }

  return(
    <form className={styles['login-form']} action={login}>
      <label>Login
        <input                  
          type='text' 
          aria-label='login'
          name='login'
          className='login-form__input'/>
      </label>
      <label>Password
        <input 
          type='password' 
          aria-label='password'
          name='password'
          className='login-form__input' />
      </label>
      <button className='login-form_btn'>Login</button>
      {error && <p className='alert'>{error}</p>}
    </form>
  );
}