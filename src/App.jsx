
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import AuthRequired from './auth/AuthRequired';
import UsersLayout from './components/Users/UsersLayout';
import Users from './components/Users/users';
import UserDetails from './components/Users/userDetails'; 
import HomeRedirect from './routes/HomeRedirect';


export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeRedirect />}/>
        <Route path='/login' element={<Login />}/>
        <Route element={<AuthRequired />}>
          <Route path='/users' element={<UsersLayout />}>
            <Route index element={<Users />} />
            <Route path=':id' element={<UserDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}