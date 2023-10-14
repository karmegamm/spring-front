import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('details'));
  const [isAdmin,setIsAdmin] = useState(false);
  const login = () => {
    // Perform your login logic and update session storage
    // Then set isLoggedIn to true
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Clear session storage and update isLoggedIn state
    sessionStorage.removeItem('details');
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout,setIsAdmin,isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}
