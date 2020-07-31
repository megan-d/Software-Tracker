import React, { useState, createContext } from 'react';

//Initiate context
export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [userData, setUserData] = useState({
    token: null,
    isLoading: true,
    user: null,
    isAuthenticated: false,
    userErrors: {},
  });
  return (
    <AuthContext.Provider value={{userData, setUserData}}>
      {props.children}
    </AuthContext.Provider>
  );
};
