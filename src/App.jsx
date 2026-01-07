
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
import AuthRequired from './auth/AuthRequired';
import Login from './components/Login/Login';
import UsersLayout from './components/Users/UsersLayout';
import UserCreate from './components/Users/UserCreate';
import UserDetails from './components/Users/UserDetails'; 
import HomeRedirect from './routes/HomeRedirect';


export default function App(){
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeRedirect />}/>
        <Route path='/login' element={<Login />}/>
        <Route element={<AuthRequired />}>
          <Route path='/users' element={<UsersLayout />}>
            <Route path='new' element={<UserCreate/> }/>
            <Route path=':id' element={<UserDetails />}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    <Toaster className='toast'
      position='top-center'
      containerStyle={{ top: '200px'}}
      toastOptions={{
        duration: 2500}}
    />
    </>
  );
}