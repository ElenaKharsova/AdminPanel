import { useState, createContext, useMemo } from "react";
import { clearToken, getToken, saveToken } from "../storage";

export const AuthContext =  createContext(null);

export default function AuthProvider({children}){
  const token = getToken()  
  const authData = token ? 
    { isAuthenticated: true,
      token: token
    } :
    { isAuthenticated: false,
      token: null
    };
    
  const [auth, setAuth] = useState(authData);

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

  const value = useMemo(()=>({...auth, setLoginData}),[auth, setLoginData]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}