import styles from './login.module.css';
import { useAuth } from '../../auth/useAuth';
import {loginUser} from '../../api'
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login(){
  const navigate = useNavigate();
  const { setLoginData } = useAuth();  
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const location = useLocation();

  function login(e){
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.target);
    const credentials = {
      username: formData.get("login")?.toString().trim(),
      password: formData.get("password")?.toString()
    };

    if(!credentials.username || !credentials.password){
      setError(`Login and password can't be empty`);
      return;
    }
    
    setStatus('submitting');

    loginUser(credentials)
      .then((data) => {
        const path = 
          `${location?.state?.pathname || ''}${location?.state?.search || ''}` 
          || '/users';
        console.log("path", path);
        setLoginData(data.token);
        navigate(path, {replace: true});
      })
      .catch((error) => {
        console.error("loginUser error:", error);
        setError('Login failed. Please check your credentials and try again.');
      })
      .finally(()=>{
        setStatus('idle');
      })
  }    

  return(
    <div className={styles["login-wrap"]}>
      <h1 className={styles['login-header']}>Sign in to your account</h1>
      <div className={styles['alert']}>{error ?? ''}</div>
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
        <button 
          className={`${styles['login-form_btn']} btn`}
          disabled = {status!=='idle'} 
        >Sign in</button>
      </form>
    </div>
  );
}