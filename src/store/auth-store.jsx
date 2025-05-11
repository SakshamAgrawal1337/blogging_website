import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
  isSignedIn: false,
  username: '',
  role: '', 
  signIn: (username, password) => {},
  signOut: () => {},
  signUp: (username, email, password, role) => {},
  addAdmin: (username, email, password) => {},
  error: '',
  clearError: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(() => {
    const saved = localStorage.getItem('isSignedIn');
    return saved === 'true' ? true : false;
  });
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || '';
  });
  const [role, setRole] = useState(() => {
    return localStorage.getItem('role') || '';
  });
  const [error, setError] = useState('');

  const [users, setUsers] = useState({
    admin: { email: 'admin@example.com', password: 'admin123', role: 'admin' }, // default admin 
  });

  useEffect(() => {
    localStorage.setItem('isSignedIn', isSignedIn);
  }, [isSignedIn]);

  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);

  useEffect(() => {
    localStorage.setItem('role', role);
  }, [role]);

  const signIn = (usernameInput, passwordInput) => {
    if (!users[usernameInput]) {
      setError('User does not exist. Please sign up first.');
      return false;
    }
    if (users[usernameInput].password !== passwordInput) {
      setError('Incorrect password.');
      return false;
    }
    setIsSignedIn(true);
    setUsername(usernameInput);
    setRole(users[usernameInput].role || 'user');
    setError('');
    return true;
  };

  const signOut = () => {
    setIsSignedIn(false);
    setUsername('');
    setRole('');
    setError('');
  };

  const signUp = (usernameInput, emailInput, passwordInput, userRole = 'user') => {
    if (users[usernameInput]) {
      setError('Username already exists. Please choose another.');
      return false;
    }
    setUsers(prevUsers => ({
      ...prevUsers,
      [usernameInput]: { email: emailInput, password: passwordInput, role: userRole }
    }));
    setIsSignedIn(true);
    setUsername(usernameInput);
    setRole(userRole);
    setError('');
    return true;
  };

  const addAdmin = (usernameInput, emailInput, passwordInput) => {
    if (!isSignedIn || role !== 'admin') {
      setError('Only admins can add new admins.');
      return false;
    }
    if (users[usernameInput]) {
      setError('Username already exists. Please choose another.');
      return false;
    }
    setUsers(prevUsers => ({
      ...prevUsers,
      [usernameInput]: { email: emailInput, password: passwordInput, role: 'admin' }
    }));
    setError('');
    return true;
  };

  const updateUser = (usernameInput, newEmail, newRole) => {
    if (!isSignedIn || role !== 'admin') {
      setError('Only admins can update user details.');
      return false;
    }
    if (!users[usernameInput]) {
      setError('User does not exist.');
      return false;
    }
    setUsers(prevUsers => ({
      ...prevUsers,
      [usernameInput]: {
        ...prevUsers[usernameInput],
        email: newEmail,
        role: newRole
      }
    }));
    setError('');
    return true;
  };

  const clearError = () => {
    setError('');
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, username, role, signIn, signOut, signUp, addAdmin, error, clearError, users }}>
      {children}
    </AuthContext.Provider>
  );
};
