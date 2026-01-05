import { use, useEffect, useState } from 'react';
import styles from './login.module.css';
import {loginUser} from '../../api'
import { saveToken,removeToken } from '../../storage';

export default function Login(){
  
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  async function login(e){
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.target);
    const credentials = {
      username: formData.get("login"),
      password: formData.get("password")
    };

    try {
      const data = await loginUser(credentials);
      console.log("Login successful", data.token);
      setToken(data.token);
    }
    catch(error) {
      console.error("loginUser error:", error);
      setToken(null);
      setError("Login failed. Please check your credentials and try again.");
    }    
  }

  useEffect(()=>{
    console.log("Login token:", token);
    token ? saveToken(token) : removeToken(); 
  }, [token]);

  return(
    <div className={styles["login-wrap"]}>
      <h1>Sign in to your account</h1>
      <form onSubmit={login} className={styles['login-form']} >
          <input                  
            type='text' 
            aria-label='login'
            name='login'
            className={styles['login-form__input']}
            placeholder='Email address'/>
          <input 
            type='password' 
            aria-label='password'
            name='password'
            className={styles['login-form__input']} 
            placeholder='Password'/>
        <button className={styles['login-form_btn']}>Sign in</button>
        {error && <p className='alert'>{error}</p>}
      </form>
    </div>
  );
}