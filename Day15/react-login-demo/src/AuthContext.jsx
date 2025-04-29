// src/AuthContext.jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 1) Lazy-initialize from localStorage
  const [user, setUser] = useState(() => {
    const json = localStorage.getItem('user');
    return json ? JSON.parse(json) : null;
  });

  const login = (username) => {
    const u = { username };
    // 2) Write immediately to localStorage
    localStorage.setItem('user', JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
