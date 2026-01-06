import { useState } from 'react';
import styles from './login.module.css';
import {loginUser} from '../../api'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';

export default function Login(){
  const navigate = useNavigate();
  const { setLoginData } = useAuth();  
  const [error, setError] = useState(null);

  function login(e){
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.target);
    const credentials = {
      username: formData.get("login"),
      password: formData.get("password")
    };

    loginUser(credentials)
      .then((data) => {
        console.log("Login successful", data.token);
        setLoginData(data.token);
        navigate('/users', {replace: true});
      })
      .catch((error) => {
        console.error("loginUser error:", error);
        setError("Login failed. Please check your credentials and try again.");
      })
  }    

  return(
    <div className={styles["login-wrap"]}>
      <h1>Sign in to your account</h1>
      <form onSubmit={login} className={styles['login-form']} >
          <input                  
            type='text' 
            aria-label='login'
            name='login'
            className={`${styles['login-form__input']} input`}
            placeholder='Username'
            spellCheck={false}/>
          <input 
            type='password' 
            aria-label='password'
            name='password'
            className={`${styles['login-form__input']} input`}
            placeholder='Password'/>
        <button className={`${styles['login-form_btn']} btn`}>Sign in</button>
        {error && <p className={styles['alert']}>{error}</p>}
      </form>
    </div>
  );
}