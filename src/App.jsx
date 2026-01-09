
import {HashRouter, Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
import AuthRequired from './auth/AuthRequired';
import Login from './components/Login/Login';
import UsersLayout from './components/Users/UsersLayout';
import UserCreate from './components/Users/UserCreate';
import UserUpdate from './components/Users/UserUpdate'; 
import HomeRedirect from './routes/HomeRedirect';
import NotFound from './components/404NotFound'


export default function App(){
  return(
    <>
      <HashRouter>
        <Routes>
          <Route path='/' element={<HomeRedirect />}/>
          <Route path='login' element={<Login />}/>
          <Route element={<AuthRequired />}>
            <Route path='users' element={<UsersLayout />}>
              <Route path='new' element={<UserCreate/> }/>
              <Route path=':id' element={<UserUpdate />}/>
            </Route>
          </Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </HashRouter>
      <Toaster className='toast'
        position='top-center'
        containerStyle={{ top: '200px'}}
        toastOptions={{
        duration: 2500}}
      />
    </>
  );
}