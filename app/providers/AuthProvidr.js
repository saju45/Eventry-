"use client";
import { useState } from 'react';
import { AuthContext } from '../contexts';

const AuthProvidr = ({children}) => {
    const [auth,setAuth]=useState(null);
  return (
    <AuthContext.Provider value={{auth,setAuth}}> {children}</AuthContext.Provider>
  )
}

export default AuthProvidr


