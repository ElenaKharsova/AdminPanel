import { useEffect, useState, createContext } from "react";
import { clearToken, getToken, saveToken } from "../storage";

export const AuthContext =  createContext(null);

export default function AuthProvider({children}){
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null
});

  const setLoginData = (token) => {
    if(token){
      saveToken(token);
      setAuth({
        isAuthenticated: true,
        token: token
      })
    } else {
      clearToken();
      setAuth({
        isAuthenticated: false,
        token: null
      })
    }
  }

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({
        isAuthenticated: true,
        token: token
      })
    } 
  }, [])

  return (
    <AuthContext.Provider value={{...auth, setLoginData}}>
      {children}
    </AuthContext.Provider>
  );
}